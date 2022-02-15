import { json, LoaderFunction, useLoaderData } from "remix";
import { homepageRoute, linkResolver } from "~/utils/prismic.server";
import { PrismicProvider, SliceLike, SliceZone } from "@prismicio/react";
import HeroSlice from "../../slices/HeroSlice";
import { SliceZoneContext } from "~/types/prismic";
import { getPrismicDocumentFromCache } from "~/utils/prismic-cache.server";

type LoaderData = { slices: SliceLike[]; doc: unknown };

export const loader: LoaderFunction = async () => {
  try {
    const doc = await getPrismicDocumentFromCache("homepage", "home", {
      routes: [homepageRoute],
    });
    const data: LoaderData = { slices: doc.data.slices, doc };
    return json(data);
  } catch (error) {
    throw new Response("What a joke! Not found.", {
      status: 404,
    });
  }
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  console.log(data);
  return (
    // <PrismicProvider linkResolver={linkResolver}>
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <SliceZone<any, SliceZoneContext>
        slices={data.slices}
        components={{
          hero_slice: HeroSlice,
        }}
      />
    </div>
    // </PrismicProvider>
  );
}
