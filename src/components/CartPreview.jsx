function CartPreview({ open, cartItems, total, onNavigate, onRemove }) {
  if (!open) return null;

  return (
    <aside className="fixed right-4 top-[94px] z-40 w-[min(292px,calc(100vw-32px))] border border-white/45 bg-white/42 p-4 shadow-[0_30px_100px_rgba(10,10,18,0.14)] backdrop-blur-2xl md:right-8 md:w-[min(390px,calc(100vw-32px))] md:p-5">
      <div className="flex items-start justify-between gap-4 border-b border-[#0B0A12]/10 pb-3 md:gap-6 md:pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.26em] text-[#68645C] md:text-xs md:tracking-[0.3em]">panier</p>
          <h3 className="mt-2 font-serif text-2xl tracking-[-0.05em] md:text-3xl">Ta commande</h3>
        </div>
        <p className="text-xs uppercase tracking-[0.16em] text-[#68645C] md:text-sm md:tracking-[0.18em]">{cartItems.length} item</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-7 text-[#55524B] md:py-10">
          <p className="font-serif text-xl tracking-[-0.04em] md:text-2xl">Ton panier est encore vide.</p>
          <p className="mt-3 text-sm leading-6 md:text-base md:leading-7">Ouvre un livre ou un produit numérique pour l’ajouter ici.</p>
        </div>
      ) : (
        <div className="max-h-[280px] space-y-3 overflow-y-auto py-4 md:max-h-[330px] md:py-5">
          {cartItems.map((item) => (
            <div key={`${item.category}-${item.id}`} className="border border-[#0B0A12]/10 bg-white/45 p-3 md:p-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#68645C]">{item.type}</p>
                  <p className="mt-2 font-serif text-xl leading-tight tracking-[-0.04em] md:text-2xl">{item.title}</p>
                </div>
                <p>{item.price}</p>
              </div>
              <button type="button" onClick={() => onRemove(item.id, item.category)} className="mt-4 text-xs uppercase tracking-[0.18em] text-[#68645C] hover:text-[#0B0A12]">
                retirer
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-[#0B0A12]/10 pt-4 md:pt-5">
        <div className="flex justify-between font-serif text-2xl tracking-[-0.05em] md:text-3xl">
          <span>Total</span>
          <span>{total.toFixed(2).replace(".", ",")} €</span>
        </div>
        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={() => onNavigate("checkout")}
          className="mt-4 w-full bg-[#0B0A12] px-4 py-3 text-xs uppercase tracking-[0.16em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30 md:mt-5 md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]"
        >
          Commander mon panier
        </button>
      </div>
    </aside>
  );
}

export default CartPreview;
