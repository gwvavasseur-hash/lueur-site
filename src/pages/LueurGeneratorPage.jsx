import { useState } from "react";
import PageShell from "../components/PageShell";

function LueurGeneratorPage({ onSaveReflection, onCommitAction }) {
  const [bookName, setBookName] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerSaved, setAnswerSaved] = useState(false);
  const [actionCommitted, setActionCommitted] = useState(false);
  const generated = bookName.trim().length > 0;
  const displayedBook = bookName.trim() || "ce livre";
  const question = `Qu’est-ce que ${displayedBook} t’oblige à regarder plus honnêtement ?`;
  const action = "Ce soir, note une phrase et écris en dessous une décision minuscule.";

  function saveAnswer() {
    if (!answer.trim()) return;
    onSaveReflection({
      id: `reflection-${Date.now()}`,
      book: displayedBook,
      question,
      answer,
    });
    setAnswerSaved(true);
  }

  function commitAction() {
    onCommitAction({
      id: `action-${Date.now()}`,
      book: displayedBook,
      text: action,
      status: "À retrouver ce soir",
    });
    setActionCommitted(true);
  }

  return (
    <PageShell eyebrow="expérience gratuite" title="Entre ton livre. Découvre ta lueur.">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-lg leading-8 text-[#55524B]">
            Écris le nom d’un livre. Lueur te donne une phrase, une pensée, une question et une action simple à garder.
          </p>
          <div className="mt-8 flex border border-white/45 bg-white/42 p-2 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <input
              value={bookName}
              onChange={(event) => {
                setBookName(event.target.value);
                setAnswerSaved(false);
                setActionCommitted(false);
              }}
              placeholder="Ex : L’Alchimiste, Calvino, Camus..."
              className="min-w-0 flex-1 bg-transparent px-4 py-4 outline-none"
            />
            <button type="button" className="bg-[#0B0A12] px-6 text-sm uppercase tracking-[0.18em] text-[#FCFCF7]">
              Générer
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Citation</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">
              {generated ? "“Ce que tu cherches commence souvent par une phrase que tu n’avais pas prévu de garder.”" : "Écris un livre pour faire apparaître une citation."}
            </p>
          </div>
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Pensée</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">
              {generated ? `Dans ${displayedBook}, cherche moins une morale qu’un miroir. Ce que tu remarques parle souvent de toi.` : "Une pensée apparaîtra ici."}
            </p>
          </div>
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Question</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">{generated ? question : "Une question apparaîtra ici."}</p>
            {generated ? (
              <div className="mt-6">
                <textarea
                  value={answer}
                  onChange={(event) => {
                    setAnswer(event.target.value);
                    setAnswerSaved(false);
                  }}
                  placeholder="Écris ta réponse ici..."
                  className="min-h-[140px] w-full border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 leading-7 outline-none backdrop-blur-xl"
                />
                <button
                  type="button"
                  onClick={saveAnswer}
                  disabled={!answer.trim()}
                  className="mt-3 bg-[#0B0A12] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30"
                >
                  {answerSaved ? "Réponse enregistrée" : "Enregistrer dans mon espace"}
                </button>
              </div>
            ) : null}
          </div>
          <div className="border border-white/45 bg-white/42 p-7 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.28em] text-[#68645C]">Action</p>
            <p className="mt-4 font-serif text-3xl leading-tight tracking-[-0.04em]">{generated ? action : "Une action apparaîtra ici."}</p>
            {generated ? (
              <button
                type="button"
                onClick={commitAction}
                className="mt-6 bg-[#0B0A12] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#FCFCF7]"
              >
                {actionCommitted ? "C’est enregistré, reviens ce soir." : "Je m’engage"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export default LueurGeneratorPage;
