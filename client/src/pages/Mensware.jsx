import React, { useState, useEffect, useRef } from "react";

export default function Mensware() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jacketsScrollRef = useRef(null);



  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const jacketsPausedUntil = useRef(0);

  // Butter-smooth continuous infinite autoplay marquee loop
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isHovered && !isDragging && Date.now() > jacketsPausedUntil.current && jacketsScrollRef.current) {
        const el = jacketsScrollRef.current;
        el.scrollLeft += 1.0;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.pageX - jacketsScrollRef.current.offsetLeft;
    scrollLeftRef.current = jacketsScrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - jacketsScrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    const el = jacketsScrollRef.current;
    let targetScroll = scrollLeftRef.current - walk;

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

  const shirtsScrollRef = useRef(null);
  const [isShirtsHovered, setIsShirtsHovered] = useState(false);
  const [isShirtsDragging, setIsShirtsDragging] = useState(false);
  const startShirtsXRef = useRef(0);
  const scrollLeftShirtsRef = useRef(0);

  const shirtsPausedUntil = useRef(0);

  // Butter-smooth continuous infinite autoplay marquee loop for Shirts
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isShirtsHovered && !isShirtsDragging && Date.now() > shirtsPausedUntil.current && shirtsScrollRef.current) {
        const el = shirtsScrollRef.current;
        el.scrollLeft += 1.0;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isShirtsHovered, isShirtsDragging]);

  const handleShirtsMouseDown = (e) => {
    setIsShirtsDragging(true);
    startShirtsXRef.current = e.pageX - shirtsScrollRef.current.offsetLeft;
    scrollLeftShirtsRef.current = shirtsScrollRef.current.scrollLeft;
  };

  const handleShirtsMouseMove = (e) => {
    if (!isShirtsDragging) return;
    e.preventDefault();
    const x = e.pageX - shirtsScrollRef.current.offsetLeft;
    const walk = (x - startShirtsXRef.current) * 1.5;
    const el = shirtsScrollRef.current;
    let targetScroll = scrollLeftShirtsRef.current - walk;

    if (targetScroll < 0) {
      targetScroll += el.scrollWidth / 2;
    } else if (targetScroll >= el.scrollWidth / 2) {
      targetScroll -= el.scrollWidth / 2;
    }

    el.scrollLeft = targetScroll;
  };

  const handleShirtsMouseUpOrLeave = () => {
    setIsShirtsDragging(false);
  };

  const trousersScrollRef = useRef(null);
  const [isTrousersHovered, setIsTrousersHovered] = useState(false);
  const [isTrousersDragging, setIsTrousersDragging] = useState(false);
  const startTrousersXRef = useRef(0);
  const scrollLeftTrousersRef = useRef(0);

  const trousersPausedUntil = useRef(0);

  // Butter-smooth continuous infinite autoplay marquee loop for Trousers
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isTrousersHovered && !isTrousersDragging && Date.now() > trousersPausedUntil.current && trousersScrollRef.current) {
        const el = trousersScrollRef.current;
        el.scrollLeft += 1.0;

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isTrousersHovered, isTrousersDragging]);

  const handleTrousersMouseDown = (e) => {
    setIsTrousersDragging(true);
    startTrousersXRef.current = e.pageX - trousersScrollRef.current.offsetLeft;
    scrollLeftTrousersRef.current = trousersScrollRef.current.scrollLeft;
  };

  const handleTrousersMouseMove = (e) => {
    if (!isTrousersDragging) return;
    e.preventDefault();
    const x = e.pageX - trousersScrollRef.current.offsetLeft;
    const walk = (x - startTrousersXRef.current) * 1.5;
    const el = trousersScrollRef.current;
    let targetScroll = scrollLeftTrousersRef.current - walk;

    if (targetScroll < 0) {
      targetScroll += el.scrollWidth / 2;
    } else if (targetScroll >= el.scrollWidth / 2) {
      targetScroll -= el.scrollWidth / 2;
    }

    el.scrollLeft = targetScroll;
  };

  const handleTrousersMouseUpOrLeave = () => {
    setIsTrousersDragging(false);
  };

  return (
    <div className="bg-background text-on-surface">
      {/* Hero Section */}
      <header className="relative min-h-[921px] bg-primary overflow-hidden pt-32 px-4 md:px-margin-desktop md:pt-48 pb-24">
        <div className="absolute inset-0 opacity-10 woven-texture"></div>
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-gutter relative z-10 h-full">
          <div className="md:col-span-5 flex flex-col items-start gap-6">
            <span className="font-label-caps text-label-caps text-on-tertiary-container tracking-[0.3em] uppercase">
              Men's Collection
            </span>
            <h1 className="font-display-lg text-5xl md:text-display-lg text-on-primary leading-tight">
              Precision Crafted. <br />
              Built to Perform.
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/70 max-w-md leading-relaxed">
              Our AW24 Men's Wovenwear collection combines industrial durability
              with high-fashion tailoring, designed for the modern B2B market
              that refuses to compromise on ethics or excellence.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="/contact"
                className="bg-on-primary text-primary font-label-caps text-label-caps px-8 py-4 md:px-10 md:py-5 uppercase border border-transparent hover:bg-transparent hover:text-on-primary hover:border-on-primary transition-all duration-500 inline-block"
              >
                Request a Quote
              </a>
            </div>
          </div>
          <div className="md:col-span-7 flex justify-end mt-12 md:mt-0">
            <div className="w-full max-w-[600px] h-[500px] md:h-[700px] bg-surface-container overflow-hidden">
              <img
                alt="Premium Male Model"
                className="w-full h-full object-cover grayscale brightness-90 contrast-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZHIeoG2uZ-GJ53w0XiZFt7cWAdV0rH4cc3kc-TZyi4IWc_4RUwPp16FNjczzyzPzfjFCLLtw8AP-lmuvIIZd4kv0tKZbsKbU24tYw5r-B9xxvHb03D6SdlNLkji7MEURGBeWxV0Xpvdt_wt_WksqubWvP0NppaIIXF0FNSiBKLCO1KaH8kCSkwLWooZWjlCh1L9izB71zNHbfxmtF3RA7biMyh1o0P1qBk-1Bx3qDpl6QOhTR8KQVm8Z41QA1enFjgZYhz9Q5wQs"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Category Navigation */}
      <div className="bg-surface border-b border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop overflow-x-auto hide-scrollbar">
          <div className="flex gap-8 md:gap-12 py-6 whitespace-nowrap">
            <a
              className="font-label-caps text-label-caps text-primary border-b-2 border-on-tertiary-container pb-2"
              href="#jackets"
            >
              JACKETS &amp; COATS
            </a>
            <a
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
              href="#shirts"
            >
              SHIRTS
            </a>
            <a
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
              href="#trousers"
            >
              TROUSERS &amp; SHORTS
            </a>
            <a
              className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors"
              href="#denim"
            >
              DENIM
            </a>
          </div>
        </div>
      </div>

      {/* Category 1: Jackets & Coats */}
      <section className="py-16 md:py-section-gap bg-background" id="jackets">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
          <div className="md:col-span-4 sticky top-40 mb-12 md:mb-0">
            <span className="inline-block px-4 py-1 border border-on-tertiary-container text-on-tertiary-container font-label-caps text-[10px] tracking-widest uppercase mb-6">
              01 / Jacket &amp; Coat
            </span>
            <h2 className="font-display-lg text-4xl md:text-headline-xl mb-6">
              Outerwear Reimagined
            </h2>
            <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
              From tech-infused puffers to classic structured overcoats, our
              outerwear is constructed using GRS-certified recycled materials
              and innovative water-repellent weaves.
            </p>

          </div>
          <div className="md:col-span-8 relative overflow-hidden">
            <div 
              ref={jacketsScrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={() => {
                handleMouseUpOrLeave();
                setIsHovered(false);
              }}
              onMouseEnter={() => setIsHovered(true)}
              className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 select-none cursor-grab active:cursor-grabbing py-2 w-full"
              style={{ scrollBehavior: "auto" }}
            >
              {[
                {
                  alt: "Puffer Jacket",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjAUo-ReYeC0D_etsF_nF1ApiYD93JNmfH7unoXBhqdtNA8GtwSRDonJ_O4RJTzsFCJUTynCtPKmwvc5KKnNp6O0ZXyc8mFZ8Yv7kSaEiHvqyIsEsa6McyLERFguiBIqmhFTE_fW_Zjmq0c8XtW1H5C_hsViE47kgu6hfN-A0xfXwpi_hrhdE9RFDht7TvlyMrqSk7snYWtDIlp39mG4Ei7FxeSbkEhgYJ9wR7AGL8O9VOnMo438awnJ1JzV7HbRYq9q_PzXnPWY",
                  material: "Sustainable Nylon",
                  title: "Technical Puffer v.1"
                },
                {
                  alt: "Red Puffer",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3RJ0E_MGSQKXN6NGMk2gbVPgLZgULbjMyJUn9qjt7dGUjiBCHIQquP_-dDvoDYmDixGdY9mWk8aqRrrgdWZukLJvkBlqhkEvbeZfqX9Tg3Xhost0KNOI0w_4IVf7ZW8lIF3h9tDSwvzQ4RZ3EYq0MBflSjaBrua6CdhaTZz7mH_rN6__TSR7TvnBUvOUhqgmTEzMc4VmImwCHpUDJKB9-_II8IKPXOiRuliZE1uLKTxKDrAQ2-CduSsfHnz8kB2Djdvbltt425nM",
                  material: "Recycled Polyester",
                  title: "Crimson Field Parka"
                },
                {
                  alt: "Olive Jacket",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABgDSXKxGIFOtKq13_mvG08qo6JGH9mUZ2V_7_web74X0nEcGR05HxGyVCaApFPiGf4ClNetgIfUYoqv3urf5I7NoJrCh4peqqxI8CD3PjjBYEgk4dLI_NFKGb92epe-yhfiK03rcAqdtCrzRKXAC1J5MtLq7Waf98i-obb6dDh7dcGxcPxEsDMjJe__kbgoql4YYGyXaaftOEnP9AD_2QAijIh0W7-jtVNdXGr7bpSYtgl_WTHwVfWahQChuLXZtFaZBQG99aqc4",
                  material: "Organic Cotton Twill",
                  title: "Olive Heritage Overcoat"
                },
                // Second copy for infinite wrap-around
                {
                  alt: "Puffer Jacket",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDTjAUo-ReYeC0D_etsF_nF1ApiYD93JNmfH7unoXBhqdtNA8GtwSRDonJ_O4RJTzsFCJUTynCtPKmwvc5KKnNp6O0ZXyc8mFZ8Yv7kSaEiHvqyIsEsa6McyLERFguiBIqmhFTE_fW_Zjmq0c8XtW1H5C_hsViE47kgu6hfN-A0xfXwpi_hrhdE9RFDht7TvlyMrqSk7snYWtDIlp39mG4Ei7FxeSbkEhgYJ9wR7AGL8O9VOnMo438awnJ1JzV7HbRYq9q_PzXnPWY",
                  material: "Sustainable Nylon",
                  title: "Technical Puffer v.1"
                },
                {
                  alt: "Red Puffer",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3RJ0E_MGSQKXN6NGMk2gbVPgLZgULbjMyJUn9qjt7dGUjiBCHIQquP_-dDvoDYmDixGdY9mWk8aqRrrgdWZukLJvkBlqhkEvbeZfqX9Tg3Xhost0KNOI0w_4IVf7ZW8lIF3h9tDSwvzQ4RZ3EYq0MBflSjaBrua6CdhaTZz7mH_rN6__TSR7TvnBUvOUhqgmTEzMc4VmImwCHpUDJKB9-_II8IKPXOiRuliZE1uLKTxKDrAQ2-CduSsfHnz8kB2Djdvbltt425nM",
                  material: "Recycled Polyester",
                  title: "Crimson Field Parka"
                },
                {
                  alt: "Olive Jacket",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuABgDSXKxGIFOtKq13_mvG08qo6JGH9mUZ2V_7_web74X0nEcGR05HxGyVCaApFPiGf4ClNetgIfUYoqv3urf5I7NoJrCh4peqqxI8CD3PjjBYEgk4dLI_NFKGb92epe-yhfiK03rcAqdtCrzRKXAC1J5MtLq7Waf98i-obb6dDh7dcGxcPxEsDMjJe__kbgoql4YYGyXaaftOEnP9AD_2QAijIh0W7-jtVNdXGr7bpSYtgl_WTHwVfWahQChuLXZtFaZBQG99aqc4",
                  material: "Organic Cotton Twill",
                  title: "Olive Heritage Overcoat"
                }
              ].map((jacket, idx) => (
                <div 
                  key={idx} 
                  className="product-card-hover bg-white p-4 transition-all duration-500 cursor-pointer min-w-[280px] sm:min-w-[340px] md:min-w-[320px] flex-shrink-0"
                >
                  <div className="h-[380px] w-full bg-surface-container mb-4 overflow-hidden">
                    <img
                      alt={jacket.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      src={jacket.src}
                      loading="lazy"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                  <p className="font-label-caps text-[10px] text-on-tertiary-container uppercase tracking-widest mb-1">
                    {jacket.material}
                  </p>
                  <h3 className="font-body-md font-bold text-primary">
                    {jacket.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-end mt-4 px-2">
              <button 
                onClick={() => {
                  jacketsPausedUntil.current = Date.now() + 1500;
                  const el = jacketsScrollRef.current;
                  if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary cursor-pointer"
                aria-label="Scroll left"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
              </button>
              <button 
                onClick={() => {
                  jacketsPausedUntil.current = Date.now() + 1500;
                  const el = jacketsScrollRef.current;
                  if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary cursor-pointer"
                aria-label="Scroll right"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Strip */}
      <section className="bg-primary py-16 md:py-24 text-on-primary">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-gutter text-center">
          <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-on-primary/10 last:border-0 px-8 pb-12 md:pb-0">
            <span className="material-symbols-outlined text-on-tertiary-container mb-4 text-4xl">
              straighten
            </span>
            <h4 className="font-label-caps text-label-caps tracking-widest uppercase mb-2">
              Custom Sizing
            </h4>
            <p className="font-body-md text-on-primary/60">
              Proprietary measurement algorithms for global fit consistency.
            </p>
          </div>
          <div className="flex flex-col items-center border-b md:border-b-0 md:border-r border-on-primary/10 last:border-0 px-8 py-12 md:py-0">
            <span className="material-symbols-outlined text-on-tertiary-container mb-4 text-4xl">
              eco
            </span>
            <h4 className="font-label-caps text-label-caps tracking-widest uppercase mb-2">
              Sustainable Fabrics
            </h4>
            <p className="font-body-md text-on-primary/60">
              Certified organic and recycled materials with full traceability.
            </p>
          </div>
          <div className="flex flex-col items-center px-8 pt-12 md:pt-0">
            <span className="material-symbols-outlined text-on-tertiary-container mb-4 text-4xl">
              factory
            </span>
            <h4 className="font-label-caps text-label-caps tracking-widest uppercase mb-2">
              Bulk Production
            </h4>
            <p className="font-body-md text-on-primary/60">
              Scalable manufacturing for international retail distribution.
            </p>
          </div>
        </div>
      </section>

      {/* Category 2: Shirts */}
      <section className="py-16 md:py-section-gap bg-primary-container" id="shirts">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-8 relative overflow-hidden order-2 md:order-1">
            <div 
              ref={shirtsScrollRef}
              onMouseDown={handleShirtsMouseDown}
              onMouseMove={handleShirtsMouseMove}
              onMouseUp={handleShirtsMouseUpOrLeave}
              onMouseLeave={() => {
                handleShirtsMouseUpOrLeave();
                setIsShirtsHovered(false);
              }}
              onMouseEnter={() => setIsShirtsHovered(true)}
              className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 select-none cursor-grab active:cursor-grabbing py-2 w-full"
              style={{ scrollBehavior: "auto" }}
            >
              {[
                {
                  alt: "Khaki casual",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsjw1qR_USA3LwUTZwWRtFtnKU3bJmhaCIqi5Kg9H-Dut7xHUE_m8EfZJvdq61U4o-WZzay6g6zuAz_s_MxRgb3fWGiVXQOFpxBSaFO5OqsLWRVTsCKnm7LXXZOg5u5LcRn4ZdcD38qMPhEZE_ywbwCr40NQ57hM-R0TZkm6IOvN0uKGY8r6efmH5ck7ChcCuuDxiwBRx0ZknZD7r-UnuuN4ymhpmCKWJiBQ9dVvuimzUYBMPA6Xsj9jltZlB2BqMnZYFxbl2K0v4",
                  material: "Premium Poplin",
                  title: "Daily Essentials Shirt"
                },
                {
                  alt: "Dark formal",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCytFGBrSh7N-ednFprrrJFDsyTcCpV6yHyPgrIzAhxMZtlylame5SyEm-FJHXFGDlgi4xSBWCCYVWiXqcAW2k5BQE2bebFjuAYQp924JOpa3Z9sVvmGXunWkpl3KIEfxI7MiBrLOdEAmwK0_hyiTxowa-O5VxNxIZrLd4cn-1ycc9Z6Yjwzxi8m-YTD1OAeKiVC0s6owDbrwy3faixVrBML-6t8-OB1PdKHy0lR6HRNImHonlrEDrJgkNcJpYEsFdymGaEq8BBwtM",
                  material: "Tencel Blend",
                  title: "Executive Woven Series"
                },
                // Second copy for infinite loop
                {
                  alt: "Khaki casual",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsjw1qR_USA3LwUTZwWRtFtnKU3bJmhaCIqi5Kg9H-Dut7xHUE_m8EfZJvdq61U4o-WZzay6g6zuAz_s_MxRgb3fWGiVXQOFpxBSaFO5OqsLWRVTsCKnm7LXXZOg5u5LcRn4ZdcD38qMPhEZE_ywbwCr40NQ57hM-R0TZkm6IOvN0uKGY8r6efmH5ck7ChcCuuDxiwBRx0ZknZD7r-UnuuN4ymhpmCKWJiBQ9dVvuimzUYBMPA6Xsj9jltZlB2BqMnZYFxbl2K0v4",
                  material: "Premium Poplin",
                  title: "Daily Essentials Shirt"
                },
                {
                  alt: "Dark formal",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCytFGBrSh7N-ednFprrrJFDsyTcCpV6yHyPgrIzAhxMZtlylame5SyEm-FJHXFGDlgi4xSBWCCYVWiXqcAW2k5BQE2bebFjuAYQp924JOpa3Z9sVvmGXunWkpl3KIEfxI7MiBrLOdEAmwK0_hyiTxowa-O5VxNxIZrLd4cn-1ycc9Z6Yjwzxi8m-YTD1OAeKiVC0s6owDbrwy3faixVrBML-6t8-OB1PdKHy0lR6HRNImHonlrEDrJgkNcJpYEsFdymGaEq8BBwtM",
                  material: "Tencel Blend",
                  title: "Executive Woven Series"
                }
              ].map((shirt, idx) => (
                <div 
                  key={idx} 
                  className="product-card-hover bg-background p-4 transition-all duration-500 cursor-pointer min-w-[280px] sm:min-w-[340px] md:min-w-[320px] flex-shrink-0"
                >
                  <div className="h-[380px] w-full bg-surface-container-high mb-4 overflow-hidden">
                    <img
                      alt={shirt.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      src={shirt.src}
                      loading="lazy"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                  <p className="font-label-caps text-[10px] text-on-tertiary-container uppercase tracking-widest mb-1">
                    {shirt.material}
                  </p>
                  <h3 className="font-body-md font-bold text-primary">
                    {shirt.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-end mt-4 px-2">
              <button 
                onClick={() => {
                  shirtsPausedUntil.current = Date.now() + 1500;
                  const el = shirtsScrollRef.current;
                  if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer border border-primary/10 shadow-sm"
                aria-label="Scroll left"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
              </button>
              <button 
                onClick={() => {
                  shirtsPausedUntil.current = Date.now() + 1500;
                  const el = shirtsScrollRef.current;
                  if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary cursor-pointer border border-primary/10 shadow-sm"
                aria-label="Scroll right"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
          <div className="md:col-span-4 bg-secondary-container p-8 md:p-12 h-full flex flex-col justify-center order-1 md:order-2">
            <span className="font-label-caps text-label-caps text-on-tertiary-container tracking-[0.3em] uppercase mb-6">
              Woven Integrity
            </span>
            <h2 className="font-display-lg text-4xl md:text-headline-xl text-primary mb-6">
              The Modern Shirt
            </h2>
            <p className="font-body-md text-on-secondary-container mb-8 leading-relaxed">
              Our shirts are engineered for breathability and structural
              permanence. Featuring reinforced collars and biodegradable buttons.
            </p>
          </div>
        </div>
      </section>

      {/* Category 3: Trousers & Shorts */}
      <section className="py-16 md:py-section-gap bg-background" id="trousers">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-4 flex flex-col justify-center mb-12 md:mb-0">
            <h2 className="font-display-lg text-4xl md:text-headline-xl mb-6">
              Structural Foundation
            </h2>
            <p className="font-body-md text-on-surface-variant mb-12 leading-relaxed">
              Tailored for motion. Our trousers use a proprietary mechanical
              stretch weave that maintains its shape through intensive daily
              wear.
            </p>
            <div className="space-y-4">
              <div className="editorial-underline pb-4 flex justify-between items-center group cursor-pointer">
                <span className="font-body-lg text-primary">
                  Chino Architecture
                </span>
              </div>
              <div className="editorial-underline pb-4 flex justify-between items-center group cursor-pointer">
                <span className="font-body-lg text-primary">
                  Cargo Performance
                </span>
              </div>
              <div className="editorial-underline pb-4 flex justify-between items-center group cursor-pointer">
                <span className="font-body-lg text-primary">Summer Shorts</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 relative overflow-hidden">
            <div 
              ref={trousersScrollRef}
              onMouseDown={handleTrousersMouseDown}
              onMouseMove={handleTrousersMouseMove}
              onMouseUp={handleTrousersMouseUpOrLeave}
              onMouseLeave={() => {
                handleTrousersMouseUpOrLeave();
                setIsTrousersHovered(false);
              }}
              onMouseEnter={() => setIsTrousersHovered(true)}
              className="flex gap-6 overflow-x-auto hide-scrollbar pb-4 select-none cursor-grab active:cursor-grabbing py-2 w-full"
              style={{ scrollBehavior: "auto" }}
            >
              {[
                {
                  alt: "Trousers 1",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQnQMvMuFIKK0D7Jw0NHC1KbyNK7lsiEZowCeswFQFvn3WN2mNasujq0NGAzhIazGP-iVcLwXaoVMGaStneBU3clGMhxfIJfHEqTkHp-VkMx7fibY3ZHdEnMManFGcAJZlE0p1WpFmkzRv9-lS7Ck82uGT549LI9y62I5XIvhGueuQCGTLVP_T_SSXDPJxueyVBiQ4EY8F7rUce_e0IMHkCHxgVo8QXCOVkrE-o8vxFKp_jaEpG71Kzn8JI0teP-KjgFooSRfUMJw",
                  material: "Wool Blend",
                  title: "Slim Arch Trousers"
                },
                {
                  alt: "Trousers 2",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvuY3ou5p37htH2m9OutmN1_lNEo7q8NVAqNDIljqz4iZQ-lAAJdoxT7A1I2eHzMbDpSsmjkHT-DWPZhLS0JmbKMb8Z6MI8RisxVI1go0OBd7TcTcTzoHYGqr47aDqKvMAIHGML-tycdIhlZJdUkIfyihWyNX1iR-KCdqdnN9b1-EHq4TV7NSj-p42C1gnG8lukmn4rB2mMHkCOxE0_hNcffmQq-dR47pOH7NPAPqHu3FteZ1yIO_l1slnguH23cy4FwIsbw9B9bo",
                  material: "Canvas Twill",
                  title: "Standard Field Chino"
                },
                {
                  alt: "Shorts",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxmRBr3tpG0q976OD3KXD-KqWslAC4RrW9w8jg90Moyo3OI1hGfz67Dztl126c_vNH5cgF01tZwwUbg395RIPyq3IGIBDWOCY6kwi_QkG9g71zCVD-42IuGCNsJtVgBLbvOXd4JpYmfWUWp7yYLxda_VCo4GUCKB45u5V7Fe6TzJQSffvpwNVdaRRGX7WOMi89XkCqRf1b-TzNNvF6-d6rkwd6LjFyIs2p_eEQA-uyZC9sWj9kh9pnWBuj4DEN6gJSUVLIJ6Cmlfg",
                  material: "Stretch Nylon",
                  title: "Transit Utility Short"
                },
                // Second copy for infinite loop
                {
                  alt: "Trousers 1",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBQnQMvMuFIKK0D7Jw0NHC1KbyNK7lsiEZowCeswFQFvn3WN2mNasujq0NGAzhIazGP-iVcLwXaoVMGaStneBU3clGMhxfIJfHEqTkHp-VkMx7fibY3ZHdEnMManFGcAJZlE0p1WpFmkzRv9-lS7Ck82uGT549LI9y62I5XIvhGueuQCGTLVP_T_SSXDPJxueyVBiQ4EY8F7rUce_e0IMHkCHxgVo8QXCOVkrE-o8vxFKp_jaEpG71Kzn8JI0teP-KjgFooSRfUMJw",
                  material: "Wool Blend",
                  title: "Slim Arch Trousers"
                },
                {
                  alt: "Trousers 2",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvuY3ou5p37htH2m9OutmN1_lNEo7q8NVAqNDIljqz4iZQ-lAAJdoxT7A1I2eHzMbDpSsmjkHT-DWPZhLS0JmbKMb8Z6MI8RisxVI1go0OBd7TcTcTzoHYGqr47aDqKvMAIHGML-tycdIhlZJdUkIfyihWyNX1iR-KCdqdnN9b1-EHq4TV7NSj-p42C1gnG8lukmn4rB2mMHkCOxE0_hNcffmQq-dR47pOH7NPAPqHu3FteZ1yIO_l1slnguH23cy4FwIsbw9B9bo",
                  material: "Canvas Twill",
                  title: "Standard Field Chino"
                },
                {
                  alt: "Shorts",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxmRBr3tpG0q976OD3KXD-KqWslAC4RrW9w8jg90Moyo3OI1hGfz67Dztl126c_vNH5cgF01tZwwUbg395RIPyq3IGIBDWOCY6kwi_QkG9g71zCVD-42IuGCNsJtVgBLbvOXd4JpYmfWUWp7yYLxda_VCo4GUCKB45u5V7Fe6TzJQSffvpwNVdaRRGX7WOMi89XkCqRf1b-TzNNvF6-d6rkwd6LjFyIs2p_eEQA-uyZC9sWj9kh9pnWBuj4DEN6gJSUVLIJ6Cmlfg",
                  material: "Stretch Nylon",
                  title: "Transit Utility Short"
                }
              ].map((trousers, idx) => (
                <div 
                  key={idx} 
                  className="product-card-hover bg-white p-4 transition-all duration-500 cursor-pointer min-w-[280px] sm:min-w-[340px] md:min-w-[320px] flex-shrink-0"
                >
                  <div className="h-[380px] w-full bg-surface-container mb-4 overflow-hidden">
                    <img
                      alt={trousers.alt}
                      className="w-full h-full object-cover pointer-events-none"
                      src={trousers.src}
                      loading="lazy"
                      onDragStart={(e) => e.preventDefault()}
                    />
                  </div>
                  <p className="font-label-caps text-[10px] text-on-tertiary-container uppercase tracking-widest mb-1">
                    {trousers.material}
                  </p>
                  <h3 className="font-body-md font-bold text-primary">
                    {trousers.title}
                  </h3>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-end mt-4 px-2">
              <button 
                onClick={() => {
                  trousersPausedUntil.current = Date.now() + 1500;
                  const el = trousersScrollRef.current;
                  if (el) el.scrollBy({ left: -320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary cursor-pointer"
                aria-label="Scroll left"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
              </button>
              <button 
                onClick={() => {
                  trousersPausedUntil.current = Date.now() + 1500;
                  const el = trousersScrollRef.current;
                  if (el) el.scrollBy({ left: 320, behavior: "smooth" });
                }}
                className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary cursor-pointer"
                aria-label="Scroll right"
              >
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category 4: Denim */}
      <section className="py-16 md:py-section-gap bg-primary text-on-primary" id="denim">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="inline-block px-4 py-1 bg-on-tertiary-container text-primary font-label-caps text-[10px] tracking-widest uppercase mb-6">
                04 / Denim
              </span>
              <h2 className="font-display-lg text-5xl md:text-display-lg leading-none">
                The Future of Indigo
              </h2>
              <p className="font-body-lg text-on-primary/70 mt-6 leading-relaxed">
                Water-less dyeing techniques and laser finishing processes
                define our denim line. Durable, circular, and refined.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="h-[400px] md:h-[600px] bg-primary-container overflow-hidden relative cursor-pointer group">
              <img
                alt="Folded Denim"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjtNCP-H3vCelfDzd1kpvWDTmyKtY3b13tEOA7cpQTvzyrzveD1O8J-0EziO4F18R45anqwBlGfelkUxB51gZ-xt3UxRr60uWIzkOoMZrfZ_0HBFQyHh9tCdA2BeZEZww5SSlnKU-pqalNk1DB4yHv6Ag-g1JvdmbPnuLV4ho4VyuXoZxh9E2FPYKLtGJ7Htt_2MBBMjOu-CYqmZOE7jB9UJLq940F9cdi48jJJstlvfQ3g9ASsn4kzI-9E_Mfn5fv0tmTXIiM2mo"
                loading="lazy"
              />
              <div className="absolute bottom-8 left-8">
                <h4 className="font-display-lg text-2xl md:text-headline-md text-on-primary">
                  Raw Selvedge Stack
                </h4>
                <p className="font-label-caps text-[10px] tracking-widest uppercase text-on-tertiary-container">
                  14.5oz Japanese Denim
                </p>
              </div>
            </div>
            <div className="h-[400px] md:h-[600px] bg-primary-container overflow-hidden relative cursor-pointer group">
              <img
                alt="Worn Jeans Lifestyle"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvg5-iRT-bTs3yJyKtWnyts3oq8lY0f0CUWP0Py4m8hEE9v5vdzc-q9alm92yUXBMLJLF9RRiMnfDYyKlag3VtHdhP6MK86nIUnGm7QYBjkRmolJqBJwtiOZN9yM68Yh-mJ3zSzrJYz8dSaarUu5re7SLzWJbuzPn9AfUb5WOt67nhJB6SSdySztW-S1vn8en_GtB5ezh5poHJvA1zqnr1EZNVzJHp27jKNY29hUcZRggu_CDTQ9Lu4OURJq2ef-6hP-CSEIjniOo"
                loading="lazy"
              />
              <div className="absolute bottom-8 left-8">
                <h4 className="font-display-lg text-2xl md:text-headline-md text-on-primary">
                  Vintage Tonal Wash
                </h4>
                <p className="font-label-caps text-[10px] tracking-widest uppercase text-on-tertiary-container">
                  Laser Processed Finishing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-section-gap bg-secondary-container">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop text-center flex flex-col items-center">
          <h2 className="font-display-lg text-4xl md:text-display-lg text-primary mb-8 leading-tight">
            Ready to Source <br />
            Men's Garments?
          </h2>
          <p className="font-body-lg text-on-secondary-container max-w-2xl mb-12 leading-relaxed">
            Connect with our production team to discuss your collection's
            specific requirements, from fabric sourcing to full-scale
            manufacturing.
          </p>
          <button
            className="bg-primary text-on-primary font-label-caps text-label-caps px-12 py-5 md:px-16 md:py-6 uppercase tracking-[0.2em] hover:bg-on-tertiary-container hover:text-primary transition-all duration-500"
            type="button"
            onClick={() => window.location.href = "/contact"}
          >
            Get in Touch
          </button>
        </div>
      </section>
    </div>
  );
}
