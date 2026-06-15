import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { fetchPublicSustainableLeathers } from "../api/sustainableLeather";

const sliderImages = [
  "/images/auto_slider_1.png",
  "/images/auto_slider_2.png"
];

const AutoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden group">
      {sliderImages.map((src, index) => (
        <img
          key={index}
          alt={`Slider image ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
          src={src}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
      {/* Navigation Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-matte-gold w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Next/Prev Arrows */}
      <button 
        onClick={() => setCurrentIndex((prev) => (prev === 0 ? sliderImages.length - 1 : prev - 1))}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm"
      >
        &#8592;
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % sliderImages.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 backdrop-blur-sm"
      >
        &#8594;
      </button>
    </div>
  );
};

export default function Automotive() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchPublicSustainableLeathers("automotive");
        setProducts(data);
      } catch (err) {
        console.error("Failed to load automotive products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-on-primary-container selection:text-primary">
      <main>
        {/* Section 1: HERO - Split Layout */}
        <section className="min-h-screen flex flex-col md:flex-row overflow-hidden">
          {/* Left: Text Panel */}
          <div className="relative flex flex-col justify-center bg-primary px-10 md:px-16 lg:px-20 py-24 md:w-1/2 z-10">
            {/* Subtle gold accent line */}
            <div className="w-12 h-[2px] bg-matte-gold mb-8"></div>
            <span className="font-label-caps text-label-caps text-matte-gold tracking-[0.3em] mb-6 block uppercase">
              AUTOMOTIVE LEATHER COLLECTION
            </span>
            <h1 className="font-display-lg text-display-lg text-on-primary leading-none mb-8 md:text-[64px] lg:text-[80px]">
              Automotive<br />Leather<br />Collection
            </h1>
            <div className="w-full h-[1px] bg-matte-gold/30 mb-8"></div>
            <div className="flex flex-col gap-5 max-w-xl">
              <p className="font-body-lg text-body-lg text-on-primary/90 leading-relaxed font-medium">
                It's not just a leather interior. It's perfection. Crafted with care, finished with a touch of love, and designed for lasting luxury.
              </p>
              <p className="font-body-md text-body-md text-on-primary/70 leading-relaxed">
                At VIVOSA, we supply premium automotive leather crafted by Tanneries with over 50 years of expertise. We partner with true industry leaders who create refined, durable, and luxurious leather while placing environmental responsibility at the heart of every process, protecting the planet, conserving resources, ensuring safe working conditions, and respecting the people behind every craft. Sister production uses top-quality European rawhides and premium materials and has achieved leading industry certifications. All production complies with strict European and international regulations, and both quality and environmental management systems are fully certified, including LWG, ensuring responsible and ethical manufacturing.
              </p>
            </div>
          </div>

          {/* Right: Image Panel */}
          <div className="relative md:w-1/2 min-h-[50vh] md:min-h-screen overflow-hidden">
            <img
              alt="Luxury Automotive Leather Interior"
              className="absolute inset-0 w-full h-full object-cover object-center"
              src="/images/automotive_hero.png"
              fetchpriority="high"
            />
            {/* Gradient overlap from left panel */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-primary to-transparent z-10"></div>
            {/* Bottom label badge */}
            <div className="absolute bottom-8 right-8 z-20 bg-black/70 backdrop-blur-sm border border-matte-gold/40 px-5 py-3">
              <span className="font-label-caps text-label-caps text-matte-gold tracking-widest uppercase text-xs">
                LWG Certified · European Rawhides
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: INTRO 1 */}
        <section className="bg-primary-container py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-gutter items-center">
            <div className="pr-12 text-on-primary">
              <span className="font-label-caps text-label-caps text-on-primary-container tracking-widest block mb-4 uppercase">
                QUALITY CONTROL STANDARDS
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-primary mb-8">
                Engineering Luxury Behind the Wheel
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/90 mb-6 leading-relaxed">
                Our sustainable partners follow strict quality control standards at every step—from rawhide selection through tanning, including wet-blue, wet-white, and other retanning processes, and finally to finishing.
              </p>
              <p className="font-body-md text-body-md text-on-primary/70 mb-10 leading-relaxed">
                The result is consistently durable, high-performance leather, engineered for modern automotive interiors.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 relative">
              <div className="border-[0.5px] border-matte-gold p-2">
                <img
                  alt="Rawhide Selection at Tannery"
                  className="w-full aspect-[4/3] object-cover"
                  src="/images/auto_rawhide.png"
                  loading="lazy"
                />
              </div>
              <div className="border-[0.5px] border-matte-gold p-2 ml-12 -mt-20 z-10 shadow-2xl bg-primary-container">
                <img
                  alt="Leather Tanning Drum Process"
                  className="w-full aspect-square object-cover"
                  src="/images/auto_tanning_drum.png"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: INTRO 2 */}
        <section className="bg-surface py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-gutter items-center">
            <AutoSlider />
            <div className="md:pl-24">
              <h2 className="font-headline-xl text-headline-xl text-on-background mb-8">
                Our Sustainable Manufacturing Promise
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                Our sourcing manufacturer is committed to the community and the environment while developing advanced leather formulations. Every stage of production is precisely controlled using high-performance technology, ensuring consistently high-quality, durable, and luxurious leather.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                We work exclusively with sustainable manufacturers, giving you the freedom to customise products without ever compromising on quality. Our eco-friendly partners offer exquisite Aniline, Semi-Aniline, Nubuck, Full-Grain, Corrected-Grain, Tech, and other premium leathers, crafted through diverse tanning, retanning, and finishing techniques. These exceptional automotive leathers offer elegant, customisable designs and rich colour options that inspire and delight. They elevate car interiors so that buying a car feels like bringing home a dream, not simply making a purchase.
              </p>
              <div className="flex gap-12">
                <div>
                  <span className="font-headline-md text-headline-md block text-on-background">
                    100%
                  </span>
                  <span className="font-label-caps text-label-caps text-outline uppercase">
                    Traceability
                  </span>
                </div>
                <div>
                  <span className="font-headline-md text-headline-md block text-on-background">
                    Zero
                  </span>
                  <span className="font-label-caps text-label-caps text-outline uppercase">
                    Chrome Waste
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: STRIP */}
        <section className="bg-[#1C1C1C] py-16 px-margin-desktop">
          <div className="max-w-container-max mx-auto overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <img
                alt="Laser Cutting"
                className="w-full h-64 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1QTi71gjxsfVOpWmmBLyTdFqyMIm1rGNf_ykXD483bY__SVeSMTOGS2XqWscOzT_W-gLuiRwYUL8c3-HCagjoqmArfVCOXuaafi6QisuUVmYWfoeE7UOvEICb454MLNdMQat217MPqvSwF6MGGVCwOSM52hfg7iTfokQsJv7kJsbCsNRXwBJ4E9kuPuNQiP0S9PmUnGwFh8hK2z_H72Cyr3Hl0HQ655pQFdAUgtMzOCFR4WvdskXyiqAlopfo61wq4F-t_WkXFr4"
              />
              <img
                alt="Hand Stitching"
                className="w-full h-64 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1KVfDcvJZJMwaOLOmTC1KcjzxOtKMyCNd2G0woZUy2H4WosJWvlMjFj_K0ti2UJt0pBlwDOtZ38MLL99TmP3TfeKH5JWArzfSUmT9uMYq4eN4IfNP7ols5pjx3Rj7fxIm8kFpx6-x8nYCiG1x78VlzwdwE3a7O5WMzd72ALgIVF6tBNRNFDs2ZT43Yt6TafUSIBRH3F-3lPATwWzb8P72TO-EDZDzk1ZHwIhZjqqVTo2QabQuGsX9DNsrxoFjOJGNIiDleG_3-jk"
              />
              <img
                alt="Stitching Facility"
                className="w-full h-64 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWh6dE1_QUPmO9NpthcxJowMucmPASgN16uFAaMtXpX7YgVl4UI5ZPyQ0zzoc_Ux7EVFyJYC-uOLKJUIHfVEESe9b9XJQo-y5dQ_xwY5G31JN1NZRVwjUx4yztNbRDrX4--_xRI8BN8o1NTCxwPRPdBz7RpUOnZMm4yfGkGgXAIVf1H5BwNyM_LcyozEQNIiYRvW5YIwLlas88tskdOBC9MflzLQZG5THOgATP28SGXBIrSToY2yP0I8kcGF9HVJHfd93bJK04LXM"
              />
              <img
                alt="Finished Rolls"
                className="w-full h-64 object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8cz2eKqi4Adw-xGfRF2mr2hKZvqwalL4F9l1R1Q7UntIwwTUGYq8mVAmQhmDnlBw0fcSQahiSCkPW6X2EbsTdFequ_EQmZO8istIVx-B7H69QEeRWJjwK2IJCG4DXeovbxDW9GvhS7O1XA3UpgomlhGVBLstB_j8gDjHSxc6eNHO86RmUZaFzHUXQD1iMqHPJ_31Aw1b6-WpccRNZIPZEKx8unNkIbvRe2Mv26sudDV3RmiB88QymBrIRXk2OX-E1-inmN4Q9jYs"
              />
            </div>
            <div className="text-center">
              <p className="font-body-md text-body-md text-on-secondary/50 max-w-3xl mx-auto italic leading-relaxed">
                Additionally, some of our manufacturers offer dedicated cutting and stitching facilities, where you can cut and stitch leather exactly to your design specifications.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: BELIEF */}
        <section className="bg-secondary-container py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="flex items-center">
              <blockquote className="font-headline-xl text-headline-xl italic text-on-background leading-tight pr-12">
                "Our sister company has been combining history, uniqueness, and durable leather for 50 years. With lively designs that you can fully customize in shape, colours, and style, we continue to create sustainably and ethically, building a better world in the automotive sector."
              </blockquote>
            </div>
            <div className="bg-primary text-on-primary p-12 flex flex-col justify-center">
              <h3 className="font-label-caps text-label-caps text-matte-gold mb-6 tracking-widest uppercase">
                OUR PHILOSOPHY
              </h3>
              <p className="font-body-lg text-body-lg text-white mb-8 leading-relaxed">
                We believe that creating styles which reflect your clients’ lifestyles and aspirations not only helps you achieve your goals, but also opens a world of possibilities, confidence, and lasting satisfaction. At Vivosa, it is our commitment to guide you In selecting the right leather for the right project.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-matte-gold"></span>
                  <span className="font-label-caps text-label-caps tracking-widest text-white uppercase">
                    TANNED FOR LONGEVITY
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-matte-gold"></span>
                  <span className="font-label-caps text-label-caps tracking-widest text-white uppercase">
                    HAND-SELECTED HIDES
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-matte-gold"></span>
                  <span className="font-label-caps text-label-caps tracking-widest text-white uppercase">
                    ZERO COMPROMISE QUALITY
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: APPLICATIONS */}
        <section className="bg-surface py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16 max-w-4xl mx-auto space-y-4">
              <span className="font-label-caps text-label-caps text-matte-gold tracking-[0.2em] uppercase text-xs">
                Heritage &amp; Quality
              </span>
              <h2 className="font-display text-[24px] md:text-[32px] text-primary uppercase tracking-wide leading-tight">
                "Behind every piece of leather lies a story of heritage, craftsmanship, care, and responsibility."
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-16 items-start">
              <div className="space-y-6 text-on-surface-variant leading-relaxed">
                <p className="font-body-lg text-body-lg text-neutral-700">
                  <strong>We believe quality control</strong> means checking and monitoring products or services to ensure they consistently meet the required standards, whether anyone is watching or not. At VIVOSA, our team takes full responsibility for ensuring these standards are met accurately.
                </p>
                <p className="font-body-md text-body-md text-neutral-600">
                  <strong>As the global environment</strong> is rapidly changing, we must consider this when developing innovations. We collaborate with some of the most renowned manufacturers worldwide, many of whom are European and highly skilled in producing leather for the automotive sector.
                </p>
                <p className="font-body-md text-body-md text-neutral-600">
                  <strong>We look forward to</strong> collaborating with you on your next project, as we value meaningful partnerships and enjoy working together to ensure your goals are successfully achieved. Through ethical sourcing, we provide superior finished leather for a wide variety of automotive interior applications, including:
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {[
                  "Seats, Armrests, and Headrests (full or partial coverage)",
                  "Steering Wheels",
                  "Gear Shift Knobs and Levers",
                  "Dashboards and Instrument Panels",
                  "Door Panels and Armrests",
                  "Centre Consoles and Storage Areas",
                  "Headliners and Pillars",
                  "Other decorative accents tailored to your specific needs"
                ].map((item, idx) => (
                  <div key={idx} className="py-4 border-b border-outline-variant/30 hover:border-b-2 hover:border-matte-gold transition-all duration-500 cursor-pointer">
                    <span className="font-body-md text-body-md font-semibold text-primary">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Section 7: SAMPLE GRID */}
        <section className="bg-secondary-container py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto">            <div className="flex flex-col gap-6 mb-16">
              <div className="flex justify-between items-end">
                <div>
                  <span className="font-label-caps text-label-caps text-outline block mb-4 tracking-widest uppercase">
                    SPECIFICATIONS
                  </span>
                  <h2 className="font-display text-[32px] md:text-headline-xl text-primary leading-tight uppercase tracking-wide">
                    Explore Interior Excellence
                  </h2>
                </div>
                <div className="hidden md:block">
                  <Link to="/contact?interest=sample_book" className="inline-block font-label-caps text-label-caps px-10 py-4 bg-primary text-on-primary hover:bg-on-background transition-colors duration-300 tracking-widest">
                    REQUEST SAMPLE BOOK
                  </Link>
                </div>
              </div>
              <div className="max-w-4xl text-neutral-600 space-y-4">
                <p className="font-body text-base md:text-lg leading-relaxed">
                  Every automotive interior project is different — each one unique, with its own history and story of creation. Here, explores a collection of popular articles from our trusted manufacturers, each presented in its finished form.
                </p>
                <p className="font-body text-sm md:text-base leading-relaxed text-neutral-500">
                  A number of these articles are held in stock, flexible minimum order quantities (MOQs) are available. Please get in touch if you have a pre-production project coming up to trial your project.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center font-label-caps text-sm tracking-widest text-primary">
                LOADING HIDES COLLECTION...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
                  {products.map((sample) => (
                    <Link
                      key={sample._id}
                      to={`/automotive/${sample._id}`}
                      className="flex flex-col group cursor-pointer border border-neutral-200 overflow-hidden bg-white hover:shadow-md transition-all duration-300 text-center"
                    >
                      <div className="aspect-[4/3] w-full overflow-hidden bg-white">
                        <img
                          alt={`${sample.code} ${sample.name}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          src={sample.image?.url}
                        />
                      </div>
                      {(sample.code?.trim() || sample.title?.trim() || sample.name?.trim()) && (
                        <div className="py-4 px-3 bg-[#fbfbfa] border-t border-neutral-100 flex items-center justify-center min-h-[56px]">
                          <h4 className="font-label-caps text-xs md:text-sm font-semibold tracking-widest text-[#1c1917] uppercase">
                            {sample.code || sample.title || sample.name}
                          </h4>
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="mt-16 text-center max-w-4xl mx-auto border-t border-matte-gold/20 pt-10">
                  <p className="font-body text-base md:text-lg text-neutral-600 leading-relaxed">
                    As mentioned earlier, we offer a wide range of collections with customization options and features such as anti-spot, fire-resistant, chrome-free, metal-free, and more. Clients are welcome to customize any product to meet their specific needs, provided it complies with all applicable laws and regulations. Please contact us for any articles or features you are interested in.
                  </p>
                </div>
              </>
            )}
            <div className="mt-12 text-center md:hidden">
              <Link to="/contact?interest=sample_book" className="inline-block text-center font-label-caps text-label-caps w-full py-4 bg-primary text-on-primary tracking-widest uppercase">
                REQUEST SAMPLE BOOK
              </Link>
            </div>
          </div>
        </section>

        {/* Section 8: CLOSING - Craftsmanship, Collaboration & Responsibility */}
        <section className="bg-primary py-24 px-margin-desktop text-on-primary">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-display text-[32px] md:text-[44px] text-white leading-tight uppercase tracking-wide">
              Craftsmanship, Collaboration & Responsibility
            </h2>
            <div className="w-16 h-[1px] bg-matte-gold mx-auto"></div>
            <div className="space-y-6 text-on-primary/95 text-base md:text-lg leading-relaxed font-light">
              <p>
                Each article shown above carries its own story of skilled craftsmanship — where aesthetic excellence and sustainable manufacturing are never a compromise, but a standard. Produced with an unwavering commitment to responsible innovation, every piece reflects the precision and expertise our manufacturing partners bring to the modern automotive interior. 
              </p>
              <p>
                Through close collaboration with our trusted partners, we offer an extensive range of collections to suit every vision — with a wide palette of colours, finishes, and customisation options designed to meet the most demanding specifications.
              </p>
            </div>
            <div className="pt-6">
              <a
                href="/contact"
                className="inline-block bg-white hover:bg-matte-gold text-primary hover:text-white font-label-caps text-label-caps px-12 py-5 transition-colors duration-300 tracking-widest uppercase text-center font-bold"
              >
                CONTACT AN EXPERT
              </a>
            </div>
          </div>
        </section>

        {/* Section 8B: Design | Features | Care & Sustainability */}
        <section className="bg-surface-container py-24 px-margin-desktop border-t border-b border-neutral-100">
          <div className="max-w-container-max mx-auto space-y-16">
            <div className="text-center space-y-4">
              <span className="font-label-caps text-label-caps text-matte-gold tracking-widest uppercase text-xs">
                Performance & Ecology
              </span>
              <h2 className="font-display text-[32px] md:text-[44px] text-primary leading-tight uppercase tracking-wide">
                Design | Features | Care &amp; Sustainability
              </h2>
            </div>

            {/* 3-Image Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="overflow-hidden shadow-md border border-neutral-200 bg-white p-2">
                <img
                  src="/images/automotive1.png"
                  alt="Automotive Interior Design 1"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden shadow-md border border-neutral-200 bg-white p-2">
                <img
                  src="/images/automotive2.png"
                  alt="Automotive Interior Design 2"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden shadow-md border border-neutral-200 bg-white p-2">
                <img
                  src="/images/automotive3.png"
                  alt="Automotive Interior Design 3"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Content Text Block */}
            <div className="max-w-4xl mx-auto space-y-8 text-neutral-600 leading-relaxed font-body text-base md:text-lg">
              <p>
                There is a rich variety of option including from vegetable tanning, chrome-free, and metal-free processes, alongside specialised technical finishes including anti-stain, easy-clean, fire-retardant, and other advanced performance treatments. Optional Sanitized® technology, available upon request, eliminates up to 99% of bacteria and viruses, delivering enhanced hygiene and long-lasting protection for premium interior environments.
              </p>
              <p>
                We don't just supply leather — we deliver a complete material solution, backed by expertise, certified compliance, and a genuine commitment to pushing automotive interiors forward. We welcome bespoke customisation requests, ensuring every solution aligns with the relevant industry standards and regulations. Whatever your brief, our team is ready to turn your specifications into something exceptional.
              </p>
              <p className="border-l-4 border-matte-gold pl-6 py-2 italic text-neutral-500 bg-[#FBFBFA]">
                Our manufacturing partners are fully committed to environmentally responsible leather production — through conscious tanning processes, reduced chemical impact, and certified compliance — developing safer, more sustainable leather solutions for the modern automotive interior.
              </p>
            </div>
          </div>
        </section>

        {/* Section 9: QUALITY */}
        <section className="bg-surface py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="bg-white p-12 md:p-20 shadow-sm border border-outline-variant/10">
              <h2 className="font-headline-xl text-headline-xl text-primary mb-12">
                Quality &amp; Sustainability in Leather Supply
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 leading-relaxed">
                    VIVOSA is committed to the highest standards of leather
                    production, ensuring that luxury never comes at the cost of
                    the environment or future generations.
                  </p>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-4 h-4 bg-primary-container mt-1 shrink-0"></div>
                      <div>
                        <h4 className="font-body-lg font-bold text-primary">
                          LWG Gold Rated
                        </h4>
                        <p className="font-body-md text-on-surface-variant leading-relaxed">
                          Our primary manufacturing partners hold the highest
                          environmental certification in the industry.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-4 h-4 bg-primary-container mt-1 shrink-0"></div>
                      <div>
                        <h4 className="font-body-lg font-bold text-primary">
                          ISO 9001 &amp; 14001
                        </h4>
                        <p className="font-body-md text-on-surface-variant leading-relaxed">
                          Rigorous quality and environmental management systems in
                          place across all facilities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-primary-container mt-1 shrink-0"></div>
                    <div>
                      <h4 className="font-body-lg font-bold text-primary">
                        Ethical Sourcing
                      </h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Full traceability back to the source, ensuring animal
                        welfare and fair labor practices.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-primary-container mt-1 shrink-0"></div>
                    <div>
                      <h4 className="font-body-lg font-bold text-primary">
                        REACH Compliant
                      </h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Complete adherence to chemical safety standards, protecting
                        both workers and end-users.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-4 h-4 bg-primary-container mt-1 shrink-0"></div>
                    <div>
                      <h4 className="font-body-lg font-bold text-primary">
                        Zero Waste Initiative
                      </h4>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        Repurposing leather offcuts into high-grade secondary
                        components and materials.
                      </p>
                    </div>
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
