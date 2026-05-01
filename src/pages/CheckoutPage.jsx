import PageShell from "../components/PageShell";

function CheckoutPage({ cartItems, total, onNavigate, onRemove }) {
  return (
    <PageShell eyebrow="commande" title="Finaliser ton panier.">
      <div className="mx-auto grid max-w-7xl min-w-0 gap-6 md:grid-cols-[1fr_0.8fr] md:gap-8">
        <section className="min-w-0 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">informations</p>
          <div className="mt-8 grid gap-4">
            <input className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none" placeholder="Prénom" />
            <input className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none" placeholder="Adresse email" />
            <input className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none" placeholder="Code promo" />
          </div>
          <div className="mt-8 border border-[#0B0A12]/10 bg-[#FCFCF7]/60 p-5 text-sm leading-7 text-[#55524B]">
            Dans la version finale, ce bouton sera relié à Stripe ou à une solution équivalente. La livraison des PDF et produits numériques se fera par email et dans l’espace membre.
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            className="mt-8 w-full bg-[#0B0A12] px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30 md:px-7 md:text-sm md:tracking-[0.18em]"
          >
            Commander · {total.toFixed(2).replace(".", ",")} €
          </button>
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
