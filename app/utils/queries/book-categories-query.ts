import * as prismicT from "@prismicio/types";

/**
 * Prismic GraphQuery for the list of books
 */
export const bookCategoriesQuery = `{
  category {
    title
    image
  }
}`;

export type BookCategoryData = {
  title: string;
  image: prismicT.ImageField;
};

export type BookCategory = {
  uid: string;
  data: BookCategoryData;
};

export type BookCategoryListItem = BookCategory;
export type BookCategoryList = Array<BookCategoryListItem>;
