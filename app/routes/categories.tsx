import {
  json,
  LoaderFunction,
  Outlet,
  useCatch,
  useLoaderData,
  useParams,
} from "remix";
import { getPrismicTypeFromCache } from "~/utils/prismic.server";
import {
  bookCategoriesQuery,
  BookCategoryList,
} from "~/utils/queries/book-categories-query";
import { BookCategoryListItem } from "~/components/book-category";
import { Link } from "~/components/link";

type LoaderData = {
  bookCategories: BookCategoryList;
};

export const loader: LoaderFunction = async ({ params }) => {
  try {
    // TODO: add caching
    const bookCategories = await getPrismicTypeFromCache("book-category", {
      graphQuery: bookCategoriesQuery,
    });

    const data: LoaderData = {
      bookCategories: bookCategories.results as unknown as BookCategoryList,
    };
    return json(data);
  } catch (error) {
    throw new Response(`No categories found`, {
      status: 404,
    });
  }
};

export default function CategoriesLayout() {
  const data = useLoaderData<LoaderData>();
  const params = useParams();

  // Using useParams here instead of the loader because Remix (by design) won't call loaders of common ancestor routes without a mutation/action
  // Doing so in the loader would mean having stale data, e.g. showing the incorrect category title after changing categories
  const currentCategory = data.bookCategories.find(
    (category) => category.uid === params.category
  );
  const title = currentCategory
    ? `${currentCategory.data.title} Books`
    : "Explore your favorite book genres";

  return (
    <main className="pt-16 pb-32 container grid grid-cols-1 gap-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold leading-tight mb-2">{title}</h1>
        <p>Take a look around. We have the best books.</p>
      </div>
      <div>
        <h2 className="text-4xl font-bold leading-tight mb-6">Categories</h2>
        <div>
          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {data.bookCategories.map((category) => (
              <li key={category.uid}>
                <Link href={category.uid}>
                  <BookCategoryListItem category={category} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
}

export const CatchBoundary = () => {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
};
