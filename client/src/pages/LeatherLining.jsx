import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

export default function LeatherLining() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["/images/lining_slider_1.png", "/images/lining_slider_2.png"];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
                Our trusted manufacturer meticulously develops lining leather that is exceptionally soft and highly breathable, with advanced moisture-wicking properties that help prevent blisters for superior comfort.
              </p>
            </div>
            <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center">
              {/* Line Art Diagram */}
              <div className="w-full h-full border border-primary/5 p-8 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain"
                  alt="Premium leather lining pattern diagram"
                  src="/images/lining_hero.png" />
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
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-2 gap-gutter items-center">
          <div className="relative overflow-hidden aspect-square group">
            {slides.map((src, index) => (
              <img
                key={src}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
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
              At VIVOSA, we deliver premium Italian- crafted leather made from carefully selected European hides. Engineered for exceptional comfort, flexibility, and long-lasting durability, our lining leathers elevate every product—from fine footwear and handbags to garments, small leather goods, and automotive interiors.
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
                  "sustainable methods"
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
              Available Finishes: <span className="font-normal">Full grain, split, and pigmented options in a wide range of natural and fashion colours</span>
            </p>

            <div className="border-l-4 border-matte-gold bg-surface-container pl-6 py-6 pr-8 mt-8">
              <h4 className="font-headline-sm text-headline-sm text-primary mb-4">
                Sustainability Commitment
              </h4>
              <p className="font-body-md text-body-md text-primary leading-relaxed">
                All VIVOSA leathers are produced with a focus on responsibility and transparency. We work exclusively with certified Italian tanneries that comply with REACH, LWG, and ISO standards, ensuring environmentally sound processes and full materialtraceability.
              </p>
            </div>
          </div>
        </section>

        {/* Collection Banner */}
        <section className="w-full bg-primary py-16">
          <div className="max-w-3xl mx-auto text-center px-margin-mobile">
            <h3 className="font-headline-md text-headline-md text-[#F5F0E8] mb-4">
              The Complete Lining Collection
            </h3>
            <p className="font-body-md text-[#F5F0E8]/70 leading-relaxed">
              Here is a collection of some traditional articles and popular leather colours, showcasing the final appearance from our manufacturing firm. A wide range of colours and finishes for various applications is also available with customization options, so please contact us with your specific requirements.
            </p>
          </div>
        </section>

        {/* Leather Grid */}
        <section className="bg-surface-container-low py-section-gap px-margin-mobile md:px-margin-desktop">
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
                    <div className="py-4 px-3 bg-[#fbfbfa] border-t border-neutral-100 flex items-center justify-center min-h-[56px]">
                      <h4 className="font-label-caps text-xs md:text-sm font-semibold tracking-widest text-[#1c1917] uppercase font-bold">
                        {product.code}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Closing Text */}
        <section className="max-w-3xl mx-auto text-center py-16 px-margin-mobile">
          <h2 className="font-headline-xl text-headline-xl text-primary mb-6">
            Designed for Collaboration
          </h2>
          <p className="font-body-md text-body-lg text-on-surface-variant mb-10 leading-relaxed">
            A wide range of collections is available. Please contact us for your specific project items or to send a sample. We are committed to delivering exceptional, expertly finished products that add lasting beauty to your projects. We welcome customization requests that meet international standards and sustainability requirements.
          </p>
        </section>

        {/* Quality & Sustainability Section */}
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
                        className="material-symbols-outlined text-light-gold shrink-0 text-[18px] mt-[2px]"
                        style={{ fontVariationSettings: "'FILL' 1", color: "#dfc06f" }}
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
