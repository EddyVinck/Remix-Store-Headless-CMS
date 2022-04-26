import { FC, useEffect } from "react";
import { isValidBookCategory } from "~/utils/category/isValidCategory";
import type { BookCategoryListItem as BookCategoryListItemData } from "~/utils/queries/book-categories-query";

type BookCategoryListItemProps = { category: BookCategoryListItemData };

export const BookCategoryListItem: FC<BookCategoryListItemProps> = ({
  category,
}) => {
  const isValid = isValidBookCategory(category);

  useEffect(() => {
    if (process.env.NODE_ENV === "development" && !isValid) {
      console.error({ category });
      throw new Error(`Invalid category`);
    }
  }, [category]);

  if (!isValid) return null;
  return (
    <div className="flex flex-col gap-4">
      <img src={category.data.image.url} alt={category.data.image.alt} />
      <div>
        <h2 className="font-bold">{category.data.title}</h2>
      </div>
    </div>
  );
};
