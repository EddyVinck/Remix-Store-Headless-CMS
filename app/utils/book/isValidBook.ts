import type { BookData, BookListItem } from "../queries/books-query";
import type { NonNullable } from "ts-toolbelt/out/Object/NonNullable";

export const isValidBook = (
  bookData: BookData
): bookData is NonNullable<BookData, keyof BookData, "deep"> => {
  return (
    typeof bookData.title === "string" &&
    typeof bookData.authorName === "string" &&
    typeof bookData.priceInCents === "number" &&
    typeof bookData.coverImage === "object" &&
    typeof bookData.coverImage.url === "string" &&
    typeof bookData.coverImage.alt === "string" &&
    typeof bookData.coverImage.dimensions === "object" &&
    typeof bookData.coverImage.dimensions?.width === "number" &&
    typeof bookData.coverImage.dimensions.height === "number" &&
    typeof bookData.description === "object" &&
    typeof bookData.category === "object" &&
    typeof bookData.chapters === "object"
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
