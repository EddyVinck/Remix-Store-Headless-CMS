import { LinkProps } from "@prismicio/react";
import { AnchorHTMLAttributes } from "react";
import { Link as RemixLink } from "remix";

/**
 * This component will be rendered by `PrismicLink` for internal links.
 * This will utilize the `linkResolver` specified in app/utils/prismic.tsx via the PrismicProvider context
 * TODO: accept a Prismic document as a prop so we can use the `linkResolver` to resolve the link
 */
export const Link: React.FC<
  LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ children, ...props }) => {
  const { href, ...restProps } = props;
  return (
    <RemixLink to={href} {...restProps}>
      {children}
    </RemixLink>
  );
};
