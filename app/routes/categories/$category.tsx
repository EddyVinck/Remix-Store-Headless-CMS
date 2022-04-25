import { LoaderFunction, useCatch, useLoaderData, useParams } from "remix";
import { BookListItem } from "~/components/book";
import { PrismicDocument } from "~/types/prismic";
import { prismicClient } from "~/utils/prismic.server";
import { bookDataQuery, BookList } from "~/utils/queries/books-query";

type LoaderData = { books: BookList };

export const loader: LoaderFunction = async ({ request, params }) => {
  const { category = "" } = params;

  if (!category) {
    throw new Response("Not found.", {
      status: 404,
    });
  }

  let booksForCategory: PrismicDocument[];
  try {
    // TODO: add caching
    const books = await prismicClient.getByType("book", {
      graphQuery: bookDataQuery,
    });
    // TODO: filter via Prismic Predicates instead of this manual filtering
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
  };
};

export default function Category() {
  const data = useLoaderData<LoaderData>();
  const params = useParams();

  return (
    <div>
      <h2 className="text-4xl font-bold leading-tight mb-2">
        Books about {params.category}
      </h2>
      <div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y-10">
          {data.books.map((book) => (
            <li key={book.uid}>
              <BookListItem book={book} />
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
        Books about {params.category}
      </h2>
      <p>
        <strong>{caught.status}</strong>: {caught.data}
      </p>
    </div>
  );
};
