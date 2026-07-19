import React, { useEffect, useRef } from "react";

// Premium parallax: the image starts slightly above its resting position and
// glides gently downward as it scrolls through the viewport. Driven by a rAF
// loop with eased interpolation, and mutated directly on the DOM so there are
// no per-frame re-renders and scrolling stays fluid.
function ParallaxImage({ src, alt, aspect }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const EASE = 0.1; // lower = smoother, more gradual catch-up
    let target = 0;
    let current = 0;
    let rafId;
    let running = true;

    const measure = () => {
      // the grid row is the parent-of-parent; its height matches the taller
      // text column, so the image can sweep the full height of that text div
      const grid = el.parentElement?.parentElement;
      if (!grid) return;

      // disable the sweep on mobile (single-column stack) to avoid overlap
      if (window.innerWidth < 768) {
        target = 0;
        return;
      }

      const rect = grid.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the row enters from the bottom → 1 as it leaves the top
      const p = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(Math.max(p, 0), 1);
      // travel = how much taller the text column is than the image
      const travel = Math.max(0, grid.offsetHeight - el.offsetHeight);
      // aligned with the text top at entry (0) → text bottom at exit (travel)
      target = clamped * travel;
    };

    const tick = () => {
      if (!running) return;
      current += (target - current) * EASE; // smooth easing toward target
      el.style.transform = `translate3d(0, ${current.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(tick);
    };

    measure();
    current = target; // avoid an initial jump on mount
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

  return (
    <div
      ref={ref}
      className={`shadow-md border border-outline-variant/10 ${aspect} w-full max-w-[360px] lg:max-w-[400px] mx-auto will-change-transform`}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}

export default function About() {
  useEffect(() => {
    document.title = "About Us | Vivosa Manufacturing & Sourcing Hub";
  }, []);

  return (
    <div className="bg-background text-on-background font-body selection:bg-on-tertiary-container/30">
      <style>{`
        .editorial-underline {
          position: relative;
        }
        .editorial-underline::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 80px;
          height: 2px;
          background-color: #c39090; /* Matte Gold / Tertiary accent */
        }
        .woven-pattern {
          background-color: #fcf9f8;
          background-image: radial-gradient(#e4e2e1 0.5px, transparent 0.5px);
          background-size: 24px 24px;
        }
        .hairline-border {
          border-width: 0.5px;
        }
      `}</style>

      <main className="pt-20 md:pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Leather craftsmanship at Vivosa Sourcing Hub"
              className="w-full h-full object-cover brightness-[0.25]"
              src="/slides/about_hero.avif"
            />
          </div>

          <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop w-full">
            <div className="max-w-3xl">
              <span className="inline-block text-white/70 font-label-caps text-label-caps tracking-[0.2em] mb-6 uppercase">
                GLOBAL MANUFACTURING HUB
              </span>
              <h1 className="font-display text-[32px] sm:text-[48px] md:text-[72px] leading-tight text-white mb-8">
                Authentically Dynamic: <br />
                <span className="italic font-light text-white/80">
                  Vivosa Sourcing Hub
                </span>
              </h1>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="py-16 md:py-20 lg:py-24 px-6 md:px-margin-desktop bg-background border-b border-outline-variant/10 overflow-hidden">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-display text-headline-xl-mobile md:text-headline-xl text-primary editorial-underline mb-8 md:mb-14">
              Who We Are
            </h2>
            <div className="grid grid-cols-1 gap-10 items-stretch">
              {/* LEFT — airy editorial narrative */}
              <div className="relative lg:pr-8 lg:border-r border-outline-variant/20 flex flex-col justify-start">
                <span className="inline-block font-label-caps text-label-caps tracking-[0.25em] uppercase text-[#c39090] mb-6">
                  Our Story
                </span>
                <div className="space-y-7 font-body text-[17px] md:text-[19px] text-secondary leading-loose">
                  <p className="text-justify">
                    <span className="float-left font-display text-primary text-[68px] leading-[54px] pr-3 pt-1">
                      V
                    </span>
                    ivosa is a dynamic company based in the UK, operating in
                    both the leather and apparel industries. It was founded by
                    professionals with over 30 years of experience in each
                    sector, bringing proven technical expertise and a constant
                    drive to embrace new challenges and achieve meaningful
                    goals.
                  </p>
                  <p className="text-justify">
                    Our primary objective is to source materials ethically from
                    our sister companies—experienced, environmentally conscious
                    manufacturers with a long-standing commitment to quality.
                    This approach allows us to strengthen our presence in the
                    UK, Europe, and other international markets, backed by
                    sustainable manufacturing partners who have been delivering
                    high-quality products for over 50 years. By prioritizing
                    ethical sourcing, leveraging extensive industry experience,
                    and focusing on sustainability, we provide products that
                    meet the highest standards and support responsible business
                    practices.
                  </p>
                  <p className="text-justify">
                    We put customers first. Our dedicated, proactive team takes
                    full ownership at every step—from design and production to
                    logistics. We deliver high-quality, sustainable products and
                    innovative solutions at the right price, helping your
                    business grow, maximize profit margins, and maintain the
                    highest standards of quality and sustainability.
                  </p>
                </div>
              </div>

              {/* RIGHT — bold accent panel featuring the "lively" story */}
              <div className="relative lg:pl-8">
                <div className="relative h-full flex flex-col bg-primary text-on-primary rounded-3xl p-8 md:p-12 shadow-xl overflow-hidden">
                  {/* decorative accent glow */}
                  <div className="pointer-events-none absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#c39090]/20 blur-2xl"></div>
                  <div className="pointer-events-none absolute -bottom-20 -left-10 w-48 h-48 rounded-full bg-white/5 blur-2xl"></div>

                  <span className="material-symbols-outlined text-[#e0b8b8] text-6xl leading-none mb-2 block">
                    format_quote
                  </span>
                  <p className="font-display text-[30px] md:text-[36px] leading-tight text-white mb-8">
                    Vivosa Stands For{" "}
                    <span className="italic text-[#e0b8b8]">“Lively.”</span>
                  </p>

                  <div className="space-y-5 font-body text-body-lg text-white/85 leading-relaxed">
                    <p>
                      <strong>
                        An outfit is more than just a way to express your
                        style—it reflects your individuality and inner self
                        through the choices that make you feel comfortable,
                        confident, and joyful. Wearing what truly resonates with
                        you is far more meaningful than simply following trends.
                        Every individual is unique, with their own tastes,
                        preferences, and lifestyle.
                      </strong>
                    </p>
                    <p>
                      Vivosa is operated by professionals with more than 30
                      years of experience in the leather and apparel industries.
                      Our expert team draws on this extensive knowledge to
                      design, develop, and deliver premium, sustainably crafted
                      products that combine style, functionality, and lasting
                      quality.
                    </p>
                    <p>
                      By focusing on sustainable manufacturing, durability,
                      quality, and customer satisfaction, we provide the finest
                      leather goods and premium clothing at affordable prices,
                      empowering people to feel confident, expressive, and
                      lively in everything they wear. These same values are
                      reflected in every partnership we build through our
                      commitment to quality, integrity, and helping our clients’
                      businesses thrive.
                    </p>
                    <p>
                      <strong>
                        This philosophy is the heart behind our name, “VIVOSA”—a
                        name inspired by life that reflects our passion for
                        innovation, craftsmanship, trusted partnerships, and
                        sustainable manufacturing. It represents our commitment
                        to creating timeless products that deliver lasting value
                        for our clients and the people who wear them.
                      </strong>
                    </p>
                  </div>

                  {/* Footer highlights — fills the panel and adds a premium finish */}
                  <div className="mt-auto pt-8">
                    <div className="w-full h-[1px] bg-white/15 mb-6"></div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <span className="block font-display text-2xl md:text-3xl text-[#e0b8b8] mb-1">
                          30+
                        </span>
                        <span className="font-label-caps text-[10px] tracking-widest uppercase text-white/60">
                          Years Expertise
                        </span>
                      </div>
                      <div>
                        <span className="block font-display text-2xl md:text-3xl text-[#e0b8b8] mb-1">
                          2
                        </span>
                        <span className="font-label-caps text-[10px] tracking-widest uppercase text-white/60">
                          Industries
                        </span>
                      </div>
                      <div>
                        <span className="block font-display text-2xl md:text-3xl text-[#e0b8b8] mb-1">
                          100%
                        </span>
                        <span className="font-label-caps text-[10px] tracking-widest uppercase text-white/60">
                          Ethical Sourcing
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-16 px-6 md:px-margin-desktop bg-surface-container-low border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-display text-headline-xl-mobile md:text-headline-xl text-primary editorial-underline inline-block mb-8">
              What We Do
            </h2>
            <p className="font-body text-body-lg text-secondary leading-relaxed max-w-5xl mx-auto">
              We supply a broad range of premium finished leather for multiple
              applications, along with a comprehensive range of made-to-order
              apparel and accessories for clients across the UK, Europe, and
              international markets. We work with carefully selected
              manufacturing partners with decades of industry experience, all
              certified for sustainable manufacturing. We value every client and
              are committed to supporting them at every stage of the
              process—from product development and technical support to design,
              tech pack preparation, sample development within 10 days, and the
              successful completion of ongoing projects. Our goal is to provide
              cost-effective manufacturing and sourcing solutions, accurate
              product costing, dependable service, and exceptional value to help
              our clients operate their businesses more efficiently.
            </p>
          </div>
        </section>

        {/* LEATHER SECTION */}
        <section className="py-16 md:py-20 lg:py-24 px-6 md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <div className="md:col-span-5 mb-12 md:mb-0">
                <ParallaxImage
                  src="/slides/about_leather_1.webp"
                  alt="Tannery equipment line"
                  aspect="aspect-[3/4]"
                />
              </div>
              <div className="md:col-span-7 space-y-6 md:pl-12 font-body text-body-lg text-secondary leading-relaxed">
                <h2 className="font-display text-headline-xl-mobile md:text-headline-xl text-primary editorial-underline mb-8">
                  Leather Craftsmanship
                </h2>
                <p className="font-bold">
                  We have over 30 years of working experience in renowned
                  tanneries that have been operating for more than 60 years,
                  specializing in producing high-quality hides for the global
                  leather market.
                </p>
                <p>
                  As a responsible supplier, our goal is to provide the best
                  leather possible without burdening it with unnecessary costs.
                  We work with manufacturers who respect the environment, adopt
                  the best technology, and guarantee safe working processes for
                  the people. We provide simple, vibrant, and complete leather
                  solutions that meet all standard requirements. Most of our raw
                  hides (90%) are sourced from Europe, and the entire
                  process—from tanning and retanning to finishing—is carried out
                  in one place under strict supervision, ensuring a safe
                  production process and high-quality standards. This is premium
                  leather, truly Made in Italy from A to Z, all under one roof.
                </p>
                <p>
                  The journey begins with the careful selection of raw hides.
                  Italian leather producers often choose the highest-quality
                  hides, typically from local or European sources, to ensure
                  that the final product meets the highest standards of
                  excellence. This selection process is crucial, as the quality
                  of the hide directly influences the quality of the finished
                  leather. Italian leather’s reputation is built not only on its
                  history but also on the dedication to quality and attention to
                  detail ingrained in its artisans.
                </p>
                <p>
                  However, we also source from manufacturers outside of Europe,
                  but only in response to specific customer requirements. We
                  inspect each hide for sustainability and quality before
                  sending it to clients, and we oversee every stage of
                  manufacturing to ensure that quality standards are met.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT CATEGORY (LEATHER) */}
        <section className="py-16 px-6 md:px-margin-desktop bg-surface-container-low border-t border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-display text-headline-xl-mobile md:text-headline-xl text-primary editorial-underline mb-10 text-center">
              PRODUCT CATEGORY
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              <p className="text-center text-secondary text-body-lg mb-8 ">
                We can offer more than a thousand different designs (articles)
                of finished leather in a variety of colours and finishes—durable
                and suitable for multiple applications. The leathers combine
                consistency, elegance, and attractiveness, providing
                high-quality materials for creating long-lasting goods. By
                continuously collaborating with our sister manufacturing units,
                we can supply the finest leathers, including:
              </p>

              {/* Centered categories checklist image inside light-green box */}
              <div className="my-8 max-w-3xl mx-auto border border-[#0e7448]/10 rounded-2xl overflow-hidden shadow-md bg-[#e8f9e8] p-4 sm:p-6">
                <img
                  src="/slides/about_leather_categories.jpg"
                  alt="Leather Product Categories"
                  className="w-full h-auto object-cover rounded-xl"
                />
              </div>

              {/* Bottom text inside light-green rounded container */}
              <div className="bg-[#e8f9e8] border border-[#0e7448]/10 rounded-2xl p-6 max-w-3xl mx-auto text-center mt-8">
                <p className="text-secondary text-body-lg font-semibold mb-2">
                  And many other premium hides that offer unique styles for:
                </p>
                <div className="text-base sm:text-lg font-bold text-center leading-relaxed text-secondary">
                  All types of <span className="text-[#ff6600]">furniture</span>
                  , <span className="text-[#ffaa00]">Footwear</span>,{" "}
                  <span className="text-[#2b8a3e]">Leather goods</span>,{" "}
                  <span className="text-[#e03131]">automotive</span>, and the{" "}
                  <span className="text-[#c2255c]">aviation industry</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPAREL SECTION */}
        <section className="py-16 md:py-20 lg:py-24 px-6 md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
              <div className="md:col-span-7 space-y-6 md:pr-12 order-2 md:order-1 font-body text-body-lg text-secondary leading-relaxed">
                <h2 className="font-display text-headline-xl-mobile md:text-headline-xl text-primary editorial-underline mb-8">
                  Apparel
                </h2>
                <p className="font-bold">
                  Our commitment is to sourcing products that prioritize human
                  rights, environmental sustainability, and fair business
                  practices.
                </p>
                <p>Most of our clothes come from Bangladesh</p>
                <p>
                  A country with a rich textile heritage that has been renowned
                  for centuries. The textiles of historic Bengal were famous for
                  their fine cotton and exceptional weaving, a tradition that
                  continues today. This enduring craftsmanship ensures
                  high-quality fabrics for modern apparel.
                </p>
                <p>
                  Another reason we source from Bangladesh is that it is a top
                  choice for garment buyers due to its cost competitiveness,
                  superior quality, and skilled workforce. The country has a
                  well-established textile infrastructure, specializing in the
                  mass production of knitwear, woven, denim, and other garments,
                  and serving millions of clients globally. Its commitment to
                  innovation and consistent standards ensures that each product
                  meets international expectations.
                </p>
                <p>
                  Most factories in Bangladesh are compliant with international
                  safety and sustainability standards. Additionally, its
                  vertical integration allows for efficient, large-scale
                  production and quicker lead times, making it a reliable
                  sourcing hub. However, we also source from other countries,
                  such as Vietnam, China, and India, to meet specific customer
                  requirements. We partner only with manufacturers who operate
                  sustainably, are certified, follow fair business practices,
                  and comply with international standards.
                </p>
              </div>
              <div className="md:col-span-5 order-1 md:order-2 mb-12 md:mb-0">
                <ParallaxImage
                  src="/slides/about_apparel_1.webp"
                  alt="Sewing workers stitching apparel"
                  aspect="aspect-[4/5]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT CATEGORY (APPAREL) - USER SNIPPET INSERTED HERE */}
        <section className="py-16 px-6 md:px-margin-desktop bg-surface-container-low border-t border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <div className="pt-8 sm:pt-12">
              <div className="text-center mb-12">
                <h3
                  className="text-[28px] leading-[36px] font-bold text-primary"
                  style={{ fontFamily: "Sora, system-ui, sans-serif" }}
                >
                  Product Categories
                </h3>
                <p className="text-on-surface-variant text-sm mt-4 max-w-4xl mx-auto leading-relaxed">
                  <strong>PRODUCT:</strong> That’s including T-shirts, polo
                  shirts, ladies' Skinny, ladies' shirts, jackets, sweatshirts,
                  Chinos, pants, Cargo Trouser, Oxford shirts, Woven shirts,
                  Denim pants, shirts and jackets, Work-wear items, and other
                  items. Fabric's (locally made or imported): Single jersey,
                  Lycra, Pique, Interlock, Rib (1x1, 2x2, etc) various types of
                  light woven items, Polar and Micro Fleece, 3 thread brushed or
                  non-brushed Fleece, Mesh, Nylon, Taffeta, Oxfords, Sports Wear
                  fabric, and many others.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-background hover-lift hover-lift-emerald">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src="/slides/about_apparel_knitwear.jpg"
                      alt="Premium Knitwear"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h4
                      className="absolute bottom-4 left-6 text-white text-xl font-bold"
                      style={{ fontFamily: "Sora, system-ui, sans-serif" }}
                    >
                      Knitwear
                    </h4>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      T-shirt, Polo shirt, knit Dresses, Hoodies, Sweatshirts,
                      Thermal lairs, Fleece, Sweater.
                    </p>
                  </div>
                </div>
                <div className="group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-background hover-lift hover-lift-emerald">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src="/slides/about_apparel_wovenwear.jpg"
                      alt="Premium Woven Wear"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h4
                      className="absolute bottom-4 left-6 text-white text-xl font-bold"
                      style={{ fontFamily: "Sora, system-ui, sans-serif" }}
                    >
                      Woven Wear
                    </h4>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Shirts, Trousers, Chinos, Puffer Jacket, Denim jeans,
                      Cargo Pants, Overcoats.
                    </p>
                  </div>
                </div>
                <div className="group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-background hover-lift hover-lift-emerald">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src="/slides/about_apparel_workwear.avif"
                      alt="Premium Work Wear"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h4
                      className="absolute bottom-4 left-6 text-white text-xl font-bold"
                      style={{ fontFamily: "Sora, system-ui, sans-serif" }}
                    >
                      Work Wear
                    </h4>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Coveralls, Work shirts, Pants, Utility Jackets, Hospital
                      Uniform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="py-16 md:py-20 lg:py-24 px-6 md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-display text-headline-xl-mobile md:text-headline-xl text-primary editorial-underline mb-12 text-center">
              How We Work
            </h2>
            <div className="space-y-8">
              <p className="font-body text-body-lg text-secondary leading-relaxed text-justify">
                We supply major wholesalers, importers, high-street retailers,
                and online retailers across the UK, Europe, and international
                markets. We operate as direct buyers, sellers, and suppliers, as
                well as trusted agents, creating strong connections between our
                clients and manufacturing partners. With no intermediary
                involved between us and the manufacturer, our customers benefit
                from direct communication, greater transparency, competitive
                opportunities, an efficient sourcing process, and customised
                manufacturing solutions.
              </p>
              <p className="font-body text-body-lg text-secondary leading-relaxed text-justify">
                We typically begin with the client’s sample or technical pack.
                However, if you require support in developing a new design or
                product, our world-class designers and technical team can help
                bring your vision to life, whether for leather or apparel. We
                welcome collaboration on your upcoming projects and work closely
                with you to ensure your objectives are met within your target
                timeline.
              </p>
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY */}
        <section className="py-16 md:py-20 lg:py-24 px-6 md:px-margin-desktop bg-primary text-on-primary">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-8 space-y-8">
              <h2 className="font-display text-[32px] sm:text-[48px] md:text-[64px] leading-tight text-white mb-8">
                Sustainability at our core.
              </h2>
              <div className="space-y-6 font-body text-body-lg text-white/90 max-w-2xl leading-relaxed">
                <p>
                  Our company is committed to sustainable sourcing that
                  prioritizes environmental responsibility, ethical labour, and
                  long-term resource management. We carefully select suppliers
                  who share our vision, ensuring that every product meets
                  stringent sustainability standards. We work closely with our
                  manufacturers to promote transparency, minimize waste, and
                  encourage the use of renewable materials.
                </p>
                <p>
                  We also focus on reducing our environmental footprint through
                  proper wastewater management and eco-conscious operations.
                  Through ongoing research and development, we create
                  innovative, eco-friendly leather, fabrics, and other
                  materials. Our goal is to build a supply chain that delivers
                  quality while positively contributing to communities and the
                  planet, fostering a future where responsible sourcing is the
                  standard.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20 mt-8">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary-fixed text-3xl">
                    eco
                  </span>
                  <span className="font-label-caps text-sm tracking-widest uppercase">
                    Low-Impact Materials
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary-fixed text-3xl">
                    groups
                  </span>
                  <span className="font-label-caps text-sm tracking-widest uppercase">
                    Fair Trade Practices
                  </span>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 flex justify-center mt-12 md:mt-0">
              <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg max-w-full aspect-[4/3] w-full bg-black/10">
                <img
                  className="w-full h-full object-cover"
                  alt="Sustainability tree"
                  src="/slides/sustainability_bg.jpg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
