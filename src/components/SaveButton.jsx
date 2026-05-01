import Icon from "./Icon";

function SaveButton({ saved, onClick }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label="Enregistrer ce fragment"
      className="absolute right-5 top-5 z-10 bg-white/50 p-2 text-[#0B0A12] shadow-[0_12px_40px_rgba(10,10,18,0.08)] backdrop-blur-xl transition hover:bg-white/80"
    >
      <Icon name={saved ? "check" : "save"} size={18} />
    </button>
  );
}

export default SaveButton;
