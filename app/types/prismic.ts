import { SliceComponentProps, SliceLike } from "@prismicio/react";
import { prismicClient } from "~/utils/prismic.server";

export interface SliceZoneContext {
  // empty, but this allows arbitrary data to be made available to all Slice components.
}

export type SliceComponent<SliceFields extends SliceLike = any> = React.FC<
  SliceComponentProps<SliceFields, SliceZoneContext>
>;

export type PrismicDocument = Awaited<
  ReturnType<typeof prismicClient.getByUID>
>;
