function CartPreview({ open, cartItems, total, onNavigate, onRemove }) {
  if (!open) return null;

  return (
    <aside className="fixed right-3 top-[82px] z-40 w-[min(296px,calc(100vw-24px))] max-w-[calc(100vw-24px)] border border-white/45 bg-white/42 p-3 shadow-[0_24px_80px_rgba(10,10,18,0.12)] backdrop-blur-xl md:right-8 md:top-[94px] md:w-[min(390px,calc(100vw-32px))] md:max-w-none md:p-5 md:shadow-[0_30px_100px_rgba(10,10,18,0.14)] md:backdrop-blur-2xl">
      <div className="flex items-start justify-between gap-3 border-b border-[#0B0A12]/10 pb-3 md:gap-6 md:pb-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.22em] text-[#68645C] md:text-xs md:tracking-[0.3em]">panier</p>
          <h3 className="mt-1.5 font-serif text-xl tracking-[-0.05em] md:mt-2 md:text-3xl">Ta commande</h3>
        </div>
        <p className="shrink-0 text-[10px] uppercase tracking-[0.12em] text-[#68645C] md:text-sm md:tracking-[0.18em]">{cartItems.length} item</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-6 text-[#55524B] md:py-10">
          <p className="font-serif text-lg tracking-[-0.04em] md:text-2xl">Ton panier est encore vide.</p>
          <p className="mt-2 text-sm leading-6 md:mt-3 md:text-base md:leading-7">Ouvre un livre ou un produit numérique pour l’ajouter ici.</p>
        </div>
      ) : (
        <div className="max-h-[260px] space-y-2 overflow-y-auto py-3 md:max-h-[330px] md:space-y-3 md:py-5">
          {cartItems.map((item) => (
            <div key={`${item.category}-${item.id}`} className="border border-[#0B0A12]/10 bg-white/45 p-3 md:p-4">
              <div className="flex min-w-0 justify-between gap-3 md:gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#68645C] md:text-xs md:tracking-[0.22em]">{item.type}</p>
                  <p className="mt-2 font-serif text-lg leading-tight tracking-[-0.04em] md:text-2xl">{item.title}</p>
                </div>
                <p className="shrink-0 text-sm md:text-base">{item.price}</p>
              </div>
              <button type="button" onClick={() => onRemove(item.id, item.category)} className="mt-3 text-[10px] uppercase tracking-[0.14em] text-[#68645C] hover:text-[#0B0A12] md:mt-4 md:text-xs md:tracking-[0.18em]">
                retirer
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-[#0B0A12]/10 pt-3 md:pt-5">
        <div className="flex justify-between font-serif text-xl tracking-[-0.05em] md:text-3xl">
          <span>Total</span>
          <span>{total.toFixed(2).replace(".", ",")} €</span>
        </div>
        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={() => onNavigate("checkout")}
          className="mt-3 w-full bg-[#0B0A12] px-3 py-3 text-[11px] uppercase tracking-[0.12em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30 md:mt-5 md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]"
        >
          Commander mon panier
        </button>
      </div>
    </aside>
  );
}

export default CartPreview;
