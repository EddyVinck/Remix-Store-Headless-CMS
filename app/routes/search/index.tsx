import { json, LoaderFunction, useLoaderData } from "remix";
import { BookCategoryListItem } from "~/components/book-category";
import { Link } from "~/components/link";
import { getPrismicTypeFromCache } from "~/utils/prismic.server";
import {
  bookCategoriesQuery,
  BookCategoryList,
} from "~/utils/queries/book-categories-query";

type LoaderData = {
  bookCategories: BookCategoryList;
};

export const loader: LoaderFunction = async () => {
  try {
    const bookCategories = await getPrismicTypeFromCache("book-category", {
      graphQuery: bookCategoriesQuery,
    });
    const data: LoaderData = {
      bookCategories: bookCategories.results as unknown as BookCategoryList,
    };
    return json(data);
  } catch (error) {
    throw new Response("Not found.", {
      status: 404,
    });
  }
};

export default function SearchIndex() {
  const data = useLoaderData<LoaderData>();
  return (
    <section className="container py-16 grid grid-cols-1 gap-6">
      <h1 className="text-4xl font-bold">Categories</h1>
      <div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.bookCategories.map((category) => (
            <li key={category.uid}>
              <Link href={`/categories/${category.uid}`}>
                <BookCategoryListItem category={category} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
