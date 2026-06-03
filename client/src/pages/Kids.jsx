import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublicKids } from "../api/kids";

export default function Kids() {
  const [kids, setKids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKids = async () => {
      try {
        const data = await fetchPublicKids();
        setKids(data);
      } catch (error) {
        setKids([]);
      } finally {
        setLoading(false);
      }
    };

    loadKids();
  }, []);

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
            Browse the latest kidswear pieces managed from the Vivosa admin dashboard.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop pb-20 md:pb-section-gap">
        {loading ? (
          <div className="rounded-2xl border border-outline-variant/20 bg-surface-bright p-8 text-center text-on-surface-variant">
            Loading kids collection...
          </div>
        ) : kids.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant/20 bg-surface-bright p-8 text-center text-on-surface-variant">
            No kids products available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-gutter md:gap-y-12">
            {kids.map((product) => (
              <Link
                key={product._id}
                to={`/kids/${product._id}`}
                className="group flex flex-col bg-transparent overflow-hidden transition-all duration-300"
              >
                <div className="bg-[#f5f5f5] aspect-[3/4] overflow-hidden w-full relative">
                  <img
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={product.image?.url}
                  />
                </div>
                <div className="pt-3 pb-2 px-1">
                  <span className="text-sm font-sans tracking-tight text-black leading-snug">
                    <strong className="font-bold mr-1 text-[13px] tracking-normal uppercase">
                      KID&apos;S
                    </strong>{" "}
                    {product.title}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
