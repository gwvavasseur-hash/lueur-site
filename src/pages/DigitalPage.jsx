import { digitalProducts } from "../data/digitalProducts";
import PageShell from "../components/PageShell";

function DigitalPage({ onAddToCart }) {
  return (
    <PageShell eyebrow="lueur digital" title="Des outils pour garder, organiser et approfondir ce que tu lis.">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        {digitalProducts.map((product) => (
          <article key={product.title} className="border border-white/45 bg-white/42 p-8 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">{product.type}</p>
            <h3 className="mt-8 font-serif text-4xl leading-tight tracking-[-0.05em]">{product.title}</h3>
            <p className="mt-4 text-lg leading-8 text-[#55524B]">{product.subtitle}</p>
            <div className="mt-10 flex items-center justify-between border-t border-[#0B0A12]/10 pt-6">
              <span>{product.price}</span>
              <button
                type="button"
                onClick={() => onAddToCart({ id: product.id, category: "digital", title: product.title, price: product.price, type: product.type })}
                className="bg-[#0B0A12] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#FCFCF7]"
              >
                Ajouter
              </button>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}

export default DigitalPage;
