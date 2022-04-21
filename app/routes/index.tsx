import { json, LoaderFunction, useLoaderData } from "remix";
import { homepageRoute } from "~/utils/prismic";
import { SliceLike, SliceZone } from "@prismicio/react";
import HeroSlice from "../../slices/HeroSlice";
import { SliceTypes, SliceZoneContext } from "~/types/prismic";
import {
  getPrismicDocumentFromCache,
  prismicClient,
} from "~/utils/prismic.server";
import type { BookList } from "~/utils/queries/books-query";
import { bookDataQuery } from "~/utils/queries/books-query";
import { BookListItem } from "~/components/book";
import { shuffle } from "~/utils/array/shuffle";
import {
  bookCategoriesQuery,
  BookCategoryList,
} from "~/utils/queries/book-categories-query";
import { BookCategoryListItem } from "~/components/book-category";

type LoaderData = {
  slices: SliceLike[];
  books: BookList;
  bookCategories: BookCategoryList;
};

export const loader: LoaderFunction = async () => {
  try {
    const doc = await getPrismicDocumentFromCache("homepage", "home", {
      routes: [homepageRoute],
    });
    const books = await prismicClient.getByType("book", {
      graphQuery: bookDataQuery,
    });
    const bookCategories = await prismicClient.getByType("book-category", {
      graphQuery: bookCategoriesQuery,
    });
    const data: LoaderData = {
      slices: doc.data.slices,
      books: shuffle(books.results as unknown as BookList),
      bookCategories: bookCategories.results as unknown as BookCategoryList,
    };
    return json(data);
  } catch (error) {
    throw new Response("Not found.", {
      status: 404,
    });
  }
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <main className="pb-32">
      <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
        <SliceZone<SliceTypes, SliceZoneContext>
          slices={data.slices}
          components={{
            hero_slice: HeroSlice,
          }}
        />
      </div>

      <div className="pt-20 grid grid-cols-1 gap-12">
        <section className="container grid grid-cols-1 gap-6">
          <h1 className="text-4xl font-bold">Books</h1>
          <div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-10">
              {data.books.map((book) => (
                <li key={book.uid}>
                  <BookListItem book={book} />
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="container grid grid-cols-1 gap-6">
          <h1 className="text-4xl font-bold">Categories</h1>
          <div>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {data.bookCategories.map((category) => (
                <li key={category.uid}>
                  <BookCategoryListItem category={category} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
