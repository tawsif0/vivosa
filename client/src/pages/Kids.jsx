import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { kidsProducts } from "../data/kidsProducts";

export default function Kids() {
  const items = useMemo(() => kidsProducts, []);

  const formatTitle = (style) => {
    let cleaned = style;
    let prefix = "KIDS";
    if (cleaned.toLowerCase().startsWith("kid's")) {
      cleaned = cleaned.substring(5).trim();
    } else if (cleaned.toLowerCase().startsWith("kids")) {
      cleaned = cleaned.substring(4).trim();
    } else if (cleaned.toLowerCase().startsWith("kinds")) {
      cleaned = cleaned.substring(5).trim();
    } else if (cleaned.toLowerCase().startsWith("baby/kids")) {
      cleaned = cleaned.substring(9).trim();
      prefix = "BABY & KIDS";
    }
    
    if (cleaned.length > 0) {
      cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
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
            Kids
          </span>
          <h1 className="font-display-lg text-4xl md:text-display-lg leading-tight text-primary">
            Kids Wear Collection
          </h1>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Browse kidswear styles and material compositions. Product visuals and
            notes are based on our kidswear collection brief.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop pb-20 md:pb-section-gap">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-gutter md:gap-y-12">
          {items.map((product) => (
            <Link
              key={product.id}
              to={`/kids/${product.id}`}
              className="group flex flex-col bg-transparent overflow-hidden transition-all duration-300"
            >
              <div className="bg-[#f5f5f5] aspect-[3/4] overflow-hidden w-full relative">
                <img
                  alt={product.style}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  src={product.image}
                />
              </div>
              <div className="pt-3 pb-2 px-1">
                {formatTitle(product.style)}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
