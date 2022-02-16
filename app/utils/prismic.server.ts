import * as prismic from "@prismicio/client";
import { PrismicDocument } from "~/types/prismic";
import NodeCache from "node-cache";
import { accessToken, endpoint } from "./prismic-config.server";
import { prismicRoutes } from "./prismic";

export const prismicClient = prismic.createClient(endpoint, {
  fetch,
  accessToken,
  routes: prismicRoutes,
});

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
  const cacheMessage = `for key ${key}`;

  if (cacheHit === undefined) {
    console.log(`[cache] MISS ${cacheMessage}`);
    try {
      const doc = await prismicClient.getByUID(customType, uid, params);
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
