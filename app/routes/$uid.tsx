import { json, LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { prismicClient } from "~/utils/prismic.server";
import { SliceLike, SliceZone } from "@prismicio/react";
import HeroSlice from "../../slices/HeroSlice";
import { SliceZoneContext } from "~/types/prismic";
// import {} from "@prismicio/helpers";

type LoaderData = { slices: SliceLike[]; doc: unknown };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.uid, "Expected params.uid");
  const uid = params.uid;

  try {
    const doc = await prismicClient.getByUID("page", uid, {});
    const data: LoaderData = { slices: doc.data.slices, doc };
    return json(data);
  } catch (error) {
    throw new Response("Not found.", {
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
      <SliceZone<any, SliceZoneContext>
        slices={data.slices}
        components={{
          hero_slice: HeroSlice,
        }}
      />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
