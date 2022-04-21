import * as prismicT from "@prismicio/types";

/**
 * Prismic GraphQuery for the list of books
 */
export const bookDataQuery = `{
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

export type BookData = {
  title: string;
  authorName: string;
  description: prismicT.RichTextField;
  priceInCents: number;
  coverImage: prismicT.ImageField;
  category?: {
    data: BookCategory;
  };
  chapters: prismicT.GroupField<{
    title: string;
    content: prismicT.RichTextField;
  }>;
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
