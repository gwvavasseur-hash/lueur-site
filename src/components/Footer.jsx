import Logo from "./Logo";

function Footer({ onNavigate }) {
  return (
    <footer className="max-w-full overflow-hidden border-t border-[#0B0A12]/10 bg-[#FCFCF7] px-5 py-12 md:px-10">
      <div className="mx-auto grid max-w-7xl min-w-0 gap-10 md:grid-cols-[1.1fr_1.4fr]">
        <div className="min-w-0">
          <div className="text-4xl text-[#0B0A12] md:text-5xl"><Logo /></div>
          <p className="mt-5 max-w-sm leading-7 text-[#55524B]">Citations, livres et fragments de pensée pour mieux garder ce qui te touche.</p>
        </div>
        <div className="grid min-w-0 gap-8 sm:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Explorer</p>
            <div className="mt-5 space-y-3 text-sm text-[#4F4B44]">
              <button type="button" onClick={() => onNavigate("library")} className="block hover:text-[#0B0A12]">Bibliothèque</button>
              <button type="button" onClick={() => onNavigate("fragments")} className="block hover:text-[#0B0A12]">Fragments</button>
              <button type="button" onClick={() => onNavigate("digital")} className="block hover:text-[#0B0A12]">Digital</button>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Lueur</p>
            <div className="mt-5 space-y-3 text-sm text-[#4F4B44]">
              <button type="button" onClick={() => onNavigate("lueur")} className="block hover:text-[#0B0A12]">Recevoir une lueur</button>
              <button type="button" onClick={() => onNavigate("member")} className="block hover:text-[#0B0A12]">Espace membre</button>
              <button type="button" onClick={() => onNavigate("about")} className="block hover:text-[#0B0A12]">À propos</button>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Informations</p>
            <div className="mt-5 space-y-3 text-sm text-[#4F4B44]">
              <button type="button" onClick={() => onNavigate("contact")} className="block hover:text-[#0B0A12]">Contact</button>
              <button type="button" onClick={() => onNavigate("legal")} className="block hover:text-[#0B0A12]">Mentions légales</button>
              <button type="button" onClick={() => onNavigate("privacy")} className="block hover:text-[#0B0A12]">Confidentialité</button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-[#0B0A12]/10 pt-6 text-[10px] uppercase tracking-[0.16em] text-[#68645C] sm:flex-row sm:justify-between md:text-xs md:tracking-[0.2em]">
        <span>© Lueur</span>
        <span>Tous droits réservés</span>
      </div>
    </footer>
  );
}

export default Footer;
