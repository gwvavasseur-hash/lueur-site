import { fragments } from "../data/fragments";
import PageShell from "../components/PageShell";
import SaveButton from "../components/SaveButton";

function FragmentsPage({ onOpenBook, onSaveFragment, savedFragmentIds }) {
  return (
    <PageShell eyebrow="lueur fragments" title="Des phrases à lire lentement. Certaines ouvrent un livre.">
      <div className="mx-auto max-w-5xl space-y-5">
        {fragments.map((fragment, index) => (
          <button key={fragment.text} type="button" onClick={() => onOpenBook(fragment.bookId)} className="group relative w-full border border-white/45 bg-white/42 p-8 text-left shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl transition hover:bg-[#0B0A12] hover:text-[#FCFCF7] md:p-12">
            <SaveButton saved={savedFragmentIds.includes(fragment.id)} onClick={() => onSaveFragment(fragment)} />
            <p className="pr-12 text-xs uppercase tracking-[0.28em] text-[#68645C] transition group-hover:text-[#FCFCF7]/55">fragment 0{index + 1} · {fragment.mood}</p>
            <p className="mt-6 font-serif text-4xl leading-tight tracking-[-0.05em] md:text-6xl">“{fragment.text}”</p>
            <p className="mt-8 text-sm uppercase tracking-[0.2em]">ouvrir le livre lié</p>
          </button>
        ))}
      </div>
    </PageShell>
  );
}

export default FragmentsPage;
