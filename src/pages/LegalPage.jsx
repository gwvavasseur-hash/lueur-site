import PageShell from "../components/PageShell";

function LegalPage({ onNavigate }) {
  return (
    <PageShell eyebrow="informations" title="Mentions légales.">
      <div className="mx-auto max-w-4xl border border-white/45 bg-white/42 p-8 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-12">
        <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">à compléter</p>
        <p className="mt-7 text-lg leading-8 text-[#55524B]">
          Cette page accueillera les informations légales de Lueur : éditeur du site, contact, hébergement, conditions de diffusion des contenus et respect des droits d’auteur.
        </p>
        <button
          type="button"
          onClick={() => onNavigate("about")}
          className="mt-10 bg-[#0B0A12] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] transition hover:bg-[#282433]"
        >
          Lire la mission
        </button>
      </div>
    </PageShell>
  );
}

export default LegalPage;
