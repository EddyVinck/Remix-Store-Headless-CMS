import * as prismicT from "@prismicio/types";

/**
 * Prismic GraphQuery for the list of books
 */
export const bookDataQuery = `{
  book {
    uid
    authorName
    title
    priceInCents
    coverImage
  }
}`;

export type BookData = {
  title: string;
  authorName: string;
  description: prismicT.RichTextField;
  priceInCents: number;
  coverImage: prismicT.ImageField;
  category: prismicT.RelationField;
  chapters: prismicT.GroupField<{
    title: string;
    content: prismicT.RichTextField;
  }>;
};

export type BookListData = Pick<
  BookData,
  "authorName" | "title" | "priceInCents" | "coverImage"
>;

export type Book<TData = BookData> = {
  uid: string;
  data: TData;
};

export type BookListItem = Book<BookListData>;
export type BookList = Array<BookListItem>;
