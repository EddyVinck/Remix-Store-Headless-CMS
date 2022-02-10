import { json, LoaderFunction, useLoaderData } from "remix";
import { prismicClient } from "~/utils/prismic.server";
// import {} from "@prismicio/helpers";

type LoaderData = any;

export const loader: LoaderFunction = async () => {
  const res = await prismicClient.getByType("page");

  return json(res);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <p>Loader data:</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
