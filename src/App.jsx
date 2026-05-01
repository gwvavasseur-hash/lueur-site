import { useMemo, useState } from "react";

const books = [
  {
    id: "calvino-classiques",
    title: "Pourquoi lire les classiques",
    author: "Italo Calvino",
    quote: "Un classique est un livre qui n’a jamais fini de dire ce qu’il a à dire.",
    mood: "Comprendre",
    price: "4,90 €",
    tag: "Essai · Lecture",
    promise: "Pour retrouver le goût des grands textes sans pression scolaire.",
    description:
      "Un essai clair et vivant pour comprendre pourquoi certains livres traversent le temps, pourquoi ils continuent de nous parler, et comment les aborder sans pression académique.",
    idealFor: "Pour celles et ceux qui veulent lire davantage, mais ne savent pas toujours par où commencer avec les classiques.",
    includes: ["Le livre au format PDF", "Une fiche de lecture Lueur", "Une sélection de fragments à garder", "3 questions pour prolonger la lecture"],
    details: ["PDF numérique", "Lecture estimée : 1 à 2 heures", "Accès immédiat après achat", "Disponible dans l’espace membre"],
    legal: "Texte proposé uniquement si les droits de diffusion sont vérifiés ou si l’œuvre est utilisée dans un cadre autorisé.",
  },
  {
    id: "coeur-calme",
    title: "Fragments pour les cœurs calmes",
    author: "Lueur Studio",
    quote: "Il y a des phrases qui ne réparent pas tout, mais qui tiennent la main un soir de trop.",
    mood: "Apaiser",
    price: "3,90 €",
    tag: "Fragments · Intime",
    promise: "Pour les soirs où tu as besoin d’un endroit doux où poser tes pensées.",
    description:
      "Un recueil court, doux et intime, pensé comme un endroit où revenir quand tout semble trop bruyant. Chaque fragment peut se lire seul, lentement, sans obligation de finir vite.",
    idealFor: "Pour les moments de fatigue, de cœur lourd, ou pour retrouver une présence calme en quelques pages.",
    includes: ["Le recueil au format PDF", "Une page de notes personnelle", "10 fragments à sauvegarder", "Une action simple à faire après lecture"],
    details: ["PDF numérique", "Lecture estimée : 30 à 45 minutes", "Accès immédiat après achat", "Disponible dans l’espace membre"],
    legal: "Contenu original Lueur Studio. Tous droits réservés.",
  },
  {
    id: "revenir-a-soi",
    title: "Lire pour revenir à soi",
    author: "Lueur Studio",
    quote: "Ce livre n’est pas une réponse. C’est une chambre douce où reprendre ton souffle.",
    mood: "Se retrouver",
    price: "5,90 €",
    tag: "Guide · Introspection",
    promise: "Pour transformer une lecture en réflexion personnelle, puis en action simple.",
    description:
      "Un guide pour ne pas seulement consommer des livres, mais les laisser travailler en toi. Il mêle lectures, questions, fragments et petites actions concrètes.",
    idealFor: "Pour celles et ceux qui lisent, surlignent, sauvegardent, mais veulent mieux garder ce que leurs lectures réveillent.",
    includes: ["Le guide au format PDF", "Un mini-carnet de réflexion", "Des questions d’introspection", "Des actions simples à enregistrer"],
    details: ["PDF numérique", "Lecture estimée : 1 heure", "Accès immédiat après achat", "Disponible dans l’espace membre"],
    legal: "Contenu original Lueur Studio. Tous droits réservés.",
  },
];

const fragments = [
  {
    id: "frag-discipline",
    text: "Il faut d’abord gagner dans son esprit avant de gagner dans la vie.",
    bookId: "revenir-a-soi",
    mood: "Discipline douce",
  },
  {
    id: "frag-calme",
    text: "On ne lit pas toujours pour apprendre. Parfois, on lit pour ne pas disparaître dans le bruit.",
    bookId: "coeur-calme",
    mood: "Calme",
  },
  {
    id: "frag-classiques",
    text: "Certains livres arrivent tard, mais ils éclairent des années entières.",
    bookId: "calvino-classiques",
    mood: "Comprendre",
  },
];

const digitalProducts = [
  {
    id: "carnet-lecture",
    title: "Carnet de lecture numérique",
    subtitle: "Faire parler ce que tu lis.",
    price: "7 €",
    type: "Template Notion",
  },
  {
    id: "bibliotheque-citations",
    title: "Bibliothèque de citations",
    subtitle: "Ne plus perdre tes phrases coup de cœur.",
    price: "5 €",
    type: "Base Notion",
  },
  {
    id: "pack-visuel",
    title: "Pack visuel lecteur",
    subtitle: "Créer de beaux carrousels autour de tes lectures.",
    price: "9 €",
    type: "Templates Canva",
  },
  {
    id: "ebook-gratuit",
    title: "E-book gratuit",
    subtitle: "Apprendre à lire mieux, sans lire plus.",
    price: "0 €",
    type: "PDF offert",
  },
];

const reviews = [
  {
    name: "Clara",
    context: "20 ans · lectrice occasionnelle",
    text: "Je ne savais jamais quoi lire après avoir sauvegardé une citation. Là, j’ai trouvé un livre qui correspondait vraiment à ce que je cherchais.",
    result: "A acheté un PDF à 4,90 €",
  },
  {
    name: "Manon",
    context: "22 ans · étudiante",
    text: "J’aime pouvoir enregistrer une phrase au lieu de juste la liker et l’oublier. Ça donne l’impression que mes lectures restent quelque part.",
    result: "3 fragments enregistrés",
  },
  {
    name: "Noah",
    context: "18 ans · commence à lire davantage",
    text: "Le site est calme, mais il sert vraiment à quelque chose. Je suis venu pour une citation, puis j’ai découvert un livre que je n’aurais jamais cherché seul.",
    result: "1 livre ouvert depuis un fragment",
  },
  {
    name: "Lina",
    context: "24 ans · carnet de lecture",
    text: "Recevoir une question après une lecture m’aide à ne pas passer trop vite à autre chose. J’ai l’impression de garder une trace plus personnelle.",
    result: "1 réponse sauvegardée",
  },
];

const pages = [
  { id: "home", label: "Accueil", mark: "" },
  { id: "lueur", label: "Recevoir une lueur", mark: "lueur" },
  { id: "library", label: "Bibliothèque", mark: "library" },
  { id: "fragments", label: "Fragments", mark: "fragments" },
  { id: "digital", label: "Digital", mark: "digital" },
  { id: "member", label: "Espace membre", mark: "member" },
  { id: "about", label: "À propos", mark: "about" },
];

function Icon({ name, size = 20, className = "" }) {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    menu: (
      <>
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21a7 7 0 0 1 14 0" />
      </>
    ),
    bag: <rect x="7" y="7" width="10" height="12" rx="1.8" />,
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    save: <path d="M6 4h12v17l-6-4-6 4V4Z" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
  };

  return <svg {...commonProps}>{paths[name] || null}</svg>;
}

function Logo({ mark = "" }) {
  return (
    <div className="select-none whitespace-nowrap leading-none">
      <span className="font-black tracking-[-0.08em]">lueur</span>
      {mark ? <span className="font-serif italic tracking-[-0.06em]">{mark}.</span> : null}
    </div>
  );
}

function VisualBook({ tone = "light", label = "lueur" }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] border border-[#0B0A12]/10 bg-white/62 shadow-[0_30px_90px_rgba(10,10,18,0.08)] backdrop-blur-xl">
      <div className="absolute inset-4 border border-[#0B0A12]/10 bg-[#F8F8F4]/75" />
      <div className={`absolute left-8 right-8 top-10 h-28 rounded-full ${tone === "dark" ? "bg-[#0B0A12]" : "bg-[#ECE9DF]"}`} />
      <div className="absolute bottom-8 left-8 right-8">
        <p className="font-serif text-3xl leading-none">{label}</p>
        <p className="mt-3 h-px w-full bg-[#0B0A12]/15" />
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#5E5A52]">pdf book</p>
      </div>
    </div>
  );
}

function parsePrice(price) {
  return Number(String(price).replace("€", "").replace(",", ".").trim()) || 0;
}

function Header({ currentPage, onNavigate, menuOpen, setMenuOpen, cartOpen, setCartOpen, cartCount, accountOpen, setAccountOpen }) {
  const active = pages.find((page) => page.id === currentPage) || {
    mark: currentPage === "book" ? "book" : currentPage === "checkout" ? "checkout" : "",
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/35 bg-white/45 shadow-[0_12px_55px_rgba(10,10,18,0.045)] backdrop-blur-2xl">
      <div className="grid h-[74px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setAccountOpen(false);
              setCartOpen(false);
            }}
            className="p-2 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12]"
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
          <button
            type="button"
            onClick={() => {
              setAccountOpen(!accountOpen);
              setMenuOpen(false);
              setCartOpen(false);
            }}
            aria-label="Ouvrir le menu du compte"
            className="p-2 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12]"
          >
            <Icon name="user" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Retour à l’accueil"
          className="text-4xl text-[#0B0A12] md:text-5xl"
        >
          <Logo mark={active.mark} />
        </button>

        <div className="flex justify-end">
          <button
            type="button"
            aria-label="Ouvrir le panier"
            onClick={() => {
              setCartOpen(!cartOpen);
              setMenuOpen(false);
              setAccountOpen(false);
            }}
            className="relative p-2 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12]"
          >
            <Icon name="bag" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#0B0A12] px-1 text-[10px] text-[#FCFCF7]">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}

function MenuOverlay({ open, onNavigate }) {
  if (!open) return null;

  return (
    <div className="fixed left-4 top-[86px] z-40 w-[min(420px,calc(100vw-32px))] border border-white/45 bg-white/38 p-4 shadow-[0_30px_100px_rgba(10,10,18,0.12)] backdrop-blur-2xl md:left-8">
      <div className="mb-4 border-b border-[#0B0A12]/10 pb-4">
        <p className="text-xs uppercase tracking-[0.3em] text-[#68645C]">menu</p>
        <p className="mt-2 max-w-xs font-serif text-2xl leading-tight tracking-[-0.04em] text-[#0B0A12]">
          Choisis une porte. Le reste peut attendre.
        </p>
      </div>
      <nav className="max-h-[calc(100vh-250px)] space-y-1 overflow-y-auto pr-1">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            onClick={() => onNavigate(page.id)}
            className="group flex w-full items-center justify-between border border-transparent px-3 py-3 text-left transition hover:border-white/45 hover:bg-white/42"
          >
            <span className="font-serif text-2xl tracking-[-0.04em] text-[#0B0A12]">{page.label}</span>
            <span className="text-xs uppercase tracking-[0.22em] text-[#68645C] transition group-hover:translate-x-1">ouvrir</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

function AccountMenu({ open, onNavigate }) {
  if (!open) return null;

  return (
    <div className="fixed left-[64px] top-[86px] z-40 w-[min(340px,calc(100vw-80px))] border border-white/45 bg-white/42 p-5 shadow-[0_30px_100px_rgba(10,10,18,0.12)] backdrop-blur-2xl md:left-[88px]">
      <p className="text-xs uppercase tracking-[0.3em] text-[#68645C]">compte</p>
      <h3 className="mt-3 font-serif text-3xl tracking-[-0.05em] text-[#0B0A12]">Garder tes traces.</h3>
      <div className="mt-6 grid gap-2">
        <button type="button" className="bg-[#0B0A12] px-5 py-4 text-left text-sm uppercase tracking-[0.18em] text-[#FCFCF7]">
          Se connecter
        </button>
        <button type="button" className="border border-[#0B0A12]/10 bg-white/45 px-5 py-4 text-left text-sm uppercase tracking-[0.18em] text-[#0B0A12]">
          Créer un compte
        </button>
        <button type="button" onClick={() => onNavigate("member")} className="px-5 py-4 text-left text-sm uppercase tracking-[0.18em] text-[#0B0A12]/70 hover:bg-white/40">
          Voir mon espace invité
        </button>
      </div>
    </div>
  );
}

function CartPreview({ open, cartItems, total, onNavigate, onRemove }) {
  if (!open) return null;

  return (
    <aside className="fixed right-4 top-[86px] z-40 w-[min(390px,calc(100vw-32px))] border border-white/45 bg-white/42 p-5 shadow-[0_30px_100px_rgba(10,10,18,0.14)] backdrop-blur-2xl md:right-8">
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

function SaveButton({ saved, onClick }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label="Enregistrer ce fragment"
      className="absolute right-5 top-5 z-10 bg-white/50 p-2 text-[#0B0A12] shadow-[0_12px_40px_rgba(10,10,18,0.08)] backdrop-blur-xl transition hover:bg-white/80"
    >
      <Icon name={saved ? "check" : "save"} size={18} />
    </button>
  );
}

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

      <section className="px-5 py-24 md:px-10 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 border border-white/45 bg-white/42 p-8 shadow-[0_25px_90px_rgba(10,10,18,0.05)] backdrop-blur-2xl md:grid-cols-[1fr_1fr] md:p-14">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">expérience gratuite</p>
            <h2 className="mt-5 font-serif text-5xl leading-none tracking-[-0.06em] md:text-7xl">Écris un livre. Reçois une lueur.</h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="text-lg leading-8 text-[#55524B]">
              Une citation, une pensée, une question et une petite action à garder.
            </p>
            <button
              type="button"
              onClick={() => onNavigate("lueur")}
              className="mt-8 w-fit bg-[#0B0A12] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] transition hover:bg-[#282433]"
            >
              Recevoir ma lueur
            </button>
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

function LueurGeneratorPage({ onSaveReflection, onCommitAction }) {
  const [bookName, setBookName] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerSaved, setAnswerSaved] = useState(false);
  const [actionCommitted, setActionCommitted] = useState(false);
  const generated = bookName.trim().length > 0;
  const displayedBook = bookName.trim() || "ce livre";
  const question = `Qu’est-ce que ${displayedBook} t’oblige à regarder plus honnêtement ?`;
  const action = "Ce soir, note une phrase et écris en dessous une décision minuscule.";

  function saveAnswer() {
    if (!answer.trim()) return;
    onSaveReflection({
      id: `reflection-${Date.now()}`,
      book: displayedBook,
      question,
      answer,
    });
    setAnswerSaved(true);
  }

  function commitAction() {
    onCommitAction({
      id: `action-${Date.now()}`,
      book: displayedBook,
      text: action,
      status: "À retrouver ce soir",
    });
    setActionCommitted(true);
  }

  return (
    <PageShell eyebrow="expérience gratuite" title="Entre ton livre. Découvre ta lueur.">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-lg leading-8 text-[#55524B]">
            Écris le nom d’un livre. Lueur te donne une phrase, une pensée, une question et une action simple à garder.
          </p>
          <div className="mt-8 flex border border-white/45 bg-white/42 p-2 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <input
              value={bookName}
              onChange={(event) => {
                setBookName(event.target.value);
                setAnswerSaved(false);
                setActionCommitted(false);
              }}
              placeholder="Ex : L’Alchimiste, Calvino, Camus..."
              className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none"
            />
            <button type="button" className="bg-[#0B0A12] px-6 text-sm uppercase tracking-[0.18em] text-[#FCFCF7]">
              Générer
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Citation</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">
              {generated ? "“Ce que tu cherches commence souvent par une phrase que tu n’avais pas prévu de garder.”" : "Écris un livre pour faire apparaître une citation."}
            </p>
          </div>
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Pensée</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">
              {generated ? `Dans ${displayedBook}, cherche moins une morale qu’un miroir. Ce que tu remarques parle souvent de toi.` : "Une pensée apparaîtra ici."}
            </p>
          </div>
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Question</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">{generated ? question : "Une question apparaîtra ici."}</p>
            {generated ? (
              <div className="mt-6">
                <textarea
                  value={answer}
                  onChange={(event) => {
                    setAnswer(event.target.value);
                    setAnswerSaved(false);
                  }}
                  placeholder="Écris ta réponse ici..."
                  className="min-h-[140px] w-full border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 leading-7 outline-none backdrop-blur-xl"
                />
                <button
                  type="button"
                  onClick={saveAnswer}
                  disabled={!answer.trim()}
                  className="mt-3 bg-[#0B0A12] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30"
                >
                  {answerSaved ? "Réponse enregistrée" : "Enregistrer dans mon espace"}
                </button>
              </div>
            ) : null}
          </div>
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Action</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">{generated ? action : "Une action apparaîtra ici."}</p>
            {generated ? (
              <button
                type="button"
                onClick={commitAction}
                className="mt-6 bg-[#0B0A12] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#FCFCF7]"
              >
                {actionCommitted ? "C’est enregistré, reviens ce soir." : "Je m’engage"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

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

function MemberPage({ savedFragments, savedReflections, savedActions, onNavigate }) {
  return (
    <PageShell eyebrow="lueur member" title="Ton espace pour garder ce qui mérite de rester.">
      <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1.05fr_1.05fr_0.9fr]">
        <MemberModule title="Fragments enregistrés" label="module 01" empty="Aucun fragment enregistré pour l’instant.">
          {savedFragments.map((fragment) => (
            <div key={fragment.id} className="border border-[#0B0A12]/10 bg-white/45 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#68645C]">{fragment.mood}</p>
              <p className="mt-3 font-serif text-2xl leading-tight tracking-[-0.04em]">“{fragment.text}”</p>
            </div>
          ))}
        </MemberModule>

        <MemberModule title="Réponses personnelles" label="module 02" empty="Aucune réponse enregistrée pour l’instant.">
          {savedReflections.map((reflection) => (
            <div key={reflection.id} className="border border-[#0B0A12]/10 bg-white/45 p-4">
              <p className="text-xs uppercase tracking-[0.24em] text-[#68645C]">{reflection.book}</p>
              <p className="mt-3 leading-7 text-[#55524B]">{reflection.question}</p>
              <p className="mt-3 font-serif text-2xl leading-tight tracking-[-0.04em]">{reflection.answer}</p>
            </div>
          ))}
        </MemberModule>

        <div className="space-y-5">
          <MemberModule title="Actions engagées" label="module 03" empty="Aucune action enregistrée pour l’instant.">
            {savedActions.map((action) => (
              <div key={action.id} className="border border-[#0B0A12]/10 bg-white/45 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#68645C]">{action.status}</p>
                <p className="mt-3 font-serif text-2xl leading-tight tracking-[-0.04em]">{action.text}</p>
              </div>
            ))}
          </MemberModule>

          <div className="border border-white/45 bg-[#0B0A12]/92 p-6 text-[#FCFCF7] shadow-[0_18px_70px_rgba(10,10,18,0.09)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#FCFCF7]/55">compte invité</p>
            <h3 className="mt-5 font-serif text-3xl leading-tight tracking-[-0.05em]">Crée un compte pour retrouver tes traces plus tard.</h3>
            <div className="mt-8 grid gap-2">
              <button type="button" className="bg-[#FCFCF7] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#0B0A12]">Créer un compte</button>
              <button type="button" onClick={() => onNavigate("lueur")} className="border border-[#FCFCF7]/20 px-5 py-3 text-sm uppercase tracking-[0.18em]">Recevoir une lueur</button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function MemberModule({ label, title, empty, children }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <section className="min-h-[430px] border border-white/45 bg-white/42 p-6 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">{label}</p>
      <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.05em]">{title}</h2>
      <div className="mt-8 space-y-3">
        {hasItems ? children : <p className="leading-7 text-[#55524B]">{empty}</p>}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell eyebrow="manifeste" title="Lueur existe pour celles et ceux qui veulent retrouver le goût de lire.">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div className="border border-white/45 bg-white/42 p-8 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">notre idée</p>
          <h2 className="mt-6 font-serif text-5xl leading-[0.96] tracking-[-0.06em]">Un endroit calme pour les phrases qui restent.</h2>
          <p className="mt-8 text-lg leading-8 text-[#4F4B44]">
            Lueur rassemble des citations, des livres PDF et des outils numériques pour retrouver ce qui t’a touché, découvrir des lectures accessibles, et garder une trace de tes pensées.
          </p>
        </div>

        <div className="space-y-5 text-lg leading-8 text-[#4F4B44]">
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">pourquoi</p>
            <p className="mt-5">
              Beaucoup veulent lire, mais ne savent pas toujours quoi ouvrir. Beaucoup sauvegardent des citations, puis les oublient. Beaucoup pensent que lire demande du temps, de l’argent, ou une discipline parfaite.
            </p>
            <p className="mt-5">
              Lueur propose une autre porte : commencer par une phrase, trouver un livre qui parle vraiment, puis garder quelque chose de cette lecture.
            </p>
          </div>

          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">ce que tu trouveras ici</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Des livres PDF accessibles", "Des fragments à enregistrer", "Des outils pour mieux lire", "Un espace pour garder tes traces"].map((item) => (
                <div key={item} className="border border-[#0B0A12]/10 bg-[#FCFCF7]/55 p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">légalité et droits</p>
            <p className="mt-5">
              Les livres et contenus proposés sur Lueur doivent être soit des créations originales, soit des textes utilisés avec autorisation, soit des œuvres dont la diffusion est légalement possible. Les livres récents protégés par le droit d’auteur ne seront pas vendus en PDF sans droits ou autorisation.
            </p>
            <p className="mt-5">
              Avant la mise en ligne, chaque produit devra avoir une fiche claire : origine du contenu, droits vérifiés, conditions d’achat, livraison numérique, mentions légales, confidentialité et CGV.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

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

function CheckoutPage({ cartItems, total, onNavigate, onRemove }) {
  return (
    <PageShell eyebrow="commande" title="Finaliser ton panier.">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_0.8fr]">
        <section className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">informations</p>
          <div className="mt-8 grid gap-4">
            <input className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none" placeholder="Prénom" />
            <input className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none" placeholder="Adresse email" />
            <input className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none" placeholder="Code promo" />
          </div>
          <div className="mt-8 border border-[#0B0A12]/10 bg-[#FCFCF7]/60 p-5 text-sm leading-7 text-[#55524B]">
            Dans la version finale, ce bouton sera relié à Stripe ou à une solution équivalente. La livraison des PDF et produits numériques se fera par email et dans l’espace membre.
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            className="mt-8 w-full bg-[#0B0A12] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30"
          >
            Commander · {total.toFixed(2).replace(".", ",")} €
          </button>
        </section>

        <aside className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">récapitulatif</p>
          {cartItems.length === 0 ? (
            <div className="mt-8">
              <p className="font-serif text-3xl tracking-[-0.05em]">Ton panier est vide.</p>
              <button type="button" onClick={() => onNavigate("library")} className="mt-6 border-b border-[#0B0A12] pb-1 text-sm uppercase tracking-[0.18em]">
                Retour à la bibliothèque
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.category}-${item.id}`} className="border-b border-[#0B0A12]/10 pb-4">
                  <div className="flex justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.22em] text-[#68645C]">{item.type}</p>
                      <p className="mt-2 font-serif text-2xl leading-tight tracking-[-0.04em]">{item.title}</p>
                    </div>
                    <p>{item.price}</p>
                  </div>
                  <button type="button" onClick={() => onRemove(item.id, item.category)} className="mt-3 text-xs uppercase tracking-[0.18em] text-[#68645C] hover:text-[#0B0A12]">
                    retirer
                  </button>
                </div>
              ))}
              <div className="flex justify-between pt-5 font-serif text-4xl tracking-[-0.06em]">
                <span>Total</span>
                <span>{total.toFixed(2).replace(".", ",")} €</span>
              </div>
            </div>
          )}
        </aside>
      </div>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, children, compact = false }) {
  return (
    <section className={`min-h-screen bg-[#FCFCF7] px-5 pb-24 pt-32 md:px-10 ${compact ? "md:pt-36" : "md:pt-44"}`}>
      <div className="mx-auto mb-14 max-w-7xl">
        <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.98] tracking-[-0.06em] md:text-7xl">{title}</h1>
      </div>
      {children}
    </section>
  );
}

function NewsletterBlock() {
  return (
    <section className="px-5 pb-24 md:px-10">
      <div className="mx-auto max-w-7xl border border-white/45 bg-white/42 p-8 shadow-[0_25px_90px_rgba(10,10,18,0.05)] backdrop-blur-2xl md:p-14">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">newsletter</p>
            <h2 className="mt-5 font-serif text-5xl leading-none tracking-[-0.06em] md:text-7xl">Recevoir une lueur par semaine.</h2>
          </div>
          <div>
            <p className="mb-6 text-lg leading-8 text-[#55524B]">Une citation, un livre à découvrir, une question à garder. Une fois par semaine, pas plus.</p>
            <div className="flex border border-white/45 bg-[#FCFCF7]/60 p-2 backdrop-blur-xl">
              <input className="min-w-0 flex-1 bg-transparent px-4 outline-none" placeholder="ton@email.fr" />
              <button type="button" className="bg-[#0B0A12] px-6 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7]">M’envoyer une lueur</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-[#0B0A12]/10 bg-[#FCFCF7] px-5 py-12 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_1.4fr]">
        <div>
          <div className="text-5xl text-[#0B0A12]"><Logo /></div>
          <p className="mt-5 max-w-sm leading-7 text-[#55524B]">Citations, livres et fragments de pensée pour mieux garder ce qui te touche.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Explorer</p>
            <div className="mt-5 space-y-3 text-sm text-[#4F4B44]">
              <button type="button" onClick={() => onNavigate("library")} className="block hover:text-[#0B0A12]">Bibliothèque</button>
              <button type="button" onClick={() => onNavigate("fragments")} className="block hover:text-[#0B0A12]">Fragments</button>
              <button type="button" onClick={() => onNavigate("digital")} className="block hover:text-[#0B0A12]">Digital</button>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Lueur</p>
            <div className="mt-5 space-y-3 text-sm text-[#4F4B44]">
              <button type="button" onClick={() => onNavigate("lueur")} className="block hover:text-[#0B0A12]">Recevoir une lueur</button>
              <button type="button" onClick={() => onNavigate("member")} className="block hover:text-[#0B0A12]">Espace membre</button>
              <button type="button" onClick={() => onNavigate("about")} className="block hover:text-[#0B0A12]">À propos</button>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Informations</p>
            <div className="mt-5 space-y-3 text-sm text-[#4F4B44]">
              <a href="mailto:contact@lueur.fr" className="block hover:text-[#0B0A12]">Contact</a>
              <button type="button" className="block hover:text-[#0B0A12]">Mentions légales</button>
              <button type="button" className="block hover:text-[#0B0A12]">Confidentialité</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl justify-between border-t border-[#0B0A12]/10 pt-6 text-xs uppercase tracking-[0.2em] text-[#68645C]">
        <span>© Lueur</span>
        <span>Tous droits réservés</span>
      </div>
    </footer>
  );
}

export function validateBooks(items = books) {
  return Array.isArray(items) && items.length > 0 && items.every((item) => Boolean(item.id && item.title && item.quote && item.price));
}

export const componentTests = [
  { name: "books data is valid", passed: validateBooks(books) },
  { name: "fragments link to existing books", passed: fragments.every((fragment) => books.some((book) => book.id === fragment.bookId)) },
  { name: "main navigation exposes about page", passed: pages.some((page) => page.id === "about") },
  { name: "digital products include a free lead magnet", passed: digitalProducts.some((product) => product.price === "0 €") },
  { name: "every fragment has a save id", passed: fragments.every((fragment) => Boolean(fragment.id)) },
  { name: "reviews use structured testimonial data", passed: reviews.every((review) => Boolean(review.name && review.context && review.text && review.result)) },
  { name: "books include commerce page details", passed: books.every((book) => Boolean(book.description && book.idealFor && book.includes?.length && book.details?.length && book.legal)) },
];

export default function LueurMockup() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBookId, setSelectedBookId] = useState(books[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [savedFragments, setSavedFragments] = useState([]);
  const [savedReflections, setSavedReflections] = useState([]);
  const [savedActions, setSavedActions] = useState([]);

  const selectedBook = useMemo(() => books.find((book) => book.id === selectedBookId) || books[0], [selectedBookId]);
  const savedFragmentIds = useMemo(() => savedFragments.map((fragment) => fragment.id), [savedFragments]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + parsePrice(item.price), 0), [cartItems]);

  function navigate(pageId) {
    setCurrentPage(pageId);
    setMenuOpen(false);
    setAccountOpen(false);
    setCartOpen(false);
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }

  function openBook(bookId) {
    setSelectedBookId(bookId);
    navigate("book");
  }

  function addToCart(item) {
    setCartItems((previousItems) => {
      if (previousItems.some((previousItem) => previousItem.id === item.id && previousItem.category === item.category)) {
        return previousItems;
      }
      return [...previousItems, item];
    });
    setCartOpen(true);
    setMenuOpen(false);
    setAccountOpen(false);
  }

  function removeFromCart(id, category) {
    setCartItems((previousItems) => previousItems.filter((item) => !(item.id === id && item.category === category)));
  }

  function saveFragment(fragment) {
    setSavedFragments((previousFragments) => {
      if (previousFragments.some((previousFragment) => previousFragment.id === fragment.id)) {
        return previousFragments;
      }
      return [...previousFragments, fragment];
    });
  }

  function saveReflection(reflection) {
    setSavedReflections((previousReflections) => [reflection, ...previousReflections]);
  }

  function commitAction(action) {
    setSavedActions((previousActions) => [action, ...previousActions]);
  }

  return (
    <main className="min-h-screen bg-[#FCFCF7] text-[#0B0A12] selection:bg-[#E7DFC9] selection:text-[#0B0A12]">
      <style>{`
        @keyframes lueurReveal {
          from { opacity: 0; transform: translateY(22px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes lueurFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .lueur-reveal { opacity: 0; animation: lueurReveal 1.1s ease forwards; }
        .lueur-reveal:nth-child(2) { animation-delay: .12s; }
        .lueur-reveal:nth-child(3) { animation-delay: .24s; }
        .lueur-reveal:nth-child(4) { animation-delay: .36s; }
        .lueur-float { animation: lueurFloat 7s ease-in-out infinite; }
      `}</style>

      <Header
        currentPage={currentPage}
        onNavigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartCount={cartItems.length}
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
      />
      <MenuOverlay open={menuOpen} onNavigate={navigate} />
      <AccountMenu open={accountOpen} onNavigate={navigate} />
      <CartPreview open={cartOpen} cartItems={cartItems} total={cartTotal} onNavigate={navigate} onRemove={removeFromCart} />

      {currentPage === "home" ? <HomePage onNavigate={navigate} onOpenBook={openBook} onSaveFragment={saveFragment} savedFragmentIds={savedFragmentIds} /> : null}
      {currentPage === "lueur" ? <LueurGeneratorPage onSaveReflection={saveReflection} onCommitAction={commitAction} /> : null}
      {currentPage === "library" ? <LibraryPage onOpenBook={openBook} /> : null}
      {currentPage === "fragments" ? <FragmentsPage onOpenBook={openBook} onSaveFragment={saveFragment} savedFragmentIds={savedFragmentIds} /> : null}
      {currentPage === "digital" ? <DigitalPage onAddToCart={addToCart} /> : null}
      {currentPage === "member" ? <MemberPage savedFragments={savedFragments} savedReflections={savedReflections} savedActions={savedActions} onNavigate={navigate} /> : null}
      {currentPage === "about" ? <AboutPage /> : null}
      {currentPage === "book" ? <BookPage book={selectedBook} onNavigate={navigate} onAddToCart={addToCart} /> : null}
      {currentPage === "checkout" ? <CheckoutPage cartItems={cartItems} total={cartTotal} onNavigate={navigate} onRemove={removeFromCart} /> : null}

      <Footer onNavigate={navigate} />
    </main>
  );
}
