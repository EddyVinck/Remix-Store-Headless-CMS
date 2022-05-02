import { Link } from "~/components/link";
import { Logo } from "~/components/logo";

export const Navbar = () => {
  return (
    <header className="shadow-sm">
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between space-x-4 lg:space-x-10">
          <div className="flex lg:w-0 lg:flex-1">
            <Logo />
          </div>
          <nav className="hidden space-x-8 text-sm font-medium md:flex">
            <Link className="text-gray-500" href="about-us">
              About us
            </Link>
            <Link className="text-gray-500" href="categories">
              Categories
            </Link>
            <Link className="text-gray-500" href="search">
              Search
            </Link>
          </nav>
          <div className="items-center justify-end flex-1 hidden space-x-4 sm:flex">
            <a
              className="px-5 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-lg"
              href="#"
            >
              Log in
            </a>
            <a
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
              href="#"
            >
              Sign up
            </a>
          </div>
          <div className="lg:hidden">
            <button
              className="p-2 text-gray-600 bg-gray-100 rounded-lg"
              type="button"
            >
              <span className="sr-only">Open menu</span>
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
