function NewsletterBlock() {
  return (
    <section className="max-w-full overflow-hidden px-5 pb-20 md:px-10 md:pb-24">
      <div className="mx-auto max-w-7xl overflow-hidden border border-white/45 bg-white/42 p-5 shadow-[0_20px_70px_rgba(10,10,18,0.045)] backdrop-blur-xl md:p-14 md:shadow-[0_25px_90px_rgba(10,10,18,0.05)] md:backdrop-blur-2xl">
        <div className="grid min-w-0 gap-8 md:grid-cols-[1fr_1fr] md:items-end md:gap-10">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.24em] text-[#68645C] md:text-xs md:tracking-[0.32em]">newsletter</p>
            <h2 className="mt-5 font-serif text-4xl leading-none tracking-[-0.05em] md:text-7xl md:tracking-[-0.06em]">Recevoir une lueur par semaine.</h2>
          </div>
          <div className="min-w-0">
            <p className="mb-5 text-base leading-7 text-[#55524B] md:mb-6 md:text-lg md:leading-8">Une citation, un livre à découvrir, une question à garder. Une fois par semaine, pas plus.</p>
            <div className="flex min-w-0 flex-col gap-2 border border-white/45 bg-[#FCFCF7]/60 p-2 backdrop-blur-xl sm:flex-row">
              <input className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none sm:py-0 md:px-4" placeholder="ton@email.fr" />
              <button type="button" className="w-full min-w-0 bg-[#0B0A12] px-4 py-4 text-[11px] uppercase tracking-[0.12em] text-[#FCFCF7] sm:w-auto md:px-6 md:text-sm md:tracking-[0.18em]">M’envoyer une lueur</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterBlock;
