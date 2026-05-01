import { pages } from "../data/pages";
import Icon from "./Icon";
import Logo from "./Logo";

function Header({ currentPage, onNavigate, menuOpen, setMenuOpen, cartOpen, setCartOpen, cartCount, accountOpen, setAccountOpen }) {
  const active = pages.find((page) => page.id === currentPage) || {
    mark: currentPage === "book" ? "book" : currentPage === "checkout" ? "checkout" : "",
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full max-w-full overflow-hidden border-b border-white/35 bg-white/45 shadow-[0_12px_55px_rgba(10,10,18,0.045)] backdrop-blur-2xl">
      <div className="grid h-[70px] min-w-0 grid-cols-[1fr_auto_1fr] items-center px-3 md:h-[82px] md:px-8">
        <div className="flex min-w-0 items-center gap-1 md:gap-2">
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setAccountOpen(false);
              setCartOpen(false);
            }}
            className="p-2 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12] md:p-3"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={21} className="md:h-[25px] md:w-[25px]" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Retour à l’accueil"
          className="min-w-0 max-w-[48vw] overflow-hidden text-[#0B0A12] md:max-w-none"
        >
          <Logo mark={active.mark} className="text-[1.72rem] md:text-[2.15rem]" />
        </button>

        <div className="flex min-w-0 justify-end gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => {
              setAccountOpen(!accountOpen);
              setMenuOpen(false);
              setCartOpen(false);
            }}
            aria-label="Ouvrir le menu du compte"
            className="p-2 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12] md:p-3"
          >
            <Icon name="user" size={21} className="md:h-[25px] md:w-[25px]" />
          </button>
          <button
            type="button"
            aria-label="Ouvrir le panier"
            onClick={() => {
              setCartOpen(!cartOpen);
              setMenuOpen(false);
              setAccountOpen(false);
            }}
            className="relative p-2 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12] md:p-3"
          >
            <Icon name="bag" size={21} className="md:h-[25px] md:w-[25px]" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#0B0A12] px-1 text-[10px] text-[#FCFCF7]">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
