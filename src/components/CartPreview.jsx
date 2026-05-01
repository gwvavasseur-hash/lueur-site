function CartPreview({ open, cartItems, total, onNavigate, onRemove }) {
  if (!open) return null;

  return (
    <aside className="fixed right-4 top-[94px] z-40 w-[min(390px,calc(100vw-32px))] border border-white/45 bg-white/42 p-5 shadow-[0_30px_100px_rgba(10,10,18,0.14)] backdrop-blur-2xl md:right-8">
      <div className="flex items-start justify-between gap-6 border-b border-[#0B0A12]/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#68645C]">panier</p>
          <h3 className="mt-2 font-serif text-3xl tracking-[-0.05em]">Ta commande</h3>
        </div>
        <p className="text-sm uppercase tracking-[0.18em] text-[#68645C]">{cartItems.length} item</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="py-10 text-[#55524B]">
          <p className="font-serif text-2xl tracking-[-0.04em]">Ton panier est encore vide.</p>
          <p className="mt-3 leading-7">Ouvre un livre ou un produit numérique pour l’ajouter ici.</p>
        </div>
      ) : (
        <div className="max-h-[330px] space-y-3 overflow-y-auto py-5">
          {cartItems.map((item) => (
            <div key={`${item.category}-${item.id}`} className="border border-[#0B0A12]/10 bg-white/45 p-4">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-[#68645C]">{item.type}</p>
                  <p className="mt-2 font-serif text-2xl leading-tight tracking-[-0.04em]">{item.title}</p>
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

      <div className="border-t border-[#0B0A12]/10 pt-5">
        <div className="flex justify-between font-serif text-3xl tracking-[-0.05em]">
          <span>Total</span>
          <span>{total.toFixed(2).replace(".", ",")} €</span>
        </div>
        <button
          type="button"
          disabled={cartItems.length === 0}
          onClick={() => onNavigate("checkout")}
          className="mt-5 w-full bg-[#0B0A12] px-5 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30"
        >
          Commander mon panier
        </button>
      </div>
    </aside>
  );
}

export default CartPreview;
