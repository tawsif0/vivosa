import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPublicSustainableLeather } from "../api/sustainableLeather";
import DetailsExtraSections from "../components/DetailsExtraSections";

export default function AviationLeatherDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchPublicSustainableLeather(productId);
        setProduct(data);
      } catch (err) {
        console.error("Failed to load aviation product details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name ? product.name : product.code || "Sustainable Leather"} | Vivosa`;
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <div className="animate-pulse tracking-widest font-label-caps text-sm">
          LOADING DETAILS...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-primary space-y-4">
        <h2 className="font-display text-2xl tracking-wider">
          PRODUCT NOT FOUND
        </h2>
        <Link
          to="/aviation-leather"
          className="text-accent-gold font-semibold uppercase text-xs tracking-widest border-b border-accent-gold/40 pb-1"
        >
          <span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Collection</span>
        </Link>
      </div>
    );
  }

  const articleName = product.name
    ? product.name
    : product.code || product.title || "Untitled";
  const spacedName = articleName.toUpperCase().split("").join(" ");

  let sectionIndex = 1;
  const hasSpecs = !!(
    product.rawMaterial ||
    product.processing ||
    product.productDetails
  );

  return (
    <div className="bg-white text-primary font-body min-h-screen selection:bg-accent-gold/30">
      <main className="pt-20 md:pt-[88px]">
        {/* Dark Header Banner */}
        <section className="bg-[#222222] text-white py-14 px-6 md:px-12 lg:px-24 border-b border-neutral-800 relative">
          <div className="max-w-7xl mx-auto mb-8 relative z-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-[#8e8e8e] hover:text-white transition-colors duration-300 font-label-caps text-[11px] tracking-[0.2em] uppercase font-medium"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back
            </button>
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
            {/* Left Column: Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.15em] font-light uppercase text-white leading-tight">
                {articleName.toUpperCase()}
              </h1>
              <p className="font-label-caps text-label-caps text-[#8e8e8e] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium">
                PREMIUM AVIATION LEATHER HIDE
              </p>
            </div>

            {/* Right Column: Breadcrumbs */}
            <div className="font-label-caps text-[10px] md:text-[11px] tracking-[0.2em] text-[#8e8e8e] uppercase mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 font-medium">
              <Link
                to="/"
                className="hover:text-white hover:font-bold transition-colors duration-300"
              >
                HOME
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <Link
                to="/aviation-leather"
                className="hover:text-white hover:font-bold transition-colors duration-300"
              >
                AVIATION
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <span className="text-white font-semibold">
                {articleName.toUpperCase()}
              </span>
            </div>
          </div>
        </section>

        {/* Product Specification Section: Full-bleed 50/50 Catalog Layout */}
        <section className="bg-white border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0">
            {/* Left Column: Full-width, full-height image */}
            <div className="w-full bg-[#f5f5f5] min-h-[420px] lg:min-h-[700px] overflow-hidden flex items-start justify-center p-8 md:p-12">
              <img
                className="max-h-[560px] lg:max-h-[620px] w-full h-auto object-contain"
                alt={product.name}
                src={product.image?.url}
              />
            </div>

            {/* Right Column: Detailed Product Specs */}
            <div className="py-16 px-6 sm:px-12 lg:px-20 xl:px-24 flex flex-col justify-center space-y-10 bg-white">
              <div className="space-y-2 border-b border-neutral-100 pb-6 max-w-xl">
                <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-neutral-800 uppercase">
                  {product.code || product.title || product.name}
                </h2>
                {product.subtitle && (
                  <p className="font-label-caps text-xs tracking-widest text-neutral-500 uppercase">
                    {product.subtitle}
                  </p>
                )}
                {(product.rawhide || product.thickness) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {product.rawhide && (
                      <div>
                        <span className="font-label-caps text-[10px] tracking-widest text-[#a8a29e] uppercase font-bold block">
                          Origin
                        </span>
                        <span className="font-body text-sm font-semibold uppercase text-neutral-700">
                          {product.rawhide} HIDES
                        </span>
                      </div>
                    )}
                    {product.thickness && (
                      <div>
                        <span className="font-label-caps text-[10px] tracking-widest text-[#a8a29e] uppercase font-bold block">
                          Thickness
                        </span>
                        <span className="font-body text-sm font-semibold text-neutral-700">
                          {product.thickness}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 1. PRODUCT DESCRIPTION */}
              {product.desc && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    Product Description
                  </h3>
                  <div
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4 text-justify"
                    dangerouslySetInnerHTML={{ __html: product.desc }}
                  />
                </div>
              )}

              {/* 2. RAW MATERIAL */}
              {product.rawMaterial && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    Raw Material
                  </h3>
                  <div
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4 text-justify"
                    dangerouslySetInnerHTML={{ __html: product.rawMaterial }}
                  />
                </div>
              )}

              {/* 3. PROCESSING */}
              {product.processing && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    Processing
                  </h3>
                  <div
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4 text-justify"
                    dangerouslySetInnerHTML={{ __html: product.processing }}
                  />
                </div>
              )}

              {/* 4. FINAL PRODUCT CHARACTERISTICS */}
              {product.productDetails && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    Final Product Characteristics
                  </h3>
                  <div
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4 text-justify"
                    dangerouslySetInnerHTML={{ __html: product.productDetails }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-xl">
                <Link
                  to="/contact?interest=sample_book"
                  className="flex-1 text-center font-label-caps text-xs tracking-[0.2em] font-semibold py-4 px-6 bg-primary text-on-primary hover:bg-neutral-800 transition-colors duration-300"
                >
                  REQUEST SAMPLE BOOK
                </Link>
                <Link
                  to="/aviation-leather"
                  className="flex-1 text-center font-label-caps text-xs tracking-[0.2em] font-semibold py-4 px-6 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors duration-300"
                >
                  RETURN TO COLLECTION
                </Link>
              </div>
            </div>
          </div>
        </section>

        <DetailsExtraSections privacyId="privacy-aviation-detail" />
      </main>
    </div>
  );
}
