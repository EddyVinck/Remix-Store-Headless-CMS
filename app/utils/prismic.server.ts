// node-fetch is used to make network requests to the Prismic Rest API.
// In Node.js Prismic projects, you must provide a fetch method to the
// Prismic client.
import * as prismic from "@prismicio/client";

const repoName = "remix-headless"; // Fill in your repository name.
const accessToken = ""; // If your repo is private, add an access token.
const endpoint = prismic.getEndpoint(repoName); // Format your endpoint.

// The `routes` property is your Route Resolver. It defines how you will
// structure URLs in your project. Update the types to match the Custom
// Types in your project, and edit the paths to match the routing in your
// project.
export const rootUidRoute = {
  type: "page",
  path: "/:uid",
};
export const homepageRoute = {
  type: "homepage",
  path: "/",
};
export const contactPageRoute = {
  type: "contactpage",
  path: "/contact",
};

export const prismicRoutes = [
  rootUidRoute,
  homepageRoute,
  contactPageRoute,
  {
    type: "doesnotexist",
    path: "/lolwhat",
  },
];

export const prismicClient = prismic.createClient(endpoint, {
  fetch,
  accessToken,
  routes: prismicRoutes,
});
