import NodeCache from "node-cache";
import { prismicClient } from "./prismic.server";
import { PrismicDocument } from "~/types/prismic";

const prismicCache = new NodeCache({
  stdTTL: 10, // seconds the cache will persist
  maxKeys: 100, // maximum amount of entries, an error is thrown if we try to go over it
});

function getCacheKey(
  customType: string,
  uid: string,
  params: Record<string, any> = {}
): string {
  try {
    return `${customType}-${uid}-${JSON.stringify(params)}`;
  } catch (error) {
    throw new Error(
      `Could not create cache key with arguments for customType ${customType} and UID ${uid}!`
    );
  }
}

export async function getPrismicDocumentFromCache(
  customType: string,
  uid: string,
  params: Record<string, any>
): Promise<ReturnType<typeof prismicClient.getByUID>> {
  const key = getCacheKey(customType, uid, params);
  const cacheHit = prismicCache.get<PrismicDocument>(key);
  // const cacheMessage = `for customType ${customType} with UID ${uid}`;
  const cacheMessage = `for key ${key}`;
  console.log(JSON.stringify(params));

  if (cacheHit === undefined) {
    console.log(`[cache] MISS ${cacheMessage}`);
    try {
      const doc = await prismicClient.getByUID(customType, uid, params);
      console.log(`[cache] setting cache for key ${key}`);
      prismicCache.set(key, doc);
      return doc;
    } catch (error) {
      throw new Response("Not found.", {
        status: 404,
      });
    }
  }

  console.log(`[cache] HIT ${cacheMessage}`);

  return cacheHit;
}

const prismicHomepageDocExample = {
  id: "YgUKzhEAACwAboG_",
  uid: "home",
  url: "/",
  type: "homepage",
  href: "https://remix-headless.cdn.prismic.io/api/v2/documents/search?ref=Yguq4hEAAC0Ai9fX&q=%5B%5B%3Ad+%3D+at%28document.id%2C+%22YgUKzhEAACwAboG_%22%29+%5D%5D",
  tags: [],
  first_publication_date: "2022-02-10T12:53:44+0000",
  last_publication_date: "2022-02-10T12:59:33+0000",
  slugs: ["homepage"],
  linked_documents: [],
  lang: "en-us",
  alternate_languages: [],
  data: {
    slices: [
      {
        slice_type: "hero_slice",
        slice_label: null,
        version: "sktwi1xtmkfgx8626",
        variation: "default-slice",
        primary: {
          title: [
            {
              type: "heading1",
              text: "test",
              spans: [],
            },
          ],
          description: [
            {
              type: "paragraph",
              text: "test",
              spans: [],
            },
          ],
          ctaLink: {
            link_type: "Document",
          },
          ctaText: "test",
          backgroundImage: {
            dimensions: {
              width: 1440,
              height: 963,
            },
            alt: "Laptop with a compact disc sticking out",
            copyright: null,
            url: "https://images.prismic.io/remix-headless/189a389d-06f7-40fe-ace0-001dc85e4ddf_chris-yates-iqELIpzpARI-unsplash.jpg?auto=compress,format&rect=0,0,1920,1284&w=1440&h=963",
          },
        },
        items: [{}],
      },
    ],
    metaDescription: "test",
    metaTitle: "test",
  },
};
