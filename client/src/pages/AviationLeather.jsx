import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

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
    <div className="bg-background text-on-background overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative h-[600px] md:h-[850px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="/slides/aviation_hero.png"
            alt="Luxury private jet cabin interior with premium leather seats"
            loading="eager"
          />
          <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 md:px-margin-mobile">
          <h1 className="font-display-lg text-4xl md:text-display-lg text-white tracking-[0.15em] md:tracking-[0.25em] mb-8 leading-tight">
            PREMIUM LEATHER FOR THE
            <br />
            AVIATION INDUSTRY
          </h1>
          <blockquote className="font-headline-md text-xl md:text-headline-md text-white italic opacity-95 max-w-3xl mx-auto">
            "Details are not the details. They make the design."
            <cite className="block not-italic font-label-caps text-label-caps mt-4 text-matte-gold text-sm tracking-widest">
              — CHARLES EAMES
            </cite>
          </blockquote>
        </div>
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="material-symbols-outlined text-matte-gold text-4xl animate-bounce"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            flight_takeoff
          </span>
          <div className="w-[1px] h-12 bg-matte-gold/40"></div>
        </div>
      </header>

      {/* Intro 1 */}
      <section className="py-16 md:py-section-gap bg-[#F5F0E8] px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto border-l-2 border-matte-gold pl-8 md:pl-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8">
              <span className="font-label-caps text-label-caps text-matte-gold uppercase block mb-4 tracking-widest">
                Aerospatial Excellence
              </span>
              <h2 className="font-display-lg text-4xl md:text-headline-xl text-primary mb-6 leading-tight">
                Sky-Bound Sophistication & Uncompromising Safety
              </h2>
              <p className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed">
                A sleek executive jet soaring through clear skies captures the essence of luxury — a journey defined by ultimate comfort, security, and quiet refinement. In aviation, luxury is not just an aesthetic; it is an engineering discipline where weight reduction, tactile pleasure, and fire safety coalesce. Every leather detail in the cabin shapes the travel experience and elevates passenger peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="overflow-hidden bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full h-[300px] md:h-[500px]">
          {[
            {
              src: "/slides/aviation_gallery_jet_cabin.png",
              label: "EXECUTIVE JET CABINS",
            },
            {
              src: "/slides/aviation_gallery_cockpit.png",
              label: "COCKPIT SEATING",
            },
            {
              src: "/slides/aviation_gallery_first_class.png",
              label: "FIRST CLASS SUITES",
            },
            {
              src: "/slides/aviation_gallery_crew_rest.png",
              label: "CREW REST AREAS",
            },
          ].map((item) => (
            <div key={item.label} className="relative group h-full overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                src={item.src}
                alt={item.label}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0f172a]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-8">
                <p className="text-white font-label-caps tracking-widest text-[10px] md:text-label-caps">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro 2 */}
      <section className="py-16 md:py-section-gap bg-slate-100 px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <h3 className="font-display-lg text-3xl md:text-headline-xl text-[#0f172a] mb-8 leading-tight">
            Half a century of aviation precision.
          </h3>
          <p className="font-body-lg text-body-lg text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            Our legacy is built on the foundations of sustainable manufacturing.
            For over 50 years, Vivosa has partnered with aerospace interior designers and aircraft outfitters to
            provide high-quality lightweight hides that respect the environment as much as they do the strict guidelines of aviation regulators.
          </p>
        </div>
      </section>

      {/* Aviation Leather Grid */}
      <section className="bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop border-t border-b border-neutral-100">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="font-label-caps text-xs tracking-widest text-matte-gold uppercase font-bold block mb-2">
                COLLECTION CATALOG
              </span>
              <h2 className="font-display text-4xl text-primary leading-tight">
                Our Aviation Leather Swatches
              </h2>
            </div>
            <span className="font-label-caps text-label-caps text-secondary tracking-widest border-b border-outline-variant pb-2 uppercase">
              CERTIFIED HIDES
            </span>
          </div>

          {loading ? (
            <div className="text-center font-label-caps text-sm tracking-widest text-primary">
              LOADING AVIATION COLLECTION...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/aviation-leather/${product._id}`}
                  className="flex flex-col group cursor-pointer border border-neutral-200 overflow-hidden bg-white hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={product.title || product.name}
                      src={product.image?.url}
                      loading="lazy"
                    />
                  </div>
                  <div className="py-4 px-3 bg-[#fbfbfa] border-t border-neutral-100 flex items-center justify-center min-h-[56px]">
                    <h4 className="font-label-caps text-xs md:text-sm font-semibold tracking-widest text-[#1c1917] uppercase font-bold">
                      {product.code}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 md:py-section-gap bg-[#F5F0E8] px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-section-gap items-center">
          <div>
            <span className="font-label-caps text-label-caps text-matte-gold mb-6 block tracking-widest">
              APPLICATIONS
            </span>
            <h2 className="font-display-lg text-4xl md:text-headline-xl text-primary mb-8 leading-tight">
              Crafted Cabin Comfort
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-12 leading-relaxed">
              Our aerospace leathers are designed to endure the distinct demands of high-altitude travel. From acoustic panels that deaden engine hums to pilot seating with high ergonomic durability and premium passenger suites, we supply the perfect materials for custom aviation cabins.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-gutter">
            {[
              { icon: "airline_seat_recline_extra", label: "Executive Seating" },
              { icon: "vertical_shades", label: "Acoustic Panels" },
              { icon: "shield", label: "Pilot Cockpit Wrap" },
              { icon: "luggage", label: "Pocket Accents" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-4 border border-outline-variant/30 flex flex-col justify-between h-28 hover:border-matte-gold transition-colors duration-500 cursor-pointer group"
              >
                <span className="material-symbols-outlined text-matte-gold text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <h5 className="font-headline-md text-sm text-[#0f172a]">
                  {item.label}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leather Types */}
      <section className="py-16 md:py-section-gap bg-[#0f172a] px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="font-display-lg text-4xl md:text-headline-xl text-white mb-12 md:mb-16 leading-tight">
            Advanced Aviation Leather Finishes
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              "FULL ANILINE",
              "SEMI-ANILINE",
              "LIGHTWEIGHT NAPPA",
              "FLAME-RESISTANT BUFFED",
              "MICRO-PERFORATED",
              "STAIN-RESISTANT COATED",
              "EMBOSSED GRAIN",
            ].map((type) => (
              <span
                key={type}
                className="px-6 py-3 md:px-8 md:py-3 border border-matte-gold rounded-full text-white font-label-caps tracking-widest hover:bg-matte-gold transition-all duration-300 cursor-default text-[10px] md:text-label-caps"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 md:py-section-gap px-4 md:px-margin-desktop bg-background">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Column: Certifications list */}
          <div className="bg-[#F5F0E8] rounded-3xl p-8 md:p-12 lg:p-16 border border-outline-variant/50 flex flex-col justify-center">
            <h3 className="font-display-lg text-3xl md:text-headline-md text-primary mb-12 text-left leading-tight">
              Stringent Aviation Certifications
            </h3>
            <ul className="space-y-6">
              {[
                {
                  title: "FLAMMABILITY TESTING (FAR 25.853)",
                  desc: "Exceeding FAA vertical burn specifications for ultimate cabin safety and compliance.",
                },
                {
                  title: "SMOKE & TOXICITY (ABD0031)",
                  desc: "Tested rigorously for low gas emission and minimal smoke generation in commercial operations.",
                },
                {
                  title: "LIGHTWEIGHT HIDE DESIGN",
                  desc: "Specialized thinning and processing that reduces weight up to 30% without sacrificing strength, lowering fuel consumption.",
                },
                {
                  title: "SOIL & INK STAIN RESISTANCE",
                  desc: "Finished with advanced protective sealants to allow simple cleaning of spills and ink marks.",
                },
              ].map((item, i) => (
                <li
                  key={item.title}
                  className={`flex items-start gap-4 md:gap-6 pb-6 ${i < 3 ? "border-b border-outline-variant/30" : ""}`}
                >
                  <span className="material-symbols-outlined text-matte-gold flex-shrink-0 mt-1">
                    check_circle
                  </span>
                  <div>
                    <h6 className="font-label-caps text-label-caps text-primary mb-1 tracking-widest">
                      {item.title}
                    </h6>
                    <p className="font-body-md text-body-md text-secondary leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Premium aerospace quality control image */}
          <div className="rounded-3xl overflow-hidden shadow-lg border border-neutral-200/50 min-h-[400px]">
            <img
              src="/slides/aviation_certification_right.png"
              alt="Gruppo Mastrotto Aviation Certification Test"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
