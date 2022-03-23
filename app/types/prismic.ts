import { SliceComponentProps, SliceLike } from "@prismicio/react";
import { prismicClient } from "~/utils/prismic.server";

export interface SliceZoneContext {
  // empty, but this allows arbitrary data to be made available to all Slice components.
}

// TODO: Figure out how to satisfy the SliceLike constraints in types
export type SliceTypes = any;

export type SliceComponent<SliceFields extends SliceLike = any> = React.FC<
  SliceComponentProps<SliceFields, SliceZoneContext>
>;

export type PrismicDocument = Awaited<
  ReturnType<typeof prismicClient.getByUID>
>;
