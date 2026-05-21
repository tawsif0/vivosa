import React, { useRef, useState, useEffect } from "react";

export default function ContractFurniture() {
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
              {/* Image 1: Sofa */}
              <div 
                className="absolute w-3/5 aspect-square -rotate-3 -translate-x-16 -translate-y-16 z-10 bg-white p-3 shadow-2xl hover:scale-105 hover:-translate-y-20 transition-all duration-700 ease-out cursor-pointer"
              >
                <img
                  alt="Luxury leather sofa"
                  className="w-full h-full object-cover"
                  src="/images/contract-furniture/1_623811114_1247549493964799_1691272630713202817_n.jpg"
                />
              </div>
              {/* Image 2: Chair */}
              <div 
                className="absolute w-1/2 aspect-[3/4] rotate-2 translate-x-20 translate-y-12 z-20 bg-white p-3 shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-700 ease-out cursor-pointer"
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
            <div className="bg-primary text-on-primary p-12 text-left border-l-4 border-matte-gold relative shadow-xl">
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
          {/* Hard-coded Application Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-12 border-t border-primary/10 pt-20">
            <div className="mb-12 text-center">
              <p className="font-body-lg text-primary text-lg">
                Our finest hides are ideal for making all types of furnishings — from homes and hotels to restaurants, offices, hospitals, cinemas, and more. Applications include:
              </p>
            </div>
            {[
              { icon: "chair", label: "Sofas" },
              { icon: "event_seat", label: "Armchairs" },
              { icon: "table_restaurant", label: "Dining chairs" },
              { icon: "local_bar", label: "Bar and pub stools" },
              { icon: "weekend", label: "Cushions" },
              { icon: "desk", label: "Tables and desks" },
              { icon: "chair_alt", label: "Benches" },
              { icon: "architecture", label: "Interior linings" },
              { icon: "medical_services", label: "Hospital & clinical-use chairs" },
              { icon: "shopping_bag", label: "Accessories & decorative elements" },
              { icon: "star", label: "Inserts and ornamental details" },
              { icon: "more_horiz", label: "Numerous other applications" },
            ].map((app) => (
              <div key={app.label} className="flex items-center gap-5 group cursor-pointer">
                <span className="material-symbols-outlined text-matte-gold text-3xl transition-transform duration-500 group-hover:scale-120">
                  {app.icon}
                </span>
                <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
                  {app.label}
                </span>
              </div>
            ))}
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
                  Discover a selection of traditional and popular leather articles and colors from our sister manufacturers, shown as they appear in finished form. This is just an example—our range includes many other articles for a variety of applications, all available with customization options. Please contact us to find the leather that is best suited for your project.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  code: "F018MBD",
                  img: "/images/contract-furniture/43_Screenshot_1-2.png",
                  name: "Turquoise",
                  desc: "Nubuck Top Grain • 1.0 / 1.2 mm",
                  origin: "EU + GB",
                  details: "This leather is characterized by a soft, velvety texture and a natural appearance, infused with a luxurious feel. It is suitable for all types of high-end and durable applications, including both contract and homefurniture uses. (More colours are available, and it can be customized through retanning, dyeing, and finishing processes to suit different product requirements)."
                },
                {
                  code: "F029SA",
                  img: "/images/contract-furniture/44_Screenshot_2-1.png",
                  name: "Pale Beige",
                  desc: "Pure Aniline / Full Grain • 1.0 / 1.2 mm",
                  origin: "European",
                  details: "This leather preserves the hide’s natural grain and patterns without the need for an outer coating or pigment, giving it a rich appearance and supple texture. It provides long-lasting durability and luxury for the furniture sector and is extraordinary for its natural look and feel. (More colors are available with customization."
                },
                {
                  code: "F018TC",
                  img: "/images/contract-furniture/45_Screenshot_3-1.png",
                  name: "Orangey Brown",
                  desc: "Semi-Aniline • 1.1 / 1.2 mm",
                  origin: "GB+NZ",
                  details: "This is natural grain leather that has been slightly buffed to give an aged appearance in specific areas of the hide. It is immersed in oil for several hours, producing a subtle two-tone effect with a natural gloss. (More colours are available, and customization is possible to suit different product requirements)."
                },
                {
                  code: "F025 LEO",
                  img: "/images/contract-furniture/46_Screenshot_4-1.png",
                  name: "Deep Black",
                  desc: "Semi-Aniline / Corrected Grain • 1.2 – 1.4 mm",
                  origin: "GB, EU, BR",
                  details: "This is a pigmented, corrected-grain leather with an anti-stain finish and a uniform appearance. It provides a smooth hand feel and a vibrant surface effect. A fine spray of pigment is applied during finishing,creating a compact coating that enhances durability and stain resistance. Highly suitable for all types of furniture applications. (More colours available. Can be customized during the retanning, dyeing, andfinishing processes for specific product requirements.)"
                },
                {
                  code: "F45 MBGRC",
                  img: "/images/contract-furniture/47_Screenshot_5-1.png",
                  name: "Teal Blue",
                  desc: "Aniline / Nappa • 1.0 – 1.2 mm",
                  origin: "European",
                  details: "This is a beautiful Nappa leather with a flat, consistent surface. Its soft touch and solid body make it particularly suitable for high-end furniture and leather goods, adding exceptional value and sophistication to luxurious designs. The leather's natural grain enhances its rich texture and depth of colour, reflecting the true elegance of fine European craftsmanship. (More colours available. Can be customized upon request.)"
                },
                {
                  code: "F039LNB",
                  img: "/images/contract-furniture/48_Screenshot_6-1.png",
                  name: "Teflon Brown",
                  desc: "Pure Aniline / Natural Grain • 1.0 – 1.2 mm",
                  origin: "EU + GB",
                  details: "This is a pure aniline leather with a nubuck surface that has been treated with oils and waxes to enhance its natural nap. It features a natural grain, a soft, delicate hand, and a subtle waxy finish. Longbeach’s slightly napped surface is achieved through a special process that gives the leather a rich and refined appearance. More colours available, can be customized."
                },
                {
                  code: "F013DB",
                  img: "/images/contract-furniture/49_Screenshot_7-1.png",
                  name: "White",
                  desc: "Semi-Aniline / Pronounced Grain • 1.0 – 1.2 mm",
                  origin: "EU + Extra",
                  details: "This leather is inspired by the natural colours seen from a balcony or in a restaurant setting. It evokes the warmth of a sunny afternoon, with hues reminiscent of rolling hills and the sea — vibrant and full of life, instilling a profound sense of comfort and pleasure. Designed for outdoor use, itis resistant to water, sunlight, rain, salt, and humidity, ensuring long- lasting beauty and sophistication in any furniture application. (Morecolours available. Can be modified for different product uses)."
                },
                {
                  code: "F05DHY",
                  img: "/images/contract-furniture/50_Screenshot_8-1.png",
                  name: "Lite Olive",
                  desc: "Semi-aniline full grain • 1.2 – 1.4 mm",
                  origin: "EU + Extra EU",
                  details: "This leather is inspired by the colours of nature as seen from a balcony or restaurant setting. It offers the warmth of a sunny afternoon, where the tones of the earth, hills, and sea burst with vibrant colour, evoking a profound sense of pleasure. It is resistant to water, sunlight, rainfall, salt, and humidity, and is designed to last while adding a sophisticated and beautiful look to outdoor furniture. More colours available. Can be customized for different product uses."
                },
                {
                  code: "F09MBEPL",
                  img: "/images/contract-furniture/51_Screenshot_9-1.png",
                  name: "Purple",
                  desc: "Semi-aniline / Flat grain • 1.0 – 1.2 mm",
                  origin: "Europe",
                  details: "Tanned using advanced techniques and finished with a flat grain, thisleather features a subtle sheen and an even, consistent colour — makingit ideal for furniture and contract design. (More colours available. The tanning, re-tanning, dyeing, and finishing processes can be customizedfor different product applications)."
                },
                {
                  code: "F011LEO",
                  img: "/images/contract-furniture/52_Screenshot_10-1.png",
                  name: "Peach",
                  desc: "Pure Aniline / Fine Grain • 1.0 – 1.1 mm",
                  origin: "Europe",
                  details: "This leather embodies timeless elegance while maintaining its naturalfine-grain texture and softness. This high-quality material adds a sense of sophistication to any piece, making it an excellent choice for thoseseeking authentic and refined upholstery. (More colours available, with customization options for different applications)."
                },
                {
                  code: "F035MAC",
                  img: "/images/contract-furniture/53_Screenshot_11-1.png",
                  name: "Dark Blue",
                  desc: "Semi-Aniline / Full Grain • 1.3 – 1.5 mm",
                  origin: "GB + EU",
                  details: "This premium semi-aniline heavyweight leather is full-grain, supple, and naturally breathable. It offers outstanding durability and comfort, making it ideal for high-end furniture and interior applications where both luxuryand performance are desired. (More colours available. Customization options are also possible for different product uses)."
                },
                {
                  code: "F09DODA",
                  img: "/images/contract-furniture/54_Screenshot_12-1.png",
                  name: "Grey",
                  desc: "Semi-Aniline / Full Grain • 1.4 – 1.6 mm",
                  origin: "EU + BR",
                  details: "A special finishing technique enhances the surface of this leather, adding a refined gloss and transparency that highlight its natural grain. This medium-thick leather feels smooth, full, and warm to the touch.Versatile and elegant, it is ideal for luxury hospitality and interior furniture applications and is even perfect for leather goods. (More colours available, with customization options for different applications)."
                },
              ].map((swatch) => (
                <div
                  key={swatch.code}
                  className="bg-surface-container-low group cursor-pointer border border-primary/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-white">
                    <img 
                      src={swatch.img} 
                      alt={swatch.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-8 bg-[#F5F0E8]/40 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-label-caps text-[12px] text-secondary tracking-[0.1em] uppercase bg-white px-2 py-1 rounded-sm shadow-sm">
                        {swatch.code}
                      </span>
                      <span className="text-[11px] font-label-caps text-matte-gold font-bold flex flex-col items-end">
                        <span className="text-secondary/50 text-[9px]">RAWHIDE</span>
                        {swatch.origin}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-2xl text-primary mb-2">
                      {swatch.name}
                    </h3>
                    <p className="font-label-caps text-[11px] text-secondary/80 mb-4 tracking-wider uppercase border-b border-primary/10 pb-4">
                      {swatch.desc}
                    </p>
                    {swatch.details && (
                      <p className="font-body-sm text-secondary/70 leading-relaxed flex-grow text-[13px]">
                        {swatch.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-16 bg-surface-container-low p-8 border-l-4 border-matte-gold">
              <p className="font-body-md text-primary/80 italic">
                We offer a wide range of collections, as mentioned above. Please contact us if you are interested in other articles, different colours, or if you would like to send us a sample. We are dedicated to providing exceptional, expertly finished products that bring lasting beauty to your projects. We value our clients' preferences and welcome customization requests to meet specific requirements, as long as they comply with international standards and regulations.
              </p>
            </div>
          </div>
        </section>

        {/* Quality Section */}
        <section className="bg-primary py-section-gap overflow-hidden shadow-2xl">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid md:grid-cols-2 gap-24 items-center">
            <div className="text-on-primary">
              <span className="font-label-caps text-label-caps text-matte-gold mb-6 block tracking-[0.3em] uppercase">
                Quality & Sustainability
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-10 leading-[1.1] text-white">
                Quality & Sustainability in Leather Supply
              </h2>
              <p className="font-body-lg text-body-lg text-white/70 mb-8 leading-relaxed">
                We work with leading sustainable leather manufacturers to supply high- quality leather directly to our customers, without involving any third parties or intermediaries. Our QC team carefully inspects each hide to ensure it meets strict quality and sustainability standards. Approximately 90% of our manufacturing partners are based in Europe, and 85% of our rawhide is sourced from Europe. While most of our partners are outside the UK, we maintain full oversight to guarantee excellence. However, if you would like more information about our leathers or processes, including:
              </p>
            </div>
            {/* Hard-coded checklist */}
            <div className="space-y-4">
              {[
                "Types of raw hides & their origin",
                "Tanning & retanning methods",
                "Defect classification",
                "Drying techniques",
                "Refinishing processes",
                "Technical sheets & certifications",
                "Manufacturing facility details, etc.…",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-4 border-l border-white/10 group cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-matte-gold text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    fiber_manual_record
                  </span>
                  <span className="font-label-caps text-[13px] text-white tracking-widest uppercase">
                    {item}
                  </span>
                </div>
              ))}
              <p className="font-body-lg text-body-lg text-white/70 mt-8 leading-relaxed italic">
                please contact us, and we will respond promptly.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
