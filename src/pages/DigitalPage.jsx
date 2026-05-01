import { digitalProducts } from "../data/digitalProducts";
import PageShell from "../components/PageShell";

function DigitalPage({ onAddToCart }) {
  return (
    <PageShell eyebrow="lueur digital" title="Des outils pour garder, organiser et approfondir ce que tu lis.">
      <div className="mx-auto grid max-w-7xl min-w-0 gap-5 md:grid-cols-2">
        {digitalProducts.map((product) => (
          <article key={product.title} className="min-w-0 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">{product.type}</p>
            <h3 className="mt-7 font-serif text-3xl leading-tight tracking-[-0.05em] md:mt-8 md:text-4xl">{product.title}</h3>
            <p className="mt-4 text-base leading-7 text-[#55524B] md:text-lg md:leading-8">{product.subtitle}</p>
            <div className="mt-8 flex items-center justify-between border-t border-[#0B0A12]/10 pt-5 md:mt-10 md:pt-6">
              <span>{product.price}</span>
              <button
                type="button"
                onClick={() => onAddToCart({ id: product.id, category: "digital", title: product.title, price: product.price, type: product.type })}
                className="bg-[#0B0A12] px-4 py-3 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] md:px-5 md:text-sm md:tracking-[0.18em]"
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
