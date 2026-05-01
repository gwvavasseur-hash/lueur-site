function Logo({ mark = "" }) {
  return (
    <div className="select-none whitespace-nowrap leading-none">
      <span className="font-black tracking-[-0.08em]">lueur</span>
      {mark ? <span className="font-serif italic tracking-[-0.06em]">{mark}.</span> : null}
    </div>
  );
}

export default Logo;
