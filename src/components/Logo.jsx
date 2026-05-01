function Logo({ mark = "", className = "", style }) {
  return (
    <div className={`select-none whitespace-nowrap leading-none ${className}`} style={style}>
      <span className="font-black tracking-[-0.08em]">lueur</span>
      {mark ? <span className="font-serif italic tracking-[-0.06em]">{mark}{mark === "ai" ? "" : "."}</span> : null}
    </div>
  );
}

export default Logo;
