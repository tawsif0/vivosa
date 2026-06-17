import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

export default function ContractFurniture() {
  const [swatches, setSwatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPublicSustainableLeathers("contract-furniture");
        setSwatches(data);
      } catch (err) {
        console.error("Failed to load swatches:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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
    <div className="bg-[#F5F0E8] text-on-surface selection:bg-matte-gold selection:text-white">
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col md:flex-row overflow-hidden">
          {/* Left: Collage (60%) */}
          <div className="w-full md:w-3/5 bg-surface-container-low relative flex items-center justify-center p-8 md:p-20 overflow-hidden min-h-[500px]">
            <div className="relative w-full h-full max-w-4xl aspect-[4/3] flex items-center justify-center">
              {/* Image 2: Chair */}
              <div 
                className="absolute w-1/2 aspect-[3/4] rotate-2 translate-x-12 translate-y-12 z-20 bg-white p-3 shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-700 ease-out cursor-pointer"
              >
                <img
                  alt="Designer leather chair"
                  className="w-full h-full object-cover"
                  src="/images/contract-furniture/38_IMG-20250712-WA0011.jpg"
                />
              </div>
              {/* Image 3: Detail */}
              <div 
                className="absolute w-2/5 aspect-square -rotate-6 translate-x-[-45%] translate-y-[35%] z-30 bg-white p-3 shadow-2xl hover:scale-105 hover:-translate-y-[15%] transition-all duration-700 ease-out cursor-pointer"
              >
                <img
                  alt="Leather material detail"
                  className="w-full h-full object-cover"
                  src="/images/contract-furniture/40_IMG-20250722-WA0003.jpg"
                />
              </div>
            </div>
          </div>
          {/* Right: Panel (40%) */}
          <div className="w-full md:w-2/5 bg-primary p-margin-mobile md:p-margin-desktop flex flex-col justify-center items-start text-on-primary shadow-2xl">
            <span className="font-label-caps text-label-caps text-matte-gold mb-6 block tracking-[0.3em] uppercase">
              Sustainable Leather
            </span>
            <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-8 leading-[1.1] text-white">
              Contact &amp; Furniture Leather
            </h1>
            <p className="font-body-lg text-body-lg text-white/60 mb-12 max-w-sm leading-relaxed">
              Crafting the foundations of luxury through precision manufacturing
              and ecological responsibility.
            </p>
            <a
              className="inline-flex items-center gap-4 text-matte-gold hover:text-white hover:gap-8 transition-all duration-500 font-label-caps text-body-md border-b border-matte-gold/30 pb-3 group uppercase tracking-widest"
              href="/contact"
            >
              Get in Touch
              <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform duration-300">
                arrow_right_alt
              </span>
            </a>
          </div>
        </section>

        {/* Image Carousel Section */}
        <section className="w-full bg-[#F5F0E8] overflow-hidden py-12 relative select-none">
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
              className="flex overflow-x-auto gap-4 hide-scrollbar cursor-grab active:cursor-grabbing select-none w-full"
              style={{ scrollBehavior: "auto" }}
            >
              {/* Double mapping the array to create a seamless infinite loop */}
              {[
                {
                  src: "/images/contract-furniture/42_IMG-20250722-WA0005.jpg",
                  alt: "Cinema seating",
                },
                {
                  src: "/images/contract-furniture/40_IMG-20250722-WA0003.jpg",
                  alt: "Blue sofa",
                },
                {
                  src: "/images/contract-furniture/41_IMG-20250722-WA0007.jpg",
                  alt: "Diner seating",
                },
                // Second copy
                {
                  src: "/images/contract-furniture/42_IMG-20250722-WA0005.jpg",
                  alt: "Cinema seating",
                },
                {
                  src: "/images/contract-furniture/40_IMG-20250722-WA0003.jpg",
                  alt: "Blue sofa",
                },
                {
                  src: "/images/contract-furniture/41_IMG-20250722-WA0007.jpg",
                  alt: "Diner seating",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="min-w-[85vw] sm:min-w-[60vw] md:min-w-[400px] xl:min-w-[500px] aspect-[4/3] overflow-hidden shadow-lg border-4 border-white group relative cursor-pointer select-none"
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none select-none"
                    alt={item.alt}
                    src={item.src}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center pointer-events-none">
                    <span className="material-symbols-outlined text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 text-5xl drop-shadow-lg">
                      visibility
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Custom styling for hide-scrollbar */}
            <style jsx>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none;
              }
              .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}</style>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <p className="font-headline-md text-headline-md mb-16 text-primary italic leading-relaxed">
              We ethically source premium leathers from sustainable manufacturers who have over 50 years of expertise, delivering highquality, responsibly produced leathers for all types of furniture”
            </p>
            <div className="bg-primary text-on-primary p-12 text-left border-l-4 border-light-gold relative shadow-xl">
              <p className="font-body-lg text-body-lg leading-relaxed text-white/80 mb-6">
                Every piece reflects our dedication to sustainability, durability, and timeless elegance, offering endless grace and designs that suit your personal preferences in leather furniture.
              </p>
              <p className="font-body-lg text-body-lg leading-relaxed text-white/80 mb-6">
                Through ethical sourcing, we offer a wide variety of durable, elegant colors and finishes suitable for diverse applications—where consistency and beauty come together to create long-lasting products. By collaborating closely with our sister manufacturers, global designers, researchers, and technicians, we craft an extensive range of exquisite leathers—including Anilines, Semi-Anilines, Smooth, Nubuck, soft full- grain, Corrected-grain, and many others—each offering a unique style perfectly suited to a diverse range of furnishings and applications.
              </p>
              <p className="font-body-lg text-body-lg leading-relaxed text-white/80">
                We supply high-quality leathers that can be used to craft luxury contract projects and premium indoor, outdoor, and home furnishings, delivering lasting beauty, comfort, and timeless appeal that make environments and furniture truly unique. Upon request, our sister manufacturers can also produce leathers with advanced features such as anti-stain, fire-retardant, and other innovative technological finishes. Please get in touch with us to learn more.
              </p>
            </div>
          </div>
          {/* Redesigned Premium Application Grid */}
          <div className="border-t border-primary/10 pt-24 mt-8">
            {/* Elegant Centered Header */}
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-matte-gold font-label-caps mb-3 tracking-[0.2em] uppercase text-xs font-semibold">
                Versatile Furniture Solutions
              </span>
              <h3 className="font-headline-xl text-3xl md:text-4xl text-primary mb-6 font-semibold">
                Premium Applications &amp; Uses
              </h3>
              <div className="w-16 h-[2px] bg-matte-gold mx-auto mb-6"></div>
              <p className="font-body-lg text-secondary/80 text-lg leading-relaxed">
                Our finest hides are ideal for making all types of furnishings — from homes and hotels to restaurants, offices, hospitals, cinemas, and more.
              </p>
            </div>

            {/* Premium Interactive Applications Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                { icon: "chair", label: "Sofas", desc: "Luxury lounges & family living" },
                { icon: "event_seat", label: "Armchairs", desc: "Statement accent seating" },
                { icon: "table_restaurant", label: "Dining chairs", desc: "Fine dining & hospitality" },
                { icon: "local_bar", label: "Bar and pub stools", desc: "High-traffic commercial setups" },
                { icon: "weekend", label: "Cushions", desc: "Plush ornamental details" },
                { icon: "desk", label: "Tables and desks", desc: "Sophisticated executive workspaces" },
                { icon: "chair_alt", label: "Benches", desc: "Premium lobby & corridor seating" },
                { icon: "architecture", label: "Interior linings", desc: "Wall panels & custom detailing" },
                { icon: "medical_services", label: "Hospital & clinical chairs", desc: "Hygiene-compliant high endurance" },
                { icon: "shopping_bag", label: "Accessories & decor", desc: "Luxury leather desk sets & elements" },
                { icon: "star", label: "Inserts and details", desc: "Exquisite hand-finished trims" },
                { icon: "more_horiz", label: "Other applications", desc: "Tailored to bespoke specifications" },
              ].map((app) => (
                <div 
                  key={app.label} 
                  className="bg-white/40 backdrop-blur-sm border border-primary/5 hover:border-matte-gold/30 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 ease-out p-6 md:p-8 rounded-2xl flex flex-col items-center text-center group cursor-pointer"
                >
                  {/* Circular Icon Container */}
                  <div className="w-16 h-16 rounded-full bg-white/80 shadow-inner flex items-center justify-center mb-5 group-hover:bg-primary transition-all duration-500 group-hover:scale-110">
                    <span className="material-symbols-outlined text-matte-gold text-3xl transition-all duration-500 group-hover:text-white group-hover:rotate-6">
                      {app.icon}
                    </span>
                  </div>
                  
                  {/* Label */}
                  <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold text-sm mb-2 group-hover:text-matte-gold transition-colors duration-300">
                    {app.label}
                  </h4>
                  
                  {/* Description text */}
                  <p className="text-[11px] font-body-sm text-secondary/60 leading-relaxed max-w-[180px]">
                    {app.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leather Grid */}
        <section className="py-section-gap bg-white px-margin-mobile md:px-margin-desktop shadow-inner">
          <div className="max-w-container-max mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="inline-block text-matte-gold font-label-caps mb-4 tracking-[0.2em] uppercase">
                  Our Collection
                </span>
                <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary max-w-2xl mb-6">
                  Traditional &amp; Popular Leather Articles
                </h2>
                <p className="font-body-lg text-secondary/80 max-w-4xl">
                  Explore a selection of some popular articles from our trusted manufacturers, each presented in finished form. A number of these articles are held in stock for rapid delivery with low MOQs—please get in touch if you have a project that suits any of them.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {swatches.map((swatch) => (
                <Link
                  key={swatch._id}
                  to={`/contract-furniture/${swatch._id}`}
                  className="flex flex-col group cursor-pointer border border-neutral-200 overflow-hidden bg-white hover:shadow-md transition-all duration-300 text-center"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                    <img 
                      src={swatch.image?.url} 
                      alt={swatch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  {(swatch.code?.trim() || swatch.title?.trim() || swatch.name?.trim()) && (
                    <div className="py-4 px-3 bg-[#fbfbfa] border-t border-neutral-100 flex items-center justify-center min-h-[56px]">
                      <h4 className="font-label-caps text-xs md:text-sm font-semibold tracking-widest text-[#1c1917] uppercase font-bold">
                        {swatch.code || swatch.title || swatch.name}
                      </h4>
                    </div>
                  )}
                </Link>
              ))}
            </div>
            
            <div className="mt-16 bg-surface-container-low p-8 border-l-4 border-matte-gold text-left space-y-6">
              <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                Craftsmanship &amp; Responsibility
              </h4>
              <p className="font-body-md text-primary/80 leading-relaxed">
                Each article shown above carries its own story of skilled craftsmanship, produced with a commitment to sustainability and responsible manufacturing.
              </p>
              <p className="font-body-md text-primary/80 leading-relaxed">
                Through close collaboration with our trusted partners, we are able to offer an extensive range of collections to suit every vision. Choose from a wide palette of colours and finishes, with options including vegetable tanning and a variety of dyed finishes.
              </p>
              <p className="font-body-md text-primary/80 leading-relaxed">
                We invite you to get in touch to discuss your project requirements, or to send us a sample alongside your specifications. Our team is ready to help guide you towards an exceptional result. We take pride in delivering expertly finished products that bring lasting beauty to every project we're part of.
              </p>
              <p className="font-body-md text-primary/80 leading-relaxed">
                Your vision matters to us. We welcome customisation requests to meet your specific needs, ensuring all solutions align with the relevant standards and regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="bg-primary py-section-gap overflow-hidden shadow-2xl">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-24 items-center">
            <div className="text-on-primary">
              <span className="font-label-caps text-label-caps text-light-gold mb-6 block tracking-[0.3em] uppercase">
                Quality & Sustainability
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-10 leading-[1.1] text-white">
                Quality & Sustainability in Leather Supply
              </h2>
              <p className="font-body-lg text-body-lg text-white/70 mb-8 leading-relaxed">
                We work with leading sustainable leather manufacturers to supply high-quality leather directly to our customers, with no third parties or intermediaries involved. Our QC team carefully inspects each hide to ensure it meets strict quality and sustainability standards. Approximately 90% of our manufacturing partners are based in Europe, and 85% of our raw hide is European. While most of our partners are located outside the UK, we maintain full oversight to guarantee excellence. If you would like more information about our leathers or processes, including:
              </p>
            </div>
            {/* Hard-coded checklist */}
            <div className="space-y-4">
              {[
                "Types of raw hides & their origin",
                "Tanning & retanning methods",
                "Defect classification",
                "Drying techniques",
                "Finishing processes",
                "Technical sheets & certifications",
                "Manufacturing facility details",
                "And much more",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-4 p-4 border-l border-white/10 group cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-light-gold text-[18px] select-none mt-[2px] flex-shrink-0"
                    style={{ fontVariationSettings: "'FILL' 1", color: "#dfc06f" }}
                  >
                    check_circle
                  </span>
                  <span className="font-label-caps text-[13px] text-white tracking-widest uppercase leading-normal">
                    {item}
                  </span>
                </div>
              ))}
              <p className="font-body-lg text-body-lg text-white/70 mt-8 leading-relaxed italic">
                … please get in touch with us, and we will respond promptly.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
