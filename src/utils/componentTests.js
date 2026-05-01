import { books } from "../data/books";
import { digitalProducts } from "../data/digitalProducts";
import { fragments } from "../data/fragments";
import { pages } from "../data/pages";
import { reviews } from "../data/reviews";

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
