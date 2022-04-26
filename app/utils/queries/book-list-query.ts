import { BookData } from "./book-query";

/**
 * Prismic GraphQuery for the list of books
 */
export const bookListDataQuery = `{
  book {
    authorName
    title
    priceInCents
    coverImage
    category {
      uid
      title
    }
  }
}`;

export type BookCategory = {
  uid: string;
  title: string;
};

export type BookListData = Pick<
  BookData,
  "authorName" | "title" | "priceInCents" | "coverImage" | "category"
>;

export type Book<TData = BookData> = {
  uid: string;
  data: TData;
};

export type BookListItem = Book<BookListData>;
export type BookList = Array<BookListItem>;
