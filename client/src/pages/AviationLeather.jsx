import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

// Premium parallax: the element starts slightly above its resting position and
// glides gently downward as it scrolls through the viewport. Driven by a rAF
// loop with eased interpolation and mutated directly on the DOM for fluid,
// high-performance scrolling that never affects the surrounding layout.
function useParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const TRAVEL = 70; // downward drift in px (subtle, avoids overlapping below)
    const EASE = 0.1; // lower = smoother, more gradual catch-up
    let target = 0;
    let current = 0;
    let rafId;
    let running = true;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(Math.max(p, 0), 1);
      // aligned at entry (0), then drifts continuously downward
      // — visible the whole way through, and never rises above the text
      target = clamped * TRAVEL;
    };

    const tick = () => {
      if (!running) return;
      current += (target - current) * EASE;
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    measure();
    current = target;
    tick();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return ref;
}

// Split-layout aviation image card with the scroll parallax applied
function ParallaxImage({ src, alt }) {
  const ref = useParallax();
  return (
    <div
      ref={ref}
      className="w-full max-w-[450px] aspect-[4/3] rounded-xl overflow-hidden shadow-xl border border-[#2A2B2D] bg-gradient-to-b from-[#2A2C2E] to-[#121315] flex items-center justify-center p-4 will-change-transform"
    >
      <img
        src={src}
        alt={alt}
        className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-700"
      />
    </div>
  );
}

export default function AviationLeather() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchPublicSustainableLeathers("aviation");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load aviation products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="bg-[#F5F0E8] text-on-surface selection:bg-matte-gold selection:text-white overflow-x-hidden min-h-screen">
      <main className="pt-20 md:pt-[88px] space-y-20 md:space-y-28">
        {/* Section 1: Hero / Cover (av1 & av2 side by side) */}
        <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
          <div className="absolute inset-0 z-0 grid grid-cols-2 gap-1 bg-[#1A1A1A]">
            <img
              src="/slides/aviation-pdf-pages/av1.png"
              alt="Aviation Leather Cover 1"
              className="w-full h-full object-cover opacity-85"
              loading="eager"
            />
            <img
              src="/slides/aviation-pdf-pages/av2.png"
              alt="Aviation Leather Cover 2"
              className="w-full h-full object-cover opacity-85"
              loading="eager"
            />
          </div>
          {/* Dark Overlay with centered writings */}
          <div className="absolute inset-0 z-10 bg-black/40 flex flex-col items-center justify-center p-6 text-center">
            <h1 className="font-display text-3xl md:text-6xl text-white uppercase tracking-[0.1em] font-bold mb-6">
              Aviation Leather Solutions
            </h1>
            <div className="w-20 h-[2px] bg-matte-gold mb-6"></div>
            <p className="font-body text-sm md:text-lg text-white/95 max-w-2xl leading-relaxed">
              The global aviation industry continues to grow and innovate, with
              increasing emphasis on comfort, design, performance, and
              sustainability.
            </p>
          </div>
          {/* Scroll Down Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
            <span
              className="material-symbols-outlined text-matte-gold text-3xl animate-bounce"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              flight_takeoff
            </span>
            <div className="w-[1px] h-10 bg-matte-gold/40"></div>
          </div>
        </section>

        {/* Section 2: Every Journey Matters (av3, av4, av5 on top, text below) */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-12">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-neutral-200 bg-white">
              <img
                src="/slides/aviation-pdf-pages/av3.png"
                alt="Every Journey Matters Part 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-neutral-200 bg-white">
              <img
                src="/slides/aviation-pdf-pages/av4.png"
                alt="Every Journey Matters Part 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-neutral-200 bg-white">
              <img
                src="/slides/aviation-pdf-pages/av5.png"
                alt="Every Journey Matters Part 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Writings below */}
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="font-display text-2xl md:text-3xl text-matte-gold tracking-wide uppercase font-bold text-center">
              Every Journey Matters
            </h2>
            <p className="font-body text-lg md:text-xl text-neutral-900 font-semibold leading-relaxed max-w-4xl mx-auto">
              Whether in a private jet, business class cabin, or economy
              seating, comfort and quality shape the travel experience. Where
              comfort meets elegance, durability complements performance, design
              inspires distinction, and craftsmanship defines every detail
            </p>
            <p className="font-body text-base md:text-lg text-emerald-800 font-bold max-w-3xl mx-auto text-center">
              Our manufacturing partners create premium leather solutions that
              bring sophistication and lasting quality to aviation interiors.
            </p>
          </div>
        </section>

        {/* Section 3: Intro / The World Above the Clouds (av6 & av7 with overlay - Full Width Cover Image) */}
        <section className="w-full mx-auto">
          <div className="relative w-full h-[400px] md:h-[520px] overflow-hidden shadow-2xl mb-12 border-t border-b border-[#2A2B2D] bg-[#1A1A1A]">
            <div className="absolute inset-0 grid grid-cols-2 gap-1 bg-[#1A1A1A]">
              <img
                src="/slides/aviation-pdf-pages/av6.png"
                alt="The World Above the Clouds 1"
                className="w-full h-full object-cover opacity-80"
              />
              <img
                src="/slides/aviation-pdf-pages/av7.png"
                alt="The World Above the Clouds 2"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            {/* Overlay centered writings */}
            <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center p-6 text-center">
              <h2 className="font-display text-2xl md:text-5xl text-white uppercase tracking-wider font-bold drop-shadow-md">
                The World Above the Clouds
              </h2>
              <div className="w-16 h-[2px] bg-matte-gold mt-4"></div>
            </div>
          </div>

          {/* Writings below the image */}
          <div className="max-w-4xl mx-auto space-y-6 text-left px-6 md:px-12 lg:px-24">
            <p className="font-body-lg text-lg md:text-xl text-[#d97706] font-semibold leading-relaxed">
              The global aviation industry continues to grow and innovate, with
              increasing emphasis on comfort, design, performance, and
              sustainability.
            </p>
            <p className="font-body-md text-neutral-800 leading-relaxed font-semibold">
              Our sustainable manufacturing partners have successfully adapted
              to evolving technologies and industry demands while maintaining a
              strong commitment to quality and environmental responsibility.
            </p>
            <p className="font-body-md text-neutral-600 leading-relaxed">
              VIVOSA works with some of the world’s most respected tanneries,
              each with over 50 years of expertise, to offer certified premium
              aviation leather in a wide selection of textures, colours, and
              finishes. These finest leathers help create refined aircraft
              interiors that combine elegance, durability, and exceptional
              craftsmanship for commercial airlines, business jets, private
              aircraft, and helicopter interiors.
            </p>
          </div>
        </section>

        {/* Section 4: Premium Leathers for Aviation Interiors (Single Image av8 - split layout, image right) */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
                04 / Materials &amp; Standards
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-primary uppercase tracking-wide font-bold">
                Premium Leathers for Aviation Interiors
              </h2>
              <p className="font-body-md text-neutral-600 leading-relaxed">
                Our mission is to ensure complete satisfaction for both you and
                your clients. Choose from a carefully selected range of
                authentic premium leathers, crafted from European rawhide and
                each meeting the rigorous technical and safety standards
                demanded by modern aviation interiors:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  "Pigmented Leather",
                  "Full Top Grain Leather",
                  "Corrected Grain Leather",
                  "Semi-Aniline Leather",
                  "Nappa Leather",
                  "Embossed Leather",
                  "Chrome-Free & Metal-Free Leather",
                  "And many more — tailored to meet your specific requirements.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-matte-gold shrink-0 mt-2"></span>
                    <span className="font-body-md text-neutral-800 font-semibold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center w-full">
              <ParallaxImage
                src="/slides/aviation-pdf-pages/chair1.jpeg"
                alt="Premium Leathers for Aviation Interiors"
              />
            </div>
          </div>
        </section>

        {/* Section 5: The Leather applications (Full Width Section - Centered Layout - No Image) */}
        <section className="w-full bg-[#EFEAE2] py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
              05 / Capabilities
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-primary uppercase tracking-wide font-bold text-center">
              The Leather applications
            </h2>
            <p className="font-body-md text-neutral-600 leading-relaxed max-w-2xl mx-auto">
              Our aviation-grade leather solutions are suitable for a wide range
              of aircraft interior applications, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-8 text-left max-w-4xl mx-auto">
              {[
                "Aircraft seating",
                "Cabin refurbishment",
                "Seats",
                "Headrests",
                "Armrests",
                "Cabin panels",
                "Sidewalls",
                "Cockpit seating",
                "Lounge areas",
                "Other decorative interior elements as required",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-white/70 rounded-lg border border-neutral-350 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-matte-gold shrink-0"></span>
                  <span className="font-body-md text-neutral-850 font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: Explore Interior Leather Excellence (Full Width Section with Admin Controlled Swatches) */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24">
          <div className="w-full space-y-6 mb-16">
            <div className="text-center">
              <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
                06 / Dynamic Collection
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-primary uppercase tracking-wide font-bold mt-2">
                Explore Interior Leather Excellence
              </h2>
            </div>
            <p className="font-body-md text-[#1c1917] leading-relaxed font-semibold">
              Our manufacturing partners produce each piece of hide through
              sustainable processes, carefully crafted with aviation
              requirements in mind. The materials are designed to comply with
              aviation regulations and standards, offering lightweight
              performance, flame resistance, durability, lasting beauty,
              hygiene, and easy maintenance.
            </p>
            <p className="font-body-md text-neutral-500 leading-relaxed">
              Explore a selection of our premium leather finishes below, with
              many more options available to suit your project requirements.
            </p>
          </div>

          {/* Admin Controlled Swatches Grid */}
          {loading ? (
            <div className="text-center font-label-caps text-sm tracking-widest text-primary py-12">
              LOADING AVIATION COLLECTION...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {products.map((swatch) => (
                <Link
                  key={swatch._id}
                  to={`/aviation-leather/${swatch._id}`}
                  className="flex flex-col group cursor-pointer border border-neutral-200 overflow-hidden bg-white hover:shadow-md transition-all duration-300 text-center rounded-lg"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                    <img
                      src={swatch.image?.url}
                      alt={swatch.name || swatch.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {(swatch.code?.trim() ||
                    swatch.title?.trim() ||
                    swatch.name?.trim()) && (
                    <div className="py-4 px-3 bg-[#fbfbfa] border-t border-neutral-100 flex items-center justify-center min-h-[56px]">
                      <h4 className="font-label-caps text-xs md:text-sm font-semibold tracking-widest text-[#1c1917] uppercase">
                        {swatch.code || swatch.title || swatch.name}
                      </h4>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Section 7: Craftsmanship, Collaboration & Responsibility (av9, av10, av11 on top, text below) */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24">
          {/* Three images on top */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-12">
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-neutral-200 bg-white">
              <img
                src="/slides/aviation-pdf-pages/av9.png"
                alt="Craftsmanship Part 1"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-neutral-200 bg-white">
              <img
                src="/slides/aviation-pdf-pages/av10.png"
                alt="Craftsmanship Part 2"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-neutral-200 bg-white">
              <img
                src="/slides/aviation-pdf-pages/av11.png"
                alt="Craftsmanship Part 3"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Writings below */}
          <div className="max-w-4xl mx-auto space-y-6 text-left">
            <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
              07 / Philosophy &amp; Responsibility
            </span>
            <h2 className="font-display text-2xl md:text-4xl text-primary uppercase tracking-wide font-bold">
              Craftsmanship &amp; Collaboration
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed text-sm md:text-base">
              <p>
                The aviation industry demands more than performance — it demands
                precision, integrity, and materials that meet the highest
                standards without compromise.
              </p>
              <p>
                Every article in our aviation collection carries its own story
                of skilled craftsmanship, where aesthetic excellence and
                sustainable manufacturing are not an afterthought, but a
                foundation. Produced through close collaboration with our
                trusted Italian manufacturing partners, each piece reflects the
                expertise, rigour, and responsible innovation that modern
                aviation interiors require.
              </p>
              <p>
                We work alongside airlines, designers, and specifiers to deliver
                an extensive range of collections — offering a wide palette of
                colours, finishes, and customisation options engineered to meet
                the most demanding specifications.
              </p>
              <p>
                Collaboration is at the heart of what we do — and we love
                working with airlines, designers, and specifiers who share our
                commitment to excellence. To explore how our aviation collection
                can be specified for your next interior project, we welcome the
                opportunity to connect.
              </p>
            </div>

            <div className="border-t border-matte-gold/20 pt-8 mt-6">
              <h4 className="font-label-caps text-matte-gold text-xs tracking-widest uppercase mb-4 font-bold">
                Our aviation leather is developed with the sector's critical
                requirements at its core:
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {[
                  "Fire-safety compliant — meeting aviation-grade regulatory standards",
                  "Lightweight construction — contributing to overall aircraft weight reduction",
                  "High abrasion & scratch resistance — built for long service life in high-traffic environments",
                  "Easy-clean & stain-resistant — designed for efficient cabin maintenance",
                  "UV & chemical resistant — retaining appearance throughout extended service",
                  "Soft-touch comfort — delivering the tactile quality passengers expect",
                  "Sustainably & traceably sourced — aligned with airline environmental commitments",
                ].map((req, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 bg-matte-gold shrink-0 mt-2"></span>
                    <span className="font-body-sm text-neutral-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 8: Design & Customisation (Single Image av12 - split layout, image left) */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex items-center justify-center w-full order-last lg:order-first">
              <ParallaxImage
                src="/slides/aviation-pdf-pages/av12.png"
                alt="Design & Customisation"
              />
            </div>
            <div className="space-y-6">
              <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
                08 / Aesthetics
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-primary uppercase tracking-wide font-bold">
                Design &amp; Customisation
              </h2>
              <p className="font-body-md text-neutral-600 leading-relaxed">
                Our aviation leather collection combines refined aesthetics with
                exceptional versatility, offering a rich variety of colours,
                textures, and finishes to suit every cabin vision. Working
                closely with airlines, OEMs, designers, and specifiers, we
                support bespoke development programmes tailored to individual
                project requirements — ensuring each article is engineered to
                deliver long-lasting beauty, comfort, and visual consistency
                throughout its service life. Optional anti-soiling protection is
                available for light and pastel shades, and our trusted
                manufacturing partners are on hand to support the most demanding
                customisation specifications.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: Features (Single Image av15 - split layout, image right) */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
                09 / Technical
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-primary uppercase tracking-wide font-bold">
                Performance Characteristics
              </h2>
              <p className="font-body-md text-neutral-600 leading-relaxed">
                Designed for the rigours of high-traffic cabin environments, our
                aviation leathers deliver outstanding technical performance
                across every application. Each article offers exceptional
                abrasion resistance, colour fastness, and resistance to soiling,
                cleaning agents, and daily wear — significantly reducing
                maintenance requirements while preserving their natural
                appearance and soft-touch feel. Specialised performance finishes
                include anti-stain, easy-clean, fire-retardant, UV-resistant,
                and high-durability treatments, all engineered to meet relevant
                aviation standards and certifications. Sanitized®️ technology is
                available on request for clients requiring enhanced hygiene
                performance, helping eliminate up to 99% of bacteria and viruses
                to support passenger comfort and long-term cabin protection.
              </p>
            </div>
            <div className="flex items-center justify-center w-full">
              <ParallaxImage
                src="/slides/aviation-pdf-pages/new1.jpeg"
                alt="Features"
              />
            </div>
          </div>
        </section>

        {/* Section 10: Care & Sustainability (Single Image av14 - split layout, image left) */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex items-center justify-center w-full order-last lg:order-first">
              <blockquote className="relative w-full max-w-[450px] rounded-xl border border-matte-gold/30 bg-gradient-to-br from-[#FBF6EC] to-[#F0E6CE] p-10 md:p-12 shadow-lg">
                <span
                  className="material-symbols-outlined text-matte-gold text-5xl leading-none mb-4 block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  format_quote
                </span>
                <p className="font-display text-xl md:text-2xl lg:text-[28px] italic text-primary leading-snug">
                  “The finest journeys are defined not only by where they take
                  you, but by how they make you feel along the way.”
                </p>
                <div className="w-16 h-[2px] bg-matte-gold mt-8"></div>
              </blockquote>
            </div>
            <div className="space-y-6">
              <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
                10 / Ecology
              </span>
              <h2 className="font-display text-2xl md:text-4xl text-primary uppercase tracking-wide font-bold">
                Care &amp; Sustainability
              </h2>
              <div className="font-body-md text-neutral-600 leading-relaxed space-y-6">
                <p>
                  Our portfolio includes a growing range of sustainable leather
                  solutions — chrome-free, metal-free, and responsibly
                  manufactured articles that meet the environmental expectations
                  of modern aviation. Our Italian manufacturing partners use
                  advanced tanning technologies, reduced-impact chemical
                  processes, and rigorous quality systems, supported by
                  internationally recognised certifications including Leather
                  Working Group (LWG) accreditation, ensuring full traceability,
                  regulatory compliance, and continuous innovation for aviation
                  interiors. At VIVOSA, we carefully select manufacturers whose
                  leather begins as a by-product of the European beef industry —
                  raw hides that would otherwise go to waste are transformed
                  into a premium, sustainable material. Co-products from the
                  tanning process are then supplied to other industries,
                  including technical manufacturing and food production, where
                  they serve as valuable raw materials. This circular approach
                  keeps waste out of landfill and ensures every part of the hide
                  is put to good use.
                </p>
                <p>
                  At VIVOSA, we carefully select manufacturers whose leather
                  begins as a by-product of the European beef industry. Rather
                  than going to waste, these raw hides are transformed into a
                  premium, sustainable material. Co-products from the process
                  are then supplied to other industries, including technical
                  manufacturing and food production, where they serve as
                  valuable raw materials. This circular approach keeps waste out
                  of landfill and ensures that every part of the hide is put to
                  good use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 11: QUALITY & RESPONSIBILITY IN LEATHER SUPPLY (Single Image av13 - split layout, image right) */}
        {/* Has additional padding-bottom to separate clearly from footer */}
        <section className="w-full mx-auto px-6 md:px-12 lg:px-24 pb-24 md:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
              <span className="inline-block text-matte-gold font-label-caps tracking-[0.2em] uppercase text-xs font-semibold">
                11 / Quality Control
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-primary uppercase font-bold tracking-wide">
                QUALITY &amp; RESPONSIBILITY IN LEATHER SUPPLY
              </h2>
              <div className="w-16 h-[2px] bg-matte-gold mb-6"></div>
              <p className="font-body-md text-neutral-700 leading-relaxed">
                We work with leading sustainable tanneries to supply
                high-quality leather directly to our customers, without
                involving any third parties. Our QC team carefully inspects each
                hide to ensure it meets strict quality and sustainability
                standards. Around 90% of our manufacturing partners are based in
                Europe, and 85% of our rawhide is sourced from Europe. Our
                partners are highly experienced in producing premium automotive
                leather, and we maintain rigorous oversight throughout the
                production process. This guarantees that every hide delivers the
                highest levels of quality, durability, and excellence.
              </p>
              <div className="pt-6 space-y-4 border-t border-neutral-200/20">
                <p className="font-body-md text-neutral-600 font-semibold">
                  If you would like to learn more about our leathers or
                  processes, including:
                </p>
                <ul className="space-y-2 pl-4">
                  {[
                    "Types of raw hides and their origin",
                    "Tanning and retanning methods",
                    "Defect classification",
                    "Drying techniques",
                    "finishing processes",
                    "Technical sheets and certifications",
                    "Tannery and Manufacturing facility details, and more",
                  ].map((bullet, idx) => (
                    <li
                      key={idx}
                      className="list-disc text-neutral-700 font-body-sm"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="font-body-md text-neutral-600 italic pt-4">
                  Please get in touch with us, and we will respond promptly.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <ParallaxImage
                src="/slides/aviation-pdf-pages/av13.png"
                alt="Quality Supply"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
