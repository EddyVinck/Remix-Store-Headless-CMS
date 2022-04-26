import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import styles from "~/styles/app.css";
import { PrismicProvider } from "~/components/prismic/provider";
import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", type: "image/png", href: "/favicon.png" },
  ];
}

export const meta: MetaFunction = () => {
  return { title: "Remix Book Store" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <PrismicProvider>
          <Navbar />
          <Outlet />
          <Footer />
        </PrismicProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
