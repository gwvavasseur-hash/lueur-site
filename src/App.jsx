import { useEffect, useMemo, useRef, useState } from "react";

import AccountMenu from "./components/AccountMenu";
import CartPreview from "./components/CartPreview";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MenuOverlay from "./components/MenuOverlay";
import { books } from "./data/books";
import AboutPage from "./pages/AboutPage";
import AuthPage from "./pages/AuthPage";
import BookPage from "./pages/BookPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import DigitalPage from "./pages/DigitalPage";
import FragmentsPage from "./pages/FragmentsPage";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import LegalPage from "./pages/LegalPage";
import LueurGeneratorPage from "./pages/LueurGeneratorPage";
import MemberPage from "./pages/MemberPage";
import PrivacyPage from "./pages/PrivacyPage";
import { supabase } from "./lib/supabase";
import {
  deleteCartItem,
  insertSavedAction,
  insertSavedReflection,
  loadMemberData,
  syncGuestData,
  upsertCartItem,
  upsertSavedFragment,
} from "./services/memberData";
import { parsePrice } from "./utils/price";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedBookId, setSelectedBookId] = useState(books[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [savedFragments, setSavedFragments] = useState([]);
  const [savedReflections, setSavedReflections] = useState([]);
  const [savedActions, setSavedActions] = useState([]);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [dataError, setDataError] = useState("");
  const [dataStatus, setDataStatus] = useState("");
  const guestDataRef = useRef({ savedFragments: [], savedReflections: [], savedActions: [], cartItems: [] });

  const selectedBook = useMemo(() => books.find((book) => book.id === selectedBookId) || books[0], [selectedBookId]);
  const savedFragmentIds = useMemo(() => savedFragments.map((fragment) => fragment.id), [savedFragments]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + parsePrice(item.price), 0), [cartItems]);
  const user = session?.user || null;

  useEffect(() => {
    guestDataRef.current = { savedFragments, savedReflections, savedActions, cartItems };
  }, [savedFragments, savedReflections, savedActions, cartItems]);

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false);
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return undefined;

    let cancelled = false;

    async function hydrateMemberData() {
      setDataLoading(true);
      setDataError("");
      setDataStatus("");

      try {
        await syncGuestData(user.id, guestDataRef.current);
        const data = await loadMemberData(user.id);
        if (cancelled) return;

        setSavedFragments(data.savedFragments);
        setSavedReflections(data.savedReflections);
        setSavedActions(data.savedActions);
        setCartItems(data.cartItems);
      } catch (error) {
        if (!cancelled) {
          setDataError("Impossible de charger tes données pour l’instant. Vérifie que les tables Supabase sont bien créées.");
        }
        console.error(error);
      } finally {
        if (!cancelled) {
          setDataLoading(false);
        }
      }
    }

    hydrateMemberData();

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  function navigate(pageId) {
    setCurrentPage(pageId);
    setMenuOpen(false);
    setAccountOpen(false);
    setCartOpen(false);
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }

  function openBook(bookId) {
    setSelectedBookId(bookId);
    navigate("book");
  }

  async function addToCart(item) {
    const alreadyInCart = cartItems.some((previousItem) => previousItem.id === item.id && previousItem.category === item.category);

    setCartItems((previousItems) => {
      if (previousItems.some((previousItem) => previousItem.id === item.id && previousItem.category === item.category)) {
        return previousItems;
      }
      return [...previousItems, item];
    });
    setCartOpen(true);
    setMenuOpen(false);
    setAccountOpen(false);

    if (user?.id) {
      try {
        await upsertCartItem(user.id, item);
        setDataError("");
        setDataStatus(alreadyInCart ? "Ce produit était déjà dans ton panier sauvegardé." : "Panier sauvegardé dans ton compte.");
      } catch (error) {
        setDataError(`Le panier n’a pas pu être sauvegardé : ${error.message}`);
        console.error(error);
      }
    } else {
      setDataStatus("Panier gardé en mode invité. Connecte-toi pour le conserver.");
    }
  }

  async function removeFromCart(id, category) {
    setCartItems((previousItems) => previousItems.filter((item) => !(item.id === id && item.category === category)));

    if (user?.id) {
      try {
        await deleteCartItem(user.id, id, category);
        setDataError("");
        setDataStatus("Panier mis à jour dans ton compte.");
      } catch (error) {
        setDataError(`Le panier n’a pas pu être mis à jour : ${error.message}`);
        console.error(error);
      }
    }
  }

  async function saveFragment(fragment) {
    setSavedFragments((previousFragments) => {
      if (previousFragments.some((previousFragment) => previousFragment.id === fragment.id)) {
        return previousFragments;
      }
      return [...previousFragments, fragment];
    });

    if (user?.id) {
      try {
        await upsertSavedFragment(user.id, fragment);
        setDataError("");
        setDataStatus("Fragment sauvegardé dans ton compte.");
      } catch (error) {
        setDataError(`Le fragment n’a pas pu être sauvegardé : ${error.message}`);
        console.error(error);
      }
    }
  }

  async function saveReflection(reflection) {
    setSavedReflections((previousReflections) => [reflection, ...previousReflections]);

    if (user?.id) {
      try {
        await insertSavedReflection(user.id, reflection);
        setDataError("");
        setDataStatus("Réponse sauvegardée dans ton compte.");
      } catch (error) {
        setDataError(`La réponse n’a pas pu être sauvegardée : ${error.message}`);
        console.error(error);
      }
    }
  }

  async function commitAction(action) {
    setSavedActions((previousActions) => [action, ...previousActions]);

    if (user?.id) {
      try {
        await insertSavedAction(user.id, action);
        setDataError("");
        setDataStatus("Action sauvegardée dans ton compte.");
      } catch (error) {
        setDataError(`L’action n’a pas pu être sauvegardée : ${error.message}`);
        console.error(error);
      }
    }
  }

  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
    setSavedFragments([]);
    setSavedReflections([]);
    setSavedActions([]);
    setCartItems([]);
    setMenuOpen(false);
    setAccountOpen(false);
    setCartOpen(false);
    navigate("home");
  }

  return (
    <main className="min-h-screen max-w-full overflow-x-hidden bg-[#FCFCF7] text-[#0B0A12] selection:bg-[#E7DFC9] selection:text-[#0B0A12]">
      <style>{`
        @keyframes lueurReveal {
          from { opacity: 0; transform: translateY(22px); filter: blur(8px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes lueurFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .lueur-reveal { opacity: 0; animation: lueurReveal 1.1s ease forwards; }
        .lueur-reveal:nth-child(2) { animation-delay: .12s; }
        .lueur-reveal:nth-child(3) { animation-delay: .24s; }
        .lueur-reveal:nth-child(4) { animation-delay: .36s; }
        .lueur-float { animation: lueurFloat 7s ease-in-out infinite; }
      `}</style>

      <Header
        currentPage={currentPage}
        onNavigate={navigate}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        cartCount={cartItems.length}
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
      />
      <MenuOverlay open={menuOpen} onNavigate={navigate} />
      <AccountMenu open={accountOpen} onNavigate={navigate} user={user} onSignOut={signOut} />
      <CartPreview open={cartOpen} cartItems={cartItems} total={cartTotal} onNavigate={navigate} onRemove={removeFromCart} />

      {currentPage === "home" ? <HomePage onNavigate={navigate} onOpenBook={openBook} onSaveFragment={saveFragment} savedFragmentIds={savedFragmentIds} /> : null}
      {currentPage === "lueur" ? <LueurGeneratorPage onSaveReflection={saveReflection} onCommitAction={commitAction} /> : null}
      {currentPage === "library" ? <LibraryPage onOpenBook={openBook} /> : null}
      {currentPage === "fragments" ? <FragmentsPage onOpenBook={openBook} onSaveFragment={saveFragment} savedFragmentIds={savedFragmentIds} /> : null}
      {currentPage === "digital" ? <DigitalPage onAddToCart={addToCart} /> : null}
      {currentPage === "member" ? (
        <MemberPage
          savedFragments={savedFragments}
          savedReflections={savedReflections}
          savedActions={savedActions}
          cartItems={cartItems}
          onNavigate={navigate}
          user={user}
          onSignOut={signOut}
          authLoading={authLoading}
          dataLoading={dataLoading}
          dataError={dataError}
          dataStatus={dataStatus}
        />
      ) : null}
      {currentPage === "about" ? <AboutPage /> : null}
      {currentPage === "signin" ? <AuthPage mode="signin" onNavigate={navigate} /> : null}
      {currentPage === "signup" ? <AuthPage mode="signup" onNavigate={navigate} /> : null}
      {currentPage === "contact" ? <ContactPage /> : null}
      {currentPage === "legal" ? <LegalPage onNavigate={navigate} /> : null}
      {currentPage === "privacy" ? <PrivacyPage onNavigate={navigate} /> : null}
      {currentPage === "book" ? <BookPage book={selectedBook} onNavigate={navigate} onAddToCart={addToCart} /> : null}
      {currentPage === "checkout" ? <CheckoutPage cartItems={cartItems} total={cartTotal} onNavigate={navigate} onRemove={removeFromCart} /> : null}

      <Footer onNavigate={navigate} />
    </main>
  );
}
