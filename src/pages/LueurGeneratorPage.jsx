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
      <div className="mx-auto grid max-w-6xl min-w-0 gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
        <div className="min-w-0">
          <p className="text-base leading-7 text-[#55524B] md:text-lg md:leading-8">
            Écris le nom d’un livre. Lueur te donne une phrase, une pensée, une question et une action simple à garder.
          </p>
          <div className="mt-8 flex min-w-0 flex-col gap-2 border border-white/45 bg-white/42 p-2 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl sm:flex-row">
            <input
              value={bookName}
              onChange={(event) => {
                setBookName(event.target.value);
                setAnswerSaved(false);
                setActionCommitted(false);
              }}
              placeholder="Ex : L’Alchimiste, Calvino, Camus..."
              className="min-w-0 flex-1 bg-transparent px-3 py-3 outline-none md:px-4 md:py-4"
            />
            <button type="button" className="bg-[#0B0A12] px-5 py-3 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] md:px-6 md:text-sm md:tracking-[0.18em]">
              Générer
            </button>
          </div>
        </div>
        <div className="min-w-0 space-y-4">
          <div className="border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">Citation</p>
            <p className="mt-4 font-serif text-2xl leading-tight tracking-[-0.04em] md:text-3xl">
              {generated ? "“Ce que tu cherches commence souvent par une phrase que tu n’avais pas prévu de garder.”" : "Écris un livre pour faire apparaître une citation."}
            </p>
          </div>
          <div className="border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">Pensée</p>
            <p className="mt-4 font-serif text-2xl leading-tight tracking-[-0.04em] md:text-3xl">
              {generated ? `Dans ${displayedBook}, cherche moins une morale qu’un miroir. Ce que tu remarques parle souvent de toi.` : "Une pensée apparaîtra ici."}
            </p>
          </div>
          <div className="border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">Question</p>
            <p className="mt-4 font-serif text-2xl leading-tight tracking-[-0.04em] md:text-3xl">{generated ? question : "Une question apparaîtra ici."}</p>
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
                  className="mt-3 w-full bg-[#0B0A12] px-4 py-3 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30 sm:w-auto md:px-5 md:text-sm md:tracking-[0.18em]"
                >
                  {answerSaved ? "Réponse enregistrée" : "Enregistrer dans mon espace"}
                </button>
              </div>
            ) : null}
          </div>
          <div className="border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:p-7">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">Action</p>
            <p className="mt-4 font-serif text-2xl leading-tight tracking-[-0.04em] md:text-3xl">{generated ? action : "Une action apparaîtra ici."}</p>
            {generated ? (
              <button
                type="button"
                onClick={commitAction}
                className="mt-6 w-full bg-[#0B0A12] px-4 py-3 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] sm:w-auto md:px-5 md:text-sm md:tracking-[0.18em]"
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
