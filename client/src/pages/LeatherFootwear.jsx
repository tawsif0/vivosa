import React, { useRef, useState, useEffect } from "react";

export default function LeatherFootwear() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  // Butter-smooth continuous infinite autoplay marquee loop
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isHovered && !isDragging && scrollContainerRef.current) {
        const el = scrollContainerRef.current;
        // Scroll right-to-left: increase scrollLeft continuously
        el.scrollLeft += 1.0;

        // Seamless wrap-around at 50% width
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  // Drag handlers for mouse sliding
  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5; // Drag sensitivity multiplier
    const el = scrollContainerRef.current;
    let targetScroll = scrollLeftRef.current - walk;

    // Infinite wrapping bound adjustment during drag
    if (targetScroll < 0) {
      targetScroll += el.scrollWidth / 2;
    } else if (targetScroll >= el.scrollWidth / 2) {
      targetScroll -= el.scrollWidth / 2;
    }

    el.scrollLeft = targetScroll;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="bg-background text-on-background font-body selection:bg-accent-gold/30">
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row min-h-screen overflow-hidden">
          {/* Left: Imagery */}
          <div className="w-full md:w-[45%] relative bg-secondary-container p-12 md:p-24 flex items-center justify-center min-h-[500px]">
            <div className="relative w-full max-w-md aspect-[3/4]">
              {/* Leather Rolls (Top) */}
              <div className="absolute top-0 left-0 w-4/5 h-3/5 z-10 border-[0.5px] border-accent-gold/20 shadow-2xl hover:scale-105 transition-all duration-700">
                <img
                  className="w-full h-full object-cover grayscale-[20%]"
                  alt="Premium leather rolls stacked neatly in artisan workshop"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw2DklzvzH5l9cfG69pc8Wbavz9BHyK-tZon9cFNkhoqoh7PHxqxi13baldumLkBHbuPeVPVMPzr61xaBobCYceyHb-Yeoo9bKtBzeLCFNwUgnGFJ-cVX9bJqk1iH0nzcubhGvPzke33qoI_3jWFlcYxWcCDlcWGPucRX6lBDy_jOcbFlmm2k7upZPfJECCXlpQWui9wO-LkpVuE8saTHynW6gykkqInlhHqpqIYFo6W-YrjUoOCEcOBk18UEraCRE1sUVBmrxyoM"
                />
              </div>
              {/* Finished Shoe (Bottom Overlay) */}
              <div className="absolute bottom-0 right-0 w-4/5 h-3/5 z-20 border-4 border-background shadow-2xl hover:scale-105 transition-all duration-700">
                <img
                  className="w-full h-full object-cover"
                  alt="Bespoke leather Oxford shoe resting on minimalist pedestal"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1Ok8jEcw-jV9aLK84sdnOeiQ-Rm8H0BnT4jYdSqJk_V4CL74s65wMWjdtNIgeqrb_muRYt_KZ4oWsXjclJNCL8nKb11TzOMnCVbSQ0TiB43YzRptqT8sCk7wuCArdttsJIa24JYPbP6PbDa42a8ZcsbS-oVu1eGgNfkyM-k0YvBAf43W2kylQb4qCMIJ_eAEQI86mj_sUH5doIxJfNkKSKH_okuZiZDOqWf9b8Vr0gB3WiQMyPAAcaGmJeYgv7L6z2ILpjwIkOos"
                />
              </div>
            </div>
          </div>
          {/* Right: Content */}
          <div className="w-full md:w-[55%] bg-primary flex flex-col justify-center px-8 md:px-24 py-16 text-on-primary">
            <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.3em] mb-6">
              AUTHENTIC LEATHER
            </span>
            <h1 className="font-display text-[56px] md:text-display-lg leading-tight mb-8 text-white">
              Authentic Leather
              <br />
              for Footwear
            </h1>
            <p className="font-body text-body-lg text-on-primary/80 max-w-lg mb-12 leading-relaxed">
              Meticulous detail meets centuries-old tradition. Our sustainable
              sourcing ensures that every hide used in luxury footwear
              manufacturing respects the environment while providing unparalleled
              durability and tactile refinement.
            </p>
            <a className="inline-flex items-center group w-fit" href="/contact">
              <span className="bg-accent-gold text-primary font-label-caps text-label-caps px-10 py-4 group-hover:bg-on-primary transition-all duration-500">
                Get in Touch →
              </span>
            </a>
          </div>
        </section>

        {/* Footwear Showcase Strip */}
        <section className="py-section-gap overflow-hidden bg-surface-container-lowest relative select-none">
          {/* Slider Header */}
          <div className="mb-12 max-w-container-max mx-auto px-6 md:px-margin-desktop text-center md:text-left">
            <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.2em] mb-2 block uppercase">
              Continuous Heritage
            </span>
            <h2 className="font-display text-headline-xl text-primary">
              Luxury Footwear Showcase
            </h2>
          </div>

          {/* Infinite Marquee Wrapper */}
          <div className="w-full relative flex py-4">
            <div
              ref={scrollContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={() => {
                handleMouseUpOrLeave();
                setIsHovered(false);
              }}
              onMouseEnter={() => setIsHovered(true)}
              className="flex overflow-x-auto gap-gutter px-6 md:px-margin-desktop hide-scrollbar cursor-grab active:cursor-grabbing select-none py-2 w-full"
              style={{ scrollBehavior: "auto" }}
            >
              {/* Double mapping the array to create a seamless infinite loop */}
              {[
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL6j3xgScFsc2urkmsjsS94oCRbxQ_F_Eb4CP0N-tzpP6drgNlOFW0PbjjhNgODgBJllpJEg5hfhhwKhRpwaHy2OsxoFUw88cuvMCweUOCLxu-qmrMm-VxiHtIi_PDVfOADotOTutNYbqL_w3FQKSukg4PLfpwMUS7l0LmlnE6f6TvVLXUyzfknxvlcMdgFPN5hVeYcsSDrho0QK7buogv1ZPr68qMPdCI8mpTMTpct8epxyQlxvO0dxfhOqX_ky_iedBnbFb1esk",
                  alt: "Red designer stilettos in high-key editorial studio setting",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8NrSqXvsnIk3D42ADRMD9qlchfgUXhmhqdPQJmpkbyl_ZGEvNuYFFIQdUT-ws7uEfdJuPw_FDf-wz-fcSVsykd3_308mT2CTzZwc4_e1kxpESWxEfyC6dIc16VQhCZejaJYmODbDI9CYqw_SJsWhBstBDU7wKwM-etkrzSgkqZdNjD6JGkng6OD5dO1Xn0-YctZjmpdSs-PukHzxUB5QmguXDDwE98plB5x3_5Iy0U3U1ZiW8FLHvRRc_rzW9F4iKCB--ij-VSnA",
                  alt: "Classic brown leather loafers arranged elegantly on textured linen background",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFkh8NAydry8By8uXnF-S_slwmQXV5PyDdFNHu-gATwEaoUriixDgTm3TP8M3s49G78TZmAZTw6B8TOYCEWRQE4cKgAPWnXL6ngRE7RoDuZZAqLEkUjy32dkO2ZudOBEJSCxlxkECMeDii2vMbwuwP1F-XDwEMIz-B8WMN8jPjMm5UtyHkZJpLk2SkcVTBkRInalkA4SFs1EVYezlYNN93uTgDegQ1cmoovOOvx2ERfQ2gjpmdDO4l7jEoEmJHp3Hida82JD2UteA",
                  alt: "Rugged yet refined knee-high boots standing on reflective surface",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO6Qg9IKxZPnKVdYnBEuvcPcG_ZtQGSqBNv6Hg_kGcfJc7AmEsT84pEH87G8cccoyae2jM-ja_NmxSSPVPLI4gPSW4-e_7Y7Z7f5p_UgmJRaTBulQnIG6shToK4v13TDxp-Q5IVPNp-FxSd-n7TYre2a8zMGu5MqB54s9SgOY1B1z9Xgpm5fg8POQbBdZVueMwD8rxguwl54Ksl9wJwNhPH3-8ilat5hJDoD12aPjKwHXtVVQjMvn-qL9EzJBfo2gw0oE-wNhS_IY",
                  alt: "Close-up detail of dark forest green wingtip Oxford shoe",
                },
                // Second copy
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCL6j3xgScFsc2urkmsjsS94oCRbxQ_F_Eb4CP0N-tzpP6drgNlOFW0PbjjhNgODgBJllpJEg5hfhhwKhRpwaHy2OsxoFUw88cuvMCweUOCLxu-qmrMm-VxiHtIi_PDVfOADotOTutNYbqL_w3FQKSukg4PLfpwMUS7l0LmlnE6f6TvVLXUyzfknxvlcMdgFPN5hVeYcsSDrho0QK7buogv1ZPr68qMPdCI8mpTMTpct8epxyQlxvO0dxfhOqX_ky_iedBnbFb1esk",
                  alt: "Red designer stilettos in high-key editorial studio setting",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8NrSqXvsnIk3D42ADRMD9qlchfgUXhmhqdPQJmpkbyl_ZGEvNuYFFIQdUT-ws7uEfdJuPw_FDf-wz-fcSVsykd3_308mT2CTzZwc4_e1kxpESWxEfyC6dIc16VQhCZejaJYmODbDI9CYqw_SJsWhBstBDU7wKwM-etkrzSgkqZdNjD6JGkng6OD5dO1Xn0-YctZjmpdSs-PukHzxUB5QmguXDDwE98plB5x3_5Iy0U3U1ZiW8FLHvRRc_rzW9F4iKCB--ij-VSnA",
                  alt: "Classic brown leather loafers arranged elegantly on textured linen background",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFkh8NAydry8By8uXnF-S_slwmQXV5PyDdFNHu-gATwEaoUriixDgTm3TP8M3s49G78TZmAZTw6B8TOYCEWRQE4cKgAPWnXL6ngRE7RoDuZZAqLEkUjy32dkO2ZudOBEJSCxlxkECMeDii2vMbwuwP1F-XDwEMIz-B8WMN8jPjMm5UtyHkZJpLk2SkcVTBkRInalkA4SFs1EVYezlYNN93uTgDegQ1cmoovOOvx2ERfQ2gjpmdDO4l7jEoEmJHp3Hida82JD2UteA",
                  alt: "Rugged yet refined knee-high boots standing on reflective surface",
                },
                {
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCO6Qg9IKxZPnKVdYnBEuvcPcG_ZtQGSqBNv6Hg_kGcfJc7AmEsT84pEH87G8cccoyae2jM-ja_NmxSSPVPLI4gPSW4-e_7Y7Z7f5p_UgmJRaTBulQnIG6shToK4v13TDxp-Q5IVPNp-FxSd-n7TYre2a8zMGu5MqB54s9SgOY1B1z9Xgpm5fg8POQbBdZVueMwD8rxguwl54Ksl9wJwNhPH3-8ilat5hJDoD12aPjKwHXtVVQjMvn-qL9EzJBfo2gw0oE-wNhS_IY",
                  alt: "Close-up detail of dark forest green wingtip Oxford shoe",
                },
              ].map((shoe, idx) => (
                <div
                  key={idx}
                  className="min-w-[300px] md:min-w-[400px] aspect-[4/5] overflow-hidden shadow-md border border-outline-variant/10 group/item relative cursor-pointer select-none"
                >
                  <img
                    className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-700 ease-out pointer-events-none select-none"
                    alt={shoe.alt}
                    src={shoe.src}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-24 px-6 md:px-0">
            <div className="border-l-2 border-accent-gold pl-12">
              <blockquote className="font-display text-headline-md md:text-headline-xl leading-snug italic text-primary">
                "Where fashion never stops, timeless elegance and endless
                innovation are brought to you by a sustainable source that has been
                providing premium leather for upscale footwear that is long-lasting,
                waterproof, breathable, and resilient for over 50 years."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Intro Callout */}
        <section className="px-6 md:px-margin-desktop py-section-gap bg-background">
          <div className="max-w-5xl mx-auto border border-primary p-8 md:p-16 text-center shadow-sm">
            <p className="font-display text-headline-md leading-relaxed text-primary">
              Specializing in traditional leather articles and bespoke
              customization. Our artisans work alongside your design teams to create
              unique finishes, from specific color matching to technical treatments
              that exceed global performance standards.
            </p>
          </div>
        </section>

        {/* Leather Sample Grid */}
        <section className="bg-surface-container-low px-6 md:px-margin-desktop py-section-gap">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <h2 className="font-display text-headline-xl text-primary">
                Our Footwear Leather Collection
              </h2>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest border-b border-outline-variant pb-2 uppercase">
                CURATED SELECTION 2024
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              {[
                {
                  ref: "REF: F016CMVNO",
                  name: "Arctic",
                  desc: "Semi-Aniline / Smooth Flower\n1.2 / 1.4 mm | European Sourcing",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCtzqkgjKMLZyAwDaodqaVZ4MEsSJzGgM_Y8quTkJPtmv0aGFrHRP_ntgAMaUBRpYpIRfy4sswmQYqXtkdSrBdy8uWr0UKK0QqECboYp6SEuySE9l1X35mJo_jwP3OhvzOwAYsBvyCyqWnVxjjy3alLNhqfLp9UJa4zUYDYYFUItHnSzaUB0IB-PWMYS5fJpBlbH8eJ_zbnWccarG3_s40gZAnEMYYmh9tN3Ive9TSC-A71-lDZud7QqioPYU5d_a_hDWPfJx-ehc",
                  blend: true,
                },
                {
                  ref: "REF: F015CD",
                  name: "Mallow",
                  desc: "Semi-Aniline / Full Grain\n1.0 / 1.2 mm | Europe + GB + NZ Sourcing",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-ByAePeOwmC-FJ2PImruSI5LCqlvC0yrG8VTJzEtFFoxmDwWeHyXSLMjNj8PtrU-WTRJJTWflPNYpfcFlO_yQZLyOckewi1JaDVUsXZiBRprdUhA8vrhl1Wzzh11Z5hQC9BRZi8LmbxAOlEiGYhgxChDDWNwvjhBBJ_BOuttVlP3B9F2jdyhLHAC3RnKWAWVa1fi4VsoGw6eb3C7FVG0mj2YydHrgkhEveo4Gkn7ZvqqhpH0ptOOursrX4D_LJ5CYTgdJbMkmbx8",
                  blend: false,
                },
                {
                  ref: "REF: F015CDA",
                  name: "Warm Leather",
                  desc: "Semi-Aniline / Full Grain\n1.3 / 1.5 mm | European Origin",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBwtR5D_PmURmKoTrUyGc0tfutS4FwAzZ1IdEYSx1pX3o5U7l40KCyAvfVbKVPVNbBPFRkhaL84KkwUOqxOL-VJNrzEEJHK6PnomB-gNlGdyuxKDIzjPIAPAeWRGL9sC4HVmpPqlcv3zhRhBklaZmdsVpqG9XY74tsbyL5NY4x4phxCEHJ_Y1sqzXzbPLyA-3JAOBedVxh3vd28_dUeuvxEO70NQUgu6iA1yE6M2eTuELXBpxUTFa3hXGGH6X_dy_heGNQguJ_mZz0",
                  blend: false,
                },
                {
                  ref: "REF: F011TMLE",
                  name: "Sea Blue",
                  desc: "Aniline / Fine Grain\n1.1 / 1.2 mm | European Sourcing",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_5H_g0d6y911Qe6mAi4-Y66ySxe2KtQOa1FgfAtgOja-U-GMDDqsvoyMTEDiI3mhZqBV95cemhCqUiD2ZRhpJtN6fT-tgqCiNlIU3LN7dRYF0MEXurXRLrAp8p3ZNwmIO4vJHY7gi6vA0Pc0-gmw5V31WKuI4dnLOFwEIlFUhEwnEvYY1DEol40EYKZw9NpEZoiVCh0bN7je1Wlz3SpSSl02EU2pRdLgO8jNSJcgFpEx7XUYVMN7ogpxyaGqn64yc66SzKGMK8g",
                  blend: false,
                },
                {
                  ref: "REF: F016TNP",
                  name: "Navy Blue",
                  desc: "Nappa / Full Grain\n1.0 / 1.2 mm | Europe Sourcing",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAve4icPClAR2UGI8gdrzhKqx1Uo2NaSFhmZ34GzJ82qo_zVxdJj1zjV7cUFSx_j-klaQPqUw96gZA-RM-RiYIADclUtMgB-39wP-sQdRmthWYfBh6s8lmqdHKDhCC9q14BFPUAPoD1kol1QYS32KQ-wt3X5BgaANhSILn8EGRxhNrQVc6oiqitGxVHiL68oSmh0n_LNNM3CqKqOZydy1cvbXzoXJJtoPbe5rLFzwmAp2qbysBu961ODJn16OST0syzzYBNf2tSB2U",
                  blend: false,
                },
                {
                  ref: "REF: F016CLY",
                  name: "Leather",
                  desc: "Semi-Aniline / Smooth Full Grain\n1.0 / 1.2 mm | European Sourcing",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMSNyVP-HmvnwdvV--TAld1fmJrptaq_Y8GCR3CcHth0MbhWnnzAcgUK_ZJwPO1g-W534Jyhs7dzKjXtC8UgPMG1sc4zClmjWj7dAVPtTCX8FEfm4jaWGxF6W1xif1TVYdGQsyQprp6YtgXjmRez4Wa2JRFzfqyYSBQPi0hDGtqQcfPbHMAMth2JgTB5sjrV-2vaFxULQ-qiRTLIRtOBsGIh109rT1XHT1WNBk9KPgG9LgmW8VhA1bHTWWMrWo-qPUbMCApSbl5is",
                  blend: false,
                },
                {
                  ref: "REF: F09TM",
                  name: "Burnt Red",
                  desc: "Nappa / Full Grain\n1.1 / 1.2 mm | GB + EU Sourcing",
                  src: "https://vivosa.co.uk/wp-content/uploads/2025/07/Screenshot_6.png",
                  blend: false,
                },
                {
                  ref: "REF: F08CL",
                  name: "Midnight",
                  desc: "Nubuck / Full Grain\n1.2 / 1.4 mm | EU + NZ Sourcing",
                  src: "https://vivosa.co.uk/wp-content/uploads/2025/07/Screenshot_7.png",
                  blend: false,
                },
                {
                  ref: "REF: F05TV",
                  name: "Deep Red",
                  desc: "Aniline / Full Grain\n1.2 / 1.4 mm | European Sourcing",
                  src: "https://vivosa.co.uk/wp-content/uploads/2025/07/Screenshot_8.png",
                  blend: false,
                },
              ].map((sample) => (
                <div
                  key={sample.ref}
                  className="bg-background overflow-hidden group shadow-md border border-outline-variant/10 hover:shadow-xl transition-all duration-500"
                >
                  <div className="aspect-square bg-surface-dim overflow-hidden relative">
                    {sample.blend && (
                      <div className="absolute inset-0 bg-tertiary/10 mix-blend-overlay z-10 pointer-events-none"></div>
                    )}
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={`${sample.name} swatch`}
                      src={sample.src}
                    />
                  </div>
                  <div className="p-8 border-t border-outline-variant/30">
                    <span className="text-tertiary font-label-caps text-[10px] mb-2 block tracking-wider font-bold">
                      {sample.ref}
                    </span>
                    <h3 className="font-display text-headline-md mb-2 text-primary font-semibold">
                      {sample.name}
                    </h3>
                    <p className="font-body text-body-md text-secondary leading-relaxed whitespace-pre-line">
                      {sample.desc}
                    </p>
                    <div className="mt-6 w-0 group-hover:w-full h-[1px] bg-tertiary transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality & Sustainability Section */}
        <section className="bg-primary text-on-primary py-section-gap overflow-hidden relative shadow-2xl">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              <div className="md:col-span-6 text-on-primary">
                <h2 className="font-display text-display-lg-mobile md:text-display-lg mb-12 text-white leading-tight">
                  Quality &amp;
                  <br />
                  Sustainability
                  <br />
                  in Leather Supply
                </h2>
                <div className="space-y-8">
                  {[
                    {
                      icon: "verified",
                      title: "TRACEABILITY",
                      desc: "Full supply chain visibility from farm to tannery, ensuring ethical sourcing practices.",
                    },
                    {
                      icon: "eco",
                      title: "LWG CERTIFIED",
                      desc: "Sourced exclusively from Leather Working Group Gold-rated tanneries.",
                    },
                    {
                      icon: "architecture",
                      title: "EXPERT FINISHING",
                      desc: "Proprietary water-based finishing techniques for reduced environmental impact.",
                    },
                  ].map((feat) => (
                    <div
                      key={feat.title}
                      className="flex items-start gap-6 border-b border-white/10 pb-6"
                    >
                      <span
                        className="material-symbols-outlined text-accent-gold text-3xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {feat.icon}
                      </span>
                      <div>
                        <h4 className="font-label-caps text-label-caps mb-2 tracking-widest text-white font-bold">
                          {feat.title}
                        </h4>
                        <p className="font-body text-body-md text-white/60 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-5 md:col-start-8">
                <div className="aspect-[3/4] border-accent-gold border p-4 shadow-2xl">
                  <img
                    className="w-full h-full object-cover grayscale brightness-50"
                    alt="Artisan working meticulously on leather piece"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlszXM5MSlS2LP6mK0LzpcKgJy65H1qzvRDWIpuMamhRlv38kZMa2HZIM4s0U3gK8rnCxglUU8F7AQxMuIBRz8hDwB7aKHvm22Kwn4sN6eyar-bEndXbonWmEfCeoyahGjsfaZ8iPu-zjTok1wwNClOe5ceW0ZenniZb0DIXiMdIyiRDc8gz40fIVwI2nC9uo1NeNjW9p4WdpfnuWTyJqib0QwADjO8zFwePuu0rYsMhlSImcKQpbwKYerdYlWMmCMcbO0WEquAig"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Subtle Leather Texture Background Overlay */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none z-0"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0p0sFMo58yTGaQeHcti79CpBXVcv58PgofvWhAjkM-9ZPkcWi1kz9Q07Y7XiIOXJtXnGd1bvEHSVopBSWRdtpb40rANAaVj2YEysHZeos0sne7XGRU3KN-kcUs-4c4HGoZSnYZ8v_gyxd67koIy2T51eEdzuPVU6LF4Lt0zt5SzUQGQl4bxGVKR1QVPq1TKNGzlzWOeNlFTHIsYHSDxdeXEqtSwEb2n33H2EWv_eVafktJG7o8tyVFBQkM5VL5oX201krihUav1s')",
            }}
          ></div>
        </section>
      </main>
    </div>
  );
}
