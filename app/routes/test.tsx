import { json, LoaderFunction, useLoaderData } from "remix";
import { prismicClient } from "~/utils/prismic.server";
import { SliceLike, SliceZone } from "@prismicio/react";
import { useEffect } from "react";
import HeroSlice from "../../slices/HeroSlice";
// import {} from "@prismicio/helpers";

type LoaderData = { slices: SliceLike<string>[] };

export const loader: LoaderFunction = async () => {
  try {
    const doc = await prismicClient.getByUID("homepage", "home", {});
    const data: LoaderData = { slices: doc.data.slices };
    return json(data);
  } catch (error) {
    throw new Response("What a joke! Not found.", {
      status: 404,
    });
  }
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <p>Loader data:</p>
      <SliceZone
        slices={data.slices}
        components={{
          hero_slice: HeroSlice,
        }}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
