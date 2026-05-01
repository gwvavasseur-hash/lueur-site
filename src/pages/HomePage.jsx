import { books } from "../data/books";
import { fragments } from "../data/fragments";
import { reviews } from "../data/reviews";
import Icon from "../components/Icon";
import NewsletterBlock from "../components/NewsletterBlock";
import SaveButton from "../components/SaveButton";
import VisualBook from "../components/VisualBook";

function HomePage({ onNavigate, onOpenBook, onSaveFragment, savedFragmentIds }) {
  return (
    <div className="max-w-full overflow-x-hidden bg-[#FCFCF7]">
      <section className="relative min-h-screen overflow-hidden px-5 pt-[118px] md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-80">
          <div className="absolute left-[8%] top-[20%] h-44 w-44 rounded-full bg-[#F3F2EC] blur-3xl" />
          <div className="absolute bottom-[12%] right-[8%] h-72 w-72 rounded-full bg-[#E9E5D7] blur-3xl" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-118px)] max-w-7xl min-w-0 items-center gap-14 md:grid-cols-[1fr_0.9fr]">
          <div className="min-w-0">
            <div className="lueur-reveal w-fit max-w-full border border-white/50 bg-white/45 px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-[#68645C] shadow-[0_12px_55px_rgba(10,10,18,0.04)] backdrop-blur-xl md:px-4 md:text-xs md:tracking-[0.28em]">
              citations · livres · fragments
            </div>
            <h1 className="lueur-reveal mt-7 max-w-5xl text-[clamp(2.9rem,14vw,4.8rem)] font-black uppercase leading-[0.88] tracking-[-0.075em] text-[#0B0A12] md:text-[clamp(3.5rem,9vw,8.8rem)] md:leading-[0.84] md:tracking-[-0.09em]">
              Des phrases à garder. Des livres à ouvrir.
            </h1>
            <p className="lueur-reveal mt-7 max-w-2xl text-base leading-7 text-[#55524B] md:mt-8 md:text-xl md:leading-8">
              Lueur rassemble des citations, des livres PDF et des outils simples pour retrouver ce qui t’a touché, lire plus facilement, et garder une trace de tes pensées.
            </p>
            <div className="lueur-reveal mt-10 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onNavigate("library")}
                className="group w-full bg-[#0B0A12] px-5 py-4 text-center text-xs uppercase tracking-[0.12em] text-[#FCFCF7] transition hover:bg-[#282433] sm:w-auto md:px-7 md:text-sm md:tracking-[0.18em]"
              >
                Trouver ma prochaine lecture
                <Icon name="arrow" size={16} className="ml-3 inline transition group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate("lueur")}
                className="w-full border border-white/45 bg-white/42 px-5 py-4 text-center text-xs uppercase tracking-[0.12em] shadow-[0_12px_55px_rgba(10,10,18,0.04)] backdrop-blur-xl transition hover:bg-white/70 sm:w-auto md:px-7 md:text-sm md:tracking-[0.18em]"
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

      <section className="overflow-hidden px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl min-w-0">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">fragments</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-[1] tracking-[-0.05em] md:text-7xl md:leading-[0.98] md:tracking-[-0.06em]">
                Les phrases qui restent.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#55524B] md:text-lg md:leading-8">
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

          <div className="flex max-w-full snap-x gap-4 overflow-x-auto overscroll-x-contain pb-6 md:gap-5">
            {fragments.map((fragment, index) => (
              <button
                key={fragment.text}
                type="button"
                onClick={() => onOpenBook(fragment.bookId)}
                className="group relative min-h-[260px] w-[min(82vw,330px)] max-w-[calc(100vw-40px)] shrink-0 snap-start border border-white/45 bg-white/42 p-5 text-left shadow-[0_18px_70px_rgba(10,10,18,0.045)] backdrop-blur-xl transition duration-500 hover:bg-[#0B0A12] hover:text-[#FCFCF7] md:min-h-[300px] md:w-[430px] md:p-7"
              >
                <SaveButton saved={savedFragmentIds.includes(fragment.id)} onClick={() => onSaveFragment(fragment)} />
                <p className="pr-10 text-[10px] uppercase tracking-[0.18em] text-[#68645C] transition group-hover:text-[#FCFCF7]/55 md:pr-12 md:text-xs md:tracking-[0.28em]">fragment 0{index + 1} · {fragment.mood}</p>
                <p className="mt-9 font-serif text-3xl leading-tight tracking-[-0.05em] md:mt-12 md:text-4xl">“{fragment.text}”</p>
                <p className="mt-8 text-xs uppercase tracking-[0.16em] md:mt-10 md:text-sm md:tracking-[0.2em]">ouvrir le livre lié</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden px-5 py-16 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl min-w-0 gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start md:gap-12">
          <div className="md:sticky md:top-[120px]">
            <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">pourquoi lueur existe</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1] tracking-[-0.05em] md:text-7xl md:leading-[0.96] md:tracking-[-0.06em]">
              Lire devrait redevenir simple, beau et accessible.
            </h2>
          </div>
          <div className="space-y-5 text-base leading-7 text-[#4F4B44] md:space-y-6 md:text-xl md:leading-9">
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

      <section className="overflow-hidden bg-[#0B0A12] px-5 py-20 text-[#FCFCF7] md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl min-w-0">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.32em] text-[#FCFCF7]/55">premières lectures</p>
              <h2 className="mt-5 font-serif text-4xl leading-none tracking-[-0.05em] md:text-7xl md:tracking-[-0.06em]">Quelques portes pour commencer.</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#FCFCF7]/68 md:text-lg md:leading-8">
                Des livres accessibles, choisis pour les phrases, les idées et les lueurs qu’ils peuvent laisser.
              </p>
            </div>
            <button type="button" onClick={() => onNavigate("library")} className="w-full border border-[#FCFCF7]/20 px-5 py-4 text-xs uppercase tracking-[0.12em] transition hover:bg-[#FCFCF7] hover:text-[#0B0A12] sm:w-fit md:px-6 md:text-sm md:tracking-[0.18em]">
              Voir toute la bibliothèque
            </button>
          </div>
          <div className="flex max-w-full snap-x gap-4 overflow-x-auto overscroll-x-contain pb-6 md:gap-5">
            {books.map((book) => (
              <button
                key={book.id}
                type="button"
                onClick={() => onOpenBook(book.id)}
                className="group w-[min(82vw,330px)] max-w-[calc(100vw-40px)] shrink-0 snap-start bg-[#FCFCF7]/90 p-5 text-left text-[#0B0A12] backdrop-blur-xl transition duration-500 hover:-translate-y-2 md:w-[390px] md:p-6"
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

      <section className="overflow-hidden px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl min-w-0">
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">retours de lecteurs</p>
              <h2 className="mt-5 font-serif text-4xl leading-none tracking-[-0.05em] md:text-7xl md:tracking-[-0.06em]">Ce qu’ils ont gardé après leur passage.</h2>
            </div>
          </div>
          <div className="flex max-w-full snap-x gap-4 overflow-x-auto overscroll-x-contain pb-6 md:gap-5">
            {reviews.map((review, index) => (
              <div key={review.name} className="min-h-[280px] w-[min(82vw,330px)] max-w-[calc(100vw-40px)] shrink-0 snap-start border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:min-h-[310px] md:w-[430px] md:p-7">
                <div className="flex min-w-0 flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-6">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">lecteur 0{index + 1}</p>
                    <p className="mt-3 font-serif text-3xl tracking-[-0.05em]">{review.name}</p>
                    <p className="mt-1 text-sm leading-6 text-[#68645C]">{review.context}</p>
                  </div>
                  <div className="w-fit border border-[#0B0A12]/10 bg-[#FCFCF7]/65 px-3 py-2 text-left text-[10px] uppercase leading-5 tracking-[0.12em] text-[#68645C] md:text-right md:text-[11px] md:tracking-[0.16em]">
                    {review.result}
                  </div>
                </div>
                <p className="mt-8 text-base leading-7 text-[#3F3B35] md:mt-10 md:text-lg md:leading-8">“{review.text}”</p>
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
