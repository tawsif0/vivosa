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
      altBottom: "Elegant handcrafted leather Oxford shoe"
    },
    {
      top: "/slides/5.png",
      bottom: "/slides/7.png",
      altTop: "Artisan leather tanning material",
      altBottom: "Luxury designer red stiletto"
    },
    {
      top: "/slides/6.png",
      bottom: "/slides/8.png",
      altTop: "Close-up of premium footwear leather",
      altBottom: "Bespoke classic brown leather loafers"
    },
    {
      top: "/slides/7.png",
      bottom: "/slides/5.png",
      altTop: "High-grade leather sheet",
      altBottom: "Sophisticated modern leather footwear design"
    }
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
      setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
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
      <main className="pt-20 md:pt-[88px]">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-88px)] overflow-hidden">
          {/* Left: Imagery Slider */}
          <div
            className="w-full md:w-[45%] relative bg-secondary-container p-12 md:p-24 flex flex-col items-center justify-center min-h-[500px] cursor-grab active:cursor-grabbing select-none"
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
                      isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
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
            <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.3em] mb-6">
              AUTHENTIC LEATHER
            </span>
            <h1 className="font-display text-[56px] md:text-display-lg leading-tight mb-8 text-white">
              Authentic Leather
              <br />
              for Footwear
            </h1>
            <p className="font-body text-body-lg text-on-primary/80 max-w-lg mb-12 leading-relaxed">
              We work alongside those who meticulously monitor every detail—from A to Z—to deliver premium quality with integrity. Our sustainable sourcing practices protect both people and the planet, keeping our customers safe, healthy, and vibrant.
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
                  "Where fashion never stops, <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">timeless elegance</span> and <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">endless innovation</span> are brought to you by a <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">sustainable source</span> that has been providing premium leather for upscale footwear that is long-lasting, waterproof, breathable, and resilient for <span className="text-accent-gold font-semibold not-italic relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent-gold/40">over 50 years</span>."
                </blockquote>

                {/* Decorative signature / author line at the bottom */}
                <div className="mt-8 flex items-center justify-between flex-wrap gap-4 border-t border-accent-gold/10 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center border border-accent-gold/25">
                      <span className="material-symbols-outlined text-accent-gold text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified_user
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-label-caps tracking-widest text-primary font-bold uppercase">Vivosa Certified Supply</p>
                      <p className="text-[11px] text-secondary font-medium uppercase">Gold-Rated Tanneries</p>
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
                Explore some of our traditional leather articles and popular colours, shown here with their final finishes.
              </h3>
              
              <p className="font-body text-body-lg text-secondary max-w-3xl mx-auto leading-relaxed">
                This is just an example—our full range includes many articles, colours, and finishes for a variety of applications, all available with customisation options. Please get in touch with us to find the articles and colours best suited for your project.
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
                  className="bg-white overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-outline/10 hover-lift hover-lift-gold transition-all duration-500 flex flex-col rounded-xl group text-left"
                >
                  <div className="aspect-[350/300] bg-surface overflow-hidden relative border-b border-outline/10">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt={sample.fullName}
                      src={sample.image?.url}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-accent-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-grow">
                    <h4 className="font-display text-[15px] md:text-[16px] text-primary font-bold leading-snug mb-3 group-hover:text-accent-gold transition-colors duration-300">
                      {sample.fullName}
                    </h4>
                    <p className="text-[13px] text-secondary font-bold leading-normal mb-1">
                      Thickness: <span className="font-normal text-secondary/80">{sample.thickness}</span>
                    </p>
                    <p className="text-[13px] text-secondary font-bold leading-normal mb-4">
                      Rawhide: <span className="font-normal text-secondary/80">{sample.rawhide}</span>
                    </p>
                    <div 
                      className="text-[13px] text-secondary/70 leading-relaxed font-body mb-4 flex-grow rich-content"
                      dangerouslySetInnerHTML={{ __html: sample.desc }}
                    />
                    <div className="flex items-center gap-2 text-accent-gold font-label-caps text-[11px] font-bold tracking-widest mt-auto border-t border-gray-100 pt-4 group-hover:text-primary transition-colors duration-300">
                      <span>View Specifications</span>
                      <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                    </div>
                  </div>
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
                <span className="material-symbols-outlined text-accent-gold text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
                <span className="font-label-caps text-label-caps text-accent-gold tracking-widest text-xs font-bold">
                  Bespoke Sourcing &amp; Customization
                </span>
              </div>

              <p className="font-body text-body-lg text-secondary leading-relaxed">
                <strong className="text-primary font-bold border-b border-accent-gold/40 pb-0.5">We offer</strong> a wide range of collections, as mentioned earlier. Please contact us if you are interested in other articles, different colours, or if you would like to send us a sample. We will deliver <span className="text-primary font-semibold underline decoration-accent-gold/50 decoration-2 underline-offset-4">exceptional, expertly finished products</span> that bring endless beauty to your project. We prioritize our clients’ values and preferences, and they are always welcome to <span className="text-accent-gold font-bold">customize any product to meet their specific requirements</span>, as long as it complies with international standards and regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Quality & Sustainability Section */}
        <section className="bg-primary text-on-primary py-section-gap overflow-hidden relative shadow-2xl">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              <div className="md:col-span-6 text-on-primary">
                <span className="font-label-caps text-label-caps text-accent-gold tracking-[0.25em] mb-4 block uppercase font-bold text-xs">
                  Ethical Sourcing
                </span>
                <h2 className="font-display text-[36px] md:text-display-lg mb-8 text-white leading-tight">
                  Quality &amp; Sustainability
                  <br />
                  in Leather Supply
                </h2>
                
                <p className="font-body text-[15px] md:text-body-md text-white/80 leading-relaxed mb-8">
                  We work with leading sustainable leather manufacturers to supply high-quality leather directly to our customers, with no third parties or intermediaries involved. Our QC team carefully inspects each hide to ensure it meets strict quality and sustainability standards. Approximately 90% of our manufacturing partners are based in Europe, and 85% of our rawhide is European. Although most of our partners are located outside the UK, we maintain full oversight to guarantee excellence. If you would like more information about our leathers or processes, including:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    "Types of raw hides & their origin",
                    "Tanning & retanning methods",
                    "Defect classification",
                    "Drying techniques",
                    "Refinishing processes",
                    "Technical sheets & certifications",
                    "Manufacturing facility details"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start group">
                      <div className="w-5 h-5 rounded-md border border-accent-gold/40 flex items-center justify-center bg-accent-gold/10 mt-0.5 group-hover:border-accent-gold transition-colors duration-300 flex-shrink-0">
                        <span className="material-symbols-outlined text-accent-gold text-[12px] font-bold">check</span>
                      </div>
                      <span className="font-body text-[14px] text-white/90 ml-3 group-hover:text-accent-gold transition-colors duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <p className="font-body text-body-lg text-accent-gold font-semibold leading-relaxed flex items-center gap-2">
                    <span className="animate-pulse w-2 h-2 rounded-full bg-accent-gold"></span>
                    … please get in touch with us, and we will respond promptly.
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-5 md:col-start-8">
                <div className="relative aspect-[3/4] border-accent-gold/30 border p-4 shadow-2xl bg-white/5 backdrop-blur-sm">
                  {/* Luxury Corner borders */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent-gold"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent-gold"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-accent-gold"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent-gold"></div>
                  <img
                    className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
                    alt="Premium footwear leather rolls ready for manufacture"
                    src="/slides/8.png"
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
