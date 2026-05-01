import { pages } from "../data/pages";

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

export default MenuOverlay;
