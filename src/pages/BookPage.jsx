import { fragments } from "../data/fragments";
import PageShell from "../components/PageShell";
import VisualBook from "../components/VisualBook";

function BookPage({ book, onNavigate, onAddToCart }) {
  if (!book) return null;

  const relatedFragments = fragments.filter((fragment) => fragment.bookId === book.id);

  return (
    <PageShell eyebrow="lueur book" title={`${book.title} — ${book.author}`} compact>
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-start">
        <div className="md:sticky md:top-[118px]">
          <VisualBook label={book.title.split(" ").slice(0, 2).join(" ")} tone={book.id === "calvino-classiques" ? "dark" : "light"} />
          <div className="mt-6 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-[#0B0A12]/10 pb-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#68645C]">prix</p>
              <p className="font-serif text-4xl tracking-[-0.06em]">{book.price}</p>
            </div>
            <button
              type="button"
              onClick={() => onAddToCart({ id: book.id, category: "book", title: book.title, price: book.price, type: "Livre PDF" })}
              className="mt-5 w-full bg-[#0B0A12] px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] transition hover:bg-[#282433]"
            >
              Ajouter au panier
            </button>
            <p className="mt-4 text-sm leading-6 text-[#68645C]">Paiement sécurisé à connecter dans la version finale. Accès immédiat après achat.</p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">{book.tag} · {book.mood}</p>
          <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-[-0.06em] md:text-7xl">{book.title}</h1>
          <p className="mt-7 font-serif text-3xl leading-tight tracking-[-0.04em]">“{book.quote}”</p>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#55524B]">{book.promise}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">description</p>
              <p className="mt-5 leading-8 text-[#4F4B44]">{book.description}</p>
            </div>
            <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">pour qui</p>
              <p className="mt-5 leading-8 text-[#4F4B44]">{book.idealFor}</p>
            </div>
          </div>

          <div className="mt-6 border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">ce que tu reçois</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {book.includes.map((item) => (
                <div key={item} className="border border-[#0B0A12]/10 bg-[#FCFCF7]/60 p-4 leading-7">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 border border-white/45 bg-[#0B0A12]/92 p-7 text-[#FCFCF7] shadow-[0_18px_70px_rgba(10,10,18,0.08)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#FCFCF7]/55">comment ça marche</p>
            <div className="mt-7 grid gap-5 md:grid-cols-4">
              {[
                ["01", "Ajoute le livre au panier"],
                ["02", "Renseigne ton email"],
                ["03", "Reçois le PDF après paiement"],
                ["04", "Retrouve-le dans ton espace membre"],
              ].map(([step, text]) => (
                <div key={step} className="border border-[#FCFCF7]/15 p-4">
                  <p className="text-xs uppercase tracking-[0.24em] text-[#FCFCF7]/45">{step}</p>
                  <p className="mt-5 font-serif text-2xl leading-tight tracking-[-0.04em]">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-[0.95fr_1.05fr]">
            <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">détails</p>
              <div className="mt-5 space-y-3 text-[#4F4B44]">
                {book.details.map((detail) => (
                  <p key={detail} className="border-b border-[#0B0A12]/10 pb-3">{detail}</p>
                ))}
              </div>
            </div>
            <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">droits et diffusion</p>
              <p className="mt-5 leading-8 text-[#4F4B44]">{book.legal}</p>
            </div>
          </div>

          <div className="mt-6 border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">fragments liés</p>
                <h2 className="mt-3 font-serif text-4xl tracking-[-0.05em]">Lire avant d’ouvrir.</h2>
              </div>
              <button type="button" onClick={() => onNavigate("fragments")} className="w-fit border-b border-[#0B0A12] pb-1 text-sm uppercase tracking-[0.18em]">
                Tous les fragments
              </button>
            </div>
            <div className="mt-6 grid gap-3">
              {(relatedFragments.length > 0 ? relatedFragments : fragments.slice(0, 2)).map((fragment) => (
                <div key={fragment.id} className="border border-[#0B0A12]/10 bg-[#FCFCF7]/60 p-5">
                  <p className="font-serif text-2xl leading-tight tracking-[-0.04em]">“{fragment.text}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default BookPage;
