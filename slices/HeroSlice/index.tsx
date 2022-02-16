import React from "react";
import { PrismicLink, PrismicRichText, SliceLike } from "@prismicio/react";
import { SliceComponent } from "~/types/prismic";

interface SliceFields extends SliceLike {
  primary: any;
  items: Array<any>;
}

const HeroSlice: SliceComponent<SliceFields> = ({
  slice,
  index,
  context,
  children,
  slices,
}) => {
  return (
    <section
      className="relative pt-28 pb-16 lg:pt-52 lg:pb-32 bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${slice.primary.backgroundImage.url})` }}
    >
      <div className={`absolute inset-0 bg-white opacity-80`}></div>
      <div className="container relative">
        <div className="flex flex-col items-start lg:pt-10 lg:max-w-2xl">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children, key }) => (
                <h1 className="text-5xl font-bold leading-tight mb-2" key={key}>
                  {children}
                </h1>
              ),
            }}
          />
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children, key }) => (
                <p className="text-lg mb-4" key={key}>
                  {children}
                </p>
              ),
            }}
          />
          <PrismicLink
            field={slice.primary.ctaLink}
            className="btn btn-primary"
          >
            {slice.primary.ctaText}
          </PrismicLink>
        </div>
      </div>
    </section>
  );
};

export default HeroSlice;
