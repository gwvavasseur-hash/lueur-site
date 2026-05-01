import PageShell from "../components/PageShell";

function LegalPage({ onNavigate }) {
  return (
    <PageShell eyebrow="informations" title="Mentions légales.">
      <div className="mx-auto max-w-4xl border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-12">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">à compléter</p>
        <p className="mt-7 text-base leading-7 text-[#55524B] md:text-lg md:leading-8">
          Cette page accueillera les informations légales de Lueur : éditeur du site, contact, hébergement, conditions de diffusion des contenus et respect des droits d’auteur.
        </p>
        <button
          type="button"
          onClick={() => onNavigate("about")}
          className="mt-10 w-full bg-[#0B0A12] px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] transition hover:bg-[#282433] sm:w-auto md:px-7 md:text-sm md:tracking-[0.18em]"
        >
          Lire la mission
        </button>
      </div>
    </PageShell>
  );
}

export default LegalPage;
