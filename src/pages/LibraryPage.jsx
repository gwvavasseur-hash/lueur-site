import { books } from "../data/books";
import PageShell from "../components/PageShell";
import VisualBook from "../components/VisualBook";

function LibraryPage({ onOpenBook }) {
  return (
    <PageShell eyebrow="lueur library" title="Des livres PDF choisis par émotion, pas par hasard.">
      <div className="mx-auto mb-12 flex max-w-7xl flex-wrap gap-3">
        {["Tout", "Apaiser", "Comprendre", "Se retrouver", "Aimer", "Grandir"].map((filter) => (
          <button key={filter} type="button" className="border border-white/45 bg-white/42 px-5 py-3 text-sm uppercase tracking-[0.18em] shadow-[0_12px_50px_rgba(10,10,18,0.035)] backdrop-blur-xl hover:bg-[#0B0A12] hover:text-[#FCFCF7]">
            {filter}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
        {books.map((book) => (
          <button key={book.id} type="button" onClick={() => onOpenBook(book.id)} className="group border border-white/45 bg-white/42 p-6 text-left shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(10,10,18,0.08)]">
            <VisualBook label={book.title.split(" ").slice(0, 2).join(" ")} />
            <p className="mt-7 text-xs uppercase tracking-[0.25em] text-[#68645C]">{book.mood}</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.04em]">{book.title}</h3>
            <p className="mt-4 leading-7 text-[#55524B]">{book.promise}</p>
            <div className="mt-7 flex items-center justify-between border-t border-[#0B0A12]/10 pt-5">
              <span>{book.price}</span>
              <span className="text-sm uppercase tracking-[0.18em]">Découvrir</span>
            </div>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

export default LibraryPage;
