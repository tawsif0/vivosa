import React from "react";

export default function LeatherGoods() {
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
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxKQXa67rNufL7XPAmbnNHUlGfBLazS2ppPc8XITD7sj6K6RZ3WSVaonEKxU7DwnecCeLOpQjA9SkFrd0KciphWXQxKTprCcnlb7rvuDzxmy-JphpAXU6imwO0ZXINb6R3dQ2QCoQbg_OsZ-eD0dlMieuGGhsHm6-_s_gR0tXr-mowJfchndeVzePFBF7bMg4YPbkBTm4eIXINmHymrbv3i9KRTeE5rNyhDfQX96s7JhoblehYKhC9AtTg6yYUd3IQhRqASOA2O9I"
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
              <p className="font-body text-body-lg text-on-surface-variant max-w-md leading-relaxed">
                Precision in every stitch. Vivosa specializes in the environmentally
                conscious manufacture of premium leather articles, utilizing
                JMD-certified sustainable leather for global luxury houses. Our
                commitment to ethical sourcing defines every piece we create.
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
                Bridging the gap between heritage craft and futuristic innovation.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-loose">
                In an era of rapid consumption, Vivosa stands as a beacon for individual
                satisfaction through durability and ethical design. We innovate within the
                fashion industry by harmonizing industrial-scale precision with the soul
                of hand-finished excellence. Every hide processed in our facility meets
                the most stringent international ecological standards.
              </p>
            </div>
            <div className="relative group">
              <div className="absolute -top-12 -left-6 text-matte-gold opacity-20 transform scale-[4] select-none font-display-lg">
                “
              </div>
              <div className="bg-primary p-12 md:p-16 text-on-primary shadow-xl">
                <blockquote className="font-headline-md text-headline-md italic mb-8 leading-snug text-white">
                  "We believe in ethical sourcing. Vivosa Crafting Both Beauty &amp; Idea
                  at the heart of our sustainability mission."
                </blockquote>
                <div className="w-full h-[300px] overflow-hidden mt-8">
                  <img
                    alt="Artisan at work"
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbDK6OHyEYrQ0R1TTPNQ9hT9bsSU0NVBuXsTDVHycci7uZYyOCYXFCouMKTy8cCqaSHf6lOfPVVaO4fO2R5MmktDekxAjTwbSDHNxWKxgew8ONxQsWw1dLrEOrOL8wAgnioarOicyPaqgXtfZxod0W8GE_Dfi4EOf-Sa3ykef_M6ZKo89aMShMcUJgnXHqzb9pjmcVyzswgTsj4CRKpj-E8n-JLVzVGrIWKxVtDIrN6tB_2L3-2ayieA3mzsQNYOmGsz6DV_m8vNc"
                  />
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
              {/* Item 1 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F016CMNO"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDV0hsvYQLJL7wk-WTZc_Q_QGc4PlaJMsBYY2BUcV3lO8dGLVvq1q50ndpe0AjaN81Mo7xtypREMBPntpM7OJsTgJ8zTUfMqLVX5Gk3yreyhgv7TYK7Bd6WJZLvmr1AQyZtXejzhBQzjawF3VTIRWS5k8bZOPvlOfqd6OgvB2JTdR9X8XEHc2n3o9148GlAvJnTOcj-V8UySteoIdNxy4mhWMkXfkAY0jVtprSVMBk_amNn2k79UDUF6WAqy8FGKrv0JqgwiPliKk"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Semi-Aniline / Full Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F016CMNO
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Cream
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    1.2 / 1.4 mm • EU + GB Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    This substantial round-hand leather is distinguished by its chrome retannage and technologically enhanced finish, providing a luxurious, smooth feel that satisfies customers’ demands for leather goods and footwear.
                  </p>
                </div>
              </div>
              {/* Item 2 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F011CL"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrzOcrrHnWcP4-ZDIhzHPaerzAnmbY0QTeD78AeYWdPnAt1b5Vdl-42EmThFBF6DqUAE_AGCCcRbjvWDqu5MMOqhe07lhCCHyP5B8MBocHiZEWhd4yttz1XL6Wf5kBnGvxPT23Z5m1cO6LOKNAezF78aukEdrXDiwbEVfcn0jaB0L1PNCWwWMSxI8VXjlD--25wyvTRIdr9zyaO-iqEbmVDc9me1CNhTP-YAhB4My0gAIfElrFJK3ChLv-y9owkiJ1JR20OrWjVZk"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Aniline / Full Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F011CL
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Brown
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    1.1 – 1.2 mm • European Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    Natural-grain, wax-mixed oil dyeing with a warm feel that offers a smooth and shiny appearance. Ideal for leather goods such as luxury handbags, belts, and garments.
                  </p>
                </div>
              </div>
              {/* Item 3 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F017CD"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMj-RpRx81-0OTg051514GlZ1o0T5psG6DCtFfh920kxZR4V-hw3GEXth_WXnPPK8awVFd9UX4PZRLB5BW4RxSxRnvW948dah0KaSZIjCoBQhpn5ac-k0oj1LqXnkdEkNVQ3oQrMczudDPW_chbPx8mctF4fIX16JJgJSOQ3LdZKg4hOQGyhL3TLzP4YNt8VVh6rodOs9gcvVK0D02rlaoYd2IgBcdfk2akXlJgJqONF9NoD1GxU5btUmk1xDJSI-Qapem9EvKapc"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Semi-Aniline / Full Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F017CD
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Black
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    1.3 – 1.5 mm • GB + EU Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    This is a full-grain leather characterized by chrome retannage and a semi-aniline finish with a regular grain, designed to meet the needs of customers in both the footwear and leather goods sectors.
                  </p>
                </div>
              </div>
              {/* Item 4 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F01TS"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfwT3GpeVX7RyANPYg7YczIT7S8Tehs7SEmz-UardO_-3lzgtY1txsCzMLDOantS1lpRHh4tQwrm38OHZrLlgodPjyvHXegoEBBcc3odegp6p5bc6scH_7xaXvWAr4uCKDELcuKCBRAnkhY5Ju9JiCs2WYDbTAgBhV_lRtCbPCzDCJ7L4Q2QFL0CT6C_ySy5Xg6AC5WEmKWZVAz4tmiWK1CiRAXPM7GuoDGGPjsZJY6TYnvxg85_DwHnAmoQZAP0kLgZE4EohpUSQ"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Semi-Aniline / Vintage
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F01TS
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Lavender
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    0.8 – 1.0 mm • EU + Extra Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    Soft, laminated cowhide with a natural crackled appearance and light thickness. Perfect for stylish leather goods such as handbags, small accessories, and garments.
                  </p>
                </div>
              </div>
              {/* Item 5 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F01OTS"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuABUYLhiCRldj4Gf9R33o1unMG_0n0ZqWv89Q1cA4v1v72QIi8rQJYtBm2w-JZXt9bhVIxGYLYpy1WvLkRc3wMBtURJVrtsoNpR4-_XpmKJ33XfpDkgqjz0nA5em84KCLSUaX81jWl0GpeQtoNP4BE-J2PjfHdJkro0k_NBDsD8bpyr0oReGAlkHuaal_ZnnALxEJUXQ0yx9y-iTgzkPBqCXFMel9dt_AvLPhBU1KmheRzfwt4KmkVenhMGcuTfOtI1h6uh9pDAQao"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Aniline / Full Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F010TS
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Light Purple
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    0.9 – 1.2 mm • European Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    Full-grain cow leather with a natural grain, mixed tanning, and an aniline finish featuring a glossy patent effect. It has a solid colour and a soft touch, ideal for clothing.
                  </p>
                </div>
              </div>
              {/* Item 6 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F09TS"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxicWjU7_ludSEogSoA_iLzRTsDnYuPey79Asz36Lt5Mmwyxhhu3ZkHXEXGcfTPI6NI_YySCjVV8k4PHkNDEAgK7Hc2rpX5ImKz-Rv55oeDVlqHtw0zsNlWqf2Z7UWLNQfQNnbOfy8loDPLkfL05EADJqpWZ5mDuyoNifElG8Eu2DMwvjZZs2U1mW9J6wdXdc1hyfjMt4vXdMVeuciD6MDBgWP9gfR3sNCFIHNOxtYSKyeCgzAKKAgBetmoTdHyMrwqJJ7CVky2ZQ"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Nappa / Full Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F08TS
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Maroon
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    0.9 – 1.1 mm • Italian Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    This Nappa leather features a smooth texture with a natural fine grain and a pleasant, soft touch. Perfect for leather goods and footwear.
                  </p>
                </div>
              </div>
              {/* Item 7 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F011TF"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgh7CAgensyvL117soJQQ_Q5RCxZFoaf7D5Lk94XuHEUnnJuEawphc6zcU99mhGc5rwzKZp8X2rHcvrjoXuRljFuPThUugzuepwR2FnctNklWww1ayc7pOuum6STU2tHGMKoSiq8LNZdt7vReyYx-KgKP93MjH3Wb6UAS9aSmAZvxmaUQeKxtsaG-0cI11lGr_uXkl0kbQB8-ohcwVD4V1afguqx4Vj0UDMkHwB5jotiImiCsa3Mj0-vEX4hgccJXVSPxWry6Tx5k"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Semi-Aniline / Vintage
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F011TF
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Brunt Orange
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    1.2 – 1.4 mm • EU + GB Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    This article features an oily pull-up effect, a silky, waxy texture, and a subtle shine. Combining modern technology with exceptional craftsmanship, it offers a vintage appearance and a distinctive crackling sensation.
                  </p>
                </div>
              </div>
              {/* Item 8 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F64DB"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_09AcyuWmqU1dYq3BfE0UX4u-scXi6WYZQI8wrk3gmNpJ64_iHI3N3ZnEmYX_hoZ4mP2RFQXwBKkJ-JujPhiAut39gUR9OnegDv_S4dVsEY0NF2nehLFZQsfEgLFGLEnPgknzCH8Az_5MXtLZbN6tYw9YfB7MGkvIO7KVRoWTfY69x9EZjWIe2xtZ7_zqtbZCgGYRgWFrWZHcgjDr9yOJS-xz6-m3mPZ6Yq1Wy07dg3Tv3pOz2MI6RRCqBgpEQ6FQbA9zRe1pQg"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Semi-Aniline / Full Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F04DB
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Olive
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    1.4 – 1.6 mm • EU Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    This article has a dry touch and is distinguished by its round and full hand. It develops a unique and inimitable patina over time, enhancing the value and longevity of your creations.
                  </p>
                </div>
              </div>
              {/* Item 9 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F011N"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdxAhFC5HX_xJK7MxZbSX86-avDCFpx844zx4_3EU9cmE6_w_ptw8puISigkE38se9LbvfTx83RUdzPs2sAWw8kc6b9SgcLhwAqzpXp0roRl2-4MeSgntofhEwHjZqonDeoo2b_wP1LnJAYMqIlht5SnenE3vjoic7zSXzDWgQrRfCo_8QoE2uzv73_ehbfeTNqpzmbycoRqeejvvjHP9vs0Bn8Me8R6XLVtQsF77us_gVAXaaP1qmq3pXq5KvGA1UG6_LF1Nf1T4"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Semi-Aniline / Corrected Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F011TN
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Crimson Red
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    1.2 – 1.4 mm • European Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    This bovine leather is distinguished by its unique and timeless corrected grain. It features a subtle two-tone effect, a glossy appearance on the tips, and a soft, natural feel.
                  </p>
                </div>
              </div>
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
              {/* Item 10 */}
              <div className="bg-white border border-outline-variant/30 flex flex-col group transition-all duration-500 hover:border-matte-gold/50 shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    alt="F04D5O"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOEwbsMWF75DhBG3j2YxIH8K_RjRAVPDUNZCV8tKl2ZStGZByUkA6QLW7kKIpnE4qiPL5qDkX3wdALJ9F0tZDDAcFQQAYKNadDJMSM8mqmd2-E4vWaBvI6GUzXjVAhecnINr99_ftuEXgSSjcuniZQBc9kPwXpPc2wyiAg8ydIPBfd7EFQiQQLmOiMGSLibuzEtU_27wufqR1-wF46x8wUqLwjzfrRSUcJo20YfhZtdi4Nb_uXN3dFK849OF7IDVjXmNaBm4lpLIs"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label-caps text-[10px] text-matte-gold tracking-widest uppercase">
                      Semi-Aniline / Full Grain
                    </span>
                    <span className="font-label-caps text-[10px] text-on-surface-variant">
                      F06DSO
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary mb-2">
                    Orange
                  </h3>
                  <p className="text-xs text-matte-gold mb-4 font-bold tracking-tight uppercase">
                    1.4 – 1.6 mm • EU Origin
                  </p>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed">
                    It’s even grain throughout the leather makes it suitable for the most demanding leather goods. The semi-washed effect gives each item a unique character and refinement.
                  </p>
                </div>
              </div>
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
                    At Vivosa, we view leather as a byproduct of the food industry that,
                    when processed responsibly, becomes one of the most durable and
                    sustainable materials available to the fashion industry. Our
                    closed-loop water treatment and chrome-free options lead the way in
                    modern tanning technology.
                  </p>
                  <p>
                    Every stage of our production is audited for traceability, ensuring
                    that your final products are not only beautiful but carry a legacy of
                    ethical manufacturing and environmental protection.
                  </p>
                </div>
              </div>
              <div className="bg-white/5 p-12 border border-on-primary-container/20 shadow-xl">
                <ul className="space-y-6">
                  {[
                    "Traceable Raw Hides Origin (LWG Certified)",
                    "Advanced Eco-Tanning Methods",
                    "Strict Defect Classification Standards",
                    "REACH & International Compliance",
                    "Ethical Labor Practices & Certification",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span
                        className="material-symbols-outlined text-matte-gold shrink-0"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-label-caps text-label-caps tracking-wider text-white uppercase">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
