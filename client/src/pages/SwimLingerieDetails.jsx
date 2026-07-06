import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPublicWomenApparelById } from "../api/womenApparel";
import { toRichTextHtml, stripRichText } from "../utils/richText";

function ColorSwatches({ variants }) {
  const colorVariants = variants.filter((v) => v.type === "color");
  if (colorVariants.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {colorVariants.map((v, i) => (
        <span
          key={i}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white text-neutral-600"
        >
          <span
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: v.value }}
            aria-label={v.label}
            title={v.label}
          />
          <span className="text-xs font-sans">{v.label}</span>
        </span>
      ))}
    </div>
  );
}

function CustomVariants({ variants }) {
  const customVariants = variants.filter((v) => v.type === "custom");
  if (customVariants.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {customVariants.map((v, i) => {
        const imageUrl = v.image?.url || v.preview;
        return (
          <div
            key={i}
            className="w-24 h-24 rounded-lg overflow-hidden bg-white flex items-center justify-center p-1"
          >
            {imageUrl ? (
              <img src={imageUrl} alt={v.label} className="max-w-full max-h-full object-contain rounded" />
            ) : (
              <span className="text-[10px] text-neutral-500 font-sans">{v.label}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function SwimLingerieDetails() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchPublicWomenApparelById(params.id);
        setItem(data);
      } catch (error) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };
    loadItem();
  }, [params.id]);

  if (loading) {
    return (
      <div className="pt-32 px-4 md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
        <p className="text-on-surface-variant font-sans animate-pulse">Loading product...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-32 px-4 md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
        <p className="text-on-surface-variant font-sans">Product not found.</p>
        <Link className="text-leather-tan underline mt-4 inline-block font-sans" to="/womens/swim-lingerie">
          <span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Swim &amp; Lingerie</span>
        </Link>
      </div>
    );
  }

  const activeImage = selectedVariant?.image?.url || item.image?.url;

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-20">
      {/* Dakota-style Full Width Dark Title Bar */}
      <div className="bg-[#161616] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-sans text-xl md:text-2xl tracking-[0.35em] uppercase font-light text-white">
              S W I M &nbsp; &amp; &nbsp; L I N G E R I E
            </h1>
            <p className="mt-2 text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-light">
              PREMIUM &amp; HIGH-QUALITY STYLES FOR SWIM AND LINGERIE PRODUCTION
            </p>
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-light font-sans">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="mx-2 text-neutral-700">/</span>
            <Link to="/womens/swim-lingerie" className="hover:text-white transition-colors">WOMEN&apos;S</Link>
            <span className="mx-2 text-neutral-700">/</span>
            <span className="text-white font-normal">{item.title}</span>
          </div>
        </div>
      </div>

      {/* Two-Column Details Area */}
      <div className="w-full flex flex-col lg:flex-row min-h-[500px] border-b border-neutral-100">
        <div className="w-full lg:w-1/2 bg-[#f5f5f5] min-h-[420px] lg:min-h-[700px] overflow-hidden flex items-center justify-center p-8 md:p-12">
          <img
            src={activeImage}
            alt={item.title}
            className="max-h-[560px] lg:max-h-[620px] w-full h-auto object-contain transition-all duration-300"
            loading="lazy"
          />
        </div>

        <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
          <div className="max-w-xl space-y-12">
            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                1. STYLE &amp; DESIGN
              </h2>
              <p className="text-sm font-sans text-neutral-700 leading-relaxed font-light">
                {item.title}
              </p>
            </div>

            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                2. TECHNICAL SPECIFICATIONS
              </h2>
              <div
                className="prose prose-neutral max-w-none text-sm font-sans text-neutral-700 leading-relaxed font-light prose-p:my-0 prose-p:mb-2"
                dangerouslySetInnerHTML={{ __html: toRichTextHtml(item.description) }}
              />
            </div>

            {item.variants && item.variants.some((v) => v.type === "color") && (
              <div>
                <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                  3. {item.colorSectionTitle || "AVAILABLE COLORS"}
                </h2>
                <ColorSwatches variants={item.variants} />
              </div>
            )}

            {item.variants && item.variants.some((v) => v.type === "custom") && (
              <div>
                <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                  4. {item.customSectionTitle || "OPTIONS & STYLES"}
                </h2>
                <CustomVariants variants={item.variants} />
              </div>
            )}

            <div className="pt-4 border-t border-neutral-100">
              <Link
                className="text-xs font-sans text-neutral-400 hover:text-black tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                to="/womens/swim-lingerie"
              >
                <span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Swim &amp; Lingerie</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Three-Column HOW TO CONTACT US Section */}
      <section className="bg-white py-16 px-4 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-black mb-12 font-sans">
            HOW TO CONTACT US
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left text-xs max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="bg-[#1c1c1c] text-white p-2 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.15 15.15 0 0 0 6.57 6.57l2.2-2.2a1 1 0 0 1 .9-.27 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.27.9l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold tracking-[0.2em] uppercase text-neutral-400 mb-1 font-sans">PHONE</h3>
                <a 
                  href="tel:02074126809" 
                  className="text-neutral-900 hover:text-gold-accent transition-colors font-sans tracking-wide leading-relaxed font-light block"
                >
                  02-074-126-809
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#1c1c1c] text-white p-2 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold tracking-[0.2em] uppercase text-neutral-400 mb-1 font-sans">ADDRESS</h3>
                <p className="text-neutral-900 font-sans tracking-wide leading-relaxed font-light">
                  19 Northampton Rd, Wellingborough,<br />
                  NN8 3HG, United Kingdom
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#1c1c1c] text-white p-2 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold tracking-[0.2em] uppercase text-neutral-400 mb-1 font-sans">EMAIL</h3>
                <a 
                  href="mailto:enquiries@vivosa.co.uk" 
                  className="text-neutral-900 hover:text-gold-accent transition-colors font-sans tracking-wide leading-relaxed font-light block"
                >
                  enquiries@vivosa.co.uk
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark call-to-action Footer Banner */}
      <section className="bg-[#0f0f0f] text-white py-12 px-4 text-center border-t border-neutral-800">
        <h3 className="text-[11px] font-bold tracking-[0.25em] uppercase mb-6 text-neutral-400 font-sans">
          WOULD YOU LIKE TO RECEIVE MORE INFORMATION ABOUT OUR PRODUCTS?
        </h3>
        <Link
          to="/contact"
          className="inline-block bg-[#dcdcdc] text-black font-semibold text-[10px] tracking-[0.25em] uppercase py-3 px-8 hover:bg-white transition-colors rounded-none no-hover-scale"
        >
          CONTACT US
        </Link>
      </section>
    </div>
  );
}
