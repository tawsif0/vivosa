import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Vivosa Manufacturing & Sourcing Hub";
  }, []);

  return (
    <main className="bg-background text-on-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            alt="Leather craftsmanship at Vivosa Sourcing Hub"
            className="w-full h-full object-cover brightness-50"
            src="/slides/about_hero.avif"
          />
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <span 
              className="inline-block text-white/50 font-label-caps text-label-caps tracking-[0.2em] mb-6 uppercase"
              style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
            >
              GLOBAL MANUFACTURING HUB
            </span>
            <h1
              className="text-[40px] leading-[48px] sm:text-[48px] sm:leading-[56px] font-bold text-white mb-8"
              style={{ fontFamily: "'Sora', system-ui, sans-serif" }}
            >
              Authentically Dynamic: Vivosa Manufacturing &amp; Sourcing Hub
            </h1>
            <p
              className="text-[18px] leading-[28px] text-white/90 mb-10 max-w-x


















































































































































































































































































































































































































































































































































































































































































































            <span
              className="material-symbols-outlined text-4xl mb-6 text-deep-forest"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              track_changes
            </span>
            <h2
              className="text-[32px] leading-[40px] font-semibold text-deep-forest mb-6"
              style={{ fontFamily: "'Sora', system-ui, sans-serif" }}
            >
              Our Mission
            </h2>
            <p
              className="text-[18px] leading-[28px] text-on-surface-variant"
              style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
            >
              To provide an unparalleled ecosystem of excellence and
              collaboration, enabling brands to scale sustainably while
              maintaining the highest technical quality.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-24 bg-surface-container-lowest">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span
                className="text-deep-forest font-semibold uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
              >
                The Vivosa Advantage
              </span>
              <h2
                className="text-[32px] leading-[40px] font-semibold text-deep-forest mt-4"
                style={{ fontFamily: "'Sora', system-ui, sans-serif" }}
              >
                Why Industry Leaders Choose Us
              </h2>
            </div>
            <p
              className="text-on-surface-variant font-semibold max-w-sm"
              style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
            >
              Built on values tha























































































































                  eco
                </span>
                <div>
                  <h5
                    className="text-white text-lg font-semibold mb-1"
                    style={{ fontFamily: "'Sora', system-ui, sans-serif" }}
                  >
                    Low-Impact Materials
                  </h5>
                  <p
                    className="text-white/70 text-sm"
                    style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
                  >
                    Prioritizing recycled fibers and vegetable-tanned leathers.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <span className="material-symbols-outlined text-[#FFFF00] text-3xl">
                  groups
                </span>
                <div>
                  <h5
                    className="text-white text-lg font-semibold mb-1"
                    style={{ fontFamily: "'Sora', system-ui, sans-serif" }}
                  >
                    Fair Trade Practices
                  </h5>
                  <p
                    className="text-white/70 text-sm"
                    style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}
                  >
                    Ensuring living wages and safe conditions in all partner
                    facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

