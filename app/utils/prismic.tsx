import { LinkResolverFunction } from "@prismicio/helpers";

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

export const prismicRoutes = [rootUidRoute, homepageRoute, contactPageRoute];

export const linkResolver: LinkResolverFunction = (document) => {
  if (document.isBroken) {
    return "/not-found";
  }
  if (document.type === "page") {
    // return `/${doc.lang}/${doc.uid}`;
    return `/${document.uid}`;
  }
  if (document.type === "book-category") {
    return `/category/${document.uid}`;
  }
  if (document.type === "home") {
    // return `/${doc.lang}`;
    return "/";
  }
  return "/";
};
