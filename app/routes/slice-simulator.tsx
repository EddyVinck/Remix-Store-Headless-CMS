/* eslint-disable */
// @ts-nocheck

// Info: Disabled these rules as this file should only be available during development!

import { SliceSimulator } from "@prismicio/slice-simulator-react";
import SliceZone from "next-slicezone";

import state from "../../.slicemachine/libraries-state.json";

import * as Slices from "../../slices";
const resolver = ({ sliceName }) => Slices[sliceName];

export const loader = () => {
  const includeSliceSimulator = process.env.NODE_ENV !== "production";

  if (!includeSliceSimulator) {
    throw new Response("Not found.", { status: 404 });
  }
  return true;
};

const SliceSimulatorPage = () => (
  <SliceSimulator
    // The `sliceZone` prop should be a function receiving slices and rendering them using your `SliceZone` component.
    sliceZone={(props) => <SliceZone {...props} resolver={resolver} />}
    state={state}
  />
);

export default SliceSimulatorPage;
