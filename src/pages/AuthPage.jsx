import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

function AuthPage({ mode = "signin", onNavigate }) {
  const isSignUp = mode === "signup";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const title = useMemo(() => (isSignUp ? "Créer ton compte Lueur." : "Te reconnecter à Lueur."), [isSignUp]);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("");
    setError("");

    if (!isSupabaseConfigured) {
      setError("Supabase n'est pas encore configuré.");
      return;
    }

    if (!email.trim() || password.length < 6) {
      setError("Ajoute un email et un mot de passe d’au moins 6 caractères.");
      return;
    }

    setSubmitting(true);
    const redirectTo = typeof window !== "undefined" ? window.location.origin : undefined;

    const result = isSignUp
      ? await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: { name: name.trim() },
            emailRedirectTo: redirectTo,
          },
        })
      : await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

    setSubmitting(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    if (isSignUp && !result.data.session) {
      setStatus("Compte créé. Vérifie tes emails pour confirmer ton adresse, puis connecte-toi.");
      return;
    }

    setStatus(isSignUp ? "Compte créé. Ton espace est prêt." : "Connexion réussie. Ton espace se charge.");
    onNavigate("member");
  }

  return (
    <PageShell eyebrow={isSignUp ? "compte" : "connexion"} title={title}>
      <div className="mx-auto grid max-w-5xl min-w-0 gap-8 border border-white/45 bg-white/42 p-5 shadow-[0_18px_70px_rgba(10,10,18,0.04)] backdrop-blur-xl md:grid-cols-[0.85fr_1.15fr] md:p-12">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#68645C] md:text-xs md:tracking-[0.28em]">
            {isSignUp ? "nouvel espace" : "retour"}
          </p>
          <p className="mt-6 text-base leading-7 text-[#55524B] md:text-lg md:leading-8">
            {isSignUp
              ? "Crée un compte pour retrouver tes fragments, tes réponses, tes actions et ton panier lors de ta prochaine visite."
              : "Connecte-toi pour retrouver ce que tu as gardé dans ton espace membre."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid min-w-0 gap-4">
          {isSignUp ? (
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none"
              placeholder="Prénom"
            />
          ) : null}
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none"
            placeholder="Adresse email"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="border border-[#0B0A12]/10 bg-[#FCFCF7]/70 p-4 outline-none"
            placeholder="Mot de passe"
            autoComplete={isSignUp ? "new-password" : "current-password"}
          />

          {error ? <p className="border border-[#0B0A12]/10 bg-white/45 p-4 text-sm leading-6 text-[#7A2E2E]">{error}</p> : null}
          {status ? <p className="border border-[#0B0A12]/10 bg-white/45 p-4 text-sm leading-6 text-[#4F4B44]">{status}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0B0A12] px-5 py-4 text-xs uppercase tracking-[0.12em] text-[#FCFCF7] transition hover:bg-[#282433] disabled:cursor-not-allowed disabled:bg-[#0B0A12]/30 sm:w-fit md:px-7 md:text-sm md:tracking-[0.18em]"
          >
            {submitting ? "Patiente..." : isSignUp ? "Créer mon compte" : "Me connecter"}
          </button>

          <button
            type="button"
            onClick={() => onNavigate(isSignUp ? "signin" : "signup")}
            className="w-fit border-b border-[#0B0A12] pb-1 text-xs uppercase tracking-[0.14em] text-[#0B0A12] md:text-sm md:tracking-[0.18em]"
          >
            {isSignUp ? "J’ai déjà un compte" : "Créer un compte"}
          </button>
        </form>
      </div>
    </PageShell>
  );
}

export default AuthPage;
