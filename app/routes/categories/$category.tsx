import { LoaderFunction, useCatch, useLoaderData, useParams } from "remix";
import { BookListItem } from "~/components/book";
import { Link } from "~/components/link";
import { PrismicDocument } from "~/types/prismic";
import {
  getPrismicDocumentFromCache,
  getPrismicTypeFromCache,
} from "~/utils/prismic.server";
import { bookCategoriesQuery } from "~/utils/queries/book-categories-query";
import { bookListDataQuery, BookList } from "~/utils/queries/book-list-query";

type LoaderData = { books: BookList; bookCategory: PrismicDocument };

export const loader: LoaderFunction = async ({ request, params }) => {
  const { category = "" } = params;

  if (!category) {
    throw new Response("Not found.", {
      status: 404,
    });
  }

  let booksForCategory: PrismicDocument[];
  let bookCategory: PrismicDocument;
  try {
    const books = await getPrismicTypeFromCache("book", {
      graphQuery: bookListDataQuery,
    });
    bookCategory = await getPrismicDocumentFromCache(
      "book-category",
      category,
      {
        graphQuery: bookCategoriesQuery,
      }
    );
    booksForCategory = books.results.filter(
      (book) => book.data.category.uid === category
    );
  } catch (error) {
    throw new Response(`No books found for "${category}"`, {
      status: 404,
    });
  }

  return {
    books: booksForCategory as unknown as BookList,
    bookCategory,
  };
};

export default function Category() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <h2 className="text-4xl font-bold leading-tight mb-6">
        Books about {data.bookCategory.data.title}
      </h2>
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
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();
  const params = useParams();

  return (
    <div>
      <h2 className="text-4xl font-bold leading-tight mb-2">
        Books about {params.category?.split("-").join(" ")}
      </h2>
      <p>
        <strong>{caught.status}</strong>: {caught.data}
      </p>
    </div>
  );
};
