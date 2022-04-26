import type { BookListItem } from "../queries/book-list-query";
import type { NonNullable } from "ts-toolbelt/out/Object/NonNullable";
import type { Book, BookData } from "~/utils/queries/book-query";

export const isValidBook = (
  book: Book
): book is NonNullable<Book, keyof Book, "deep"> => {
  return (
    typeof book.data.title === "string" &&
    typeof book.data.authorName === "string" &&
    typeof book.data.priceInCents === "number" &&
    typeof book.data.coverImage === "object" &&
    typeof book.data.coverImage.url === "string" &&
    typeof book.data.coverImage.alt === "string" &&
    typeof book.data.coverImage.dimensions === "object" &&
    typeof book.data.coverImage.dimensions?.width === "number" &&
    typeof book.data.coverImage.dimensions.height === "number" &&
    typeof book.data.description === "object" &&
    typeof book.data.category === "object" &&
    typeof book.data.chapters === "object"
  );
};

export const isValidListBookItem = (
  bookData: BookListItem
): bookData is NonNullable<BookListItem, keyof BookListItem, "deep"> => {
  return (
    typeof bookData.uid === "string" &&
    typeof bookData.data === "object" &&
    typeof bookData.data.authorName === "string" &&
    typeof bookData.data.priceInCents === "number" &&
    typeof bookData.data.coverImage === "object" &&
    typeof bookData.data.coverImage.url === "string" &&
    typeof bookData.data.coverImage.alt === "string" &&
    typeof bookData.data.coverImage.dimensions === "object" &&
    typeof bookData.data.coverImage.dimensions?.width === "number" &&
    typeof bookData.data.coverImage.dimensions.height === "number"
  );
};
