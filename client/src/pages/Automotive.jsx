import React from "react";

export default function Automotive() {
  return (
    <div className="bg-background text-on-background font-body-md selection:bg-on-primary-container selection:text-primary">
      <main>
        {/* Section 1: HERO */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            alt="Luxury Car Interior"
            className="absolute inset-0 w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ft10bsuVuB_r9KQcWlHzsF-d5hVe5V0aVc2StqY0B7wMBGJLRdPbR1VSlWh0tqKh2-dphNfGEoUi7ZjXYzzBA4vnLkngMFmh56z4RDaaldgvI7lgptdU0sj3FblkN4A5f_lszS8fA__yw8UZ-0sXnvL3CAeVIWTCozBF2T_i01-zaMR0veegune4Uo7MhEx0Y1mxLxAKHsO9-shQzzT6rE7OlA-VR1_gs00gx3F_TjsNAQAE08u75gmeO7va7SitVgknXo86Y5Y"
          />
          <div className="relative z-20 text-center px-margin-mobile max-w-4xl mx-auto">
            <span className="font-label-caps text-label-caps text-matte-gold tracking-[0.3em] mb-6 block uppercase">
              AUTOMOTIVE LEATHER COLLECTION
            </span>
            <h1 className="font-display-lg text-display-lg text-on-primary leading-none mb-8 md:text-[100px]">
              Automotive Leather Collection
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary/80 max-w-2xl mx-auto leading-relaxed">
              We are car-interior drivers. Not perfection. Crafted with care.
              Formed with a work of love, and prepared to last long.
            </p>
          </div>
        </section>

        {/* Section 2: INTRO 1 */}
        <section className="bg-primary-container py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-gutter items-center">
            <div className="pr-12 text-on-primary">
              <span className="font-label-caps text-label-caps text-on-primary-container tracking-widest block mb-4 uppercase">
                HERITAGE OF PRECISION
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-primary mb-8">
                Engineering Luxury Behind the Wheel
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/70 mb-6 leading-relaxed">
                With over 50 years of specialized expertise in the tanning
                industry, VIVOSA provides premium automotive leather that meets the
                most rigorous performance standards of global luxury car
                manufacturers.
              </p>
              <p className="font-body-md text-body-md text-on-primary/60 mb-10 leading-relaxed">
                Our LWG certified facilities ensure that every hide is processed
                with environmental responsibility, maintaining the natural tactile
                quality while achieving the durability required for the automotive
                environment.
              </p>
              <div className="inline-block border-b border-on-primary-container/30 pb-1">
                <a
                  className="font-label-caps text-label-caps text-on-primary hover:text-on-primary-container transition-colors duration-300"
                  href="#"
                >
                  DISCOVER OUR PROCESS
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 relative">
              <div className="border-[0.5px] border-matte-gold p-2">
                <img
                  alt="Steering Wheel Detail"
                  className="w-full aspect-[4/3] object-cover grayscale-[0.2]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwS7_BOS7BbWVkiMRuaHyhPKU-fFdc83PyzXBXD1U2TVvzGeQp9DQ_m5cWf11qAkyi_N7viXAekR-cs6dutzseDu5f8G1Zes-X6yIqearkjMctjLNK26Kry2nIHG8afKme6tNTG4nX7eiOtogfV38Db9Vq1qF3psRA7mASnwI1nSocHjCb67G8-SgruPpft2EvV3XSuNm49tZ0Gn3R5UeDWVNIB2QGhZpQowi6nAsGDZsGi79Jmlbft_B7Fir1Df3VbQzHKjTKqV4"
                />
              </div>
              <div className="border-[0.5px] border-matte-gold p-2 ml-12 -mt-20 z-10 shadow-2xl bg-primary-container">
                <img
                  alt="Leather Seat Upholstery"
                  className="w-full aspect-square object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJFfM3UD334ZoTvhDlJIxOiK47EV8SH72wS5KoKrboqKm5po0AvDcTjtYuP5jxmCW-abv8vpOwNCWHYyM_jPucMh3BM5n4HtrhR_dCafD5WiIrqgAJZbbO_orwyvWk63F3gV_No_AlMvUVPMN6CQqw_jp644aiXGqACpFXkHWnmJEztD_5jbn5ruJVSHqUvwpnr7IvxZMSunidHqlnftulWHNUo-mvapq-rEeRl6TcutBdrW56dF2Zq05i4LlE1h-y9rl1tmyHAdY"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: INTRO 2 */}
        <section className="bg-surface py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-gutter items-center">
            <div className="relative">
              <img
                alt="Design Station"
                className="w-full h-[600px] object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0qkIcotm7o6h01sNEqU7PBFPT1sqNj4IlcmMXQG_HXAfnq7ryxnjBJbrPjBoRFJ_PjdPtHl6KkBRCI5u3kt9dl0HfIW3Ds0yGrO2pK0itUSptnFWlS2sr40phL8fEJ23Mtepg6MVsmjZXQChdLHwNOVxgAMpYSgYkSNpoUN5m5mI-uoVcHXehHiK4joaaG95Oi8frv_Ikw66YgBheR32Dr0xzBpDL7JcJjrrDCWIT4REAtDDyRHfxRDrc60eWOcWy4g2AKUVO5G0"
              />
            </div>
            <div className="md:pl-24">
              <h2 className="font-headline-xl text-headline-xl text-on-background mb-8">
                Our Sustainable Manufacturing Promise
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-6 leading-relaxed">
                We maintain absolute precision control over the entire supply
                chain. From the initial selection of raw hides to the final custom
                finishing, our process is optimized for minimal waste and maximum
                performance.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 leading-relaxed">
                Our laboratory offers comprehensive custom color matching and physical
                testing to ensure that our leather not only meets but exceeds
                industry standards for UV resistance, heat stability, and flex
                endurance.
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
                Additionally, some of our manufacturers offer dedicated cutting
                and stitching facilities, enabling us to deliver semi-finished or
                finished components directly to the assembly line.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: BELIEF */}
        <section className="bg-secondary-container py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-gutter">
            <div className="flex items-center">
              <blockquote className="font-headline-xl text-headline-xl italic text-on-background leading-tight pr-12">
                "Every piece of leather has a story, a texture that demands
                respect. In the automotive world, that story is one of endurance,
                precision, and the silent luxury of touch."
              </blockquote>
            </div>
            <div className="bg-primary text-on-primary p-12 flex flex-col justify-center">
              <h3 className="font-label-caps text-label-caps text-matte-gold mb-6 tracking-widest uppercase">
                OUR PHILOSOPHY
              </h3>
              <p className="font-body-lg text-body-lg text-white mb-8 leading-relaxed">
                We believe that the interior of a vehicle is a sanctuary. Our
                leather is engineered to provide tactile comfort and aesthetic
                continuity, ensuring that every drive is an elevated sensory
                experience.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-matte-gold"></span>
                  <span className="font-label-caps text-label-caps tracking-widest text-white uppercase">
                    TANNED FOR LONGEVITY
                  </span>
                </li>
                <li class="flex items-center gap-4">
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
            <h3 className="font-headline-md text-headline-md text-on-background mb-16 text-center leading-tight">
              We are best known in:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="grid grid-cols-1 gap-4">
                <div className="py-6 border-b border-outline-variant/30 hover:border-b-2 hover:border-matte-gold transition-all duration-500 cursor-pointer">
                  <span className="font-headline-md text-headline-md text-primary">
                    Seating Systems
                  </span>
                </div>
                <div className="py-6 border-b border-outline-variant/30 hover:border-b-2 hover:border-matte-gold transition-all duration-500 cursor-pointer">
                  <span className="font-headline-md text-headline-md text-primary">
                    Steering Wheels
                  </span>
                </div>
                <div className="py-6 border-b border-outline-variant/30 hover:border-b-2 hover:border-matte-gold transition-all duration-500 cursor-pointer">
                  <span className="font-headline-md text-headline-md text-primary">
                    Dashboards &amp; Portfolios
                  </span>
                </div>
                <div className="py-6 border-b border-outline-variant/30 hover:border-b-2 hover:border-matte-gold transition-all duration-500 cursor-pointer">
                  <span className="font-headline-md text-headline-md text-primary">
                    Door Panels
                  </span>
                </div>
              </div>
              <div className="relative">
                <img
                  alt="Steering Wheel Leather Detail"
                  className="w-full h-[500px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8YBwDRVzR1qiFzvymPOlB4JOv86WpblAFQD889zlhqlo85J22Jjg2m-lvF-zzeZ2rtAoga5twlaXQKDZdNNGwufXLHeHVllOPOQCjyA4souU4VR6d571jPW45Zt0VY2QmzbFyNPXOlhxdPm6hjGQ2jRdNKVwWr5kWXe6zkU9A-xzcbIjzhEznm3PN-Mcx5EQuNup8CltuObXQxSjc07b0k--NM_k_tsnhfB-qUqCHQ1TtuC-5xOFCyclFM5SRNEXNWY7H8YU9A_g"
                />
                <div className="absolute -bottom-8 -left-8 bg-on-background text-surface p-10 max-w-xs shadow-2xl">
                  <p className="font-body-md text-body-md italic leading-snug">
                    "Our specialized coatings provide superior resistance to
                    abrasion and UV exposure, critical for dashboard applications."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: SAMPLE GRID */}
        <section className="bg-secondary-container py-section-gap px-margin-desktop">
          <div className="max-w-container-max mx-auto">
            <div className="flex justify-between items-end mb-16">
              <div>
                <span className="font-label-caps text-label-caps text-outline block mb-4 tracking-widest uppercase">
                  SPECIFICATIONS
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-background leading-tight">
                  Premium Automotive Hides
                </h2>
              </div>
              <div className="hidden md:block">
                <button className="font-label-caps text-label-caps px-10 py-4 bg-primary text-on-primary hover:bg-on-background transition-colors duration-300 tracking-widest">
                  REQUEST SAMPLE BOOK
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
              {[
                {
                  code: "F08CNA",
                  name: "Tan",
                  type: "Nappa / Full-Grain",
                  thickness: "1.0 – 1.2 mm",
                  rawhide: "GB",
                  desc: "This Nappa automotive leather is color-dyed through and embossed bovine leather. It features a completely water-based finishing process, offering a contemporary style with a smooth and silky feel.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMXTWlABE1FDHDLfNMMQpVQEqFst8PWm80zw3S5Lt7ifGxz4odH-DAfsRKE9z9pQs9VFBU4bvaOVsBuC3zKPBt1Ls_OJRAiFQIEuHvLyLEqRO3rfJVl_wKAI9ZWVjSh4ulD05dpU_edkjiWRLCVk3IcI6SV6U2I-VXPFpdevji2vxtNt80rGehxqYDw1qjmXXfJ3kGkMP-2X3Px14FTvrGNNS4fRnX8ccRYdwl1vD0fb2pUduCK32_C-7feFvV0D3PHfRLbt1WquE",
                },
                {
                  code: "F012LECA",
                  name: "Light Grey",
                  type: "Semi-Aniline / Corrected Grain",
                  thickness: "1.2 – 1.4 mm",
                  rawhide: "Irish / GB",
                  desc: "Features a thick, uniform finish treated with a resilient protective coating. Exceptional resistance to soiling, fading, abrasion, and cleaning solutions, while feeling natural and soft.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIN9GRef3wK6-MgVfPF45nKjGLDNydqpMOtwZbb9pvkSqQRX9XxAUuOwxcVHRgOKnLxPcK4wi-YW59exYvRGYwiLo4KofAJLWGdwOIY_7EOrhl-DXeKTxrNxhoERvPkXTaEqcI34JIwt6ziCP633m81dvZ14MWXzGveiouLpXgnTjBw4sOp4iLMRYG8aBwLhvaxatnThVXN8R1g7uEGQbztcNoNgCzWWsFB2ZCClhdC7lbnFNVH2Hriz17nrCMypm_xJ1I9oahwFA",
                },
                {
                  code: "F029EELB",
                  name: "Green",
                  type: "Aniline / Full Grain",
                  thickness: "1.2 – 1.4 mm",
                  rawhide: "EU Sourcing",
                  desc: "The softest, smoothest, and most premium aniline leather, while also being very strong, with a subtle batik appearance. Features the beautiful, organic markings of natural hides.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBR1CxzW2mxYrYtpL7XjsPS4dKBNFizuh3L3AhnHaondDfie40K6PYkg9IZLPTRP_ztSiPJ2Nb6XKZ7YpfsRbHJzV48uakCWLHyqp26doL9RPkYGdluTdoVMSYC2aBktiB2rCP-EW3phFy_ZXOZsOBG6R5Xeb67vCDJQftxyN39JjxbCqO8PLOHigtHs9XPV28TMqChPO4uCoHV0sHGJb82VUStAKvbQ1et3pbAgyW747UcLAwiDg_4_HT7fuNOI3eJWrf33CMhgm4",
                },
                {
                  code: "F018ELET",
                  name: "Grey",
                  type: "Semi-Aniline / Full Grain",
                  thickness: "1.3 – 1.5 mm",
                  rawhide: "EU Sourcing",
                  desc: "Developed to meet strict automotive safety standards. Features a structured yet soft feel, combining extreme durability with the natural elegance of premium leather.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3YDDwzXod-aPXAe0qVV2wlw72bN67d-LrrRkSLQQjIIc5WioT1ZT6tFmK6gy-08OCzGeXOik1ejgKWgNspmHWj_N7M0pNJtYLS-JKyCcppDcnL4WyQDWqex_oZJBDZDnMPCcZwihevHr29igRy65b9C7Kdz2lkIpJhsoHyMoi6_6Tlk6Atm1Owx9Rf9urYJG8a28uCilZFvSnvcOqPeeVx2Y5L_cMgc9yM9cg2uh24NAWWe4_wHoA75LEYVLJR8zSeJVc6i0VNa4",
                },
                {
                  code: "F08WLNA",
                  name: "Light Mauve",
                  type: "Nappa / Full Grain",
                  thickness: "1.0 – 1.2 mm",
                  rawhide: "EU Sourcing",
                  desc: "Distinctively smooth texture and a tender touch, making it the epitome of elegance. Aniline-dyed and carefully finished, perfect for upholstering luxury cars.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCfwT3GpeVX7RyANPYg7YczIT7S8Tehs7SEmz-UardO_-3lzgtY1txsCzMLDOantS1lpRHh4tQwrm38OHZrLlgodPjyvHXegoEBBcc3odegp6p5bc6scH_7xaXvWAr4uCKDELcuKCBRAnkhY5Ju9JiCs2WYDbTAgBhV_lRtCbPCzDCJ7L4Q2QFL0CT6C_ySy5Xg6AC5WEmKWZVAz4tmiWK1CiRAXPM7GuoDGGPjsZJY6TYnvxg85_DwHnAmoQZAP0kLgZE4EohpUSQ",
                },
                {
                  code: "F014WLD",
                  name: "Leather",
                  type: "Semi-Aniline / Pigmented",
                  thickness: "1.1 – 1.2 mm",
                  rawhide: "GB + EU Sourcing",
                  desc: "Dakota's firm hand and tactile feel deliver high efficiency and dependability. Treated with premium water-based dyes and resins, blending style and everyday functionality.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBCRk0VN3gGRk8WHZTVCinAHrE_hCXytuO81ZMYlIgZtpFGQJXhP-BGJv5QwwpjgcEzKX7Chi4rgOlFfLUJNFHPVcGv-hanDbIN7yp-VyALmcWD9qpcbtr0YTinAzZUYFZmyMGKJtY4oVw4AHRprxNzNFY_o_EmBOxAUjmDYPCOCHTzngwU1tuz4G07GGNZLwKOp52xXU9vrA0e-IOqSMNWM3UYwPZDl_vvrqxQhcJhO1zfa2MiZ7CPdUDzofUq_wN1wf0Ije3iP8",
                },
                {
                  code: "F018ELM",
                  name: "Blue",
                  type: "Aniline / Full Grain",
                  thickness: "1.2 – 1.4 mm",
                  rawhide: "GB Sourcing",
                  desc: "Dyed with soluble aniline dyes for a soft, breathable, and luxurious finish. Ideal for premium automotive interior projects that demand absolute beauty and top performance.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1_5H_g0d6y911Qe6mAi4-Y66ySxe2KtQOa1FgfAtgOja-U-GMDDqsvoyMTEDiI3mhZqBV95cemhCqUiD2ZRhpJtN6fT-tgqCiNlIU3LN7dRYF0MEXurXRLrAp8p3ZNwmIO4vJHY7gi6vA0Pc0-gmw5V31WKuI4dnLOFwEIlFUhEwnEvYY1DEol40EYKZw9NpEZoiVCh0bN7je1Wlz3SpSSl02EU2pRdLgO8jNSJcgFpEx7XUYVMN7ogpxyaGqn64yc66SzKGMK8g",
                },
                {
                  code: "028MAT",
                  name: "Ice White",
                  type: "Semi-Aniline / Full Grain",
                  thickness: "1.3 – 1.5 mm",
                  rawhide: "GB Sourcing",
                  desc: "A heavy, structured body with a soft touch. A light protective layer preserves the natural look and feel while offering high durability and stain resistance for a clean interior.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_xAAvafea7t6RUbOCokwfkWzobVjcWxnY3aDWiTZHDpuFSuzNWQdmtU9NVIUnwIcXIjnxWiWz2Gbu9FTPHhzU7VK2ru44P9BTZ0q1s4NEttUTi9Ifg0mLdjFCa6YdtVy9wxEqbpFtKf3I9Xc97-7o8gBRmP3iJxu-ymI4FuqNbzX-x3fEnRQg_NHWaD-TJt4PMO7PChbVVp7PFO6cQxBvJQDojOuQBzE2C7irvMQuWFHgPBFZCxm-MgEswCFVUv44HPq26ZXhfAc",
                },
                {
                  code: "010ELM",
                  name: "Light Pink",
                  type: "Semi-Aniline / Full Grain",
                  thickness: "1.2 – 1.4 mm",
                  rawhide: "European Sourcing",
                  desc: "Features highly luxurious soft hand with self-cleaning, antiviral, and antibacterial properties. Chrome-free and metal-free, combining premium quality with sustainability.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIdX9HvIOsXzW9SJJK11fZGhkSVuiHSfJmuO8pWuv6moYwnHhF7mc5FFmNiMDt_FGLdCNEnniu3rYt5Y-4YJD07ybAoVoUzYKhfRKve68s_LP3YMtfCHEuDrHOkSq4IM4LzSaoLTdTVHhNQQs7bE1VjMxZo9vZy1aM4NZ9C2uU73QwD8bbv1Q72m3ovDM2biGTFa8dQiG8ElhFfgkTyY8gDSWIqhqz1K4U4nfWXxvu7HaYO3xVDKHP0PD60rvqZzB1VL1brwmk1iY",
                },
                {
                  code: "F016DNMT",
                  name: "Black",
                  type: "Nubuck / Full Grain",
                  thickness: "1.4 – 1.6 mm",
                  rawhide: "EU Sourcing",
                  desc: "Distinguished by its natural grain, offering personality and a rich, supple appearance. Features anti-stain, fire-resistant, and water-resistant properties.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMj-RpRx81-0OTg051514GlZ1o0T5psG6DCtFfh920kxZR4V-hw3GEXth_WXnPPK8awVFd9UX4PZRLB5BW4RxSxRnvW948dah0KaSZIjCoBQhpn5ac-k0oj1LqXnkdEkNVQ3oQrMczudDPW_chbPx8mctF4fIX16JJgJSOQ3LdZKg4hOQGyhL3TLzP4YNt8VVh6rodOs9gcvVK0D02rlaoYd2IgBcdfk2akXlJgJqONF9NoD1GxU5btUmk1xDJSI-Qapem9EvKapc",
                },
                {
                  code: "F012ELMANL",
                  name: "Brown",
                  type: "Aniline / Full Grain",
                  thickness: "1.3 – 1.5 mm",
                  rawhide: "EU Sourcing",
                  desc: "Pure Aniline representing the softest, smoothest, and most exclusive leather. Natural creases, fat lines, and small healed scars reflect its organic nature.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrzOcrrHnWcP4-ZDIhzHPaerzAnmbY0QTeD78AeYWdPnAt1b5Vdl-42EmThFBF6DqUAE_AGCCcRbjvWDqu5MMOqhe07lhCCHyP5B8MBocHiZEWhd4yttz1XL6Wf5kBnGvxPT23Z5m1cO6LOKNAezF78aukEdrXDiwbEVfcn0jaB0L1PNCWwWMSxI8VXjlD--25wyvTRIdr9zyaO-iqEbmVDc9me1CNhTP-YAhB4My0gAIfElrFJK3ChLv-y9owkiJ1JR20OrWjVZk",
                },
                {
                  code: "F09DODA",
                  name: "Grey",
                  type: "Semi-Aniline / Full Grain",
                  thickness: "1.4 – 1.6 mm",
                  rawhide: "EU + BR Sourcing",
                  desc: "Crafted using a special technique that adds gloss and transparency to the natural grain. With a medium thickness, it feels smooth, full, and warm to the touch.",
                  src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_Ft10bsuVuB_r9KQcWlHzsF-d5hVe5V0aVc2StqY0B7wMBGJLRdPbR1VSlWh0tqKh2-dphNfGEoUi7ZjXYzzBA4vnLkngMFmh56z4RDaaldgvI7lgptdU0sj3FblkN4A5f_lszS8fA__yw8UZ-0sXnvL3CAeVIWTCozBF2T_i01-zaMR0veegune4Uo7MhEx0Y1mxLxAKHsO9-shQzzT6rE7OlA-VR1_gs00gx3F_TjsNAQAE08u75gmeO7va7SitVgknXo86Y5Y",
                },
              ].map((sample) => (
                <div
                  key={sample.code}
                  className="bg-[#FAFAF7] p-4 flex flex-col group cursor-pointer border border-transparent hover:border-outline-variant transition-all duration-300 shadow-sm"
                >
                  <div className="aspect-square mb-6 overflow-hidden">
                    <img
                      alt={`${sample.code} ${sample.name}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={sample.src}
                    />
                  </div>
                  <span className="font-label-caps text-[10px] text-matte-gold mb-2 tracking-widest uppercase">
                    {sample.thickness} THICKNESS
                  </span>
                  <h4 className="font-body-lg font-bold mb-2 text-primary">
                    {sample.code} {sample.name}
                  </h4>
                  <p className="font-body-md text-on-surface-variant line-clamp-3 leading-relaxed text-sm">
                    {sample.desc}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center md:hidden">
              <button className="font-label-caps text-label-caps w-full py-4 bg-primary text-on-primary tracking-widest uppercase">
                REQUEST SAMPLE BOOK
              </button>
            </div>
          </div>
        </section>

        {/* Section 8: CLOSING */}
        <section className="bg-primary py-section-gap px-margin-desktop">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display-lg text-display-lg text-on-primary mb-8 leading-tight">
              Tailored to your Vision
            </h2>
            <p className="font-body-lg text-body-lg text-on-primary-container mb-12 leading-relaxed">
              Our technical team is ready to assist with custom developments,
              volume inquiries, and specific technical requirements. Let us help
              you define the future of automotive luxury.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a
                href="/contact"
                className="inline-block bg-on-primary text-primary font-label-caps text-label-caps px-12 py-5 hover:bg-on-primary-container transition-colors duration-300 tracking-widest uppercase text-center"
              >
                CONTACT AN EXPERT
              </a>
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
