import PageShell from "../components/PageShell";

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

export default MemberPage;
