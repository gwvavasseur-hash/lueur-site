import { useCallback, useEffect, useRef, useState } from "react";

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

let paypalSdkPromise;

function loadPayPalSdk() {
  if (!paypalClientId) {
    return Promise.reject(new Error("Le client PayPal public n’est pas configuré."));
  }

  if (window.paypal) {
    return Promise.resolve(window.paypal);
  }

  if (paypalSdkPromise) {
    return paypalSdkPromise;
  }

  paypalSdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    const params = new URLSearchParams({
      "client-id": paypalClientId,
      currency: "EUR",
      intent: "capture",
      components: "buttons,card-fields",
      locale: "fr_FR",
      "enable-funding": "card",
    });

    script.src = `https://www.paypal.com/sdk/js?${params.toString()}`;
    script.async = true;
    script.onload = () => resolve(window.paypal);
    script.onerror = () => reject(new Error("PayPal n’a pas pu se charger."));
    document.body.appendChild(script);
  });

  return paypalSdkPromise;
}

async function readApiResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Le paiement n’a pas pu aboutir.");
  }

  return data;
}

function PayPalCheckout({ cartItems, disabled, total, customer, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [cardReady, setCardReady] = useState(false);
  const [cardMessage, setCardMessage] = useState("");
  const [cardSubmitting, setCardSubmitting] = useState(false);
  const paypalButtonRef = useRef(null);
  const cardFieldsRef = useRef(null);
  const cardNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cardCvvRef = useRef(null);

  const createOrder = useCallback(async () => {
    setError("");
    setStatus("Préparation du paiement...");

    const data = await fetch("/api/paypal/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems, customer }),
    }).then(readApiResponse);

    return data.id;
  }, [cartItems, customer]);

  const captureOrder = useCallback(async (data) => {
    setError("");
    setStatus("Validation du paiement...");

    const capture = await fetch("/api/paypal/capture-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderID: data.orderID }),
    }).then(readApiResponse);

    setStatus("Paiement confirmé. Merci.");
    onPaymentSuccess(capture);
  }, [onPaymentSuccess]);

  useEffect(() => {
    if (disabled || paymentMethod !== "paypal" || !paypalButtonRef.current) return undefined;

    let cancelled = false;
    const buttonContainer = paypalButtonRef.current;
    buttonContainer.innerHTML = "";

    loadPayPalSdk()
      .then((paypal) => {
        if (cancelled) return;

        paypal
          .Buttons({
            fundingSource: paypal.FUNDING.PAYPAL,
            style: {
              layout: "vertical",
              color: "black",
              shape: "rect",
              label: "paypal",
              height: 48,
            },
            createOrder,
            onApprove: captureOrder,
            onError: (paymentError) => {
              setError(paymentError.message || "Le paiement PayPal a échoué.");
            },
          })
          .render(buttonContainer);
      })
      .catch((sdkError) => setError(sdkError.message));

    return () => {
      cancelled = true;
      buttonContainer.innerHTML = "";
    };
  }, [captureOrder, createOrder, disabled, paymentMethod]);

  useEffect(() => {
    if (disabled || paymentMethod !== "card") return undefined;

    let cancelled = false;
    setCardReady(false);
    setCardMessage("");

    loadPayPalSdk()
      .then((paypal) => {
        if (cancelled) return;

        if (!paypal.CardFields) {
          setCardMessage("Le paiement par carte intégré n’est pas disponible sur ce compte PayPal pour l’instant.");
          return;
        }

        const cardFields = paypal.CardFields({
          createOrder,
          onApprove: captureOrder,
          onError: (paymentError) => {
            setCardSubmitting(false);
            setError(paymentError.message || "Le paiement par carte a échoué.");
          },
          style: {
            input: {
              color: "#0B0A12",
              "font-size": "15px",
              "font-family": "ui-sans-serif, system-ui, sans-serif",
            },
            ".invalid": {
              color: "#7F1D1D",
            },
          },
        });

        if (!cardFields.isEligible()) {
          setCardMessage("Le paiement carte intégré doit être activé dans ton compte PayPal Business.");
          return;
        }

        cardFieldsRef.current = cardFields;
        cardFields.NameField().render(cardNameRef.current);
        cardFields.NumberField().render(cardNumberRef.current);
        cardFields.ExpiryField().render(cardExpiryRef.current);
        cardFields.CVVField().render(cardCvvRef.current);
        setCardReady(true);
      })
      .catch((sdkError) => setError(sdkError.message));

    return () => {
      cancelled = true;
      [cardNameRef, cardNumberRef, cardExpiryRef, cardCvvRef].forEach((fieldRef) => {
        if (fieldRef.current) {
          fieldRef.current.innerHTML = "";
        }
      });
      cardFieldsRef.current = null;
    };
  }, [captureOrder, createOrder, disabled, paymentMethod]);

  async function submitCardPayment() {
    if (!cardFieldsRef.current || cardSubmitting) return;

    setCardSubmitting(true);
    setError("");

    try {
      await cardFieldsRef.current.submit();
    } catch (submitError) {
      setError(submitError.message || "Le paiement par carte a échoué.");
    } finally {
      setCardSubmitting(false);
    }
  }

  return (
    <div className="mt-8 border border-[#0B0A12]/10 bg-[#FCFCF7]/60 p-4 text-sm leading-7 text-[#55524B] md:p-5">
      <p>
        Choisis ton moyen de paiement. Le paiement reste sur Lueur, avec une fenêtre sécurisée PayPal si nécessaire.
      </p>

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        {[
          ["paypal", "PayPal"],
          ["card", "Carte bancaire"],
          ["apple", "Apple Pay"],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setPaymentMethod(id)}
            disabled={disabled || id === "apple"}
            className={`border px-4 py-3 text-xs uppercase tracking-[0.14em] transition md:text-sm ${
              paymentMethod === id
                ? "border-[#0B0A12] bg-[#0B0A12] text-[#FCFCF7]"
                : "border-[#0B0A12]/10 bg-white/45 text-[#0B0A12] hover:bg-white/80"
            } disabled:cursor-not-allowed disabled:border-[#0B0A12]/10 disabled:bg-white/25 disabled:text-[#0B0A12]/35`}
          >
            {label}
          </button>
        ))}
      </div>

      {paymentMethod === "paypal" ? <div ref={paypalButtonRef} className="mt-6 min-h-[48px]" /> : null}

      {paymentMethod === "card" ? (
        <div className="mt-6 space-y-3">
          {cardMessage ? <p className="border border-[#0B0A12]/10 bg-white/50 p-4">{cardMessage}</p> : null}
          <div ref={cardNameRef} className="min-h-12 border border-[#0B0A12]/10 bg-white/65 p-3" />
          <div ref={cardNumberRef} className="min-h-12 border border-[#0B0A12]/10 bg-white/65 p-3" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div ref={cardExpiryRef} className="min-h-12 border border-[#0B0A12]/10 bg-white/65 p-3" />
            <div ref={cardCvvRef} className="min-h-12 border border-[#0B0A12]/10 bg-white/65 p-3" />
          </div>
          <button
            type="button"
            onClick={submitCardPayment}
            disabled={!cardReady || disabled || cardSubmitting}
            className="w-full bg-[#0B0A12] px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30 md:text-sm md:tracking-[0.18em]"
          >
            {cardSubmitting ? "Paiement en cours..." : `Payer par carte · ${total.toFixed(2).replace(".", ",")} €`}
          </button>
        </div>
      ) : null}

      {paymentMethod === "apple" ? (
        <p className="mt-6 border border-[#0B0A12]/10 bg-white/50 p-4">
          Apple Pay sera ajouté plus tard, quand PayPal sera validé.
        </p>
      ) : null}

      {status ? <p className="mt-5 text-[#3F3B35]">{status}</p> : null}
      {error ? <p className="mt-5 text-[#7F1D1D]">{error}</p> : null}
    </div>
  );
}

export default PayPalCheckout;
