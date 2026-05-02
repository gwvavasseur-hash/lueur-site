import { books } from "../../src/data/books.js";
import { digitalProducts } from "../../src/data/digitalProducts.js";

const PAYPAL_API_BASE = process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

function parsePrice(price) {
  return Number(String(price).replace("€", "").replace(",", ".").trim()) || 0;
}

function getCatalogItem(item) {
  const catalog = item.category === "digital" ? digitalProducts : books;
  return catalog.find((catalogItem) => catalogItem.id === item.id);
}

export async function parseJsonBody(request) {
  if (request.body && typeof request.body === "object" && !Buffer.isBuffer(request.body)) {
    return request.body;
  }

  if (Buffer.isBuffer(request.body)) {
    return request.body.length > 0 ? JSON.parse(request.body.toString()) : {};
  }

  if (typeof request.body === "string") {
    return request.body ? JSON.parse(request.body) : {};
  }

  let rawBody = "";
  for await (const chunk of request) {
    rawBody += chunk;
  }

  return rawBody ? JSON.parse(rawBody) : {};
}

export function buildOrderSummary(cartItems = []) {
  const cleanItems = cartItems
    .map((item) => {
      const catalogItem = getCatalogItem(item);
      if (!catalogItem) return null;

      return {
        id: catalogItem.id,
        category: item.category === "digital" ? "digital" : "book",
        title: catalogItem.title,
        price: catalogItem.price,
        type: catalogItem.type || "Livre PDF",
        amount: parsePrice(catalogItem.price),
      };
    })
    .filter(Boolean);

  const total = cleanItems.reduce((sum, item) => sum + item.amount, 0);

  return {
    items: cleanItems,
    total,
    totalValue: total.toFixed(2),
  };
}

export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal n'est pas configuré sur le serveur.");
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || data.error || "PayPal a refusé la connexion.");
  }

  return data.access_token;
}

export async function callPayPal(path, options = {}) {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${PAYPAL_API_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || data?.details?.[0]?.description || "PayPal a refusé la demande.";
    throw new Error(message);
  }

  return data;
}

export function sendJson(response, statusCode, payload) {
  response.status(statusCode).json(payload);
}
