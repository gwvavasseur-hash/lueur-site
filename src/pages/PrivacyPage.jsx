import PageShell from "../components/PageShell";

function PrivacyPage({ onNavigate }) {
  return (
    <PageShell eyebrow="informations" title="Confidentialité.">
      <div className="mx-auto max-w-4xl border border-white/45 bg-white/42 p-8 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">à compléter</p>
        <p className="mt-7 text-lg leading-8 text-[#55524B]">
          Cette page expliquera comment Lueur protège les données : email, compte, fragments sauvegardés, réponses personnelles et accès aux produits numériques.
        </p>
        <button
          type="button"
          onClick={() => onNavigate("legal")}
          className="mt-10 bg-[#0B0A12] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] transition hover:bg-[#282433]"
        >
          Voir les mentions légales
        </button>
      </div>
    </PageShell>
  );
}

export default PrivacyPage;
