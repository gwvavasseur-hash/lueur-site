import { pages } from "../data/pages";

function MenuOverlay({ open, onNavigate }) {
  if (!open) return null;

  return (
    <div className="fixed left-4 top-[94px] z-40 w-[min(315px,calc(100vw-32px))] border border-white/45 bg-white/38 p-3 shadow-[0_30px_100px_rgba(10,10,18,0.12)] backdrop-blur-2xl md:left-8 md:w-[min(420px,calc(100vw-32px))] md:p-4">
      <div className="mb-3 border-b border-[#0B0A12]/10 pb-3 md:mb-4 md:pb-4">
        <p className="text-[10px] uppercase tracking-[0.26em] text-[#68645C] md:text-xs md:tracking-[0.3em]">menu</p>
        <p className="mt-2 max-w-xs font-serif text-xl leading-tight tracking-[-0.04em] text-[#0B0A12] md:text-2xl">
          Choisis une porte. Le reste peut attendre.
        </p>
      </div>
      <nav className="max-h-[calc(100vh-250px)] space-y-1 overflow-y-auto pr-1">
        {pages.map((page) => (
          <button
            key={page.id}
            type="button"
            onClick={() => onNavigate(page.id)}
            className="group flex w-full items-center justify-between border border-transparent px-2.5 py-2.5 text-left transition hover:border-white/45 hover:bg-white/42 md:px-3 md:py-3"
          >
            <span className="font-serif text-xl tracking-[-0.04em] text-[#0B0A12] md:text-2xl">{page.label}</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#68645C] transition group-hover:translate-x-1 md:text-xs md:tracking-[0.22em]">ouvrir</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default MenuOverlay;
