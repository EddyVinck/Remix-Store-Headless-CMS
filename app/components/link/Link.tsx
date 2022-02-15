import { LinkProps } from "@prismicio/react";
import { Link as RemixLink } from "remix";

/**
 * This component will be rendered by `PrismicLink` for internal links.
 * This will utilize the `linkResolver` specified in _app.tsx
 */
export const Link: React.FC<LinkProps> = ({ children, ...props }) => {
  const { href, ...restProps } = props;
  return (
    <RemixLink to={href} {...restProps}>
      {children}
    </RemixLink>
  );
};
