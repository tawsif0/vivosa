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
    {
      src: "/slides/leather_goods_slide2.png",
      alt: "Premium Leather Goods Collection",
    },
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
        <section className="relative w-full min-h-[520px] md:min-h-[640px] lg:min-h-[75vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              alt="Luxury Leather Goods"
              className="h-full w-full object-cover"
              src="/slides/leather_goods_hero.png"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#24140b]/90 via-[#24140b]/70 to-[#24140b]/25" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(223,192,111,0.18),_transparent_35%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[520px] w-full max-w-7xl flex-col justify-end px-6 py-10 sm:px-8 md:min-h-[640px] md:flex-row md:items-center md:justify-between md:px-12 md:py-16 lg:px-16 xl:px-20">
            <div className="max-w-2xl text-white md:w-[58%]">
              <span className="mb-5 inline-flex items-center rounded-full border border-[#dfc06f]/40 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#f4e3b5] backdrop-blur-sm">
                Premium Leather Goods
              </span>
              <h1 className="mb-6 font-display text-[40px] leading-none text-white sm:text-[54px] lg:text-[72px] xl:text-[84px]">
                Leather Goods
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg text-justify">
                Our environmentally conscious manufacturer sources eco-friendly
                products without compromising quality for several decades and
                proudly serves customers worldwide. We create distinctive
                leather goods and accessories with exceptional beauty,
                durability, style, and luxury, shaped by sustainable sourcing
                and refined craftsmanship.
              </p>
              <div className="mt-8 flex flex-wrap gap-3"></div>
            </div>

            <div className="mt-8 flex justify-center md:mt-0 md:w-[42%] md:justify-end">
              <div className="w-full max-w-[370px] rounded-[24px] border border-white/20 bg-white/10 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-md">
                <div className="rounded-[20px] border border-[#dfc06f]/30 bg-[#f8efe3]/95 p-6 text-[#2f2217]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#8b6914]">
                    Craftsmanship & Responsibility
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-[#4c3b2c] sm:text-[15px]">
                    Every article is produced with a strong commitment to
                    sustainable manufacturing, ethical sourcing, and timeless
                    design.
                  </p>
                  <div className="mt-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#6b4423]">
                    <span
                      className="material-symbols-outlined text-xl text-[#8b6914]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                    LWG Certified Materials
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO SECTION */}
        <section className="bg-surface py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
            <div className="pr-0 md:pr-16">
              <p className="font-body-lg text-body-lg text-on-surface leading-relaxed italic mb-6 text-justify">
                The fashion industry innovates through millions of different
                styles with the support of technology, researchers, designers,
                and models, but true satisfaction comes from what makes you feel
                happy on an individual level considering colours, design, shape,
                and sustainability.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-loose text-justify">
                Our goal is to work with you to achieve your objectives, helping
                you select the leather that best suits your project in terms of
                colour and style. We are committed to supporting you every step
                of the way to reach your goals.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -top-12 -left-6 text-matte-gold opacity-20 transform scale-[4] select-none font-display-lg">
                “
              </div>
              <div className="bg-white p-12 md:p-16 text-primary shadow-xl">
                <blockquote className="font-headline-md text-headline-md italic mb-8 leading-snug text-primary">
                  "We believe in ethical sourcing. Vivosa Crafting Both Beauty
                  &amp; Idea at the heart of our sustainability mission."
                </blockquote>
                <div className="w-full h-[300px] overflow-hidden mt-8 relative group/slider">
                  {slides.map((slide, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === activeSlide
                          ? "opacity-100 z-10"
                          : "opacity-0 z-0"
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
              <div className="h-[0.5px] flex-grow bg-light-gold/40"></div>
              <div className="w-2 h-2 rounded-full bg-light-gold"></div>
              <div className="h-[0.5px] flex-grow bg-light-gold/40"></div>
            </div>
            <h2 className="font-headline-md text-headline-md text-light-gold mb-4">
              Available Now
            </h2>
            <p className="font-body-md text-[#FAF9F5]/70 max-w-2xl mx-auto leading-relaxed">
              Explore a selection of some popular articles from our trusted
              manufacturers, each presented in finished form. A number of these
              articles are held in stock for rapid delivery with flexible
              MOQs—please get in touch if you have a project that suits any of
              them.
            </p>
            <div className="flex items-center gap-4 w-full">
              <div className="h-[0.5px] flex-grow bg-light-gold/40"></div>
              <div className="w-2 h-2 rounded-full bg-light-gold"></div>
              <div className="h-[0.5px] flex-grow bg-light-gold/40"></div>
            </div>
          </div>
        </section>

        {/* LEATHER GOODS GRID */}
        <section className="bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {leatherGoodsProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/leather-goods/${product._id}`}
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
                  {(product.code?.trim() ||
                    product.title?.trim() ||
                    product.name?.trim()) && (
                    <div className="py-4 px-3 bg-[#fbfbfa] border-t border-neutral-100 flex items-center justify-center min-h-[56px]">
                      <h4 className="font-label-caps text-xs md:text-sm font-semibold tracking-widest text-[#1c1917] uppercase font-bold">
                        {product.code || product.title || product.name}
                      </h4>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Large Brand Image Banner (Moved outside the card grid) */}
        <section className="relative h-[calc(100vh-12rem)] min-h-[350px] max-h-[550px] overflow-hidden group shadow-md w-full">
          <img
            alt="Vivosa Brand Vision"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBCRk0VN3gGRk8WHZTVCinAHrE_hCXytuO81ZMYlIgZtpFGQJXhP-BGJv5QwwpjgcEzKX7Chi4rgOlFfLUJNFHPVcGv-hanDbIN7yp-VyALmcWD9qpcbtr0YTinAzZUYFZmyMGKJtY4oVw4AHRprxNzNFY_o_EmBOxAUjmDYPCOCHTzngwU1tuz4G07GGNZLwKOp52xXU9vrA0e-IOqSMNWM3UYwPZDl_vvrqxQhcJhO1zfa2MiZ7CPdUDzofUq_wN1wf0Ije3iP8"
          />
          <div className="absolute inset-0 bg-primary/40 flex flex-col justify-center items-center p-12 text-center z-10">
            <div className="border border-light-gold p-12 backdrop-blur-sm">
              <h2 className="font-display-lg text-headline-xl text-on-primary mb-6 text-white leading-tight">
                VIVOSA delivers premium, ethically sourced leather.
              </h2>
              <p className="font-label-caps text-label-caps text-light-gold tracking-widest uppercase">
                Global Standards in Precision Manufacturing
              </p>
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
              CRAFTSMANSHIP &amp; RESPONSIBILITY
            </span>

            <div className="font-display text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] text-neutral-800 leading-[1.8] font-light tracking-wide max-w-3xl mx-auto space-y-6">
              <p>
                Each article shown above carries its own story of skilled
                craftsmanship, produced with a commitment to sustainability and
                responsible manufacturing.
              </p>
              <p>
                Through close collaboration with our trusted partners, we craft
                an extensive range of exquisite leathers to suit every vision —{" "}
                <strong>
                  Pure aniline, semi-aniline, full grain, fine grain, Nappa,
                  Nubuck, and many more.
                </strong>
              </p>
              <p>
                Each leather is designed with comfort, breathability, and
                timeless appeal, with optional treatments available on request,
                including anti-stain, fire-retardant, moisture-wicking, and
                other innovative technological finishes. Choose from a wide
                palette of colours and finishes, with options including
                vegetable tanning and a variety of dyed finishes.
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
                Your vision matters to us. We welcome customisation requests to
                meet your specific needs, ensuring all solutions align with the
                relevant standards and regulations.
              </p>
            </div>

            <div className="flex justify-center items-center gap-3 pt-2">
              <span className="w-1.5 h-1.5 bg-[#8B6914] rotate-45"></span>
              <div className="h-[1px] w-12 bg-neutral-300"></div>
              <span className="w-1.5 h-1.5 bg-[#8B6914] rotate-45"></span>
            </div>
          </div>
        </section>

        {/* CLOSING & SUSTAINABILITY */}
        <section className="bg-surface py-16 md:py-section-gap">
          <div className="bg-primary-container text-on-primary shadow-inner">
            <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-section-gap grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div>
                <h2 className="font-display-lg text-headline-xl-mobile md:text-headline-xl text-on-primary-container mb-8 leading-tight">
                  Quality &amp; Sustainability in Leather Supply
                </h2>
                <div className="space-y-6 font-body-md text-white/80 leading-loose text-justify">
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
