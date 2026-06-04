import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPublicMenApparel } from "../api/menApparel";

export default function MensSweaters() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchPublicMenApparel("sweater");
        setItems(data);
      } catch (error) {
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const formatTitle = (title) => (
    <span className="text-sm font-sans tracking-tight text-black leading-snug">
      <strong className="font-bold mr-1 text-[13px] tracking-normal uppercase">
        MEN&apos;S
      </strong>{" "}
      {title}
    </span>
  );

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-24">
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-16">
        <div className="flex flex-col gap-4 max-w-3xl">
          <span className="inline-flex items-center gap-2 font-label-caps text-[11px] tracking-[0.28em] uppercase text-leather-tan">
            Men&apos;s
          </span>
          <h1 className="font-display-lg text-4xl md:text-display-lg leading-tight text-primary">
            Sweaters
          </h1>
          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            Browse our men&apos;s sweater styles and materials.
          </p>
        </div>
      </section>

      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop pb-20 md:pb-section-gap">
        {loading ? (
          <div className="text-center py-12 text-slate-500 font-sans">Loading sweaters...</div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-sans">No sweaters available yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 md:gap-x-gutter md:gap-y-12">
            {items.map((item) => (
              <Link
                key={item._id}
                to={`/mens/sweaters/${item._id}`}
                className="group flex flex-col bg-transparent overflow-hidden transition-all duration-300"
              >
                <div className="bg-[#f5f5f5] aspect-[3/4] overflow-hidden w-full relative">
                  <img
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    src={item.image?.url}
                  />
                </div>
                <div className="pt-3 pb-2 px-1">{formatTitle(item.title)}</div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
