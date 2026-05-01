import PageShell from "../components/PageShell";

function AboutPage() {
  return (
    <PageShell eyebrow="manifeste" title="Lueur existe pour celles et ceux qui veulent retrouver le goût de lire.">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.95fr_1.05fr]">
        <div className="border border-white/45 bg-white/42 p-8 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">notre idée</p>
          <h2 className="mt-6 font-serif text-5xl leading-[0.96] tracking-[-0.06em]">Un endroit calme pour les phrases qui restent.</h2>
          <p className="mt-8 text-lg leading-8 text-[#4F4B44]">
            Lueur rassemble des citations, des livres PDF et des outils numériques pour retrouver ce qui t’a touché, découvrir des lectures accessibles, et garder une trace de tes pensées.
          </p>
        </div>

        <div className="space-y-5 text-lg leading-8 text-[#4F4B44]">
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">pourquoi</p>
            <p className="mt-5">
              Beaucoup veulent lire, mais ne savent pas toujours quoi ouvrir. Beaucoup sauvegardent des citations, puis les oublient. Beaucoup pensent que lire demande du temps, de l’argent, ou une discipline parfaite.
            </p>
            <p className="mt-5">
              Lueur propose une autre porte : commencer par une phrase, trouver un livre qui parle vraiment, puis garder quelque chose de cette lecture.
            </p>
          </div>

          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">ce que tu trouveras ici</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Des livres PDF accessibles", "Des fragments à enregistrer", "Des outils pour mieux lire", "Un espace pour garder tes traces"].map((item) => (
                <div key={item} className="border border-[#0B0A12]/10 bg-[#FCFCF7]/55 p-4">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">légalité et droits</p>
            <p className="mt-5">
              Les livres et contenus proposés sur Lueur doivent être soit des créations originales, soit des textes utilisés avec autorisation, soit des œuvres dont la diffusion est légalement possible. Les livres récents protégés par le droit d’auteur ne seront pas vendus en PDF sans droits ou autorisation.
            </p>
            <p className="mt-5">
              Avant la mise en ligne, chaque produit devra avoir une fiche claire : origine du contenu, droits vérifiés, conditions d’achat, livraison numérique, mentions légales, confidentialité et CGV.
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default AboutPage;
