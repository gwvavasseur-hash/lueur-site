import { pages } from "../data/pages";
import Icon from "./Icon";
import Logo from "./Logo";

function Header({ currentPage, onNavigate, menuOpen, setMenuOpen, cartOpen, setCartOpen, cartCount, accountOpen, setAccountOpen }) {
  const active = pages.find((page) => page.id === currentPage) || {
    mark: currentPage === "book" ? "book" : currentPage === "checkout" ? "checkout" : "",
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/35 bg-white/45 shadow-[0_12px_55px_rgba(10,10,18,0.045)] backdrop-blur-2xl">
      <div className="grid h-[82px] grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => {
              setMenuOpen(!menuOpen);
              setAccountOpen(false);
              setCartOpen(false);
            }}
            className="p-3 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12]"
          >
            <Icon name={menuOpen ? "close" : "menu"} size={25} />
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate("home")}
          aria-label="Retour à l’accueil"
          className="text-[#0B0A12]"
        >
          <Logo mark={active.mark} style={{ fontSize: "2.15rem" }} />
        </button>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => {
              setAccountOpen(!accountOpen);
              setMenuOpen(false);
              setCartOpen(false);
            }}
            aria-label="Ouvrir le menu du compte"
            className="p-3 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12]"
          >
            <Icon name="user" size={25} />
          </button>
          <button
            type="button"
            aria-label="Ouvrir le panier"
            onClick={() => {
              setCartOpen(!cartOpen);
              setMenuOpen(false);
              setAccountOpen(false);
            }}
            className="relative p-3 text-[#0B0A12]/80 transition hover:bg-white/40 hover:text-[#0B0A12]"
          >
            <Icon name="bag" size={25} />
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
