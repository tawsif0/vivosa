import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { swimLingerieProducts } from "../data/swimLingerieProducts";

export default function SwimLingerie() {
  const items = useMemo(() => swimLingerieProducts, []);

  const formatTitle = (product) => {
    const isLingerie = product.id === "p07" || product.id === "p08" || product.title.toLowerCase().includes("lingerie");
    const prefix = isLingerie ? "LINGERIE" : "SWIMWEAR";
    let cleaned = product.title;

    if (cleaned.toLowerCase().startsWith("lingerie set")) {
      cleaned = "Lingerie Set";
    }

    return (
      <span className="text-sm font-sans tracking-tight text-black leading-snug">
        <strong className="font-bold mr-1 text-[13px] tracking-normal uppercase">{prefix}</strong> {cleaned}
      </span>
    );
  };

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-24">
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 font-label-caps text-[11px] tracking-[0.28em] uppercase text-leather-tan">
            Women&apos;s
          </span>
          <h1 className="font-display-lg text-4xl md:text-display-lg leading-tight text-primary">
            Swim &amp; Lingerie
          </h1>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Styles, materials, and details are based on our collection brief.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop pb-20 md:pb-section-gap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-gutter md:gap-y-12">
          {items.map((product) => (
            <Link
              key={product.id}
              to={`/womens/swim-lingerie/${product.id}`}
              className="group flex flex-col bg-transparent overflow-hidden transition-all duration-300"
            >
              <div className="bg-[#f5f5f5] aspect-[3/4] overflow-hidden w-full relative">
                <img
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  src={product.cardImage}
                />
              </div>
              <div className="pt-3 pb-2 px-1">
                {formatTitle(product)}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
