import PageShell from "../components/PageShell";

function ContactPage() {
  return (
    <PageShell eyebrow="contact" title="Écrire à Lueur.">
      <div className="mx-auto grid max-w-5xl gap-8 border border-white/45 bg-white/42 p-8 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:grid-cols-[0.85fr_1.15fr] md:p-12">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">message</p>
          <p className="mt-6 text-lg leading-8 text-[#55524B]">
            Pour une question, une collaboration, un livre, ou simplement une phrase à partager.
          </p>
        </div>
        <form className="grid gap-4">
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
            className="w-fit bg-[#0B0A12] px-7 py-4 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] transition hover:bg-[#282433]"
          >
            Envoyer
          </button>
        </form>
      </div>
    </PageShell>
  );
}

export default ContactPage;
