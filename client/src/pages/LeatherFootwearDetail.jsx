import React from "react";
import { useParams, Link } from "react-router-dom";
import { footwearProducts } from "./footwearData";

export default function LeatherFootwearDetail() {
  const { productId } = useParams();

  // Find the matching product, default to the first if not found
  const product = footwearProducts.find((p) => p.id === productId) || footwearProducts[0];

  // Extract the article name from the title (e.g. "F016CMVNO, Arctic" -> "Arctic")
  const articleName = product.title.includes(",")
    ? product.title.split(",")[1].trim()
    : product.title;

  // Format the article name with spaces between letters for the header (e.g. "A R C T I C")
  const spacedName = articleName.toUpperCase().split("").join(" ");

  return (
    <div className="bg-white text-primary font-body min-h-screen selection:bg-accent-gold/30">
      <main className="pt-20 md:pt-[88px]">
        {/* Dark Header Banner exactly matching the mockup */}
        <section className="bg-[#222222] text-white py-14 px-6 md:px-12 lg:px-24 border-b border-neutral-800 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
            {/* Left Column: Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="font-display text-2xl md:text-3xl lg:text-4xl tracking-[0.4em] font-light uppercase text-white leading-tight">
                {spacedName}
              </h1>
              <p className="font-label-caps text-label-caps text-[#8e8e8e] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Right Column: Breadcrumbs */}
            <div className="font-label-caps text-[10px] md:text-[11px] tracking-[0.2em] text-[#8e8e8e] uppercase mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 font-medium">
              <Link to="/" className="hover:text-accent-gold transition-colors duration-300">
                HOME
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <span className="text-[#8e8e8e]">PRODUCTS</span>
              <span className="text-[#555555] select-none">/</span>
              <Link to="/leather-footwear" className="hover:text-accent-gold transition-colors duration-300">
                FOOTWEAR
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <span className="text-white font-semibold">{articleName.toUpperCase()}</span>
            </div>
          </div>
        </section>

        {/* Dynamic Product Specification Section: Full-bleed 50/50 Catalog Layout */}
        <section className="bg-white border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0">
            
            {/* Left Column: Full-width, full-height image with 0 borders, 0 margin, 0 padding (exact mockup match) */}
            <div className="w-full h-[350px] sm:h-[450px] lg:h-auto min-h-[450px] overflow-hidden bg-neutral-100">
              <img
                className="w-full h-full object-cover"
                alt={product.fullName}
                src={product.src}
              />
            </div>

            {/* Right Column: Detailed Product Specs with luxurious padding */}
            <div className="py-16 px-6 sm:px-12 lg:px-20 xl:px-24 flex flex-col justify-center space-y-10 bg-white">
              
              {/* 1. RAW MATERIAL */}
              <div className="space-y-3 max-w-xl">
                <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                  1. RAW MATERIAL
                </h3>
                <p className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light">
                  {product.rawMaterial}
                </p>
              </div>

              {/* 2. PROCESSING */}
              <div className="space-y-3 max-w-xl">
                <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                  2. PROCESSING
                </h3>
                <p className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light">
                  {product.processing}
                </p>
              </div>

              {/* 3. PRODUCT */}
              <div className="space-y-3 max-w-xl">
                <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                  3. PRODUCT
                </h3>
                <div className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light space-y-4">
                  <p>
                    <span className="font-medium text-neutral-800">{articleName}</span> is a premium footwear leather article, with a customized thickness of <span className="font-medium text-neutral-800">{product.thickness}</span>, crafted carefully using fine <span className="font-medium text-neutral-800">{product.rawhide}</span> hides.
                  </p>
                  <p>
                    {product.productDetails}
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Section A: KEEP INFORMED ABOUT OUR NEWS (Same-to-Same as mockup) */}
        <section className="bg-neutral-50 py-16 px-6 md:px-24 border-t border-neutral-200/60">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <h3 className="font-display text-[12px] md:text-[13px] tracking-[0.3em] uppercase text-neutral-800 font-bold">
              KEEP INFORMED ABOUT OUR NEWS
            </h3>
            
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-stretch justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="ENTER YOUR EMAIL ADDRESS"
                className="w-full bg-white border border-neutral-300 px-4 py-3 text-[11px] text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-500 font-display tracking-widest uppercase text-center sm:text-left h-11"
                required
              />
              <button
                type="submit"
                className="bg-[#222222] hover:bg-neutral-800 text-white font-display text-[11px] tracking-widest px-8 py-3 transition-colors duration-300 font-semibold uppercase sm:ml-[-1px] mt-2 sm:mt-0 flex-shrink-0 h-11"
              >
                SUBSCRIBE
              </button>
            </form>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500 max-w-sm mx-auto leading-relaxed">
              <input 
                type="checkbox" 
                id="privacy-policy" 
                className="mt-0.5 border-neutral-300 rounded-sm cursor-pointer accent-[#222]" 
                required 
              />
              <label htmlFor="privacy-policy" className="cursor-pointer select-none">
                I declare that I have read and accepted the privacy policy. <a href="/privacy" className="underline hover:text-neutral-800">(read the policy)</a>
              </label>
            </div>
          </div>
        </section>

        {/* Section B: HOW TO CONTACT US (Same-to-Same as mockup with 45deg rotated black diamonds) */}
        <section className="bg-white py-20 px-6 md:px-24 border-t border-neutral-100">
          <div className="max-w-5xl mx-auto text-center space-y-16">
            <h3 className="font-display text-[12px] md:text-[13px] tracking-[0.3em] uppercase text-neutral-800 font-bold">
              HOW TO CONTACT US
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-left">
              {/* PHONE Column */}
              <div className="flex items-start gap-4">
                {/* 45-degree rotated diamond container */}
                <div className="w-8 h-8 bg-[#222222] rotate-45 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  {/* Icon unrotated inside */}
                  <span className="material-symbols-outlined text-white text-[14px] -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
                    call
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-[11px] tracking-[0.15em] uppercase text-neutral-800 font-bold">
                    PHONE
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-neutral-600 font-light leading-relaxed">
                    +39 0444 670054
                  </p>
                </div>
              </div>

              {/* ADDRESS Column */}
              <div className="flex items-start gap-4">
                {/* 45-degree rotated diamond container */}
                <div className="w-8 h-8 bg-[#222222] rotate-45 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-white text-[14px] -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
                    location_on
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-[11px] tracking-[0.15em] uppercase text-neutral-800 font-bold">
                    ADDRESS
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-neutral-600 font-light leading-relaxed">
                    Via G.B. Zaupa, 18
                    <br />
                    36072 Chiampo (VI)
                  </p>
                </div>
              </div>

              {/* EMAIL Column */}
              <div className="flex items-start gap-4">
                {/* 45-degree rotated diamond container */}
                <div className="w-8 h-8 bg-[#222222] rotate-45 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                  <span className="material-symbols-outlined text-white text-[14px] -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
                    mail
                  </span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-display text-[11px] tracking-[0.15em] uppercase text-neutral-800 font-bold">
                    EMAIL
                  </h4>
                  <p className="text-[12px] md:text-[13px] text-neutral-600 font-light leading-relaxed break-all">
                    info@conceriascarpanese.com
                    <br />
                    carpanese@legalmail.it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section C: Pure Black Bottom CTA Banner (Same-to-Same as mockup) */}
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

        {/* Section D: Elegant Navigation Links (Positioned at the ABSOLUTE bottom of the page, below Section C) */}
        <section className="bg-white py-12 px-6 md:px-12 lg:px-24 border-t border-neutral-100">
          <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
            <Link
              to="/leather-footwear"
              className="inline-flex items-center gap-2 text-accent-gold hover:text-primary font-label-caps text-xs tracking-widest transition-colors duration-300 font-bold"
            >
              <span>← Back to Footwear Collection</span>
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#222222] hover:bg-accent-gold text-white hover:text-primary font-label-caps text-[11px] tracking-widest px-6 py-3 transition-all duration-300 rounded-sm font-semibold animate-shimmer"
            >
              <span>Inquire Swatch</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
