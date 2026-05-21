import React, { useEffect } from "react";

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
              className="w-full h-full object-cover brightness-50"
              src="/slides/about_hero.avif"
            />
          </div>

          <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop w-full">
            <div className="max-w-3xl">
              <span className="inline-block text-white/70 font-label-caps text-label-caps tracking-[0.2em] mb-6 uppercase">
                GLOBAL MANUFACTURING HUB
              </span>
              <h1 className="font-display text-[48px] md:text-[72px] leading-tight text-white mb-8">
                Authentically Dynamic: <br />
                <span className="italic font-light text-white/80">Vivosa Sourcing Hub</span>
              </h1>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="py-section-gap px-6 md:px-margin-desktop bg-background border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-display text-headline-xl text-primary editorial-underline mb-12">
              Who We Are
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-6 font-body text-body-lg text-secondary leading-relaxed">
                <p>
                  Vivosa is an authentically, dynamic company based in the UK, operating in both the leather and apparel industries. It was founded by professionals with over 30 years of experience in each sector, bringing proven technical expertise and a constant drive to embrace new challenges and achieve meaningful goals.
                </p>
                <p>
                  Our primary objective is to source materials ethically from our sister companies—experienced, environmentally conscious manufacturers with a long-standing commitment to quality. This approach enables us to strengthen our presence in the UK, Europe, and other international markets, supported by sustainable manufacturing partners who have been delivering high-quality products for over 50 years. By prioritizing ethical sourcing, leveraging extensive industry experience, and focusing on sustainability, we provide products that meet the highest standards and contribute to responsible business practices.
                </p>
                <p>
                  We prioritize customers first, and our dedicated, proactive team takes full responsibility for excellence at every step. From design and production to logistics, we deliver high-quality, sustainable products and innovative solutions at the right price—helping your business grow, maximize profit margins, and maintain the highest standards of quality and sustainability.
                </p>
              </div>
              <div className="space-y-6 font-body text-body-lg text-secondary leading-relaxed">
                <p>
                  Vivosa stand for "lively". An outfit is not just about expressing a style; it reflects your individuality and inner self through choices that make you feel comfortable and joyful. Wearing what resonates with you and boosts your confidence is more meaningful than blindly following trends. Every individual is unique, with different tastes and lifestyles.
                </p>
                <p>
                  Vivosa is operated by professionals who have more than 30 years of working experience in both the leather and clothing industries. Our expert team draws on this knowledge to design, develop, and deliver authentic, sustainable products that balance style, functionality, and long-lasting quality. Each item is crafted from high-grade materials, built for durability, and offered at fair, competitive prices.
                </p>
                <p>
                  By focusing on sustainable manufacturing, durability, quality, and customer satisfaction, Vivosa can provide the finest leather and authentic clothing at affordable prices that empower people to feel confident, expressive, and “lively” in everything they wear and use. This philosophy—and our commitment to innovation—is what inspired the name Vivosa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-16 px-6 md:px-margin-desktop bg-surface-container-low border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto text-center">
            <h2 className="font-display text-headline-xl text-primary editorial-underline inline-block mb-8">
              What We Do
            </h2>
            <p className="font-body text-body-lg text-secondary leading-relaxed max-w-5xl mx-auto">
              We supply a broad range of authentic finished leather for multiple applications and all types of premium ready-made garments, produced to order, in the UK, Europe, and other markets. Our products are sourced from carefully selected producers with decades of experience; all fully certified as sustainable manufacturers. We value our clients and are glad to assist them in producing new goods, developing or completing projects as needed, overcoming challenges, and consistently providing the best service. Our commitment is to offer affordable sourcing solutions and expertly calculated product costs to help our clients run their business more efficiently.
            </p>
          </div>
        </section>

        {/* LEATHER SECTION */}
        <section className="py-section-gap px-6 md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              <div className="md:col-span-5 mb-12 md:mb-0">
                <div className="overflow-hidden aspect-[3/4] shadow-md border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover"
                    alt="Tannery equipment line"
                    src="/slides/about_leather_1.webp"
                  />
                </div>
              </div>
              <div className="md:col-span-7 space-y-6 md:pl-12 font-body text-body-lg text-secondary leading-relaxed">
                <h2 className="font-display text-headline-xl text-primary editorial-underline mb-8">
                  Leather Craftsmanship
                </h2>
                <p>
                  We have over 30 years of working experience in renowned tanneries that have been operating for more than 60 years, specializing in producing high-quality hides for the global leather market.
                </p>
                <p>
                  As a responsible supplier, our goal is to provide the best leather possible without burdening it with unnecessary costs. We work with manufacturers who respect the environment, adopt the best technology, and guarantee safe working processes for the people. We provide simple, vibrant, and complete leather solutions that meet all standard requirements. Most of our raw hides (90%) are sourced from Europe, and the entire process—from tanning and retanning to finishing—is carried out in one place under strict supervision, ensuring a safe production process and high-quality standards. This is premium leather, truly Made in Italy from A to Z, all under one roof.
                </p>
                <p>
                  The journey begins with the careful selection of raw hides. Italian leather producers often choose the highest-quality hides, typically from local or European sources, to ensure that the final product meets the highest standards of excellence. This selection process is crucial, as the quality of the hide directly influences the quality of the finished leather. Italian leather’s reputation is built not only on its history but also on the dedication to quality and attention to detail ingrained in its artisans.
                </p>
                <p>
                  However, we also source from manufacturers outside of Europe, but only in response to specific customer requirements. We inspect each hide for sustainability and quality before sending it to clients, and we oversee every stage of manufacturing to ensure that quality standards are met.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT CATEGORY (LEATHER) */}
        <section className="py-16 px-6 md:px-margin-desktop bg-surface-container-low border-t border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-display text-headline-xl text-primary editorial-underline mb-10 text-center">
              Leather Categories
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-center text-secondary text-body-lg mb-8">
                We can offer more than a thousand different designs (articles) of finished leather in a variety of colours and finishes—durable and suitable for multiple applications. The leathers combine consistency, elegance, and attractiveness, providing high-quality materials for creating long-lasting goods. By continuously collaborating with our sister manufacturing units, we can supply the finest leathers, including:
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  "All types of furniture", "Footwear", "Leather goods", 
                  "Automotive", "Marine industry"
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center justify-center text-center gap-2 bg-white p-4 shadow-sm border border-outline-variant/20 rounded-xl hover-lift">
                    <span className="material-symbols-outlined text-primary text-2xl mb-1">done_all</span>
                    <span className="text-sm font-semibold text-secondary">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* APPAREL SECTION */}
        <section className="py-section-gap px-6 md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
              <div className="md:col-span-7 space-y-6 md:pr-12 order-2 md:order-1 font-body text-body-lg text-secondary leading-relaxed">
                <h2 className="font-display text-headline-xl text-primary editorial-underline mb-8">
                  Apparel
                </h2>
                <p>
                  Our commitment is to sourcing products that prioritize human rights, environmental sustainability, and fair business practices.
                </p>
                <p className="font-bold text-primary">
                  MOST OF OUR CLOTHES COME FROM BANGLADESH
                </p>
                <p>
                  A country with a rich textile heritage that has been renowned for centuries. The textiles of historic Bengal were famous for their fine cotton and exceptional weaving, a tradition that continues today. This enduring craftsmanship ensures high-quality fabrics for modern apparel.
                </p>
                <p>
                  Another reason we source from Bangladesh is that it is a top choice for garment production due to its cost competitiveness, superior quality, and large, skilled workforce. The country has a well-established textile infrastructure, specializing in the mass production of knitwear, woven, denim, and other garments, and serving millions of clients globally. Its commitment to innovation and consistent standards ensures that each product meets international expectations.
                </p>
                <p>
                  Most factories in Bangladesh are increasingly compliant with international safety and sustainability standards. Additionally, its vertical integration allows for efficient, large-scale production and quicker lead times, making it a reliable sourcing hub. However, we also source from other countries, such as Vietnam, China, and India, to meet specific customer requirements. We partner only with manufacturers who operate sustainably, are certified, follow fair business practices, and comply with international standards.
                </p>
              </div>
              <div className="md:col-span-5 order-1 md:order-2 mb-12 md:mb-0">
                <div className="overflow-hidden aspect-[4/5] shadow-md border border-outline-variant/10">
                  <img
                    className="w-full h-full object-cover"
                    alt="Sewing workers stitching apparel"
                    src="/slides/about_apparel_1.webp"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT CATEGORY (APPAREL) - USER SNIPPET INSERTED HERE */}
        <section className="py-16 px-6 md:px-margin-desktop bg-surface-container-low border-t border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <div className="pt-8 sm:pt-12">
              <div className="text-center mb-12">
                <h3 className="text-[28px] leading-[36px] font-bold text-primary" style={{ fontFamily: "Sora, system-ui, sans-serif" }}>
                  Product Categories
                </h3>
                <p className="text-on-surface-variant text-sm mt-4 max-w-4xl mx-auto leading-relaxed">
                  <strong>PRODUCT:</strong> That’s including T-shirts, polo shirts, ladies' Skinny, ladies' shirts, jackets, sweatshirts, Chinos, pants, Cargo Trouser, Oxford shirts, Woven shirts, Denim pants, shirts and jackets, Work-wear items, and other items. Fabric's (locally made or imported): Single jersey, Lycra, Pique, Interlock, Rib (1x1, 2x2, etc) various types of light woven items, Polar and Micro Fleece, 3 thread brushed or non-brushed Fleece, Mesh, Nylon, Taffeta, Oxfords, Sports Wear fabric, and many others.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-background hover-lift hover-lift-emerald">
                  <div className="h-64 overflow-hidden relative">
                    <img src="/slides/about_apparel_knitwear.jpg" alt="Premium Knitwear" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h4 className="absolute bottom-4 left-6 text-white text-xl font-bold" style={{ fontFamily: "Sora, system-ui, sans-serif" }}>Knitwear</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Including T-shirts, polo shirts, sweatshirts, Chinos, pants, and other fine knit items. Fabric choices include single jersey, Lycra, Pique, Interlock, and Rib (1x1, 2x2).
                    </p>
                  </div>
                </div>
                <div className="group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-background hover-lift hover-lift-emerald">
                  <div className="h-64 overflow-hidden relative">
                    <img src="/slides/about_apparel_wovenwear.avif" alt="Premium Woven Wear" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h4 className="absolute bottom-4 left-6 text-white text-xl font-bold" style={{ fontFamily: "Sora, system-ui, sans-serif" }}>Woven Wear</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Including ladies' Skinny, ladies' shirts, jackets, Cargo Trousers, Oxford shirts, woven shirts, and denim pants, shirts, and jackets.
                    </p>
                  </div>
                </div>
                <div className="group rounded-xl overflow-hidden shadow-lg border border-outline/5 bg-background hover-lift hover-lift-emerald">
                  <div className="h-64 overflow-hidden relative">
                    <img src="/slides/about_apparel_1.webp" alt="Premium Work Wear" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h4 className="absolute bottom-4 left-6 text-white text-xl font-bold" style={{ fontFamily: "Sora, system-ui, sans-serif" }}>Work Wear</h4>
                  </div>
                  <div className="p-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Heavy-duty industrial safety apparel, protective uniforms, outerwear jackets, polar and micro fleece, and sports wear fabrics engineered to survive tough conditions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW WE WORK */}
        <section className="py-section-gap px-6 md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto">
            <h2 className="font-display text-headline-xl text-primary editorial-underline mb-12 text-center">
              How We Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="font-body text-body-lg text-secondary leading-relaxed">
                We operate as a supplier to major wholesalers and importers, as well as high-street and online retailers in the UK, Europe, and many other countries worldwide. We act both as direct buyers and sellers, and as agents. Importantly, there is no broker or intermediary between us and the manufacturer, giving our customers extensive opportunities and the ability to communicate with us directly 24/7.
              </p>
              <p className="font-body text-body-lg text-secondary leading-relaxed">
                We typically begin with the client’s sample or tech pack. However, if you need support developing a design or new product, our world-class designers and technical team can create it for you, whether it’s leather or apparel. We welcome collaboration on your upcoming projects. Our main objective is to work closely with you to ensure your goals are achieved within your target timeline.
              </p>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US (NEW GRID SECTION) */}
        <section className="py-section-gap px-6 md:px-margin-desktop bg-surface-container-low border-t border-b border-outline-variant/10">
          <div className="max-w-container-max mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-display text-headline-xl text-primary editorial-underline inline-block mb-6">
                Why Choose Us
              </h2>
              <p className="font-body text-body-lg text-secondary max-w-4xl mx-auto leading-relaxed">
                There are numerous reasons that customers are willing to cooperate with us. Our team is completely competent and provides high efficiency to complete projects correctly, and we regard our customers as an integral component of our company. We belief is that authentic products are created when great teamwork, experience, environmental awareness, and a relentless commitment to innovation come together to achieve excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">compost</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">Ethical Sourcing</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  We guarantee our clients that the materials will be sourced from internationally renowned sustainable producers that care about the community and environment and who have been making ethical products for more than 50 years.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">category</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">Wide range of products</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  To satisfy your demands, we provide an extensive variety of products in both leather and apparel with premium quality and competitive price.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">tune</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">Customization of products</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  We welcome modification in your approved order, which is confirmed by a sample that including any design ideas in mind or if you would like to add or modify any cut, style, colour, pattern, packing, or print.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">Quality of products</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Our quality control team will verify that our both product leather and apparel have zero defects by conducting pre-production and final inspections to ensure the material satisfies all requirements.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">sell</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">Exceptional price</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  We guarantee that our premium products will be reasonably priced. We hope to build enduring business relationships based on mutual benefits by offering top-notch items, expert service, affordable costs, and timely delivery.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">lightbulb</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">Researching and innovation</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Curiosity, receptivity, and the desire to foresee client needs are what motivate research. Our team conducts research to support innovation by offering our clients the fundamental knowledge, cutting-edge technologies, and comprehension of market demands.
                </p>
              </div>

              {/* Feature 7 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">sentiment_very_satisfied</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">Customer Satisfaction</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Your satisfaction is our top priority, and we make sure you have a hassle-free and enjoyable experience from the time you place your purchase until it is delivered. Our objective is to assist our customers in reaching their goals.
                </p>
              </div>

              {/* Feature 8 */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <h4 className="font-display text-xl font-bold text-primary mb-3">First Delivery</h4>
                <p className="text-sm text-secondary leading-relaxed">
                  Our team works directly with our trusted logistics to ensure that all our deliveries happen on schedule, no matter where you are. We are aware that on-time delivery is important to every buyer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OUR VISION / OUR MISSION */}
        <section className="py-section-gap px-6 md:px-margin-desktop bg-background">
          <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-surface-container-low p-10 border border-outline-variant/20 shadow-sm rounded-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined text-3xl">visibility</span>
                </div>
                <h3 className="font-display text-[32px] font-semibold text-primary">Our Vision</h3>
              </div>
              <div className="space-y-4 font-body text-body-lg text-secondary leading-relaxed">
                <p>
                  Our vision extends beyond our business. We aspire to make a positive impact on the world — from the communities where we source our raw materials to the ways our products help customers lead more fulfilling lives.
                </p>
                <p>
                  Our top priorities are customer satisfaction, shared values, and fostering a collaborative and trustworthy work environment. We are committed to listening to our customers and consistently delivering reliable, innovative, and high-quality solutions.
                </p>
                <p>
                  Our vision is to redefine global sourcing by fostering trusted partnerships, embracing innovation, and upholding the highest standards of sustainability and ethics. We strive to deliver materials and products that create lasting value for our clients, empower our employees, support our manufacturing partners, and contribute positively to the communities and environments in which we operate.
                </p>
              </div>
            </div>
            
            <div className="bg-surface-container-low p-10 border border-outline-variant/20 shadow-sm rounded-2xl lg:translate-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-md">
                  <span className="material-symbols-outlined text-3xl">track_changes</span>
                </div>
                <h3 className="font-display text-[32px] font-semibold text-primary">Our Mission</h3>
              </div>
              <div className="space-y-4 font-body text-body-lg text-secondary leading-relaxed">
                <p>
                  Our mission is to work with our partners to create a brighter future for people, the region, and the next generation by fostering a culture of excellence and collaboration. We empower businesses by providing efficient, reliable, and cost-effective sourcing solutions.
                </p>
                <p>
                  Our goal is to connect clients with the highest-quality products and suppliers worldwide, ensuring seamless supply chain management and building long-term partnerships. By leveraging market expertise, advanced technology, and ethical practices, we strive to deliver exceptional value, drive growth, and contribute to the success of every client we serve.
                </p>
                <p>
                  Engaging with us means joining a journey of professional, personal, and corporate growth — one that emphasizes continuous improvement, innovative solutions, and the creation of products that deliver lasting value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY */}
        <section className="py-section-gap px-6 md:px-margin-desktop bg-primary text-on-primary">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
            <div className="md:col-span-8 space-y-8">
              <h2 className="font-display text-[48px] md:text-[64px] leading-tight text-white mb-8">
                Sustainability at our core.
              </h2>
              <div className="space-y-6 font-body text-body-lg text-white/90 max-w-2xl leading-relaxed">
                <p>
                  Our company is committed to sustainable sourcing that prioritizes environmental responsibility, ethical labour, and long-term resource management. We carefully select suppliers who share our vision, ensuring that every product meets stringent sustainability standards. We work closely with our manufacturers to promote transparency, minimize waste, and encourage the use of renewable materials.
                </p>
                <p>
                  We also focus on reducing our environmental footprint through proper wastewater management and eco-conscious operations. Through ongoing research and development, we create innovative, eco-friendly leather, fabrics, and other materials. Our goal is to build a supply chain that delivers quality while positively contributing to communities and the planet, fostering a future where responsible sourcing is the standard.
                </p>
              </div>
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/20 mt-8">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary-fixed text-3xl">eco</span>
                  <span className="font-label-caps text-sm tracking-widest uppercase">Low-Impact Materials</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-tertiary-fixed text-3xl">groups</span>
                  <span className="font-label-caps text-sm tracking-widest uppercase">Fair Trade Practices</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 flex justify-center mt-12 md:mt-0">
              <span className="material-symbols-outlined text-[180px] text-white/20 animate-pulse select-none">
                nature_people
              </span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
