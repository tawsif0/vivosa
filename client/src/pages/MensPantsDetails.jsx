import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { mensPants } from "../data/mensPantsProducts";
import DetailsExtraSections from "../components/DetailsExtraSections";

export default function MensPantsDetails() {
  const { id } = useParams();
  const item = useMemo(() => mensPants.find(p => p.id === id), [id]);

  if (!item) {
    return (
      <div className="pt-32 px-4 md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
        <p className="text-on-surface-variant font-sans">Product not found.</p>
        <Link className="text-leather-tan underline mt-4 inline-block font-sans" to="/mens/pants">
          Back to Men&#39;s Pants
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-20">
      {/* Dark Title Bar */}
      <div className="bg-[#161616] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-sans text-xl md:text-2xl tracking-[0.35em] uppercase font-light text-white">
              M E N &#39; S P A N T S
            </h1>
            <p className="mt-2 text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-light">
              PREMIUM PANTS COLLECTION FOR MEN
            </p>
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-light font-sans">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="mx-2 text-neutral-700">/</span>
            <Link to="/mens/pants" className="hover:text-white transition-colors">MEN&#39;S PANTS</Link>
            <span className="mx-2 text-neutral-700">/</span>
            <span className="text-white font-normal">{item.title}</span>
          </div>
        </div>
      </div>

      {/* Two-Column Details */}
      <div className="w-full flex flex-col lg:flex-row min-h-[500px] border-b border-neutral-100">
        {/* Left: Images */}
        <div className="w-full lg:w-1/2 bg-[#f5f5f5] min-h-[420px] lg:min-h-[700px] overflow-hidden flex items-center justify-center p-8 md:p-12">
          <img
            src={item.image}
            alt={item.title}
            className="max-h-[560px] lg:max-h-[620px] w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
        {/* Right: Details */}
        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
          <div className="max-w-xl space-y-12">
            {/* Style */}
            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">1. STYLE</h2>
              <p className="text-sm font-sans text-neutral-700 leading-relaxed font-light">{item.title}</p>
            </div>
            {/* Materials */}
            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">2. MATERIALS</h2>
              <div className="text-sm font-sans text-neutral-700 leading-relaxed font-light space-y-2">
                {item.composition.map((line, idx) => (
                  <p key={idx}>{line}</p>
                ))}
              </div>
            </div>
            {/* Colors */}
            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">3. COLORS</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {item.detailImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={item.title}
                    className="w-full h-auto max-h-24 object-contain border border-neutral-200 bg-white"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
            {/* Contact */}
            <div className="pt-2 border-t border-neutral-100">
              <p className="text-[11px] tracking-[0.28em] uppercase text-neutral-400 font-sans">Contact with us</p>
              <p className="mt-3 text-sm font-sans text-neutral-700 leading-relaxed font-light">
                Want more information about this product? Contact our team for MOQ, colorways, and customization options.
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
                  to="/mens/pants"
                >
                  Back to Men&#39;s Pants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailsExtraSections privacyId="privacy-mens-pants" />
    </div>
  );
}
