import React from "react";

export default function LeatherLining() {
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
                Engineered for intimate contact. Our lining leathers prioritize
                supreme softness and advanced moisture-wicking capabilities,
                ensuring breathable comfort for the lifetime of the product.
              </p>
            </div>
            <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center">
              {/* Line Art Diagram */}
              <div className="w-full h-full border border-primary/5 p-8 flex items-center justify-center">
                <img
                  className="w-full h-full object-contain mix-blend-multiply opacity-40 grayscale"
                  alt="Minimalist technical line-art diagram of luxury shoe"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxJxhWr_sl9ny9OedBQlbgFADEnv7qJj50xdTT2KBtyBxMHtnxOd7xKP5VLGTqxas69zWCHBGmg-GquJ5G0H6YmvBq-LmfnK1W8IIx-dMjQ2x1yV0HHT6MB3RcL08rLv5KTbvoW_ppHjUCIRyJmCEg6WSB5Qj3s1nzd12Focc6bQ0-vUYYzj4YxM7De-NXmFuWX6kqL8Y07R_89f_JqX-kjmiwIiXs0LTYtzFFOg27tTnOYy-asJpBacPHqfMWA5RzUid8EcMa6Fo"
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
              <span className="font-label-caps text-label-caps text-matte-gold mb-4 block tracking-[0.2em]">
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
          <div className="relative overflow-hidden aspect-square">
            <img
              className="w-full h-full object-cover"
              alt="Macro view of supple dark forest green leather texture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC83TPg1a484xv29PUmn9Sq81HibVTytnG3EfVJ3wnGQsCDT4vyOPSqY26L7EGB2ob8j0Si6HwYdlhjZGHj-rHSQvpDQ9jzPg6kcdivbWuTU3ZgnGo4Cb6YE4zWhsT3NHiVUiGe0-0DPnrnv2GaE7klxSyMPOspFo4-qZxm807ZaHeBO4f6V19oR8ovZAKSozx1I291gKxKWIna6s7nkhgqZHepj5QRXYD7Um8nJRL68kAbV5-HxoXpv2xu4gOqFkucLXN0Y9Gmkog"
            />
            <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
              <span className="text-on-primary/10 font-display-lg text-headline-xl rotate-[-45deg] whitespace-nowrap select-none">
                VIVOSA LINING LEATHER
              </span>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="font-headline-xl text-headline-xl text-primary">
              Italian-Crafted Premium Lining
            </h2>
            <p className="font-body-md text-body-lg text-on-surface-variant leading-relaxed">
              Our heritage in Tuscany allows us to produce lining leather that is as
              durability-focused as it is delicate. We use traditional techniques
              refined for modern performance requirements in luxury footwear and
              accessories.
            </p>
            <div>
              <h3 className="font-label-caps text-label-caps text-primary mb-6 tracking-widest uppercase">
                OUR LINING LEATHER QUALITIES
              </h3>
              <ul className="grid grid-cols-2 gap-y-4">
                {[
                  "Soft Feel",
                  "Easy Stitching",
                  "Breathability",
                  "Luxury/Everyday",
                  "Chrome-free",
                  "Italian Tanned",
                ].map((quality) => (
                  <li key={quality} className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-matte-gold text-sm"
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
            <div className="border-l-4 border-matte-gold bg-surface-container pl-6 py-6 pr-8">
              <p className="font-body-md text-body-md italic text-primary leading-relaxed">
                "Sustainability is not an option, but our ultimate luxury. All
                lining leathers are produced under strict European environmental
                standards."
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
              Explore our standard palette or request bespoke finishing and custom
              color matching to align with your seasonal collections.
            </p>
          </div>
        </section>

        {/* Leather Grid */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant/15 p-6 flex flex-col justify-between">
              <div>
                <div className="aspect-[1/1] overflow-hidden mb-6">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="Ice White semi-aniline lining leather swatch"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_xAAvafea7t6RUbOCokwfkWzobVjcWxnY3aDWiTZHDpuFSuzNWQdmtU9NVIUnwIcXIjnxWiWz2Gbu9FTPHhzU7VK2ru44P9BTZ0q1s4NEttUTi9Ifg0mLdjFCa6YdtVy9wxEqbpFtKf3I9Xc97-7o8gBRmP3iJxu-ymI4FuqNbzX-x3fEnRQg_NHWaD-TJt4PMO7PChbVVp7PFO6cQxBvJQDojOuQBzE2C7irvMQuWFHgPBFZCxm-MgEswCFVUv44HPq26ZXhfAc"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-caps text-[10px] text-matte-gold tracking-wider">
                    REF: F0CRP
                  </span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/70 tracking-wider">
                    RAW HIDES: EUROPE
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary mb-4">
                  Ice White
                </h4>
                <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Ideal for producing linings for footwear and leather goods. It features a soft, rounded hand, a chrome retannage, and a semi-aniline finish.
                </p>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-matte-gold tracking-widest border-t border-outline-variant/20 pt-4">
                  Thickness: 0.8 – 0.9 mm
                </p>
                <p className="font-body-md text-xs text-on-surface-variant/60 mt-1">
                  Type: Semi-Aniline / Tumbled Full Grain
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant/15 p-6 flex flex-col justify-between">
              <div>
                <div className="aspect-[1/1] overflow-hidden mb-6">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="Lion aniline full-grain lining leather swatch"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8gJSL5R4McmAQDNk-hJAqwY61sIRz8ziEYcmZqfmf1_nRflnsFdxZpgd9fcvkP8DO4KJm7ahC0asJuYTB6Py-VYKl4eHW_SJUyfjCfG-7FnngVLGx2wf2DJFK_a_NMuOWMwDyjHdh5Cyn7Az-2A0WbM75q9ccHfeCIYn_ECm_hzHa2mb5mzTvI8C9DtETrDdCX-cacgsF_lwis3VK1ECneFBwEFV9DMJTvp0k0ZMx0IPRevoaWk467x8sKz3fI6hnh24ZBOWYfMM"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-caps text-[10px] text-matte-gold tracking-wider">
                    REF: F017CBM
                  </span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/70 tracking-wider">
                    RAW HIDES: EUROPE
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary mb-4">
                  Lion
                </h4>
                <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Has a soft, rounded hand and features chrome retannage with an aniline finish. Perfect for producing linings for footwear and leather goods.
                </p>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-matte-gold tracking-widest border-t border-outline-variant/20 pt-4">
                  Thickness: 0.8 – 0.9 mm
                </p>
                <p className="font-body-md text-xs text-on-surface-variant/60 mt-1">
                  Type: Aniline / Full Grain
                </p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant/15 p-6 flex flex-col justify-between">
              <div>
                <div className="aspect-[1/1] overflow-hidden mb-6">
                  <img
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    alt="Pink semi-aniline top-grain lining leather swatch"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIdX9HvIOsXzW9SJJK11fZGhkSVuiHSfJmuO8pWuv6moYwnHhF7mc5FFmNiMDt_FGLdCNEnniu3rYt5Y-4YJD07ybAoVoUzYKhfRKve68s_LP3YMtfCHEuDrHOkSq4IM4LzSaoLTdTVHhNQQs7bE1VjMxZo9vZy1aM4NZ9C2uU73QwD8bbv1Q72m3ovDM2biGTFa8dQiG8ElhFfgkTyY8gDSWIqhqz1K4U4nfWXxvu7HaYO3xVDKHP0PD60rvqZzB1VL1brwmk1iY"
                  />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-label-caps text-[10px] text-matte-gold tracking-wider">
                    REF: F014CG
                  </span>
                  <span className="font-label-caps text-[10px] text-on-surface-variant/70 tracking-wider">
                    RAW HIDES: EUROPE
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary mb-4">
                  Pink
                </h4>
                <p className="font-body-md text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Has a soft, rounded hand with a smooth touch, featuring chrome retannage and a finish designed for better sealing. Suitable even for luxury footwear.
                </p>
              </div>
              <div>
                <p className="font-label-caps text-label-caps text-matte-gold tracking-widest border-t border-outline-variant/20 pt-4">
                  Thickness: 0.8 – 0.9 mm
                </p>
                <p className="font-body-md text-xs text-on-surface-variant/60 mt-1">
                  Type: Semi-Aniline / Top Grain
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Text */}
        <section className="max-w-3xl mx-auto text-center py-16 px-margin-mobile">
          <h2 className="font-headline-xl text-headline-xl text-primary mb-6">
            Designed for Collaboration
          </h2>
          <p className="font-body-md text-body-lg text-on-surface-variant mb-10 leading-relaxed">
            Our workshop is your workshop. We offer extensive customization for
            bulk orders, including thickness adjustments from 0.5mm to 1.2mm and
            exclusive color development.
          </p>
        </section>

        {/* Quality & Sustainability Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
          <div className="bg-surface-container-low rounded-3xl p-8 md:p-16">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="font-headline-xl text-headline-xl text-primary">
                Mastery in Every Layer
              </h2>
              <div className="w-2 h-2 rounded-full bg-matte-gold my-6"></div>
              <p className="font-body-md text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Our quality control process is rigorous, ensuring that every square
                inch of lining leather meets the high standards of global luxury
                brands.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                {[
                  {
                    title: "RAW HIDES SELECTION",
                    desc: "Only the highest grade of calf and bovine skins are sourced for our lining productions.",
                  },
                  {
                    title: "PRECISION TANNING",
                    desc: "Chrome-free and vegetable tanning options available for specific sustainability requirements.",
                  },
                  {
                    title: "DEFECT INSPECTION",
                    desc: "3-stage manual inspection process to guarantee maximum cutting yield for our partners.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="w-3 h-3 mt-2 bg-primary shrink-0"></span>
                    <div>
                      <h4 className="font-label-caps text-label-caps text-primary mb-2 tracking-widest">
                        {item.title}
                      </h4>
                      <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {[
                  {
                    title: "CONTROLLED DRYING",
                    desc: "Toggled or vacuum-dried to maintain the natural fiber structure and suppleness.",
                  },
                  {
                    title: "EXPERT REFINISHING",
                    desc: "Proprietary finishes applied to enhance moisture-wicking and prevent color bleeding.",
                  },
                  {
                    title: "LABORATORY TESTING",
                    desc: "Strict pH, tear strength, and abrasion resistance testing in every batch.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <span className="w-3 h-3 mt-2 bg-primary shrink-0"></span>
                    <div>
                      <h4 className="font-label-caps text-label-caps text-primary mb-2 tracking-widest">
                        {item.title}
                      </h4>
                      <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
