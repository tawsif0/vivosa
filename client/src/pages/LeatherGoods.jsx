import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

export default function LeatherGoods() {
  const [leatherGoodsProducts, setLeatherGoodsProducts] = useState([]);

  useEffect(() => {
    const loadGoods = async () => {
      try {
        const data = await fetchPublicSustainableLeathers("leather-goods");
        setLeatherGoodsProducts(data);
      } catch (err) {
        console.error("Failed to load leather goods:", err);
      }
    };
    loadGoods();
  }, []);

  const slides = [
    { src: "/slides/leather_goods_slide1.jpg", alt: "Luxury Leather Tote Bag" },
    { src: "/slides/leather_goods_slide2.png", alt: "Premium Leather Goods Collection" }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-primary overflow-x-hidden">
      <main className="pt-20 md:pt-[88px]">
        {/* HERO SECTION */}
        <section className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[70vh] flex flex-col md:flex-row overflow-hidden">
          {/* Left 40%: Image with Cognac Overlay */}
          <div className="w-full md:w-[40%] relative h-[220px] sm:h-[320px] md:h-auto overflow-hidden">
            <div className="absolute inset-0 bg-[#6B4423]/15 z-10"></div>
            <img
              alt="Luxury Leather Goods"
              className="w-full h-full object-cover transform scale-105"
              src="/slides/leather_goods_hero.png"
            />
          </div>
          {/* Right 60%: Cream Panel */}
          <div className="w-full md:w-[60%] bg-surface-container-low flex items-center p-6 md:p-margin-desktop z-20">
            <div className="relative p-6 sm:p-10 md:p-16 bg-white/50 border border-matte-gold/20 shadow-sm w-full">
              {/* Dot Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-5 -z-10 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#8B6914 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              ></div>
              <h1 className="font-display text-[40px] sm:text-[56px] lg:text-[72px] xl:text-[84px] text-primary mb-8 leading-none">
                Leather Goods
              </h1>
              <p className="font-body text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                Our environmentally conscious manufacturer sources eco-friendly products without
                compromising quality for several decades and proudly serving millions of customers worldwide. We welcome the opportunity to collaborate with you, as we believe our customers are at the heart of our success. We source only the highest-quality leather from sustainable manufacturers (LWG-certified), offering an exquisite range of textures, colours, and finishes, enabling the creation of unique and exclusive leather goods and accessories that embody exceptional beauty, durability, style, and luxury.
              </p>
              <div className="mt-12 h-[1px] w-24 bg-matte-gold"></div>
            </div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="bg-surface py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="pr-0 md:pr-16">
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed italic mb-6">
                The fashion industry innovates through millions of different styles with the support of technology, researchers, designers, and models, but true satisfaction comes from what makes you feel happy on an individual level considering colours, design, shape, and sustainability.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-loose">
                Our goal is to work with you to achieve your objectives, helping you select the leather that best suits your project in terms of colour and style. We are committed to supporting you every step of the way to reach your goals.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -top-12 -left-6 text-matte-gold opacity-20 transform scale-[4] select-none font-display-lg">
                “
              </div>
              <div className="bg-white p-12 md:p-16 text-primary shadow-xl">
                <blockquote className="font-headline-md text-headline-md italic mb-8 leading-snug text-primary">
                  "We believe in ethical sourcing. Vivosa Crafting Both Beauty &amp; Idea
                  at the heart of our sustainability mission."
                </blockquote>
                <div className="w-full h-[300px] overflow-hidden mt-8 relative group/slider">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                    >
                      <img
                        alt={slide.alt}
                        className="w-full h-full object-cover transition-all duration-700"
                        src={slide.src}
                      />
                    </div>
                  ))}
                  
                  {/* Slider Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === activeSlide 
                            ? "bg-matte-gold w-4" 
                            : "bg-white/50 hover:bg-white"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTION HEADER */}
        <section className="bg-primary py-24 px-margin-mobile text-center overflow-hidden">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 w-full">
              <div className="h-[0.5px] flex-grow bg-matte-gold/40"></div>
              <div className="w-2 h-2 rounded-full bg-matte-gold"></div>
              <div className="h-[0.5px] flex-grow bg-matte-gold/40"></div>
            </div>
            <h2 className="font-label-caps text-label-caps text-matte-gold tracking-[0.3em] uppercase leading-relaxed text-sm md:text-md">
              The collection of some popular articles in their final appearance from our
              manufacturing firm
            </h2>
            <div className="flex items-center gap-4 w-full">
              <div className="h-[0.5px] flex-grow bg-matte-gold/40"></div>
              <div className="w-2 h-2 rounded-full bg-matte-gold"></div>
              <div className="h-[0.5px] flex-grow bg-matte-gold/40"></div>
            </div>
          </div>
        </section>

        {/* LEATHER GOODS GRID */}
        <section className="bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-16">
              {leatherGoodsProducts.slice(0, 9).map((product) => (
                <Link
                  key={product._id}
                  to={`/leather-goods/${product._id}`}
                  className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={product.image?.url}
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-headline-md text-headline-md text-primary mb-3 leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                      {product.thickness} • {product.rawhide} Origin
                    </p>
                    <div 
                      className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed rich-content"
                      dangerouslySetInnerHTML={{ __html: product.desc }}
                    />
                  </div>
                </Link>
              ))}

              {/* Large Brand Image Card (Spans 2 columns) */}
              <div className="md:col-span-2 relative min-h-[400px] overflow-hidden group shadow-md">
                <img
                  alt="Vivosa Brand Vision"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBCRk0VN3gGRk8WHZTVCinAHrE_hCXytuO81ZMYlIgZtpFGQJXhP-BGJv5QwwpjgcEzKX7Chi4rgOlFfLUJNFHPVcGv-hanDbIN7yp-VyALmcWD9qpcbtr0YTinAzZUYFZmyMGKJtY4oVw4AHRprxNzNFY_o_EmBOxAUjmDYPCOCHTzngwU1tuz4G07GGNZLwKOp52xXU9vrA0e-IOqSMNWM3UYwPZDl_vvrqxQhcJhO1zfa2MiZ7CPdUDzofUq_wN1wf0Ije3iP8"
                />
                <div className="absolute inset-0 bg-primary/40 flex flex-col justify-center items-center p-12 text-center z-10">
                  <div className="border border-matte-gold p-12 backdrop-blur-sm">
                    <h2 className="font-display-lg text-headline-xl text-on-primary mb-6 text-white leading-tight">
                      VIVOSA delivers premium, ethically sourced leather.
                    </h2>
                    <p className="font-label-caps text-label-caps text-matte-gold tracking-widest uppercase">
                      Global Standards in Precision Manufacturing
                    </p>
                  </div>
                </div>
              </div>

              {leatherGoodsProducts.slice(9, 10).map((product) => (
                <Link
                  key={product._id}
                  to={`/leather-goods/${product._id}`}
                  className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={product.image?.url}
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-headline-md text-headline-md text-primary mb-3 leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                      {product.thickness} • {product.rawhide} Origin
                    </p>
                    <div 
                      className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed rich-content"
                      dangerouslySetInnerHTML={{ __html: product.desc }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Premium Collections & Customization Section */}
        <section className="relative bg-[#FAF9F5] py-20 px-6 md:px-16 lg:px-24 border-b border-neutral-100 overflow-hidden">
          {/* Subtle minimalist background decorations */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-neutral-200/50 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-neutral-200/50 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <span className="font-label-caps text-[10px] md:text-[11px] tracking-[0.25em] text-matte-gold uppercase font-bold block">
              OUR BESPOKE COMMITMENT
            </span>
            
            <h3 className="font-display text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] text-neutral-800 leading-[1.8] font-light tracking-wide max-w-3xl mx-auto">
              We offer a wide range of leather collections. Please contact us with the articles and colours of interest, or feel free to send us a sample. We will provide exceptional, expertly finished products that bring lasting beauty to any project. We prioritize our clients’ values and preferences. Clients are always welcome to customize any product to meet their specific requirements, as long as it complies with industry standards and regulations.
            </h3>

            <div className="flex justify-center items-center gap-3 pt-2">
              <span className="w-1.5 h-1.5 bg-[#8B6914] rotate-45"></span>
              <div className="h-[1px] w-12 bg-neutral-300"></div>
              <span className="w-1.5 h-1.5 bg-[#8B6914] rotate-45"></span>
            </div>
          </div>
        </section>

        {/* CLOSING & SUSTAINABILITY */}
        <section className="bg-surface py-section-gap">
          <div className="bg-primary-container text-on-primary shadow-inner">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
              <div>
                <h2 className="font-display-lg text-headline-xl text-on-primary-container mb-8 leading-tight">
                  Quality &amp; Sustainability in Leather Supply
                </h2>
                <div className="space-y-6 font-body-md text-white/80 leading-loose">
                  <p>
                    We work with leading sustainable leather manufacturers to supply high-quality leather directly to our customers, with no third parties or intermediaries involved. Our QC team carefully inspects each hide to ensure it meets strict quality and sustainability standards.
                  </p>
                  <p>
                    Approximately 90% of our manufacturing partners are based in Europe, and 85% of our rawhide is European. Although most of our partners are located outside the UK, we maintain full oversight to guarantee excellence.
                  </p>
                  <p>
                    If you would like more information about our leathers or processes, including:
                  </p>
                </div>
              </div>
              <div className="bg-white/5 p-12 border border-on-primary-container/20 shadow-xl space-y-8">
                <ul className="space-y-4">
                  {[
                    "Types of raw hides & their origin",
                    "Tanning & retanning methods",
                    "Defect classification",
                    "Drying techniques",
                    "Refinishing processes",
                    "Technical sheets & certifications",
                    "Manufacturing facility details",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="material-symbols-outlined text-matte-gold shrink-0 text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-label-caps text-label-caps tracking-wider text-white uppercase text-[12px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-white/10">
                  <p className="font-body-md text-white/90 italic leading-relaxed text-[14px]">
                    … please get in touch with us, and we will respond promptly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
