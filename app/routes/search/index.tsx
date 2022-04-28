export default function SearchPage() {
  return (
    <section className="p-12 bg-gray-100 sm:p-16 lg:p-24">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-sm font-medium text-gray-600">Search</p>
        <p className="mt-2 text-3xl font-bold text-black sm:text-4xl">
          What book are you looking for?
        </p>
        <form className="mt-8 sm:flex">
          <div className="sm:flex-1">
            <label htmlFor="search" className="sr-only">
              Email
            </label>
            <input
              type="search"
              placeholder="Book title..."
              className="w-full p-3 text-black bg-white border-2 border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-between w-full px-5 py-3 mt-4 font-medium text-white bg-blue-600 rounded-lg sm:w-auto sm:mt-0 sm:ml-4 hover:bg-blue-500"
          >
            Search
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 w-4 h-4 ml-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
