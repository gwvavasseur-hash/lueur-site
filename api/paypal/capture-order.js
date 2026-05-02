import { callPayPal, parseJsonBody, sendJson } from "./_utils.js";

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { error: "Méthode non autorisée." });
    return;
  }

  try {
    const { orderID } = await parseJsonBody(request);

    if (!orderID) {
      sendJson(response, 400, { error: "Commande PayPal introuvable." });
      return;
    }

    const capture = await callPayPal(`/v2/checkout/orders/${orderID}/capture`, {
      method: "POST",
      body: JSON.stringify({}),
    });

    sendJson(response, 200, capture);
  } catch (error) {
    sendJson(response, 500, { error: error.message });
  }
}
