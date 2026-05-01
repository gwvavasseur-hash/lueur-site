function PageShell({ eyebrow, title, children, compact = false }) {
  return (
    <section className={`min-h-screen max-w-full overflow-hidden bg-[#FCFCF7] px-5 pb-20 pt-28 md:px-10 md:pb-24 ${compact ? "md:pt-36" : "md:pt-44"}`}>
      <div className="mx-auto mb-10 max-w-7xl min-w-0 md:mb-14">
        <p className="text-[10px] uppercase tracking-[0.24em] text-[#68645C] md:text-xs md:tracking-[0.32em]">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-serif text-4xl leading-[1] tracking-[-0.05em] md:text-7xl md:leading-[0.98] md:tracking-[-0.06em]">{title}</h1>
      </div>
      {children}
    </section>
  );
}

export default PageShell;
