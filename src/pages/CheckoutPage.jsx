import { useState } from "react";

import PageShell from "../components/PageShell";
import PayPalCheckout from "../components/PayPalCheckout";

function CheckoutPage({ cartItems, total, onNavigate, onPaymentSuccess, onRemove }) {
  const [customer, setCustomer] = useState({
    firstName: "",
    email: "",
    promoCode: "",
  });
  const paymentDisabled = cartItems.length === 0 || total <= 0;

  function updateCustomer(field, value) {
    setCustomer((previousCustomer) => ({ ...previousCustomer, [field]: value }));
  }

  return (
    <PageShell eyebrow="commande" title="Finaliser ton panier.">
      <div className="mx-auto grid max-w-7xl min-w-0 gap-6 md:grid-cols-[1fr_0.8fr] md:gap-8">
        <section className="min-w-0 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">informations</p>
          <div className="mt-8 grid gap-4">
            <input
              value={customer.firstName}
              onChange={(event) => updateCustomer("firstName", event.target.value)}
              className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none"
              placeholder="Prénom"
            />
            <input
              value={customer.email}
              onChange={(event) => updateCustomer("email", event.target.value)}
              className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none"
              placeholder="Adresse email"
            />
            <input
              value={customer.promoCode}
              onChange={(event) => updateCustomer("promoCode", event.target.value)}
              className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none"
              placeholder="Code promo"
            />
          </div>
          <PayPalCheckout
            cartItems={cartItems}
            customer={customer}
            disabled={paymentDisabled}
            total={total}
            onPaymentSuccess={onPaymentSuccess}
          />
        </section>

        <aside className="min-w-0 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">récapitulatif</p>
          {cartItems.length === 0 ? (
            <div className="mt-8">
              <p className="font-serif text-3xl tracking-[-0.05em]">Ton panier est vide.</p>
              <button type="button" onClick={() => onNavigate("library")} className="mt-6 border-b border-[#0B0A12] pb-1 text-xs uppercase tracking-[0.14em] md:text-sm md:tracking-[0.18em]">
                Retour à la bibliothèque
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.category}-${item.id}`} className="border-b border-[#0B0A12]/10 pb-4">
                  <div className="flex min-w-0 justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-[0.22em] text-[#68645C]">{item.type}</p>
                      <p className="mt-2 font-serif text-2xl leading-tight tracking-[-0.04em]">{item.title}</p>
                    </div>
                    <p className="shrink-0">{item.price}</p>
                  </div>
                  <button type="button" onClick={() => onRemove(item.id, item.category)} className="mt-3 text-xs uppercase tracking-[0.18em] text-[#68645C] hover:text-[#0B0A12]">
                    retirer
                  </button>
                </div>
              ))}
              <div className="flex justify-between pt-5 font-serif text-3xl tracking-[-0.06em] md:text-4xl">
                <span>Total</span>
                <span>{total.toFixed(2).replace(".", ",")} €</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </PageShell>
  );
}

export default CheckoutPage;
