function PageShell({ eyebrow, title, children, compact = false }) {
  return (
    <section className={`min-h-screen bg-[#FCFCF7] px-5 pb-24 pt-32 md:px-10 ${compact ? "md:pt-36" : "md:pt-44"}`}>
      <div className="mx-auto mb-14 max-w-7xl">
        <p className="text-xs uppercase tracking-[0.32em] text-[#68645C]">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.98] tracking-[-0.06em] md:text-7xl">{title}</h1>
      </div>
      {children}
    </section>
  );
}

export default PageShell;
