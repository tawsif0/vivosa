import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import DetailsExtraSections from "../components/DetailsExtraSections";
import { mensJackets } from "../data/mensJackets";

function ColorSwatches({ colors }) {
  return (
    <div className="flex flex-wrap gap-3">
      {colors.map((c) => (
        <div key={c.name} className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border border-neutral-300"
            style={{ backgroundColor: c.hex }}
            aria-label={c.name}
            title={c.name}
          />
          <span className="text-xs text-neutral-600 font-sans">{c.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function MensJacketDetails() {
  const params = useParams();
  const item = useMemo(
    () => mensJackets.find((p) => p.id === params.id),
    [params.id],
  );

  if (!item) {
    return (
      <div className="pt-32 px-4 md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
        <p className="text-on-surface-variant font-sans">Product not found.</p>
        <Link
          className="text-leather-tan underline mt-4 inline-block font-sans"
          to="/mens/jackets-and-coats"
        >
          Back to Men&apos;s Jackets
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-20">
      <div className="bg-[#161616] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-sans text-xl md:text-2xl tracking-[0.35em] uppercase font-light text-white">
              M E N &apos; S &nbsp; J A C K E T S
            </h1>
            <p className="mt-2 text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-light">
              PREMIUM OUTERWEAR STYLES FOR MEN&apos;S PRODUCTION
            </p>
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-light font-sans">
            <Link to="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <span className="mx-2 text-neutral-700">/</span>
            <Link
              to="/mens/jackets-and-coats"
              className="hover:text-white transition-colors"
            >
              MEN&apos;S
            </Link>
            <span className="mx-2 text-neutral-700">/</span>
            <span className="text-white font-normal">{item.title}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row min-h-[500px] border-b border-neutral-100">
        <div className="w-full lg:w-1/2 bg-[#f5f5f5] min-h-[420px] lg:min-h-[700px] overflow-hidden flex items-center justify-center p-8 md:p-12">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[560px] lg:max-h-[620px] w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
          <div className="max-w-xl space-y-12">
            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                1. STYLE
              </h2>
              <p className="text-sm font-sans text-neutral-700 leading-relaxed font-light">
                {item.title}
              </p>
            </div>

            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                2. MATERIALS
              </h2>
              <div className="text-sm font-sans text-neutral-700 leading-relaxed font-light space-y-2">
                {item.composition.map((line) => (
                  <p key={`${item.id}-${line}`}>{line}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                3. AVAILABLE COLORS
              </h2>
              <ColorSwatches colors={item.colors} />
            </div>

            <div className="pt-2 border-t border-neutral-100">
              <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400 font-sans">
                Contact with us
              </p>
              <p className="mt-3 text-sm font-sans text-neutral-700 leading-relaxed font-light">
                Want more information about this product? Contact our team for MOQ,
                colorways, and customization options.
              </p>
              <a
                className="mt-6 inline-flex items-center justify-center px-10 py-3 bg-[#1c1c1c] text-white font-semibold text-xs tracking-[0.25em] uppercase hover:bg-black transition-colors font-sans"
                href="/contact"
              >
                Contact Us
              </a>
              <div className="mt-6">
                <Link
                  className="text-xs font-sans text-neutral-400 hover:text-black tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                  to="/mens/jackets-and-coats"
                >
                  Back to Men&apos;s Jackets
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailsExtraSections privacyId="privacy-mens-jackets" />
    </div>
  );
}

