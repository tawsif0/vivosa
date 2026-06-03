import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DetailsExtraSections from "../components/DetailsExtraSections";
import { fetchPublicKid } from "../api/kids";
import { toRichTextHtml } from "../utils/richText";

export default function KidsDetails() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKid = async () => {
      try {
        const data = await fetchPublicKid(params.id);
        setItem(data);
      } catch (error) {
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    loadKid();
  }, [params.id]);

  if (loading) {
    return (
      <div className="pt-32 px-4 md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
        <p className="text-on-surface-variant font-sans">Loading product...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-32 px-4 md:px-margin-desktop max-w-container-max mx-auto min-h-screen">
        <p className="text-on-surface-variant font-sans">Product not found.</p>
        <Link className="text-leather-tan underline mt-4 inline-block font-sans" to="/kids">
          Back to Kids
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased overflow-x-hidden pt-20">
      <div className="bg-[#161616] text-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-sans text-2xl md:text-3xl tracking-[0.35em] uppercase font-light text-white">
              K I D S &nbsp; W E A R
            </h1>
            <p className="mt-2 text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-neutral-400 font-light">
              Comfortable &amp; premium apparel for kids
            </p>
          </div>
          <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-light font-sans">
            <Link to="/" className="hover:text-white transition-colors">
              HOME
            </Link>
            <span className="mx-2 text-neutral-700">/</span>
            <Link to="/kids" className="hover:text-white transition-colors">
              KIDS
            </Link>
            <span className="mx-2 text-neutral-700">/</span>
            <span className="text-white font-normal">{item.title}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col lg:flex-row min-h-[500px] border-b border-neutral-100">
        <div className="w-full lg:w-1/2 bg-[#f5f5f5] min-h-[420px] lg:min-h-[700px] overflow-hidden flex items-center justify-center p-8 md:p-12">
          <img
            src={item.image?.url}
            alt={item.title}
            className="max-h-[540px] lg:max-h-[620px] w-full h-auto object-contain"
            loading="lazy"
          />
        </div>

          <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center px-6 py-16 md:px-16 lg:px-24">
          <div className="max-w-xl space-y-12">
            <div>
              <h2 className="text-[12px] md:text-[13px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                1. STYLE &amp; DESIGN
              </h2>
              <p className="text-base md:text-lg font-sans text-neutral-700 leading-relaxed font-light">
                {item.title}
              </p>
            </div>

            <div>
              <h2 className="text-[12px] md:text-[13px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                2. MATERIAL COMPOSITION
              </h2>
              <div
                className="prose prose-neutral max-w-none prose-base md:prose-lg font-sans text-neutral-700 leading-relaxed font-light prose-p:my-0 prose-p:mb-3"
                dangerouslySetInnerHTML={{
                  __html: toRichTextHtml(item.materialComposition) || "<p>No material composition provided.</p>",
                }}
              />
            </div>

            <div>
              <h2 className="text-[12px] md:text-[13px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 font-sans">
                3. PRODUCT PRODUCTION
              </h2>
              <div
                className="prose prose-neutral max-w-none prose-base md:prose-lg font-sans text-neutral-700 leading-relaxed font-light prose-p:my-0 prose-p:mb-3"
                dangerouslySetInnerHTML={{
                  __html: toRichTextHtml(item.productProduction) || "<p>No product production provided.</p>",
                }}
              />
            </div>

            <div className="pt-4 border-t border-neutral-100">
              <Link
                className="text-sm md:text-base font-sans text-neutral-400 hover:text-black tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                to="/kids"
              >
                Back to Kids Collection
              </Link>
            </div>
          </div>
        </div>
      </div>

      <DetailsExtraSections privacyId="kids-privacy" />
    </div>
  );
}
