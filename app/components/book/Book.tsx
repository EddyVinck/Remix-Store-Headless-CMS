import { FC, useEffect } from "react";
import { isValidBook, isValidListBookItem } from "~/utils/book/isValidBook";
import { centsToDollars } from "~/utils/money/centsToDollars";
import type { BookListItem as BookListItemData } from "~/utils/queries/books-query";

type BookListItemProps = { book: BookListItemData };

export const BookListItem: FC<BookListItemProps> = ({ book }) => {
  const isValid = isValidListBookItem(book);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !isValid) {
      throw new Error(`Invalid book: ${JSON.stringify(book)}`);
    }
  }, [book]);

  if (!isValid) return null;
  return (
    <div className="flex flex-col gap-4">
      <img src={book.data.coverImage.url} alt={book.data.coverImage.alt} />
      <h2>
        {book.data.title} - {centsToDollars(book.data.priceInCents)}
      </h2>
    </div>
  );
};
