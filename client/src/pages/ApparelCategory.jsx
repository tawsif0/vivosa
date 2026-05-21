import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

function titleizeSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ApparelCategory({ kind }) {
  const params = useParams();
  const category = params.category || "";

  const heading = useMemo(() => {
    const prefix = kind === "womens" ? "Women's" : "Men's";
    return `${prefix} / ${titleizeSlug(category)}`;
  }, [category, kind]);

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-24">
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 font-label-caps text-[11px] tracking-[0.28em] uppercase text-leather-tan">
            Apparel
          </span>
          <h1 className="font-display-lg text-4xl md:text-display-lg leading-tight text-primary">
            {heading}
          </h1>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Category landing page. If you want these categories to match your
            existing Mensware/Womenswear sections, tell me and I will map the
            dropdown items to the correct sections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <a
              className="inline-flex items-center justify-center px-7 py-3 bg-deep-forest text-off-white font-label-caps uppercase tracking-widest hover:bg-leather-tan transition-colors"
              href="/contact"
            >
              Contact for Catalog
            </a>
            <a
              className="inline-flex items-center justify-center px-7 py-3 border border-outline/20 text-on-surface font-label-caps uppercase tracking-widest hover:bg-surface-container-low transition-colors"
              href={kind === "womens" ? "/womenswear" : "/mensware"}
            >
              View Brand Page
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop pb-20 md:pb-section-gap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-gutter">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={`${kind}-${category}-${index}`}
              className="rounded-2xl border border-outline/10 bg-surface overflow-hidden shadow-sm"
            >
              <div className="aspect-[4/3] bg-surface-container-low flex items-center justify-center text-on-surface-variant/60">
                <span className="font-label-caps text-[11px] tracking-[0.28em] uppercase">
                  Coming soon
                </span>
              </div>
              <div className="px-5 py-4">
                <p className="font-semibold text-on-surface">
                  {titleizeSlug(category)} Item {index + 1}
                </p>
                <p className="text-sm text-on-surface-variant/70 mt-1">
                  Placeholder until real catalog is added.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

