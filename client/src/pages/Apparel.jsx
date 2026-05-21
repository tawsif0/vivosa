import React, { useState, useEffect, useRef } from "react";

function CountUp({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    let animationFrameId = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      const currentVal = Math.floor(easeProgress * target);
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
}

export default function Apparel() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-on-tertiary-container/30">
      <style>{`
        .editorial-underline {
          position: relative;
        }
        .editorial-underline::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 80px;
          height: 2px;
          background-color: #c39090; /* Matte Gold / Tertiary accent */
        }
        .woven-pattern {
          background-color: #fcf9f8;
          background-image: radial-gradient(#e4e2e1 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
        .hairline-border {
          border-width: 0.5px;
        }
      `}</style>

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="woven-pattern min-h-[80vh] flex items-center py-section-gap px-6 md:px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center w-full">
            <div className="md:col-span-7">
              <h1 className="font-display text-[48px] md:text-[84px] leading-tight text-primary mb-8">
                Sustainable Garment <br />
                <span className="italic font-light text-on-tertiary-container">Manufacturing</span> Hub.
              </h1>
              <p className="font-body text-body-lg text-secondary max-w-xl mb-12 leading-relaxed">
                We are a sustainable garment manufacturer supplying high-quality knitwear and woven garments for men, women, and children. Our operations are built around responsible sourcing, ethical production practices, and full customization tailored to international buyer requirements.
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="/contact" 
                  className="bg-primary text-on-primary px-10 py-4 font-label-caps text-label-caps uppercase tracking-widest hover:opacity-90 transition-all duration-300"
                >
                  Partner With Us
                </a>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-6 mt-12 md:mt-0">
              <div className="bg-white p-8 hairline-border border-outline-variant/30 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow duration-500">
                <span className="font-display text-[56px] text-primary leading-none">
                  <CountUp target={10} suffix="+" />
                </span>
                <span className="font-label-caps text-label-caps text-secondary uppercase">
                  Years of Precision Experience
                </span>
              </div>
              <div className="bg-white p-8 hairline-border border-outline-variant/30 flex flex-col gap-2 md:translate-x-8 shadow-sm hover:shadow-md transition-shadow duration-500">
                <span className="font-display text-[56px] text-primary leading-none">
                  <CountUp target={50} suffix="+" />
                </span>
                <span className="font-label-caps text-label-caps text-secondary uppercase">
                  Global Luxury Fashion Brands
                </span>
              </div>
              <div className="bg-white p-8 hairline-border border-outline-variant/30 flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow duration-500">
                <span className="font-display text-[56px] text-primary leading-none">
                  <CountUp target={100} suffix="%" />
                </span>
                <span className="font-label-caps text-label-caps text-secondary uppercase">
                  Ethical Sourcing &amp; Certification
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Wovenware Collection */}
        <section id="wovenware" className="bg-surface-container-low py-section-gap px-6 md:px-margin-desktop border-t border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <div className="mb-20">
              <h2 className="font-display text-headline-xl text-primary editorial-underline mb-6">
                Wovenware Collection
              </h2>
              <p className="font-label-caps text-label-caps text-secondary tracking-widest uppercase">
                Precision Tailoring &amp; Structural Integrity
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-24">
              <div className="group overflow-hidden cursor-pointer">
                <div className="overflow-hidden aspect-[3/4] shadow-md border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt="A sophisticated editorial fashion photograph of a high-end tailored woven jacket"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZP8q9DKp7-7p-KuRGdIQ2ENXove2oQcDLpaAcSpN0q-qJHNwoIQjGlKSqOalEjqziev6Gd9ehUBEBOq434yiUSIyEJvnJ7aYmcUPRkmlGnmxWy28dYQG_PAreleQsK57zL6mqL78a6-KUaOtf3cImu0NhiJTmU9HxT7dQBAEqAVMIDBsQpP12c8MEGJNvaqVyIOYlW33BpDIPMY5JoN66Mn5PIbVoG6s4mLEOCPkSHTFxMux37cNedGp4FVWXXe1TJPRoLm0A9B0"
                  />
                </div>
                <p className="mt-4 font-label-caps text-label-caps uppercase text-primary font-bold tracking-wider group-hover:text-on-tertiary-container transition-colors">
                  Artisanal Jackets
                </p>
              </div>
              <div className="group overflow-hidden cursor-pointer md:translate-y-12">
                <div className="overflow-hidden aspect-[3/4] shadow-md border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt="Detailed close-up of sustainable denim manufacturing"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxIFMa4KliMtNtIIfFnP4ZPhlaXkAStT2J5RwWqPLJHNznnSipRguAfWo_ZjX442YNDcA_korawju3j9F0Zy1KwP8WkEfs9TyBLe1_elLL0iJOafg48sYjgtYUNfLL8cgmDReMKSjeFinXKw8vdQ9av_5pRAtuVSsknv6ACRsx-igfz52kxMWGbpUqHubc1gHbxOUUM79CFzG3AL3feSdbJpsIHuE7hy-zKMa5foWRy0g6GEsjDnypx--eBXD22s3BND62_Vgrl0c"
                  />
                </div>
                <p className="mt-4 font-label-caps text-label-caps uppercase text-primary font-bold tracking-wider group-hover:text-on-tertiary-container transition-colors">
                  Organic Denim
                </p>
              </div>
              <div className="group overflow-hidden cursor-pointer">
                <div className="overflow-hidden aspect-[3/4] shadow-md border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    alt="Editorial portrait of a model wearing high-end chinos"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp0-3rAYUMgV7NovRTjmSm0cd1XTQNTOAjZMbQjCKsFDoSsx1n464qKcaOcvKEGGGLj3KgYlkJgpzHS4un8dimQY38nHKP0QaOb1iuzO1Cpe0PE9buxgBLsCIighrLYu_p9C3oFPbCqFrw3pN3xvK2RtFzi8wK_Oy9DpyM9wkMpiG6PNG4IK4c3ExWt5tgRTjVLxKzeEumWkNYUVeBilykx7FqJoycsjykileNhxQCGuA4__VvVPOJ3vgurBTb3Lw2-O_UMMgOllc"
                  />
                </div>
                <p className="mt-4 font-label-caps text-label-caps uppercase text-primary font-bold tracking-wider group-hover:text-on-tertiary-container transition-colors">
                  Luxury Chinos
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start pt-16 border-t border-outline-variant/30 mt-16 md:mt-24">
              <p className="font-display text-headline-md italic text-primary leading-relaxed">
                "Our wovenware represents the pinnacle of structural durability. We utilize advanced European machinery combined with traditional hand-finishing to ensure every seam meets the highest B2B luxury standards."
              </p>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                <span className="font-label-caps text-label-caps uppercase text-primary border-b border-transparent hover:border-primary transition-all pb-1 cursor-pointer">
                  Denim Expertise
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary border-b border-transparent hover:border-primary transition-all pb-1 cursor-pointer">
                  Structured Jackets
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary border-b border-transparent hover:border-primary transition-all pb-1 cursor-pointer">
                  Utility Chinos
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary border-b border-transparent hover:border-primary transition-all pb-1 cursor-pointer">
                  Performance Wovens
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary border-b border-transparent hover:border-primary transition-all pb-1 cursor-pointer">
                  Tailored Shirts
                </span>
                <span className="font-label-caps text-label-caps uppercase text-primary border-b border-transparent hover:border-primary transition-all pb-1 cursor-pointer">
                  Overcoats
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Knitware Collection */}
        <section className="bg-primary text-on-primary py-section-gap px-6 md:px-margin-desktop relative">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center relative z-10">
            <div className="md:col-span-4 space-y-8 pr-0 md:pr-10">
              <h2 className="font-display text-display-lg-mobile md:text-[56px] text-white leading-tight">
                The Knitware <br />
                Alchemy
              </h2>
              <p className="font-body text-body-md text-on-primary/75 leading-relaxed">
                From ultra-fine silk blends to heavy-gauge recycled wool, our knitting facilities are engineered for versatility without compromise.
              </p>
              <div className="space-y-4 pt-8">
                {[
                  "Recycled Cashmere",
                  "Fine Gauge Silk",
                  "Organic Cotton Knit"
                ].map((item) => (
                  <div
                    key={item}
                    className="border-b border-white/20 pb-4 cursor-pointer hover:border-white transition-colors duration-300"
                  >
                    <span className="font-label-caps text-label-caps uppercase text-white">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-gutter mt-12 md:mt-0">
              <div className="space-y-6">
                <div className="bg-white/5 p-4 border border-white/10 shadow-xl backdrop-blur-sm">
                  <img
                    className="w-full aspect-square object-cover"
                    alt="Close up of a premium cream-colored knit garment"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvf4j08_tA37hifM2kp6fXG4wzNxR7EPh_QG26J-6OWwHaW5QzaoFfR9lZBY92xbk0HXE2gVnDC7C76KlvfrIhG17B1CUmC_16wy3MMkK0KyrqqwUOMa_hB69yaN_XdPi_YUsHbl7dg_kSUCtuYbN6BtDEJ1XKaaBWRYyiQw6qx0LODzznN97NLTh7w7bAxOT8S_J6aF29PRt08e--wycpggzAFGPxBhU2KWV-_2poTmgBvAy4zYJLHNpiAwM_OUzPpQZF9oXvWJw"
                  />
                </div>
                <div className="bg-white/5 p-4 border border-white/10 shadow-xl backdrop-blur-sm">
                  <img
                    className="w-full aspect-[4/3] object-cover"
                    alt="Interior view of a modern precision knitting machinery"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWrhaJ3Kpa9Rm7XxRwxWDCkXLVsPslh-KDrRWz5r0jAFJ6TLAd2iNu0-Jwl98FrSpVa_g9HD9mLxrpuYlPb9yTpPhr3i7K9ZKvBdLkcjMmAKbU66IiVZMSSIn9LZc3YWQ9JxCLylw86nDJVEVnHUHLzo4Esj_XCFY1YShhOdU645DxB3qf-zC2iNi3OTuUuf6KOjit6pSnTib2RWrYDQYiMg3qNPlcM8ngiQAZaoL9kKkwmll2U3zGQzc_qvB1TIl8YTS6_dZgFzA"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-stretch">
                <div className="bg-white/5 p-4 border border-white/10 shadow-xl backdrop-blur-sm h-full flex items-center">
                  <img
                    className="w-full h-full object-cover"
                    alt="Artistic composition featuring rolls of high-quality knit fabrics in various earthy tones"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuYUkJCTdt36JiAUsV2o-le4632eEgqRlwun9UKPSP7jSarvdj4_OC2L8d2r1ND_ggWykcfe-T7eT6CSVfsi7IP0ItsL9F7yQ2bKdy-08-uFEDxEBPglcq5K_IBCy6wusX-jP_WTnwRuqiED9Na9SnrDU9R5wRr_ud_uqARyUEvJKlhBITosZPbzjQRBTGIzu_b8mSTV6a0qxjXw0xcyuhWqZZvLhP-MvjSan6x-pya-VRsMYG2rHisFbGIxPICMYT58oQBATABs0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fabric Capabilities */}
        <section className="bg-surface py-section-gap px-6 md:px-margin-desktop border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-24">
              <h2 className="font-display text-headline-xl text-primary inline-block editorial-underline mb-6">
                Fabric Capabilities
              </h2>
              <p className="font-body text-body-lg text-secondary max-w-2xl mx-auto mt-6">
                We curate and develop the world’s most advanced sustainable textiles, from local organic cottons to imported Italian performance blends.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-20">
              {[
                {
                  title: "Local & Imported",
                  desc: "Strategic sourcing networks across European and Asian hubs for the finest raw materials.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3qHKldhOOQiXH_Eod7X-4I9xC972LSVAjSeRx7CFOVjDPMhtgkA3R-06Px2MSUbuOf3GeC42YXe2ynvIpoRd-nG3UQeQDhqEIU82_g4cGcp_SgumlXl_rzUW9eGoGCCFC8qsAgieHyJnMGqw8oVCBg8zyVUW0xL1xZjEnGOaToZz14pJCVzLyqszeZ_SsgwaeTThol8tkQyz81iD3hbgPsUHdRwVBXtc4SAi2losGwfVS6LVIHEbhT9jEOckEnrl7fDX--QSTseY",
                  offset: false
                },
                {
                  title: "Cotton & Blends",
                  desc: "Expertise in GOTS certified organic cotton and high-composition silk/wool luxury blends.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt89PfxSJss3CQOBVeAa_y9wAgLgnU3xqR5Red6f-FYOzlaHr_7beedXRjVXoDqKQhNNyhAPGZZsWcbhbWSb6EEKS_d7_ZCh2mMmp2TOOTV3RjUPwdNdsyem3j0FpLkLiXmXh6n4DLQxB1kGPNmZFFvGLj5oLMacXygavl4bIlnIWEtNjB5zMlAj3Gs5shkfzJ2MsKRuNutR8WW8hKFC0upu95ilU8pH5ZdtqkKJGJgtnyHbEUN_56eeeUYcCb7XT5LQ0fwKavPgQ",
                  offset: true
                },
                {
                  title: "Technical Wovens",
                  desc: "Durable, high-thread-count textiles designed for longevity and structural performance.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAP5LnXVOG3XUUsTIBz3QohAg-mweA9Utu3V_2LLPlLEMxjq0FxfI1HAyugJ7MNomsLa6Jo6ChI3E6DofzlUFGjrwrGW5BtdOYgteFvem4SdSpNXRhiCy7IQoBiKFuXjUp5YaBHk1VmsAQg9Ly-T2qH1Kcn6Lmfpjx7yJRGzY1C9vi6z8p0WuZ5YSR44HI_AeI-TfMgIPcibxF9wM2axvSi0n27D6tV_0pTpDsOsW9bK6ACp5G9_sombvmbTSBdLO5CyLteAbcWcMQ",
                  offset: false
                },
                {
                  title: "Performance",
                  desc: "Water-resistant, moisture-wicking, and breathable fabrics developed for high-end active lifestyles.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6pplivqcucpt-Gkrga6t0VYfb98GVr-BaeSfKfLMVbzHO-wny3mMJfqvjnyNUIk34TYUgIjWhfzu53_XcTvC2xtTYwUDwuO4vJu_NViR8BKZ50lwMZy38W2kg-QxEv9A0tdW0fQzFqWynKbsg3X4qvHORD4vKGzQduuhAOAlvMZXmEFoNwJQfPz1tEloC1GIkT-tbnU3tdO0OBfxlLwsBxUOu6Hbd3_DWfjPkmw2hFply9QRiK39JIop8AEKGRRhvzg20FAlTnL4",
                  offset: true
                }
              ].map((cap, idx) => (
                <div 
                  key={idx} 
                  className={`space-y-6 flex flex-col justify-stretch group cursor-pointer ${cap.offset ? "md:translate-y-12" : ""}`}
                >
                  <div className="aspect-[4/5] overflow-hidden shadow-md border border-outline-variant/10 bg-surface-container-low">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      alt={cap.title}
                      src={cap.src}
                    />
                  </div>
                  <div>
                    <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary border-b border-outline-variant/30 pb-2 group-hover:text-on-tertiary-container transition-colors font-bold">
                      {cap.title}
                    </h3>
                    <p className="font-body text-body-md text-secondary mt-3 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


      </main>
    </div>
  );
}
