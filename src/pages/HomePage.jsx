import { books } from "../data/books";
import { fragments } from "../data/fragments";
import { reviews } from "../data/reviews";
import Icon from "../components/Icon";
import NewsletterBlock from "../components/NewsletterBlock";
import SaveButton from "../components/SaveButton";
import VisualBook from "../components/VisualBook";

function HomePage({ onNavigate, onOpenBook, onSaveFragment, savedFragmentIds }) {
  return (
    <div className="bg-[#FCFCF7]">
      <section className="relative min-h-screen overflow-hidden px-5 pt-[118px] md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute left-[8%] top-[20%] h-44 w-44 rounded-full bg-[#F3F2EC] blur-3xl" />
          <div className="absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full bg-[#E9E5D7] blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-118px)] max-w-7xl items-center gap-14 md:grid-cols-[1fr_0.9fr]">
          <div>
            <div className="lueur-reveal w-fit border border-white/50 bg-white/45 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#68645C] shadow-[0_12px_55px_rgba(10,10,18,0.04)] backdrop-blur-xl">
              citations · livres · fragments
            </div>
            <h1 className="lueur-reveal mt-7 max-w-5xl text-[clamp(3.5rem,9vw,8.8rem)] font-black uppercase leading-[0.84] tracking-[-0.09em] text-[#0B0A12]">
              Des phrases à garder. Des livres à ouvrir.
            </h1>
            <p className="lueur-reveal mt-8 max-w-2xl text-lg leading-8 text-[#55524B] md:text-xl">
              Lueur rassemble des citations, des livres PDF et des outils simples pour retrouver ce qui t’a touché, lire plus facilement, et garder une trace de tes pensées.
            </p>
            <div className="lueur-reveal mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate("library")}
                className="group bg-[#0B0A12] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] transition hover:bg-[#282433]"
              >
                Trouver ma prochaine lecture
                <Icon name="arrow" size={16} className="ml-3 inline transition group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("lueur")}
                className="border border-white/45 bg-white/42 px-7 py-4 text-sm uppercase tracking-[0.18em] shadow-[0_12px_55px_rgba(10,10,18,0.04)] backdrop-blur-xl transition hover:bg-white/70"
              >
                Recevoir une lueur
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="lueur-float relative h-[560px] w-full">
              <div className="absolute right-0 top-0 w-[78%] border border-white/50 bg-white/45 p-8 shadow-[0_35px_100px_rgba(10,10,18,0.08)] backdrop-blur-2xl">
                <p className="text-xs uppercase tracking-[0.3em] text-[#68645C]">fragment sauvegardé</p>
                <p className="mt-14 font-serif text-5xl leading-[1.02] tracking-[-0.06em]">
                  “Certains livres arrivent tard, mais ils éclairent des années entières.”
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenBook("calvino-classiques")}
                className="absolute bottom-10 left-0 w-[58%] border border-white/20 bg-[#0B0A12]/94 p-7 text-left text-[#FCFCF7] shadow-[0_30px_90px_rgba(10,10,18,0.22)] backdrop-blur-xl transition hover:-translate-y-1"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-[#FCFCF7]/55">livre associé</p>
                <p className="mt-12 font-serif text-3xl leading-tight tracking-[-0.04em]">Pourquoi lire les classiques</p>
                <p className="mt-5 text-sm uppercase tracking-[0.18em] text-[#FCFCF7]/70">ouvrir</p>
              </button>
              <div className="absolute bottom-0 right-[6%] h-[150px] w-[110px] border border-white/45 bg-white/38 backdrop-blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">fragments</p>
              <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.06em] md:text-7xl">
                Les phrases qui restent.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#55524B]">
                Certaines citations ne méritent pas de disparaître dans un scroll. Lis-les lentement, enregistre-les, ou ouvre le livre dont elles viennent.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("fragments")}
              className="w-fit border-b border-[#0B0A12] pb-1 text-sm uppercase tracking-[0.2em]"
            >
              voir tous les fragments
            </button>
          </div>

          <div className="flex snap-x gap-5 overflow-x-auto pb-6">
            {fragments.map((fragment, index) => (
              <button
                key={fragment.text}
                type="button"
                onClick={() => onOpenBook(fragment.bookId)}
                className="group relative min-h-[300px] w-[82vw] shrink-0 snap-start border border-white/45 bg-white/42 p-7 text-left shadow-[0_18px_70px_rgba(10,10,18,0.045)] backdrop-blur-xl transition duration-500 hover:bg-[#0B0A12] hover:text-[#FCFCF7] md:w-[430px]"
              >
                <SaveButton saved={savedFragmentIds.includes(fragment.id)} onClick={() => onSaveFragment(fragment)} />
                <p className="pr-12 text-xs uppercase tracking-[0.28em] text-[#68645C] transition group-hover:text-[#FCFCF7]/55">fragment 0{index + 1} · {fragment.mood}</p>
                <p className="mt-12 font-serif text-4xl leading-tight tracking-[-0.05em]">“{fragment.text}”</p>
                <p className="mt-10 text-sm uppercase tracking-[0.2em]">ouvrir le livre lié</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          <div className="md:sticky md:top-[120px]">
            <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">pourquoi lueur existe</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl leading-[0.96] tracking-[-0.06em] md:text-7xl">
              Lire devrait redevenir simple, beau et accessible.
            </h2>
          </div>
          <div className="space-y-6 text-xl leading-9 text-[#4F4B44]">
            <p>
              Les phrases qu’on aime se perdent vite. Les livres qu’on veut lire attendent trop longtemps. Et parfois, on manque simplement d’inspiration pour trouver une lecture qui nous parle vraiment.
            </p>
            <p>
              Lueur existe pour rendre tout ça plus simple : retrouver des fragments, ouvrir des livres accessibles, et garder une trace de ce qui compte. Parce que lire ne devrait pas être réservé à ceux qui savent déjà quoi chercher, ni à ceux qui peuvent toujours payer cher.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("about")}
              className="mt-4 border-b border-[#0B0A12] pb-1 text-sm uppercase tracking-[0.2em] text-[#0B0A12]"
            >
              lire le manifeste
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#0B0A12] px-5 py-24 text-[#FCFCF7] md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#FCFCF7]/55">premières lectures</p>
              <h2 className="mt-5 font-serif text-5xl tracking-[-0.06em] md:text-7xl">Quelques portes pour commencer.</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#FCFCF7]/68">
                Des livres accessibles, choisis pour les phrases, les idées et les lueurs qu’ils peuvent laisser.
              </p>
            </div>
            <button type="button" onClick={() => onNavigate("library")} className="w-fit border border-[#FCFCF7]/20 px-6 py-4 text-sm uppercase tracking-[0.18em] transition hover:bg-[#FCFCF7] hover:text-[#0B0A12]">
              Voir toute la bibliothèque
            </button>
          </div>
          <div className="flex snap-x gap-5 overflow-x-auto pb-6">
            {books.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => onOpenBook(book.id)}
                className="group w-[82vw] shrink-0 snap-start bg-[#FCFCF7]/90 p-6 text-left text-[#0B0A12] backdrop-blur-xl transition duration-500 hover:-translate-y-2 md:w-[390px]"
              >
                <VisualBook label={book.title.split(" ").slice(0, 2).join(" ")} tone={book.id === "calvino-classiques" ? "dark" : "light"} />
                <p className="mt-7 text-xs uppercase tracking-[0.26em] text-[#68645C]">{book.tag}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.04em]">{book.title}</h3>
                <p className="mt-5 min-h-[84px] text-base leading-7 text-[#4F4B44]">“{book.quote}”</p>
                <div className="mt-7 flex items-center justify-between border-t border-[#0B0A12]/10 pt-5">
                  <span>{book.price}</span>
                  <span className="text-sm uppercase tracking-[0.18em] transition group-hover:translate-x-1">ouvrir</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">retours de lecteurs</p>
              <h2 className="mt-5 font-serif text-5xl leading-none tracking-[-0.06em] md:text-7xl">Ce qu’ils ont gardé après leur passage.</h2>
            </div>
          </div>
          <div className="flex snap-x gap-5 overflow-x-auto pb-6">
            {reviews.map((review, index) => (
              <div key={review.name} className="min-h-[310px] w-[82vw] shrink-0 snap-start border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:w-[430px]">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">lecteur 0{index + 1}</p>
                    <p className="mt-3 font-serif text-3xl tracking-[-0.05em]">{review.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[#68645C]">{review.context}</p>
                  </div>
                  <div className="border border-[#0B0A12]/10 bg-[#FCFCF7]/65 px-3 py-2 text-right text-[11px] uppercase leading-5 tracking-[0.16em] text-[#68645C]">
                    {review.result}
                  </div>
                </div>
                <p className="mt-10 text-lg leading-8 text-[#3F3B35]">“{review.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterBlock />
    </div>
  );
}

export default HomePage;
