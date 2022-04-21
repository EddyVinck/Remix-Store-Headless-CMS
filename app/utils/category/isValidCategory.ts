import type { NonNullable } from "ts-toolbelt/out/Object/NonNullable";
import type { BookCategory } from "../queries/book-categories-query";

export const isValidBookCategory = (
  category: BookCategory
): category is NonNullable<BookCategory, keyof BookCategory, "deep"> => {
  return (
    typeof category.uid === "string" &&
    typeof category.data === "object" &&
    typeof category.data.title === "string" &&
    typeof category.data.image === "object" &&
    typeof category.data.image.url === "string"
  );
};
