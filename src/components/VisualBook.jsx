function VisualBook({ tone = "light", label = "lueur" }) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] border border-[#0B0A12]/10 bg-white/62 shadow-[0_30px_90px_rgba(10,10,18,0.08)] backdrop-blur-xl">
      <div className="absolute inset-4 border border-[#0B0A12]/10 bg-[#F8F8F4]/75" />
      <div className={`absolute left-8 right-8 top-10 h-28 rounded-full ${tone === "dark" ? "bg-[#0B0A12]" : "bg-[#ECE9DF]"}`} />
      <div className="absolute bottom-8 left-8 right-8">
        <p className="font-serif text-3xl leading-none">{label}</p>
        <p className="mt-3 h-px w-full bg-[#0B0A12]/15" />
        <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#5E5A52]">pdf book</p>
      </div>
    </div>
  );
}

export default VisualBook;
