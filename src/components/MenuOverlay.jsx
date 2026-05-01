import { pages } from "../data/pages";

function MenuOverlay({ open, onNavigate }) {
  if (!open) return null;

  return (
    <div className="fixed left-3 top-[82px] z-40 w-[min(286px,calc(100vw-24px))] max-w-[calc(100vw-24px)] border border-white/45 bg-white/38 p-3 shadow-[0_24px_80px_rgba(10,10,18,0.1)] backdrop-blur-xl md:left-8 md:top-[94px] md:w-[min(420px,calc(100vw-32px))] md:max-w-none md:p-4 md:shadow-[0_30px_100px_rgba(10,10,18,0.12)] md:backdrop-blur-2xl">
      <div className="mb-2.5 border-b border-[#0B0A12]/10 pb-2.5 md:mb-4 md:pb-4">
        <p className="text-[9px] uppercase tracking-[0.22em] text-[#68645C] md:text-xs md:tracking-[0.3em]">menu</p>
        <p className="mt-2 max-w-xs font-serif text-lg leading-tight tracking-[-0.04em] text-[#0B0A12] md:text-2xl">
          Choisis une porte. Le reste peut attendre.
        </p>
      </div>
      <nav className="max-h-[calc(100vh-170px)] space-y-0.5 overflow-y-auto pr-1 md:max-h-[calc(100vh-250px)] md:space-y-1">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            onClick={() => onNavigate(page.id)}
            className="group flex w-full min-w-0 items-center justify-between gap-3 border border-transparent px-2 py-2 text-left transition hover:border-white/45 hover:bg-white/42 md:px-3 md:py-3"
          >
            <span className="min-w-0 font-serif text-lg tracking-[-0.04em] text-[#0B0A12] md:text-2xl">{page.label}</span>
            <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] text-[#68645C] transition group-hover:translate-x-1 md:text-xs md:tracking-[0.22em]">ouvrir</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default MenuOverlay;
