import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPublicWomenApparelById } from "../api/womenApparel";
import DetailsExtraSections from "../components/DetailsExtraSections";
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

export default function WomensPantsDetails() {
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
        <Link className="text-leather-tan underline mt-4 inline-block font-sans" to="/womens/pants">
          Back to Women&apos;s Pants
        </Link>
      </div>
    );
  }

  const activeImage = selectedVariant?.image?.url || item.image?.url;

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-20">
      <div className="bg-[#161616] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-sans text-xl md:text-2xl tracking-[0.35em] uppercase font-light text-white">
              W O M E N &apos; S &nbsp; P A N T S
            </h1>
            <p className="mt-2 text-[9px] tracking-[0.25em] uppercase text-neutral-400 font-light">
              PREMIUM TROUSER &amp; PANTS STYLES FOR WOMEN&apos;S PRODUCTION
            </p>
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-light font-sans">
            <Link to="/" className="hover:text-white transition-colors">HOME</Link>
            <span className="mx-2 text-neutral-700">/</span>
            <Link to="/womens/pants" className="hover:text-white transition-colors">WOMEN&apos;S</Link>
            <span className="mx-2 text-neutral-700">/</span>
            <span className="text-white font-normal">{item.title}</span>
          </div>
        </div>
      </div>

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
                1. STYLE
              </h2>
              <p className="text-sm font-sans text-neutral-700 leading-relaxed font-light">
                {item.title}
              </p>
            </div>

            <div>
              <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                2. MATERIALS
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

            <div className="pt-2 border-t border-neutral-100">
              <div className="mt-6">
                <Link
                  className="text-xs font-sans text-neutral-400 hover:text-black tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                  to="/womens/pants"
                >
                  Back to Women&apos;s Pants
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailsExtraSections privacyId="privacy-womens-pants" />
    </div>
  );
}
