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

export default AccountMenu;
