import { PrismicProvider as OriginalPrismicProvider } from "@prismicio/react";
import { linkResolver } from "~/utils/prismic";
import { Link } from "~/components/link";

export const PrismicProvider: React.FC = ({ children }) => (
  <OriginalPrismicProvider
    linkResolver={linkResolver}
    internalLinkComponent={Link}
  >
    {children}
  </OriginalPrismicProvider>
);
