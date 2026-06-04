import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPublicSustainableLeather } from "../api/sustainableLeather";

export default function AutomotiveDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchPublicSustainableLeather(productId);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load automotive product details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <div className="animate-pulse tracking-widest font-label-caps text-sm">LOADING DETAILS...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-primary space-y-4">
        <h2 className="font-display text-2xl tracking-wider">PRODUCT NOT FOUND</h2>
        <Link to="/automotive" className="text-accent-gold font-semibold uppercase text-xs tracking-widest border-b border-accent-gold/40 pb-1">
          Back to Collection
        </Link>
      </div>
    );
  }

  const articleName = product.name || product.title;
  const spacedName = articleName.toUpperCase().split("").join(" ");

  return (
    <div className="bg-white text-primary font-body min-h-screen selection:bg-accent-gold/30">
      <main className="pt-20 md:pt-[88px]">
        {/* Dark Header Banner */}
        <section className="bg-[#222222] text-white py-14 px-6 md:px-12 lg:px-24 border-b border-neutral-800 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
            {/* Left Column: Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[0.4em] font-light uppercase text-white leading-tight">
                {spacedName}
              </h1>
              <p className="font-label-caps text-label-caps text-[#8e8e8e] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium">
                PREMIUM AUTOMOTIVE LEATHER HIDE
              </p>
            </div>

            {/* Right Column: Breadcrumbs */}
            <div className="font-label-caps text-[10px] md:text-[11px] tracking-[0.2em] text-[#8e8e8e] uppercase mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 font-medium">
              <Link to="/" className="hover:text-white hover:font-bold transition-colors duration-300">
                HOME
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <Link to="/automotive" className="hover:text-white hover:font-bold transition-colors duration-300">
                AUTOMOTIVE
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <span className="text-white font-semibold">{articleName.toUpperCase()}</span>
            </div>
          </div>
        </section>

        {/* Product Specification Section: Full-bleed 50/50 Catalog Layout */}
        <section className="bg-white border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0">

            {/* Left Column: Full-width, full-height image */}
            <div className="w-full h-[350px] sm:h-[450px] lg:h-auto min-h-[450px] overflow-hidden bg-neutral-100">
              <img
                className="w-full h-full object-cover"
                alt={product.name}
                src={product.image?.url}
              />
            </div>

            {/* Right Column: Detailed Product Specs */}
            <div className="py-16 px-6 sm:px-12 lg:px-20 xl:px-24 flex flex-col justify-center space-y-10 bg-white">

              <div className="space-y-2 border-b border-neutral-100 pb-6 max-w-xl">
                <h2 className="font-display text-xl md:text-2xl font-light tracking-[0.08em] text-neutral-800">
                  {product.code}
                </h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1">
                    <span className="font-label-caps text-[10px] tracking-widest text-[#8e8e8e] uppercase font-bold block">
                      Thickness
                    </span>
                    <p className="font-body text-[15px] text-neutral-800 font-medium">
                      {product.thickness}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-label-caps text-[10px] tracking-widest text-[#8e8e8e] uppercase font-bold block">
                      Rawhide Origin
                    </span>
                    <p className="font-body text-[15px] text-neutral-800 font-medium">
                      {product.rawhide}
                    </p>
                  </div>
                </div>
              </div>

              {/* 1. RAW MATERIAL */}
              {product.rawMaterial && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    1. RAW MATERIAL
                  </h3>
                  <p className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light">
                    {product.rawMaterial}
                  </p>
                </div>
              )}

              {/* 2. PROCESSING */}
              {product.processing && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    2. PROCESSING
                  </h3>
                  <p className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light">
                    {product.processing}
                  </p>
                </div>
              )}

              {/* 3. PRODUCT */}
              {product.productDetails && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    3. PRODUCT
                  </h3>
                  <div className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light space-y-4">
                    <p>
                      <span className="font-medium text-neutral-800">{articleName}</span> is a premium automotive leather article, with a customized thickness of <span className="font-medium text-neutral-800">{product.thickness}</span>, crafted carefully using fine <span className="font-medium text-neutral-800">{product.rawhide}</span> hides.
                    </p>
                    <div
                      className="rich-content"
                      dangerouslySetInnerHTML={{ __html: product.productDetails }}
                    />
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-neutral-100">
                <Link
                  className="text-xs font-sans text-neutral-400 hover:text-black tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                  to="/automotive"
                >
                  Back to Automotive Collection
                </Link>
              </div>

            </div>

          </div>
        </section>

        {/* HOW TO CONTACT US */}
        <section className="bg-white py-20 px-6 md:px-24 border-t border-neutral-100">
          <div className="max-w-5xl mx-auto text-center space-y-16">
            <h3 className="font-display text-[12px] md:text-[13px] tracking-[0.3em] uppercase text-neutral-800 font-bold">
              HOW TO CONTACT US
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-left">
              {/* PHONE */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#222222] rotate-45 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-white text-[14px] -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
                    call
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-[11px] tracking-[0.15em] uppercase text-neutral-800 font-bold">PHONE</h4>
                  <p className="text-[12px] md:text-[13px] text-neutral-600 font-light leading-relaxed">+39 0444 670054</p>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#222222] rotate-45 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-white text-[14px] -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-[11px] tracking-[0.15em] uppercase text-neutral-800 font-bold">ADDRESS</h4>
                  <p className="text-[12px] md:text-[13px] text-neutral-600 font-light leading-relaxed">
                    Via G.B. Zaupa, 18<br />36072 Chiampo (VI)
                  </p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#222222] rotate-45 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-white text-[14px] -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mail
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-[11px] tracking-[0.15em] uppercase text-neutral-800 font-bold">EMAIL</h4>
                  <p className="text-[12px] md:text-[13px] text-neutral-600 font-light leading-relaxed break-all">
                    info@conceriascarpanese.com<br />carpanese@legalmail.it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="bg-[#111111] text-white py-16 px-6 md:px-24 text-center space-y-6">
          <h3 className="font-display text-[12px] md:text-[14px] lg:text-[15px] tracking-[0.25em] uppercase text-[#dddddd] font-light leading-relaxed max-w-4xl mx-auto">
            WOULD YOU LIKE TO RECEIVE MORE INFORMATION ABOUT OUR PRODUCTS?
          </h3>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-block bg-white hover:bg-accent-gold text-neutral-900 hover:text-neutral-950 font-display text-[11px] tracking-[0.2em] px-10 py-3.5 transition-all duration-300 font-bold uppercase rounded-sm shadow-md"
            >
              CONTACT US
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
