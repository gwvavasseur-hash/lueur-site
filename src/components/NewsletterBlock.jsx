function NewsletterBlock() {
  return (
    <section className="px-5 pb-24 md:px-10">
      <div className="mx-auto max-w-7xl overflow-hidden border border-white/45 bg-white/42 p-6 shadow-[0_25px_90px_rgba(10,10,18,0.05)] backdrop-blur-2xl md:p-14">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">newsletter</p>
            <h2 className="mt-5 font-serif text-5xl leading-none tracking-[-0.06em] md:text-7xl">Recevoir une lueur par semaine.</h2>
          </div>
          <div>
            <p className="mb-6 text-lg leading-8 text-[#55524B]">Une citation, un livre à découvrir, une question à garder. Une fois par semaine, pas plus.</p>
            <div className="flex flex-col gap-2 border border-white/45 bg-[#FCFCF7]/60 p-2 backdrop-blur-xl sm:flex-row">
              <input className="min-w-0 flex-1 bg-transparent px-4 py-3 outline-none sm:py-0" placeholder="ton@email.fr" />
              <button type="button" className="w-full bg-[#0B0A12] px-5 py-4 text-xs uppercase tracking-[0.16em] text-[#FCFCF7] sm:w-auto md:px-6 md:text-sm md:tracking-[0.18em]">M’envoyer une lueur</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterBlock;
