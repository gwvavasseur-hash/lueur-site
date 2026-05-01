import { useMemo, useState } from "react";

import AccountMenu from "./components/AccountMenu";
import CartPreview from "./components/CartPreview";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MenuOverlay from "./components/MenuOverlay";
import { books } from "./data/books";
import { digitalProducts } from "./data/digitalProducts";
import { fragments } from "./data/fragments";
import { pages } from "./data/pages";
import { reviews } from "./data/reviews";
import AboutPage from "./pages/AboutPage";
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
import { parsePrice } from "./utils/price";

export function validateBooks(items = books) {
  return Array.isArray(items) && items.length > 0 && items.every((item) => Boolean(item.id && item.title && item.quote && item.price));
}

export const componentTests = [
  { name: "books data is valid", passed: validateBooks(books) },
  { name: "fragments link to existing books", passed: fragments.every((fragment) => books.some((book) => book.id === fragment.bookId)) },
  { name: "main navigation exposes about page", passed: pages.some((page) => page.id === "about") },
  { name: "digital products include a free lead magnet", passed: digitalProducts.some((product) => product.price === "0 €") },
  { name: "every fragment has a save id", passed: fragments.every((fragment) => Boolean(fragment.id)) },
  { name: "reviews use structured testimonial data", passed: reviews.every((review) => Boolean(review.name && review.context && review.text && review.result)) },
  { name: "books include commerce page details", passed: books.every((book) => Boolean(book.description && book.idealFor && book.includes?.length && book.details?.length && book.legal)) },
];

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

  const selectedBook = useMemo(() => books.find((book) => book.id === selectedBookId) || books[0], [selectedBookId]);
  const savedFragmentIds = useMemo(() => savedFragments.map((fragment) => fragment.id), [savedFragments]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + parsePrice(item.price), 0), [cartItems]);

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

  function addToCart(item) {
    setCartItems((previousItems) => {
      if (previousItems.some((previousItem) => previousItem.id === item.id && previousItem.category === item.category)) {
        return previousItems;
      }
      return [...previousItems, item];
    });
    setCartOpen(true);
    setMenuOpen(false);
    setAccountOpen(false);
  }

  function removeFromCart(id, category) {
    setCartItems((previousItems) => previousItems.filter((item) => !(item.id === id && item.category === category)));
  }

  function saveFragment(fragment) {
    setSavedFragments((previousFragments) => {
      if (previousFragments.some((previousFragment) => previousFragment.id === fragment.id)) {
        return previousFragments;
      }
      return [...previousFragments, fragment];
    });
  }

  function saveReflection(reflection) {
    setSavedReflections((previousReflections) => [reflection, ...previousReflections]);
  }

  function commitAction(action) {
    setSavedActions((previousActions) => [action, ...previousActions]);
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
      <AccountMenu open={accountOpen} onNavigate={navigate} />
      <CartPreview open={cartOpen} cartItems={cartItems} total={cartTotal} onNavigate={navigate} onRemove={removeFromCart} />

      {currentPage === "home" ? <HomePage onNavigate={navigate} onOpenBook={openBook} onSaveFragment={saveFragment} savedFragmentIds={savedFragmentIds} /> : null}
      {currentPage === "lueur" ? <LueurGeneratorPage onSaveReflection={saveReflection} onCommitAction={commitAction} /> : null}
      {currentPage === "library" ? <LibraryPage onOpenBook={openBook} /> : null}
      {currentPage === "fragments" ? <FragmentsPage onOpenBook={openBook} onSaveFragment={saveFragment} savedFragmentIds={savedFragmentIds} /> : null}
      {currentPage === "digital" ? <DigitalPage onAddToCart={addToCart} /> : null}
      {currentPage === "member" ? <MemberPage savedFragments={savedFragments} savedReflections={savedReflections} savedActions={savedActions} onNavigate={navigate} /> : null}
      {currentPage === "about" ? <AboutPage /> : null}
      {currentPage === "contact" ? <ContactPage /> : null}
      {currentPage === "legal" ? <LegalPage onNavigate={navigate} /> : null}
      {currentPage === "privacy" ? <PrivacyPage onNavigate={navigate} /> : null}
      {currentPage === "book" ? <BookPage book={selectedBook} onNavigate={navigate} onAddToCart={addToCart} /> : null}
      {currentPage === "checkout" ? <CheckoutPage cartItems={cartItems} total={cartTotal} onNavigate={navigate} onRemove={removeFromCart} /> : null}

      <Footer onNavigate={navigate} />
    </main>
  );
}
