import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

// Premium parallax: the element starts slightly above its resting position and
// glides gently downward as it scrolls through the viewport. Driven by a rAF
// loop with eased interpolation and mutated directly on the DOM for fluid,
// high-performance scrolling that never affects the surrounding layout.
function useParallax() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const TRAVEL = 320; // total vertical drift in px (complete top → bottom sweep)
    const EASE = 0.35; // higher = faster catch-up to scroll
    let target = 0;
    let current = 0;
    let rafId;
    let running = true;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(Math.max(p, 0), 1);
      target = (clamped - 0.5) * TRAVEL;
    };

    const tick = () => {
      if (!running) return;
      current += (target - current) * EASE;
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    measure();
    current = target;
    tick();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return ref;
}

export default function LeatherLining() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["/images/lining_slider_1.png", "/images/lining_slider_2.png"];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useParallax();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPublicSustainableLeathers("leather-lining");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load lining products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="bg-background text-on-surface selection:bg-primary-fixed selection:text-primary">
      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row min-h-[819px] w-full max-w-container-max mx-auto px-margin-mobile md:px-0">
          {/* Left Side: Technical Diagram */}
          <div className="w-full md:w-[55%] bg-[#F5F0E8] p-margin-mobile md:p-margin-desktop flex flex-col justify-center">
            <div className="mb-12">
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-none mb-6">
                LEATHER FOR LINING
              </h1>
              <p className="font-body-md text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
                Our trusted manufacturer meticulously develops lining leather
                that is exceptionally soft and highly breathable, with advanced
                moisture-wicking properties that help prevent blisters for
                superior comfort.
              </p>
            </div>
            <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center">
              {/* Line Art Diagram */}
              <div className="w-full h-full border border-primary/5 p-8 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  alt="Premium leather lining pattern diagram"
                  src="/images/lining_hero.png"
                />
              </div>
              {/* Callouts */}
              <div className="absolute top-[20%] right-[10%] flex items-center gap-2">
                <span className="w-8 h-px bg-primary/30"></span>
                <span className="font-label-caps text-[10px] text-primary tracking-wider uppercase">
                  QUARTER &amp; HEEL LINING
                </span>
              </div>
              <div className="absolute bottom-[30%] left-[10%] flex items-center gap-2">
                <span className="font-label-caps text-[10px] text-primary tracking-wider uppercase">
                  VAMP LINING
                </span>
                <span className="w-8 h-px bg-primary/30"></span>
              </div>
            </div>
          </div>
          {/* Right Side: Dark Card */}
          <div className="w-full md:w-[45%] bg-primary p-margin-mobile md:p-margin-desktop text-on-primary flex flex-col justify-between">
            <div>
              <span className="font-label-caps text-label-caps text-light-gold mb-4 block tracking-[0.2em]">
                VIVOSA
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-primary mb-8 uppercase">
                LINING LEATHER
              </h2>
              <div className="aspect-[4/5] w-full overflow-hidden mb-8">
                <img
                  className="w-full h-full object-cover grayscale brightness-90 contrast-125 hover:scale-105 transition-transform duration-700"
                  alt="Editorial arrangement of premium Italian leather shoe and bag"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrsodkYoHhkWkncAJ9EawzlXXMse4p3otgvTb6WwvMEOnSpG18pONqpO1U6oTkyusZUw0vH_7w8_Nmq_sZEIc2uFv688LNdc3NUlSzgb_RYIwWJgfgKIKZNvDpZvdkeczcG51ZvBqfL7DdnI-jZzha0yGQU_I3LeIEupR9pAJflT9p94_elYm2Re3aUL5GHwL6pFlRJQDcU0Xpqdnj1ydlH8ngrf-SHGyJW8VzZguaE3E-SQXnIQV0O_tGRCHUq5CyZztC7ciwJSI"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-16 md:py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div
            ref={sliderRef}
            className="relative overflow-hidden aspect-square group will-change-transform flex items-center justify-center"
          >
            {slides.map((src, index) => (
              <img
                key={src}
                className={`absolute inset-0 w-full h-full object-contain object-center transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
                alt={`Premium Vivosa lining leather ${index + 1}`}
                src={src}
              />
            ))}
            {/* Slider Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? "bg-primary w-6"
                      : "bg-primary/50 hover:bg-primary/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <p className="font-body-md text-body-lg text-on-surface-variant leading-relaxed">
              At VIVOSA, we deliver premium Italian- crafted leather made from
              carefully selected European hides. Engineered for exceptional
              comfort, flexibility, and long-lasting durability, our lining
              leathers elevate every product—from fine footwear and handbags to
              garments, small leather goods, and automotive interiors.
            </p>
            <div>
              <h3 className="font-label-caps text-label-caps text-primary mb-6 tracking-widest uppercase">
                Our Lining Leather Qualities:
              </h3>
              <ul className="space-y-4">
                {[
                  "Soft and Supple Feel",
                  "processed for comfort and easy stitching",
                  "Excellent Breathability",
                  "suitable for both luxury and everyday use",
                  "Chrome-free and Eco-friendly Options –",
                  "tanned responsibly in Italy using certified,",
                  "sustainable methods",
                ].map((quality, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-matte-gold text-sm mt-0.5"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="font-body-md text-on-surface text-sm">
                      {quality}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed font-bold">
              Available Finishes:{" "}
              <span className="font-normal">
                Full grain, split, and pigmented options in a wide range of
                natural and fashion colours
              </span>
            </p>

            <div className="border-l-4 border-matte-gold bg-surface-container pl-6 py-6 pr-8 mt-8">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-4">
                Sustainability Commitment
              </h4>
              <p className="font-body-md text-body-md text-primary leading-relaxed">
                All VIVOSA leathers are produced with a focus on responsibility
                and transparency. We work exclusively with certified Italian
                tanneries that comply with REACH, LWG, and ISO standards,
                ensuring environmentally sound processes and full
                materialtraceability.
              </p>
            </div>
          </div>
        </section>

        {/* Collection Banner */}
        <section className="w-full bg-primary py-16">
          <div className="max-w-3xl mx-auto text-center px-margin-mobile">
            <h3 className="font-headline-md text-headline-md text-[#F5F0E8] mb-4">
              Available Now
            </h3>
            <p className="font-body-md text-[#F5F0E8]/70 leading-relaxed">
              Explore a selection of some popular articles from our trusted
              manufacturers, each presented in finished form. A number of these
              articles are held in stock for rapid delivery with flexible
              MOQs—please get in touch if you have a project that suits any of
              them.
            </p>
          </div>
        </section>

        {/* Leather Grid */}
        <section className="bg-surface-container-low py-16 md:py-20 lg:py-24 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            {loading ? (
              <div className="text-center font-label-caps text-sm tracking-widest text-primary">
                LOADING LINING COLLECTION...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/leather-lining/${product._id}`}
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
            )}
          </div>
        </section>

        {/* Closing Text */}
        <section className="max-w-3xl mx-auto text-center py-16 px-margin-mobile">
          <h2 className="font-headline-xl text-headline-xl text-primary mb-6">
            CRAFTSMANSHIP &amp; RESPONSIBILITY
          </h2>
          <div className="font-body-md text-body-lg text-on-surface-variant mb-10 leading-relaxed space-y-6">
            <p>
              Each article shown above carries its own story of skilled
              craftsmanship, produced with a commitment to sustainability and
              responsible manufacturing.
            </p>
            <p>
              We invite you to get in touch to discuss your project
              requirements, or to send us a sample alongside your
              specifications. Our team is ready to help guide you towards an
              exceptional result. We take pride in delivering expertly finished
              products that bring lasting beauty to every project we're part of.
            </p>
            <p>
              Your vision matters to us. We welcome customisation requests to
              meet your specific needs, ensuring all solutions align with the
              relevant standards and regulations.
            </p>
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
                    <span
                      className="material-symbols-outlined text-light-gold shrink-0 mt-0.5"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                        color: "#dfc06f",
                      }}
                    >
                      forward_to_inbox
                    </span>
                    <p className="font-body-md font-bold text-white/90 leading-relaxed text-[15px]">
                      Please{" "}
                      <a
                        href="/contact"
                        className="text-light-gold underline decoration-light-gold/40 hover:decoration-light-gold transition-all duration-300"
                      >
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
