import { PrismicRichText } from "@prismicio/react";
import { useEffect } from "react";
import { LoaderFunction, useCatch, useLoaderData, useParams } from "remix";
import { Link } from "~/components/link";
import { PrismicDocument } from "~/types/prismic";
import { isValidBook, isValidListBookItem } from "~/utils/book/isValidBook";
import { centsToDollars } from "~/utils/money/centsToDollars";
import {
  getPrismicDocumentFromCache,
  prismicClient,
} from "~/utils/prismic.server";
import { Book, bookDataQuery } from "~/utils/queries/book-query";

type LoaderData = { book: Book };

export const loader: LoaderFunction = async ({ request, params }) => {
  const { bookTitle = "" } = params;

  if (!bookTitle) {
    throw new Response("Not found.", {
      status: 404,
    });
  }

  let book: PrismicDocument;
  try {
    // TODO: add caching
    book = await getPrismicDocumentFromCache("book", bookTitle, {
      graphQuery: bookDataQuery,
    });
  } catch (error) {
    throw new Response(`No book found for "${bookTitle}"`, {
      status: 404,
    });
  }

  return {
    book,
  };
};

export default function Category() {
  const data = useLoaderData<LoaderData>();
  const { book } = data;
  const isValid = isValidBook(book);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !isValid) {
      console.error({ book });
      throw new Error(`Invalid book: ${JSON.stringify(book)}`);
    }
  }, [book]);

  if (!isValid) return null;
  return (
    <main className="container pt-16 pb-32">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col gap-6 items-start">
          <h1 className="text-5xl font-bold leading-tight">
            {book.data.title}
          </h1>
          <p className="text-lg">{`Written by ${book.data.authorName}`}.</p>
          <PrismicRichText field={book.data.description} />
          {/* TODO: fake buy? */}
          <Link className="btn btn-primary" href="#">
            Buy now - {centsToDollars(book.data.priceInCents)}
          </Link>
        </div>
        <div>
          <img src={book.data.coverImage.url} alt={book.data.coverImage.alt} />
        </div>
      </div>
    </main>
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();
  const params = useParams();

  return (
    <div>
      <h2 className="text-4xl font-bold leading-tight mb-2">
        No book found for "{params.bookTitle?.split("-").join(" ")}"
      </h2>
      <p>
        <strong>{caught.status}</strong>: {caught.data}
      </p>
    </div>
  );
};
