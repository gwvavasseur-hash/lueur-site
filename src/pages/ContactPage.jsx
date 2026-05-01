import PageShell from "../components/PageShell";

function ContactPage() {
  return (
    <PageShell eyebrow="contact" title="Écrire à Lueur.">
      <div className="mx-auto grid max-w-5xl min-w-0 gap-8 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:grid-cols-[0.85fr_1.15fr] md:p-12">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">message</p>
          <p className="mt-6 text-base leading-7 text-[#55524B] md:text-lg md:leading-8">
            Pour une question, une collaboration, un livre, ou simplement une phrase à partager.
          </p>
        </div>
        <form className="grid min-w-0 gap-4">
          <input
            className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none"
            placeholder="Objet"
          />
          <textarea
            className="min-h-[180px] border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 leading-7 outline-none"
            placeholder="Ton message"
          />
          <button
            type="button"
            className="w-full bg-[#0B0A12] px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] transition hover:bg-[#282433] sm:w-fit md:px-7 md:text-sm md:tracking-[0.18em]"
          >
            Envoyer
          </button>
        </form>
      </div>
    </PageShell>
  );
}

export default ContactPage;
