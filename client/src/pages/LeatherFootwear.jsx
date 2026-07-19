import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

export default function LeatherFootwear() {
  const [footwearProducts, setFootwearProducts] = useState([]);

  useEffect(() => {
    const loadFootwear = async () => {
      try {
        const data = await fetchPublicSustainableLeathers("leather-footwear");
        setFootwearProducts(data);
      } catch (err) {
        console.error("Failed to load footwear leathers:", err);
      }
    };
    loadFootwear();
  }, []);

  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const heroSlides = [
    {
      top: "/slides/8.png",
      bottom: "/slides/6.png",
      altTop: "Premium footwear leather rolls",
      altBottom: "Elegant handcrafted leather Oxford shoe",
    },
    {
      top: "/slides/5.png",
      bottom: "/slides/7.png",
      altTop: "Artisan leather tanning material",
      altBottom: "Luxury designer red stiletto",
    },
    {
      top: "/slides/6.png",
      bottom: "/slides/8.png",
      altTop: "Close-up of premium footwear leather",
      altBottom: "Bespoke classic brown leather loafers",
    },
    {
      top: "/slides/7.png",
      bottom: "/slides/5.png",
      altTop: "High-grade leather sheet",
      altBottom: "Sophisticated modern leather footwear design",
    },
  ];
  const [activeSlide, setActiveSlide] = useState(0);
  const dragStartX = useRef(null);
  const isHeroDragging = useRef(false);

  const handleHeroDragStart = (clientX) => {
    dragStartX.current = clientX;
    isHeroDragging.current = true;
  };

  const handleHeroDragEnd = (clientX) => {
    if (!isHeroDragging.current || dragStartX.current === null) return;
    const deltaX = clientX - dragStartX.current;
    const threshold = 50;
    if (deltaX < -threshold) {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    } else if (deltaX > threshold) {
      setActiveSlide(
        (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
      );
    }
    isHeroDragging.current = false;
    dragStartX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
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
      <main className="pt-20 md:pt-[88px]">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-88px)] overflow-hidden">
          {/* Left: Imagery Slider */}
          <div
            className="w-full md:w-[45%] relative  p-12 md:p-24 flex flex-col items-center justify-center min-h-[500px] cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => handleHeroDragStart(e.clientX)}
            onMouseUp={(e) => handleHeroDragEnd(e.clientX)}
            onMouseLeave={(e) => {
              if (isHeroDragging.current) {
                handleHeroDragEnd(e.clientX);
              }
            }}
            onTouchStart={(e) => {
              if (e.touches && e.touches[0]) {
                handleHeroDragStart(e.touches[0].clientX);
              }
            }}
            onTouchEnd={(e) => {
              if (e.changedTouches && e.changedTouches[0]) {
                handleHeroDragEnd(e.changedTouches[0].clientX);
              }
            }}
          >
            <div className="relative w-full max-w-md aspect-[3/4]">
              {heroSlides.map((slide, index) => {
                const isActive = index === activeSlide;
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                      isActive
                        ? "opacity-100 z-10"
                        : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    {/* Leather Rolls (Top) */}
                    <div className="absolute top-0 left-0 w-4/5 h-3/5 z-10 border-[0.5px] border-accent-gold/20 shadow-2xl hover:scale-105 transition-all duration-700">
                      <img
                        className="w-full h-full object-cover grayscale-[20%] pointer-events-none select-none"
                        alt={slide.altTop}
                        src={slide.top}
                        draggable="false"
                      />
                    </div>
                    {/* Finished Shoe (Bottom Overlay) */}
                    <div className="absolute bottom-0 right-0 w-4/5 h-3/5 z-20 border-4 border-background shadow-2xl hover:scale-105 transition-all duration-700">
                      <img
                        className="w-full h-full object-cover pointer-events-none select-none"
                        alt={slide.altBottom}
                        src={slide.bottom}
                        draggable="false"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Elegant Luxury Slider Page Indicators */}
            <div className="absolute bottom-6 flex gap-3 z-30">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSlide(index);
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  className={`w-2 h-2 rounded-full transition-all duration-500 cursor-pointer ${
                    index === activeSlide
                      ? "bg-accent-gold w-8"
                      : "bg-accent-gold/30 hover:bg-accent-gold/60"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          {/* Right: Content */}
          <div className="w-full md:w-[55%] bg-primary flex flex-col justify-center px-8 md:px-24 py-16 text-on-primary">
            <h1 className="font-display text-[36px] md:text-[52px] leading-tight mb-8 text-white">
              Authentic Leather
              <br />
              for Footwear
            </h1>
            <p className="font-body text-body-lg text-on-primary/80 max-w-lg mb-12 leading-relaxed">
              We work alongside those who meticulously monitor every detail from
              A to Z to deliver premium quality with integrity. Our sustainable
              sourcing practices protect both people and the planet, keeping our
              customers safe, healthy, and vibrant.
            </p>
            <a className="inline-flex items-center group w-fit" href="/contact">
              <span className="bg-accent-gold text-primary font-label-caps text-label-caps px-10 py-4 group-hover:bg-on-primary transition-all duration-500">
                Get in Touch →
              </span>
            </a>
          </div>
        </section>

        {/* Footwear Showcase Strip */}
        <section className="py-16 md:py-20 lg:py-24 overflow-hidden bg-surface-container-lowest relative select-none">
          {/* Slider Header */}
          <div className="mb-12 max-w-container-max mx-auto px-6 md:px-margin-desktop text-center md:text-left">
            <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.2em] mb-2 block uppercase">
              Continuous Heritage
            </span>
            <h2 className="font-display text-headline-xl text-primary">
              Leather meets elegance, showcased on luxury footwear.
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
                  src: "/slides/9.png",
                  alt: "Luxury footwear showcase item 9",
                },
                {
                  src: "/slides/10.png",
                  alt: "Luxury footwear showcase item 10",
                },
                {
                  src: "/slides/11.png",
                  alt: "Luxury footwear showcase item 11",
                },
                {
                  src: "/slides/12.png",
                  alt: "Luxury footwear showcase item 12",
                },
                // Second copy
                {
                  src: "/slides/9.png",
                  alt: "Luxury footwear showcase item 9",
                },
                {
                  src: "/slides/10.png",
                  alt: "Luxury footwear showcase item 10",
                },
                {
                  src: "/slides/11.png",
                  alt: "Luxury footwear showcase item 11",
                },
                {
                  src: "/slides/12.png",
                  alt: "Luxury footwear showcase item 12",
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

          {/* Elegant Luxury Editorial Quote Block */}
          <div className="max-w-5xl mx-auto mt-24 px-6 relative">
            {/* Decorative glowing background shape */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-gold/5 via-transparent to-transparent blur-3xl -z-10 rounded-3xl" />

            <div className="relative bg-white/40 backdrop-blur-md border border-accent-gold/20 rounded-2xl p-8 md:p-16 shadow-[0_20px_50px_rgba(212,175,55,0.03)] overflow-hidden">
              {/* Left Thick Accent Gold Ribbon Bar with Glow */}
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-accent-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]" />

              {/* Large Luxury Stylized Quote Mark */}
              <span className="absolute -top-6 left-6 text-[180px] font-serif text-accent-gold/10 select-none pointer-events-none leading-none">
                “
              </span>

              <div className="relative z-10 pl-2 md:pl-8">
                {/* Subtitle badge or brand tagline */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[1px] w-8 bg-accent-gold/60" />
                  <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.25em] text-xs font-bold uppercase">
                    A Half-Century of Mastery
                  </span>
                </div>

                <blockquote className="font-display text-headline-md md:text-[28px] md:leading-relaxed italic text-primary font-light">
                  "Where fashion never stops,{" "}
                  <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">
                    timeless elegance
                  </span>{" "}
                  and{" "}
                  <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">
                    endless innovation
                  </span>{" "}
                  are brought to you by a{" "}
                  <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">
                    sustainable source
                  </span>{" "}
                  that has been providing premium leather for upscale footwear
                  that is long-lasting, waterproof, breathable, and resilient
                  for{" "}
                  <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">
                    over 50 years
                  </span>
                  ."
                </blockquote>

                {/* Decorative signature / author line at the bottom */}
                <div className="mt-8 flex items-center justify-between flex-wrap gap-4 border-t border-accent-gold/10 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center border border-accent-gold/25">
                      <span
                        className="material-symbols-outlined text-accent-gold text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified_user
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-label-caps tracking-widest text-primary font-bold uppercase">
                        Vivosa Certified Supply
                      </p>
                      <p className="text-[11px] text-secondary font-medium uppercase">
                        Gold-Rated Tanneries
                      </p>
                    </div>
                  </div>

                  <span className="font-serif text-accent-gold/20 text-8xl leading-none select-none pointer-events-none absolute -bottom-10 right-6">
                    ”
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Callout */}
        <section className="px-6 md:px-margin-desktop py-20 bg-background relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="border border-accent-gold/25 py-12 md:py-16 px-8 md:px-16 text-center bg-surface-container-low/40 backdrop-blur-sm relative rounded-lg shadow-sm">
              {/* Luxury Accent Corner Lines */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent-gold/40"></div>
              <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent-gold/40"></div>
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent-gold/40"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent-gold/40"></div>

              <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.2em] mb-4 block uppercase text-xs font-bold">
                Premium Collection
              </span>

              <h3 className="font-display text-headline-lg md:text-headline-xl text-primary leading-tight max-w-4xl mx-auto mb-6">
                Available Now
              </h3>

              <p className="font-body text-body-lg text-secondary max-w-3xl mx-auto leading-relaxed">
                Explore a selection of some popular articles from our trusted
                manufacturers, each presented in finished form. A number of
                these articles are held in stock for rapid delivery with low
                MOQs— Please get in touch with us to find the articles and
                colours best suited to your project.
              </p>
            </div>
          </div>
        </section>

        {/* Leather Sample Grid */}
        <section className="bg-[#fafafa] px-6 md:px-margin-desktop py-20 md:py-24">
          <div className="max-w-container-max mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <h2 className="font-display text-headline-xl text-primary">
                Our Footwear Leather Collection
              </h2>
              <span className="font-label-caps text-label-caps text-secondary tracking-widest border-b border-outline-variant pb-2 uppercase">
                CURATED SELECTION
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {footwearProducts.map((sample) => (
                <Link
                  key={sample._id}
                  to={`/leather-footwear/${sample._id}`}
                  className="flex flex-col group cursor-pointer border border-neutral-200 overflow-hidden bg-white hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={sample.fullName || sample.name}
                      src={sample.image?.url}
                      loading="lazy"
                    />
                  </div>
                  {(sample.code?.trim() ||
                    sample.title?.trim() ||
                    sample.name?.trim()) && (
                    <div className="py-4 px-3 bg-[#fbfbfa] border-t border-neutral-100 flex items-center justify-center min-h-[56px]">
                      <h4 className="font-label-caps text-xs md:text-sm font-semibold tracking-widest text-[#1c1917] uppercase">
                        {sample.code || sample.title || sample.name}
                      </h4>
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Elegant Closing Collection Offer Card */}
            <div className="mt-20 max-w-4xl mx-auto bg-white/70 backdrop-blur-md border border-accent-gold/30 p-8 md:p-12 shadow-[0_10px_35px_rgba(212,175,55,0.05)] relative rounded-2xl overflow-hidden">
              {/* Luxury gold accent line at the left with a glow effect */}
              <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-accent-gold shadow-[0_0_12px_rgba(212,175,55,0.4)]"></div>

              {/* Luxury Accent Corner Lines */}
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-accent-gold/30"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-accent-gold/30"></div>

              <div className="flex items-center gap-3 mb-6">
                <span
                  className="material-symbols-outlined text-accent-gold text-4xl md:text-5xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.25em] text-sm md:text-base font-bold uppercase">
                  CRAFTSMANSHIP &amp; RESPONSIBILITY
                </span>
              </div>

              <div className="font-body text-body-lg text-secondary leading-relaxed space-y-6">
                <p>
                  Each article shown above carries its own story of skilled
                  craftsmanship, produced with a commitment to sustainability
                  and responsible manufacturing.
                </p>
                <p>
                  Through close collaboration with our trusted partners, we
                  craft an extensive range of exquisite leathers to suit every
                  vision —{" "}
                  <strong>
                    pure aniline, semi-aniline, full grain, fine grain, Nappa,
                    Nubuck, and many more.
                  </strong>
                </p>
                <p>
                  Each leather is designed with comfort, breathability, and
                  timeless appeal, with optional treatments available on
                  request, including anti-stain, fire-retardant,
                  moisture-wicking, and other innovative technological finishes.
                  Choose from a wide palette of colours and finishes, with
                  options including vegetable tanning and a variety of dyed
                  finishes.
                </p>
                <p>
                  We invite you to get in touch to discuss your project
                  requirements, or to send us a sample alongside your
                  specifications. Our team is ready to help guide you towards an
                  exceptional result. We take pride in delivering expertly
                  finished products that bring lasting beauty to every project
                  we're part of.
                </p>
                <p>
                  Your vision matters to us. We welcome customisation requests
                  to meet your specific needs, ensuring all solutions align with
                  the relevant standards and regulations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality & Sustainability Section */}
        <section className="bg-surface py-16 md:py-20 lg:py-24">
          <div className="bg-primary-container text-on-primary shadow-inner">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div>
                <h2 className="font-display-lg text-headline-xl-mobile md:text-headline-xl text-on-primary-container mb-8 leading-tight">
                  Quality &amp; Sustainability in Leather Supply
                </h2>
                <div className="space-y-6 font-body-md text-white/80 leading-loose">
                  <p>
                    We work with leading sustainable leather manufacturers to
                    supply high-quality leather directly to our customers, with
                    no third parties or intermediaries involved. Our QC team
                    carefully inspects each hide to ensure it meets strict
                    quality and sustainability standards.
                  </p>
                  <p>
                    Approximately 90% of our manufacturing partners are based in
                    Europe, and 85% of our rawhide is European. Although most of
                    our partners are located outside the UK, we maintain full
                    oversight to guarantee excellence.
                  </p>
                  <p>
                    If you would like more information about our leathers or
                    processes, including:
                  </p>
                </div>
              </div>
              <div className="bg-white/5 p-8 md:p-12 border border-on-primary-container/20 shadow-xl space-y-8">
                <ul className="space-y-4">
                  {[
                    "Types of raw hides & their origin",
                    "Tanning & retanning methods",
                    "Defect classification",
                    "Drying techniques",
                    "Finishing processes",
                    "Technical sheets & certifications",
                    "Manufacturing facility details",
                    "And more",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="material-symbols-outlined text-light-gold shrink-0 text-[18px] mt-[2px]"
                        style={{
                          fontVariationSettings: "'FILL' 1",
                          color: "#dfc06f",
                        }}
                      >
                        check_circle
                      </span>
                      <span className="font-label-caps text-label-caps tracking-wider text-white uppercase text-[12px] leading-normal">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-light-gold shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1", color: "#dfc06f" }}>
                      forward_to_inbox
                    </span>
                    <p className="font-body-md font-bold text-white/90 leading-relaxed text-[15px]">
                      Please{" "}
                      <a href="/contact" className="text-light-gold underline decoration-light-gold/40 hover:decoration-light-gold transition-all duration-300">
                        get in touch
                      </a>{" "}
                      with us, and we will respond promptly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
