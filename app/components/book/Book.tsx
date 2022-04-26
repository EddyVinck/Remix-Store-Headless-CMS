import { FC, useEffect } from "react";
import { isValidListBookItem } from "~/utils/book/isValidBook";
import { centsToDollars } from "~/utils/money/centsToDollars";
import type { BookListItem as BookListItemData } from "~/utils/queries/book-list-query";

type BookListItemProps = { book: BookListItemData };

export const BookListItem: FC<BookListItemProps> = ({ book }) => {
  const isValid = isValidListBookItem(book);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !isValid) {
      console.error({ book });
      throw new Error(`Invalid book: ${JSON.stringify(book)}`);
    }
  }, [book]);

  if (!isValid) return null;
  return (
    <div className="flex flex-col gap-4">
      <img src={book.data.coverImage.url} alt={book.data.coverImage.alt} />
      <div>
        <h2 className="font-bold">
          {book.data.title} - {centsToDollars(book.data.priceInCents)}
        </h2>
        {book.data?.category?.data.title && (
          <span className="text-sm">{book.data?.category?.data.title}</span>
        )}
      </div>
    </div>
  );
};
