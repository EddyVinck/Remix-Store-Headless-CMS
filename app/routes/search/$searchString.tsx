import { predicate } from "@prismicio/client";
import {
  ActionFunction,
  LoaderFunction,
  useActionData,
  useLoaderData,
} from "remix";
import { BookListItem } from "~/components/book";
import { Link } from "~/components/link";
import { PrismicDocument } from "~/types/prismic";
import { prismicClient } from "~/utils/prismic.server";
import { BookList, bookListDataQuery } from "~/utils/queries/book-list-query";

export const action: ActionFunction = async ({ request, params }) => {
  // const { searchString = "" } = params;

  // if (!searchString) {
  //   throw new Response("Not found.", {
  //     status: 404,
  //   });
  // }

  // return {
  //   searchString,
  // };

  // redirect('/search/' + searchString);
  return {
    ok: true,
    request,
    params,
  };
};

type LoaderData = { books: BookList; bookCategory: PrismicDocument };

export const loader: LoaderFunction = async ({ request, params }) => {
  const { searchString = "" } = params;

  if (!searchString) {
    throw new Response("Not found.", {
      status: 404,
    });
  }

  let books: PrismicDocument[] = [];
  try {
    books = await prismicClient.getAllByType("book", {
      graphQuery: bookListDataQuery,
      predicates: [predicate.fulltext("my.book.title", searchString)],
    });
  } catch (error) {
    console.error("error", error);
  }

  return {
    searchString,
    books,
  };
};

export default function SearchResults() {
  const stuff = useActionData();
  const data = useLoaderData<LoaderData>();

  return (
    <section className="container py-16">
      <div>
        <h2 className="text-4xl font-bold leading-tight mb-6">Categories</h2>
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-10">
            {data.books.map((book) => (
              <li key={book.uid}>
                <Link href={`/book/${book.uid}`}>
                  <BookListItem book={book} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
