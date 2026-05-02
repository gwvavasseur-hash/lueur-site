import { buildOrderSummary, callPayPal, parseJsonBody, sendJson } from "./_utils.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Méthode non autorisée." });
    return;
  }

  try {
    const { cartItems = [], customer = {} } = await parseJsonBody(request);
    const order = buildOrderSummary(cartItems);

    if (order.items.length === 0 || order.total <= 0) {
      sendJson(response, 400, { error: "Le panier est vide." });
      return;
    }

    const paypalOrder = await callPayPal("/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: "Commande Lueur",
            amount: {
              currency_code: "EUR",
              value: order.totalValue,
            },
            custom_id: customer.email || "lueur-client",
          },
        ],
      }),
    });

    sendJson(response, 200, {
      id: paypalOrder.id,
      total: order.totalValue,
    });
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
}
