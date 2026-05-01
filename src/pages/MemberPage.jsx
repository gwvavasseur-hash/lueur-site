import PageShell from "../components/PageShell";

function MemberPage({ savedFragments, savedReflections, savedActions, onNavigate, user, onSignOut, authLoading, dataLoading, dataError }) {
  return (
    <PageShell eyebrow="lueur member" title="Ton espace pour garder ce qui mérite de rester.">
      <div className="mx-auto mb-6 max-w-7xl">
        <div className="border border-white/45 bg-white/42 p-5 text-sm leading-7 text-[#55524B] shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
          {user ? (
            <p>
              Connecté avec <span className="text-[#0B0A12]">{user.email}</span>. Tes fragments, réponses, actions et ton panier sont sauvegardés.
            </p>
          ) : (
            <p>Tu visites ton espace en mode invité. Crée un compte ou connecte-toi pour conserver tes traces après ta prochaine visite.</p>
          )}
          {authLoading ? <p className="mt-2 text-[#68645C]">Vérification de ta connexion...</p> : null}
          {dataLoading ? <p className="mt-2 text-[#68645C]">Chargement de tes données...</p> : null}
          {dataError ? <p className="mt-2 text-[#7A2E2E]">{dataError}</p> : null}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl min-w-0 gap-5 lg:grid-cols-[1.05fr_1.05fr_0.9fr]">
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

        <div className="min-w-0 space-y-5">
          <MemberModule title="Actions engagées" label="module 03" empty="Aucune action enregistrée pour l’instant.">
            {savedActions.map((action) => (
              <div key={action.id} className="border border-[#0B0A12]/10 bg-white/45 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[#68645C]">{action.status}</p>
                <p className="mt-3 font-serif text-2xl leading-tight tracking-[-0.04em]">{action.text}</p>
              </div>
            ))}
          </MemberModule>

          {user ? (
            <div className="min-w-0 border border-white/45 bg-[#0B0A12]/92 p-5 text-[#FCFCF7] shadow-[0_18px_70px_rgba(10,10,18,0.09)] backdrop-blur-xl md:p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FCFCF7]/55 md:text-xs md:tracking-[0.28em]">compte connecté</p>
              <h3 className="mt-5 font-serif text-2xl leading-tight tracking-[-0.05em] md:text-3xl">Ton espace est relié à ton compte.</h3>
              <div className="mt-8 grid gap-2">
                <button type="button" onClick={() => onNavigate("lueur")} className="bg-[#FCFCF7] px-4 py-3 text-xs uppercase tracking-[0.12em] text-[#0B0A12] md:px-5 md:text-sm md:tracking-[0.18em]">Recevoir une lueur</button>
                <button type="button" onClick={onSignOut} className="border border-[#FCFCF7]/20 px-4 py-3 text-xs uppercase tracking-[0.12em] md:px-5 md:text-sm md:tracking-[0.18em]">Se déconnecter</button>
              </div>
            </div>
          ) : (
            <div className="min-w-0 border border-white/45 bg-[#0B0A12]/92 p-5 text-[#FCFCF7] shadow-[0_18px_70px_rgba(10,10,18,0.09)] backdrop-blur-xl md:p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#FCFCF7]/55 md:text-xs md:tracking-[0.28em]">compte invité</p>
              <h3 className="mt-5 font-serif text-2xl leading-tight tracking-[-0.05em] md:text-3xl">Crée un compte pour retrouver tes traces plus tard.</h3>
              <div className="mt-8 grid gap-2">
                <button type="button" onClick={() => onNavigate("signup")} className="bg-[#FCFCF7] px-4 py-3 text-xs uppercase tracking-[0.12em] text-[#0B0A12] md:px-5 md:text-sm md:tracking-[0.18em]">Créer un compte</button>
                <button type="button" onClick={() => onNavigate("signin")} className="border border-[#FCFCF7]/20 px-4 py-3 text-xs uppercase tracking-[0.12em] md:px-5 md:text-sm md:tracking-[0.18em]">Se connecter</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function MemberModule({ label, title, empty, children }) {
  const hasItems = Array.isArray(children) ? children.length > 0 : Boolean(children);

  return (
    <section className="min-h-[340px] min-w-0 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:min-h-[430px] md:p-6">
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">{label}</p>
      <h2 className="mt-5 font-serif text-3xl leading-tight tracking-[-0.05em] md:text-4xl">{title}</h2>
      <div className="mt-6 space-y-3 md:mt-8">
        {hasItems ? children : <p className="leading-7 text-[#55524B]">{empty}</p>}
      </div>
    </section>
  );
}

export default MemberPage;
