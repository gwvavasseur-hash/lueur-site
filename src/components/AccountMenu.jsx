function AccountMenu({ open, onNavigate, user, onSignOut }) {
  if (!open) return null;

  return (
    <div className="fixed right-[58px] top-[82px] z-40 w-[min(230px,calc(100vw-70px))] max-w-[calc(100vw-70px)] border border-white/45 bg-white/42 p-3 shadow-[0_24px_80px_rgba(10,10,18,0.1)] backdrop-blur-xl md:right-[96px] md:top-[94px] md:w-[min(340px,calc(100vw-92px))] md:max-w-none md:p-5 md:shadow-[0_30px_100px_rgba(10,10,18,0.12)] md:backdrop-blur-2xl">
      <p className="text-[9px] uppercase tracking-[0.22em] text-[#68645C] md:text-xs md:tracking-[0.3em]">compte</p>
      <h3 className="mt-2 font-serif text-xl tracking-[-0.05em] text-[#0B0A12] md:mt-3 md:text-3xl">Garder tes traces.</h3>
      {user ? <p className="mt-2 text-xs leading-5 text-[#68645C]">{user.email}</p> : null}
      <div className="mt-3 grid gap-1.5 md:mt-6 md:gap-2">
        {user ? (
          <button type="button" onClick={() => onNavigate("member")} className="bg-[#0B0A12] px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.12em] text-[#FCFCF7] md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
            Voir mon espace
          </button>
        ) : (
          <>
            <button type="button" onClick={() => onNavigate("signin")} className="bg-[#0B0A12] px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.12em] text-[#FCFCF7] md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
              Se connecter
            </button>
            <button type="button" onClick={() => onNavigate("signup")} className="border border-[#0B0A12]/10 bg-white/45 px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.12em] text-[#0B0A12] md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
              Créer un compte
            </button>
          </>
        )}
        <button type="button" onClick={() => onNavigate("member")} className="px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.12em] text-[#0B0A12]/70 hover:bg-white/40 md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
          {user ? "Mes traces" : "Voir mon espace invité"}
        </button>
        {user ? (
          <button type="button" onClick={onSignOut} className="px-3 py-2.5 text-left text-[11px] uppercase tracking-[0.12em] text-[#0B0A12]/70 hover:bg-white/40 md:px-5 md:py-4 md:text-sm md:tracking-[0.18em]">
            Se déconnecter
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default AccountMenu;
