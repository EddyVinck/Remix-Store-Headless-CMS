import * as prismic from "@prismicio/client";
import { PrismicDocument } from "~/types/prismic";
import NodeCache from "node-cache";
import { accessToken, endpoint } from "./prismic-config.server";
import { prismicRoutes } from "./prismic";
import * as prismicT from "@prismicio/types";

export const prismicClient = prismic.createClient(endpoint, {
  fetch,
  accessToken,
  routes: prismicRoutes,
});

const prismicCache = new NodeCache({
  stdTTL: 60 * 10, // seconds the cache will persist
  maxKeys: 100, // maximum amount of entries, an error is thrown if we try to go over it
});

function getCacheKey(customType: string, serializedArgs: string): string {
  try {
    return `${customType}-${serializedArgs}`;
  } catch (error) {
    throw new Error(
      `Could not create cache key with arguments for customType ${customType} and args ${serializedArgs}!`
    );
  }
}

export async function getPrismicDocumentFromCache(
  customType: string,
  uid: string,
  params: Record<string, any>
): Promise<ReturnType<typeof prismicClient.getByUID>> {
  const key = getCacheKey(customType, uid);
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

export async function getPrismicTypeFromCache(
  customType: string,
  args: Record<string, any>
): Promise<ReturnType<typeof prismicClient.getByType>> {
  const serializedArgs = JSON.stringify(args);
  const key = getCacheKey(customType, serializedArgs);
  const cacheHit = prismicCache.get<prismicT.Query<PrismicDocument>>(key);
  const cacheMessage = `for key ${key}`;

  if (cacheHit === undefined) {
    console.log(`[cache] MISS ${cacheMessage}`);
    try {
      const doc = await prismicClient.getByType(customType, args);
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

function getCacheKeysStartingWith(prefix: string): string[] {
  return Object.keys(prismicCache.keys()).filter((key) =>
    key.startsWith(prefix)
  );
}

function clearCacheKeysStartingWith(prefix: string): void {
  getCacheKeysStartingWith(prefix).forEach((key) => prismicCache.del(key));
}

export async function updatePrismicDocumentInCache(id: string): Promise<void> {
  // Use ID we get from webhook to get document from Prismic
  // This will return a document containing a UID and type, which we use for our cache key
  // Which we can use to update the correct cache entry
  // When we have the UID, we also need to bust the cache for routes with specific params

  try {
    const doc = await prismicClient.getByID(id);
    const uid = doc.uid;
    const customType = doc.type;

    if (!uid) {
      // This should theoretically never happen, but just in case and to make TypeScript happy
      throw new Error(
        `Could not update cache for document with ID ${id}, missing UID!`
      );
    }

    const key = getCacheKey(customType, uid);
    clearCacheKeysStartingWith(key);
    prismicCache.set(key, doc);

    return;
  } catch (error) {
    throw new Response("Not found.", {
      status: 404,
    });
  }
}
