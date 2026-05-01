function AccountMenu({ open, onNavigate }) {
  if (!open) return null;

  return (
    <div className="fixed right-[66px] top-[94px] z-40 w-[min(255px,calc(100vw-84px))] border border-white/45 bg-white/42 p-4 shadow-[0_30px_100px_rgba(10,10,18,0.12)] backdrop-blur-2xl md:right-[96px] md:w-[min(340px,calc(100vw-92px))] md:p-5">
      <p className="text-[10px] uppercase tracking-[0.26em] text-[#68645C] md:text-xs md:tracking-[0.3em]">compte</p>
      <h3 className="mt-2 font-serif text-2xl tracking-[-0.05em] text-[#0B0A12] md:mt-3 md:text-3xl">Garder tes traces.</h3>
      <div className="mt-4 grid gap-2 md:mt-6">
        <button type="button" className="bg-[#0B0A12] px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-[#FCFCF7] md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
          Se connecter
        </button>
        <button type="button" className="border border-[#0B0A12]/10 bg-white/45 px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-[#0B0A12] md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
          Créer un compte
        </button>
        <button type="button" onClick={() => onNavigate("member")} className="px-4 py-3 text-left text-xs uppercase tracking-[0.16em] text-[#0B0A12]/70 hover:bg-white/40 md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
          Voir mon espace invité
        </button>
      </div>
    </div>
  );
}

export default AccountMenu;
