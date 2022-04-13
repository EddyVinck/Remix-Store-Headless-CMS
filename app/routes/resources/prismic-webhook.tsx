import type { ActionFunction } from "remix";
import { json } from "remix";
import { Optional } from "ts-toolbelt/out/Object/Optional";
import { updatePrismicDocumentInCache } from "~/utils/prismic.server";

const examplePayload = {
  type: "api-update",
  secret: "mys3cr8t!!",
  masterRef: "U_tMgS8AADQA1t37",
  domain: "your-repo-name",
  apiUrl: "https://your-repo-name.prismic.io/api",
  releases: {
    addition: [
      {
        id: "U_sstwlGABFGWvul",
        ref: "U_sstwlGAAxGWvum",
        label: "A new release",
        documents: ["XDF-DhEAACAA5b4F"],
      },
    ],
    update: [
      {
        id: "U_ss111GABFGWvul",
        ref: "U_sstwlG222GWvum",
        label: "Some existing release",
        documents: ["XDF-DhEAACAA5b4F"],
      },
    ],
    deletion: [
      {
        id: "U_sstwlGAB333vul",
        ref: "U_sstwlGAAxG555m",
        label: "A not-so-important release",
        documents: ["XDF-DhEAACAA5b4F"],
      },
    ],
  },
  bookmarks: {},
  collection: {},
  tags: {
    addition: [
      {
        id: "current news",
      },
    ],
    deletion: [
      {
        id: "past news",
      },
    ],
  },
  documents: ["X3b_fxIAACAA-YQY"],
};

const testTrigger = {
  type: "test-trigger",
  domain: "remix-headless",
  apiUrl: "https://remix-headless.prismic.io/api",
  secret: null,
};

const publishPayload = {
  type: "api-update",
  masterRef: "YlBELhIAAJQcjkBp",
  releases: {},
  masks: {},
  tags: {},
  experiments: {},
  documents: ["YgUKzhEAACwAboG_"],
  domain: "remix-headless",
  apiUrl: "https://remix-headless.prismic.io/api",
  secret: null,
};

type PrismicWebhookPublishPayoload = typeof publishPayload;

type PrismicWebhookTestTrigger = typeof testTrigger;

type PrismicFullWebhookPayload = typeof examplePayload;

type PrismicWebhookPayload = Optional<
  PrismicFullWebhookPayload,
  "tags",
  "flat"
>;

function isPublishPayload(
  payload: Record<any, any>
): payload is PrismicWebhookPublishPayoload {
  return payload.type === "api-update";
}

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ message: "Method not allowed" }, 405);
  }
  const payload = await request.json();

  // console.log(JSON.stringify(payload, null, 2));

  if (isPublishPayload(payload)) {
    const documents = payload.documents;
    console.log("publish payload with docs: ", { documents });

    documents.forEach(async (docId) => {
      console.log(`Publishing (or unpublishing) ${docId}`);
      updatePrismicDocumentInCache(docId);
      return;
    });
  }

  /* Validate the webhook */
  // const signature = request.headers.get("X-Hub-Signature-256");
  // const generatedSignature = `sha256=${crypto
  //   .createHmac("sha256", process.env.GITHUB_WEBHOOK_SECRET)
  //   .update(JSON.stringify(payload))
  //   .digest("hex")}`;
  // if (signature !== generatedSignature) {
  //   return json({ message: "Signature mismatch" }, 401);
  // }

  /* process the webhook (e.g. enqueue a background job) */

  return json({ success: true }, 200);
};
