import React from "react";

export default function MarineLeather() {
  return (
    <div className="bg-background text-on-background overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative h-[600px] md:h-[921px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC90c20oM6KO81lqnan24vFN_iPKdp0-23meL6qUGeOXZAWerKwoMW5QPsl_Jz17BJg2q42UrxYAMP_C0e8lZrddw7urWDi7x3yios6f-zFC3BtRv5eSdQLl6ATyQy6EAHQePPsiXTHH4KbtplIdPHI7N8qQ3cEkVoRZbJhgu7XUTgRfnz11nKCbJFALwuieNXgvhpU53-u3LPkOX727TnE_o_mP2ZS9cC4l8z9lBkvC5xUuqoM4m5u7NwNzUqEKkSqlCH-PIhsJ4Y"
            alt="Luxury superyacht in Mediterranean bay"
            loading="eager"
          />
          <div className="absolute inset-0 bg-marine-navy/50 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-4 md:px-margin-mobile">
          <h1 className="font-display-lg text-4xl md:text-display-lg text-white tracking-[0.15em] md:tracking-[0.3em] mb-8 leading-tight">
            PREMIUM LEATHER FOR THE
            <br />
            MARINE INDUSTRY
          </h1>
          <blockquote className="font-headline-md text-xl md:text-headline-md text-white italic opacity-90 max-w-3xl mx-auto">
            "Happiness is the one thing you cannot buy. It does not come in a shopping bag, wear a label, or carry a price tag. It shines from within your soul and reflects into the world around you."
            <cite className="block not-italic font-label-caps text-label-caps mt-4 text-matte-gold">
              — ALBER ELBAZ
            </cite>
          </blockquote>
        </div>
        {/* Anchor Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span
            className="material-symbols-outlined text-matte-gold text-4xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            anchor
          </span>
          <div className="w-[1px] h-12 bg-matte-gold/40"></div>
        </div>
      </header>

      {/* Intro 1 */}
      <section className="py-16 md:py-section-gap bg-[#F5F0E8] px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto border-l-2 border-matte-gold pl-8 md:pl-12 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8">
              <span className="font-label-caps text-label-caps text-matte-gold uppercase block mb-4 tracking-widest">
                The Nautical Standard
              </span>
              <h2 className="font-display-lg text-4xl md:text-headline-xl text-primary mb-6 leading-tight">
                Nautical Sophistication & Timeless Elegance
              </h2>
              <p className="font-body-lg text-body-lg text-secondary max-w-2xl leading-relaxed">
                A sleek yacht gliding across blue waves at sunset captures the essence of luxury — a journey filled with pleasure, comfort, and refreshment. In fact, both maritime voyaging and yachting have long been symbols of sophistication and timeless elegance. However, true refinement also depends on every detail — the surroundings, the colour, design, shape, and materials used in your furniture, and the effect they have on the atmosphere they create.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="overflow-hidden bg-white">
        <div className="grid grid-cols-2 md:grid-cols-4 w-full h-[300px] md:h-[614px]">
          {[
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpp3vE2gCRK7kE5evgi8wzHbdovz_NFZshMLHgZNQ2Vdy8tW-7pOAAhlO-H-s2l5VSq2F3P0N5RHG62Xl1g54BFovvjIr_KKpuM5VQY6cA7_MEizeW2EnTfNlIv2eUCHSefN9-0dLfv3lFVq1g0TKN04U9sEjPe8vLB3UPenQdH9bhR7lqt9BWH_0bHPNKPzJFywsso3TEHgJ2IoUWIJGj61wVLb8VXYbcyBim56v9tsiM2OtyazQE6kWVNsuMGXtbGp6Kg4yXNQM",
              label: "SALON INTERIORS",
            },
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDesNwp9RZL0m97GTSGdu3wPlRKktjcFuEezq5npX9gtvQ_NKjfgU-BgabyOIsI2UBaouNYdncku9vi29SUPH_CCF1PIkVDgHxGKVBV76zpdnYiSPxGSAu-i7c3-nSMnXSm8ExCSoYlQyUp1O-rAGUz05oa-oAYsVS9DguWqdKEKEhUV1kDC7OopJPfUWLt_EH8L3jjMQqSPUPcI8EYy2qSHhv1GdpDJnGEzxu8GmL-bFViwwWah91TqeRgtt62XxB-HwH5REe5T88",
              label: "HELM STATIONS",
            },
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPiVNPy_lWeYm_UoAn3Vzgtnfcon53Yi71vGy9mD7Kav3gNJAQpqAOMkyPkyTr5E4arH-TFpr5cMtwdusq-tNMIoKwBovC8U4IjJOQdFsRbNSANjHCGGxXz59qihN97wFDafsijsEs4VWsJ_Ff1zl1IwKZ6TB_3V1kSUlZyVmEyZax2Lqyjxbnaxay9gVfi-CZM50YP7NiTKq6V4wXF6LYPb4JLbxly_4i3oUURflKXb3T_4myGGOqzO6Udmp-E-JGZ4Dc7bIdYQk",
              label: "DINING ENCLAVES",
            },
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXUct6Y8kQvYMJTfQBl3J_mZzLsaIUZHDKsDuIE-5FBq_mQiDYwj3-j9mUJ_53nsBclD398ielDL1V-EocKXjdbrE7tcHw8O5oUyRQGCEKS9mCJhGXzsQuryd6shktVZqoPrURpTIu4GzFrnvmxZgUfSW29Id-Ar8FCzVOS4Gxd9GJu7vVwoFTknNz4Y-za0gd4PnL4HXhU4ikJB5FqLkYTOPEN3cXOZBjXJy6V8Yq-ikzugSuLlKZwG00zQwHGsV1iX_PKJeaV2Y",
              label: "PRIVATE CABINS",
            },
          ].map((item) => (
            <div key={item.label} className="relative group h-full overflow-hidden">
              <img
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                src={item.src}
                alt={item.label}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 md:p-8">
                <p className="text-white font-label-caps tracking-widest text-[10px] md:text-label-caps">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Intro 2 */}
      <section className="py-16 md:py-section-gap bg-sea-foam px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <h3 className="font-headline-xl text-3xl md:text-headline-xl text-marine-navy mb-8 leading-tight">
            Half a century of precision.
          </h3>
          <p className="font-body-lg text-body-lg text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            Our legacy is built on the foundations of sustainable manufacturing.
            For over 50 years, Vivosa has partnered with global shipbuilders to
            provide hides that respect the environment as much as they do the
            artistry of design.
          </p>
        </div>
      </section>

      {/* Mosaic Swatches */}
      <section className="py-16 md:py-section-gap bg-background px-4 md:px-margin-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <h4 className="font-label-caps text-label-caps text-primary mb-12 text-center uppercase tracking-widest">
            The Palette of the Deep
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[140px] md:auto-rows-[200px]">
            <div className="md:col-span-3 bg-[#3D3F28] flex items-center justify-center text-white/50 font-label-caps tracking-widest">
              OLIVE
            </div>
            <div className="md:col-span-5 md:row-span-2 bg-[#4B3621] relative group overflow-hidden col-span-2">
              <img
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFDhmPOY6JSXTaAOoWCIWjXwhqW5smyRCiVdbtKFxT3ERTs1mi_W0efbkpQo30SCm43tw8s1AOnlpSDBCqEXwAwl0jJD9MyDKQf7f8Cz5Q8XL7HKECfs_BvB5iFq06Iv7iSQnhEMUwKr_3B0B9kEyft7MqhqpjVkXFRCbHN9pjS1Ccokzris_-XUnraTsBWcluyky_1xm9vAT5lIWqPU5qqF00pNyKA3uvT7J1X6nWbgK7yop68XTk9qQKRJ3Vr5e5svxGJofAOhw"
                alt="Classic Brown Leather Texture"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 text-white font-label-caps tracking-widest text-[10px] md:text-label-caps">
                CLASSIC BROWN
              </div>
            </div>
            <div className="md:col-span-4 bg-[#D2B48C] flex items-center justify-center font-label-caps tracking-widest text-primary">
              TAN
            </div>
            <div className="md:col-span-2 bg-[#4D0000] flex items-center justify-center text-white/50 font-label-caps tracking-widest">
              BURGUNDY
            </div>
            <div className="md:col-span-2 bg-[#8B0000] flex items-center justify-center text-white/50 font-label-caps tracking-widest">
              RED
            </div>
            <div className="md:col-span-3 bg-marine-navy flex items-center justify-center text-white/80 font-label-caps tracking-widest">
              OCEAN NAVY
            </div>
            <div className="md:col-span-4 bg-[#2F2F2F] flex items-center justify-center text-white/50 font-label-caps tracking-widest col-span-2">
              CHARCOAL
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-16 md:py-section-gap bg-[#F5F0E8] px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-section-gap items-center">
          <div>
            <span className="font-label-caps text-label-caps text-matte-gold mb-6 block tracking-widest">
              APPLICATION
            </span>
            <h2 className="font-display-lg text-4xl md:text-headline-xl text-primary mb-8 leading-tight">
              Every corner, crafted.
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-12 leading-relaxed">
              Our leather transcends mere seating. From acoustic wall panels that
              dampen the engine's hum to bespoke accessories that define a
              cabin's character, we provide the ultimate canvas for marine
              architects.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-gutter">
            {[
              { icon: "airline_seat_recline_extra", label: "Seating" },
              { icon: "vertical_shades", label: "Wall Panels" },
              { icon: "bed", label: "Beds" },
              { icon: "luggage", label: "Accessories" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-4 border border-outline-variant/30 flex flex-col justify-between h-28 hover:border-matte-gold transition-colors duration-500 cursor-pointer group"
              >
                <span className="material-symbols-outlined text-matte-gold text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </span>
                <h5 className="font-headline-md text-sm text-marine-navy">
                  {item.label}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leather Types */}
      <section className="py-16 md:py-section-gap bg-marine-navy px-4 md:px-margin-desktop">
        <div className="max-w-container-max mx-auto text-center">
          <h2 className="font-display-lg text-4xl md:text-headline-xl text-white mb-12 md:mb-16 leading-tight">
            The Anatomy of Surface
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              "ANILINE",
              "SEMI-ANILINE",
              "NUBUCK",
              "NAPPA",
              "PIGMENTED",
              "CORRECTED",
              "BUFFED",
              "EMBOSSED",
            ].map((type) => (
              <span
                key={type}
                className="px-6 py-3 md:px-8 md:py-3 border border-matte-gold rounded-full text-white font-label-caps tracking-widest hover:bg-matte-gold transition-all duration-300 cursor-default text-[10px] md:text-label-caps"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-16 md:py-section-gap px-4 md:px-margin-desktop bg-background">
        <div className="max-w-3xl mx-auto bg-[#F5F0E8] rounded-3xl p-8 md:p-16 border border-outline-variant/50">
          <h3 className="font-display-lg text-3xl md:text-headline-md text-primary mb-12 text-center leading-tight">
            Stringent Quality Control
          </h3>
          <ul className="space-y-6">
            {[
              {
                title: "UV STABILITY TESTING",
                desc: "Hides are subjected to 500+ hours of artificial sunlight to ensure zero fading in marine environments.",
              },
              {
                title: "SALINE RESISTANCE",
                desc: "Every batch is tested against salt-spray corrosion to guarantee lifelong durability.",
              },
              {
                title: "TEAR STRENGTH ANALYSIS",
                desc: "Ensuring structural integrity for high-tension upholstery on helm and lounge areas.",
              },
              {
                title: "FLAME RETARDANCY",
                desc: "Exceeding IMO (International Maritime Organization) standards for ultimate passenger safety.",
              },
            ].map((item, i) => (
              <li
                key={item.title}
                className={`flex items-start gap-4 md:gap-6 pb-6 ${i < 3 ? "border-b border-outline-variant/30" : ""}`}
              >
                <span className="material-symbols-outlined text-matte-gold flex-shrink-0 mt-1">
                  check_circle
                </span>
                <div>
                  <h6 className="font-label-caps text-label-caps text-primary mb-1 tracking-widest">
                    {item.title}
                  </h6>
                  <p className="font-body-md text-body-md text-secondary leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
