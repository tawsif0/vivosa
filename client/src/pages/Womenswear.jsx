import React from "react";

export default function Womenswear() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row hero-split w-full pt-16 md:pt-20">
        <div className="w-full md:w-1/2 bg-[#FAF7F2] flex flex-col justify-center px-4 md:px-margin-desktop py-16 md:py-12">
          <span className="font-label-caps text-label-caps text-[#A07830] mb-6 block tracking-widest">
            AUTUMN / WINTER 2024
          </span>
          <h1 className="font-display-lg text-5xl md:text-display-lg leading-tight mb-8 text-primary">
            Refined Silhouettes.<br />
            Ethical Foundations.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mb-12 leading-relaxed">
            Exploring the architectural beauty of woven textiles through a lens
            of extreme craftsmanship and radical transparency. Every thread is a
            commitment to the planet.
          </p>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[500px]">
          <img
            className="w-full h-full object-cover"
            data-alt="A high-fashion portrait of a woman in a structured woven blazer, standing against a minimalist architectural background. The scene is filtered with a soft terracotta tint that enhances the warm editorial mood. Lighting is dramatic and directional, highlighting the intricate texture of the fabric and the sharp tailoring. The overall aesthetic is one of quiet luxury and sustainable elegance."
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTb54VIuTtkA3NoZmrANl4KnICxx9GAXwis42qnrVo_k0fzpP33O0sp66HWQ9sQSXfjZlU4TzHzCj-0fvfgzxdUHiCBjFyJFa3iYsL3JEP45c0CVYteg3cj9a8iqn7me4ZIAXB-nWLP0jktChq44qpuvBInOK6F954eVIrWVD8wrCeB-y0aIDwjDuV-KKQU_sEAs1Ja4U35NdFDJj7LRO5NieqqoMR0kj1ZUIA8Gyfr4F6PAKF0UCdNUWJ85k_6CTApyKj0D8_TBg"
            alt="Hero Woman Blazer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[#C4956A]/20 mix-blend-multiply"></div>
        </div>
      </section>

      {/* Category Nav */}
      <nav className="bg-background/90 backdrop-blur-lg hairline-b">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop overflow-x-auto hide-scrollbar">
          <ul className="flex gap-8 md:gap-12 py-6 whitespace-nowrap">
            <li>
              <a
                className="font-label-caps text-label-caps text-primary border-b-2 border-primary pb-2 whitespace-nowrap"
                href="#shirts"
              >
                SHIRT &amp; BLOUSE
              </a>
            </li>
            <li>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant/60 hover:text-primary transition-colors pb-2 whitespace-nowrap"
                href="#jackets"
              >
                JACKET &amp; COATS
              </a>
            </li>
            <li>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant/60 hover:text-primary transition-colors pb-2 whitespace-nowrap"
                href="#trousers"
              >
                TROUSERS &amp; LEGGINGS
              </a>
            </li>
            <li>
              <a
                className="font-label-caps text-label-caps text-on-surface-variant/60 hover:text-primary transition-colors pb-2 whitespace-nowrap"
                href="#denim"
              >
                DENIM
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Category 1: Shirt & Blouse */}
      <section
        className="py-16 md:py-section-gap max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter"
        id="shirts"
      >
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Product Card */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden mb-6 rounded-xl warm-shadow-hover bg-surface-container-low">
              <img
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtBofATDX_E4AeJnaVSmc2BM_ph0Pq-vsw0LUEyL4XUCuZDEt0fkrFQqJ_rIEec0D8b8B2NV2ttIIAIUWQtxye1UOC3C6DoO5ZB3yROEMp0qMfX7DLwLvjoB6RPgj_4QkkJlM1yHuce3A30136kFd_B5AV59Eoig2DMmApU9WzDo2-HbQedzTRpw1y8hQbA6QlRhXS7XOzUI6gPvqbW1qvWMis4tsUr7CLym7Ehak4zJElI1BxFdrYet8kdRxq7Al12nw37D7UpTE"
                alt="Architectural Poplin Shirt"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-[#C4956A]"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-background/80 backdrop-blur-md px-3 py-1 font-label-caps text-[10px] tracking-tighter text-primary">
                  COTTON POPLIN
                </span>
              </div>
            </div>
            <h3 className="font-headline-md text-2xl md:text-headline-md mb-2 text-primary">
              Architectural Poplin Shirt
            </h3>
            <p className="font-label-caps text-label-caps text-[#A07830]">
              $340.00
            </p>
          </div>
          {/* Product Card */}
          <div className="group cursor-pointer mt-8 md:mt-0">
            <div className="relative overflow-hidden mb-6 rounded-xl warm-shadow-hover bg-surface-container-low">
              <img
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLr5eVJq64Lm56UFVG0kVFktpG47-4gTNintpqjrip7hvXWL7dpFZxi2rL9kSGeJxnnR9QhNI4LJSQjPA1Vtd5SBnQdghw1QmVEhwmJEh_s8EnPedZCwfBIaDxER_PpdCTEErhBfyn4fmZcQ5H6fBdNl3ij36DPlRnBRTXhXP_ylrWCjL7lL8cXuBJL5QdVNWf8j2OnKSaxL4qMWHi7Dkx_yJMCs0jB7v5FCi2hBOUPNkxM0MsKZBo0rvdD1N42o__MMtC89hxdKA"
                alt="Essential Linen Blouse"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 w-full h-2 bg-[#C4956A]"></div>
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-background/80 backdrop-blur-md px-3 py-1 font-label-caps text-[10px] tracking-tighter text-primary">
                  LINEN BLEND
                </span>
              </div>
            </div>
            <h3 className="font-headline-md text-2xl md:text-headline-md mb-2 text-primary">
              Essential Linen Blouse
            </h3>
            <p className="font-label-caps text-label-caps text-[#A07830]">
              $290.00
            </p>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-center mt-12 lg:mt-0">
          <div className="p-8 md:p-12 bg-white warm-shadow border-l-4 border-[#C4956A]">
            <span className="terracotta-badge px-4 py-1 font-label-caps text-[10px] tracking-widest inline-block mb-6">
              CURATED SELECTION
            </span>
            <h2 className="font-headline-xl text-4xl md:text-headline-xl mb-6 text-primary">
              The Art of the Blouse
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Our shirts are engineered for longevity. Utilizing GOTS-certified
              cotton and French seams, we ensure that every silhouette maintains
              its structure through years of wear.
            </p>
          </div>
        </div>
      </section>

      {/* Category 2: Jackets & Coats */}
      <section className="bg-primary-container text-on-primary py-16 md:py-section-gap" id="jackets">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-4 flex flex-col justify-center order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="p-8 md:p-12 bg-primary/20 backdrop-blur-md border border-on-primary/10 rounded-xl">
              <h2 className="font-headline-xl text-4xl md:text-headline-xl text-on-primary mb-6 leading-tight">
                Outerwear as Sculpture
              </h2>
              <p className="text-on-primary-container/80 mb-8 font-body-lg leading-relaxed text-on-primary">
                Heavyweight wovens and structured tailoring meet sustainable
                insulation. Our coats are designed to withstand the elements
                without compromising on aesthetic precision.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 hairline-b pb-4 border-on-primary/10">
                  <span className="material-symbols-outlined text-[#A07830]">
                    verified
                  </span>
                  <span className="font-label-caps text-label-caps tracking-widest text-on-primary">
                    RESPONSIBLE WOOL STANDARD
                  </span>
                </div>
                <div className="flex items-center gap-4 hairline-b pb-4 border-on-primary/10">
                  <span className="material-symbols-outlined text-[#A07830]">
                    eco
                  </span>
                  <span className="font-label-caps text-label-caps tracking-widest text-on-primary">
                    RECYCLED POLY LINING
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-gutter order-1 lg:order-2">
            {/* White Product Card */}
            <div className="bg-white p-4 md:p-6 group cursor-pointer rounded-xl warm-shadow-hover border border-outline-variant/10">
              <div className="relative overflow-hidden mb-6 bg-surface-container-low rounded-lg">
                <img
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9vbU96QipMhgiI-9vVkz2KEQc88nIZDyV-DoWbNdz1YFJzIWVDSmoC3BJt5ztoHcwjaPZ3uj4Wvvyfpu5as434AKe0YKwD7DELjmczTGGzPMAfK_jq7cvxtxrkpHQa0VjDTGyZV7Ku_-b5h5mF1ANUMhBBTrKzTJK2X_e-aiXPRodfXANlG0-JG6sYd-5huxJH7LKd7DgiBXBq_l9U-koF0bLU1Ta2suPEbtre6vi5wBrDW5t4GyraJ_KkZw17Q0RPnO4PmdaVuY"
                  alt="Cavalry Twill Coat"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-2xl md:text-headline-md text-primary mb-1">
                    Cavalry Twill Coat
                  </h3>
                  <p className="font-label-caps text-label-caps text-[#A07830]">
                    $850.00
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary/20 group-hover:text-[#A07830] transition-colors">
                  favorite
                </span>
              </div>
            </div>
            {/* White Product Card */}
            <div className="bg-white p-4 md:p-6 group cursor-pointer rounded-xl warm-shadow-hover border border-outline-variant/10 mt-8 md:mt-0">
              <div className="relative overflow-hidden mb-6 bg-surface-container-low rounded-lg">
                <img
                  className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiGrd4GBpjzNhcbamCZZxnjRX3vs8aogMCyKOqvucHPoD-BCOS7k-AFbc_hbfQY-yEG3-Iu5vc8Hc4KImqK391FZS7Vue_Jomv_KeX8p8S5atGLL6iTsi_hZ2VLkwha1HyvlASdN80osjHLu7vCc-0j3X_CVfVlpE7l_43w2VJr0cD6a_jdvMwmDKxKByGvfOrcz0xkQnuX-kXajdqEgx8J3m2XDadI-2-b8K1pJ-nHKlBYPUSDxTpp9wJ3YtDMVq1MXGRFXgysXw"
                  alt="Tailored Hemp Blazer"
                  loading="lazy"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline-md text-2xl md:text-headline-md text-primary mb-1">
                    Tailored Hemp Blazer
                  </h3>
                  <p className="font-label-caps text-label-caps text-[#A07830]">
                    $520.00
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary/20 group-hover:text-[#A07830] transition-colors">
                  favorite
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Strip */}
      <section className="bg-[#FAF7F2] py-16 md:py-20 border-y border-outline-variant/30">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-[#A07830] mb-4">
              tsunami
            </span>
            <h4 className="font-label-caps text-label-caps tracking-widest mb-4 text-primary">
              ORGANIC &amp; RECYCLED
            </h4>
            <p className="text-on-surface-variant font-body-md px-2 md:px-6 leading-relaxed">
              100% of our woven fabrics are sourced from regenerative farms or
              certified recycled post-consumer waste.
            </p>
          </div>
          <div className="text-center border-y md:border-y-0 md:border-x border-outline-variant/30 py-8 md:py-0 px-2 md:px-4">
            <span className="material-symbols-outlined text-4xl text-[#A07830] mb-4">
              content_cut
            </span>
            <h4 className="font-label-caps text-label-caps tracking-widest mb-4 text-primary">
              ZERO WASTE CUTTING
            </h4>
            <p className="text-on-surface-variant font-body-md px-2 md:px-6 leading-relaxed">
              Proprietary digital pattern nesting allows us to reduce fabric
              waste to less than 2% across all collections.
            </p>
          </div>
          <div className="text-center">
            <span className="material-symbols-outlined text-4xl text-[#A07830] mb-4">
              verified_user
            </span>
            <h4 className="font-label-caps text-label-caps tracking-widest mb-4 text-primary">
              GOTS &amp; OEKO-TEX
            </h4>
            <p className="text-on-surface-variant font-body-md px-2 md:px-6 leading-relaxed">
              Every dyehouse and mill in our supply chain is strictly vetted
              for chemical safety and fair labor practices.
            </p>
          </div>
        </div>
      </section>

      {/* Category 3: Trousers & Leggings */}
      <section
        className="py-16 md:py-section-gap max-w-container-max mx-auto px-4 md:px-margin-desktop"
        id="trousers"
      >
        <div className="flex flex-col lg:flex-row gap-gutter mb-12 md:mb-20">
          <div className="lg:w-1/3 mb-12 lg:mb-0">
            <h2 className="font-display-lg text-4xl md:text-headline-xl mb-6 text-primary">
              Movement &amp; Structure.
            </h2>
            <p className="text-on-surface-variant mb-12 leading-relaxed">
              Redefining the lower silhouette with high-recovery wovens. From
              technical ponte to structured cotton-linen blends.
            </p>
            <ul className="space-y-6">
              <li className="flex justify-between items-center hairline-b pb-4">
                <span className="font-label-caps text-label-caps text-primary tracking-widest">
                  STRETCH WOVEN
                </span>
                <span className="text-[10px] text-[#A07830] tracking-widest uppercase font-bold">
                  4-WAY STRETCH
                </span>
              </li>
              <li className="flex justify-between items-center hairline-b pb-4">
                <span className="font-label-caps text-label-caps text-primary tracking-widest">
                  PONTE KNIT WOVEN
                </span>
                <span className="text-[10px] text-[#A07830] tracking-widest uppercase font-bold">
                  HIGH RECOVERY
                </span>
              </li>
            </ul>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-gutter">
            {/* Product 1 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-6 warm-shadow-hover bg-surface-container-low">
                <img
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhM6W06U4KV8hp9Q1NXYin9jjG1Dx38qwNX8UMHWWo6IXCHrw--aVAU-r7NPGmFFRxZDFuGBrRqthEYGQM9B18PL0TJXRwJqsSRA2zNKcXsVE_rvcPk7hquhASEWAUZF6IAg0vnqje_CWZ5SqohUak1VcBKANSnk4q3Qy6zm69ttaXA5CPkpFX0BQiX7p50QwlEmuP_Sa0epjAtv2zKvdXCTpSfefudMKfoJOLxiCGOUJQqKy1ks1hXgUI_BrCAHlfsLMTSTuuTWY"
                  alt="Wide Leg Linen Trouser"
                  loading="lazy"
                />
              </div>
              <h3 className="font-label-caps text-label-caps tracking-widest mb-1 text-primary">
                Wide Leg Linen Trouser
              </h3>
              <p className="text-on-surface-variant/60 font-body-md">$280.00</p>
            </div>
            {/* Product 2 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-6 warm-shadow-hover bg-surface-container-low">
                <img
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQZLFLpel9D6ZGylhY3hlMOWn8fLaqbl2aTWvTvtb0xEX9e0GEWRIilCNGYlK9gxySVfCyMDV9pqRMSD-7dhpJTRfx5RTtEEoeITgLLXKWt7pAhRVP0y9k7qJDvUEyeWtSrPGo5nsmfRbmmZlx1UIf7qS4AJAzslQdUtq3AsObeOGSiYo5txVDAW4RGM1pCqLM6-3W8FV7b5784TfPv9l26AVrdnTLehAtHC7wI7po-apjhIb1-yhZwRflcrU2_DaDWNOd01QuRR0"
                  alt="Ponte Sculpt Legging"
                  loading="lazy"
                />
              </div>
              <h3 className="font-label-caps text-label-caps tracking-widest mb-1 text-primary">
                Ponte Sculpt Legging
              </h3>
              <p className="text-on-surface-variant/60 font-body-md">$220.00</p>
            </div>
            {/* Product 3 */}
            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-xl mb-6 warm-shadow-hover bg-surface-container-low">
                <img
                  className="w-full aspect-[2/3] object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC70n1XNJtXmwwwm9k_BY3bo2vzKgfjXiy8sw2Mffp4w_yuoDLFcEe-X5sB0hXSogeiCfRgOk6gQ41F3pEmd7GhmqheAIAU8R-SoH8vyE4HiXgEUpd4Kb1wiDvI38O3-7W1H0TEdFEAyt--z0VH3YRJOcF5S7XrnR6YC7FS6lYh9E_yto1ktnrOg0cCLc1IqZojmqgoVlL3qV6W2xH0dEift-9kV9TpWKoWJud7OK1pEmGU_NKg6EXej4JCHQnP6cZJunrbfalihb0"
                  alt="Terracotta Twill Pant"
                  loading="lazy"
                />
              </div>
              <h3 className="font-label-caps text-label-caps tracking-widest mb-1 text-primary">
                Terracotta Twill Pant
              </h3>
              <p className="text-on-surface-variant/60 font-body-md">$310.00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category 4: Denim */}
      <section className="bg-primary py-16 md:py-section-gap text-on-primary" id="denim">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="overflow-hidden rounded-xl bg-primary-container shadow-2xl">
            <img
              className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-1000 cursor-pointer hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6kD5kTioYG6GIVNgG9xNpvZ0Q-tOl9eE682GGtej7fG9BRxm10emxV51vp2VCbzq7-mjGSso2Kn0TZHyO3Z3EBY1H_gYTpURmoflqiTI3LzKmo06b1efKUKfryPEYnnG4DxEfdG4v9x9H3TwslpmE2AqYscAT9wG2kgp_0jJJKv17eEIWXcACMqVxHK0ZjY2aOs9sDxRCUdEv4Ixnro849iroGDqvYBWF1cEgtQwFKOXOF3pyB-_Nv0nfRGO_740a5NLtyiPW_Vk"
              alt="Raw Denim Lifestyle"
              loading="lazy"
            />
          </div>
          <div>
            <span className="font-label-caps text-label-caps text-[#A07830] mb-4 block tracking-widest">
              SUSTAINABLE INDIGO
            </span>
            <h2 className="font-display-lg text-5xl md:text-headline-xl mb-8 leading-tight">
              Raw, Real, Responsible.
            </h2>
            <p className="font-body-lg text-on-primary/80 mb-12 leading-relaxed">
              Our denim is woven on vintage looms using organic cotton and dyed
              with natural, closed-loop indigo. No stone washing, no toxic
              runoff—just pure, enduring denim that ages uniquely with you.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h5 className="font-headline-md text-4xl md:text-headline-md text-[#A07830] mb-2">
                  0%
                </h5>
                <p className="font-label-caps text-[10px] tracking-widest text-on-primary/60">
                  HARMFUL BLEACHES
                </p>
              </div>
              <div>
                <h5 className="font-headline-md text-4xl md:text-headline-md text-[#A07830] mb-2">
                  95%
                </h5>
                <p className="font-label-caps text-[10px] tracking-widest text-on-primary/60">
                  WATER RECYCLED
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-primary-container py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-4 md:px-margin-desktop text-center">
          <span className="material-symbols-outlined text-6xl text-[#A07830] mb-8 opacity-80">
            format_quote
          </span>
          <p className="font-headline-xl text-3xl md:text-headline-xl text-on-primary italic mb-12 leading-relaxed tracking-wide">
            "VIVOSA represents the future of manufacturing—where the rigor of
            industrial precision meets the soul of Haute couture, all while
            honoring our planet."
          </p>
          <div className="flex flex-col items-center">
            <div className="w-16 h-[1px] bg-[#A07830] mb-6"></div>
            <h5 className="font-label-caps text-label-caps tracking-[0.3em] text-on-primary mb-1">
              ALENA VOSTRIKOVA
            </h5>
            <p className="text-[10px] text-on-primary/50 uppercase mt-2 tracking-widest">
              Creative Director, ELÉGANCE GLOBAL
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#FAF7F2] py-16 md:py-section-gap text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-margin-desktop">
          <h2 className="font-headline-xl text-4xl md:text-headline-xl mb-8 text-primary leading-tight">
            Looking for Women's Woven Garments?
          </h2>
          <p className="text-on-surface-variant mb-12 leading-relaxed">
            Join our network of discerning partners. Request our digital catalog
            to view the full range of textiles, silhouettes, and sustainability
            certifications available for this season.
          </p>
          <form
            className="flex flex-col md:flex-row gap-6 md:gap-4 items-end"
            onSubmit={(e) => {
              e.preventDefault();
              scrollToTop(e);
            }}
          >
            <div className="flex-grow editorial-underline py-2 w-full">
              <input
                className="bg-transparent border-none focus:ring-0 w-full font-body-md placeholder:text-on-surface-variant/40 text-primary"
                placeholder="Enter your business email"
                type="email"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-on-primary px-8 py-4 md:px-12 md:py-4 font-label-caps text-label-caps tracking-widest hover:bg-on-primary-fixed w-full md:w-max transition-colors"
            >
              REQUEST CATALOG
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
