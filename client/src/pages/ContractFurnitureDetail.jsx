import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchPublicSustainableLeather } from "../api/sustainableLeather";
import DetailsExtraSections from "../components/DetailsExtraSections";

export default function ContractFurnitureDetail() {
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
        console.error("Failed to load product details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId]);
  useEffect(() => {
    if (product) {
      document.title = `${product.name ? product.name : (product.code || "Sustainable Leather")} | Vivosa`;
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-primary">
        <div className="animate-pulse tracking-widest font-label-caps text-sm">LOADING DETAILS...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-primary space-y-4">
        <h2 className="font-display text-2xl tracking-wider">PRODUCT NOT FOUND</h2>
        <Link to="/contract-furniture" className="text-accent-gold font-semibold uppercase text-xs tracking-widest border-b border-accent-gold/40 pb-1">
          <span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Collection</span>
        </Link>
      </div>
    );
  }

  const articleName = product.name ? product.name : (product.code || product.title || "Untitled");
  let sectionIndex = 1;
  const hasSpecs = !!(product.rawMaterial || product.processing || product.productDetails);

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
            <div className="space-y-3">
              <h1 className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.15em] font-light uppercase text-white leading-tight">
                {articleName.toUpperCase()}
              </h1>
              <p className="font-label-caps text-label-caps text-[#8e8e8e] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium">
                SUSTAINABLE CONTRACT &amp; FURNITURE LEATHER
              </p>
            </div>

            {/* Breadcrumbs (Refactored to match navbar naming) */}
            <div className="font-label-caps text-[10px] md:text-[11px] tracking-[0.2em] text-[#8e8e8e] uppercase mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 font-medium">
              <Link to="/" className="hover:text-white hover:font-bold transition-colors duration-300">
                HOME
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <Link to="/contract-furniture" className="hover:text-white hover:font-bold transition-colors duration-300">
                CONTRACT &amp; FURNITURE
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <span className="text-white font-semibold">{articleName.toUpperCase()}</span>
            </div>
          </div>
        </section>

        {/* Product Catalog Layout */}
        <section className="bg-white border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0">
            <div className="w-full bg-[#f5f5f5] min-h-[420px] lg:min-h-[700px] overflow-hidden flex items-start justify-center p-8 md:p-12">
              <img
                className="max-h-[560px] lg:max-h-[620px] w-full h-auto object-contain"
                alt={product.title}
                src={product.image?.url}
              />
            </div>

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
                {(product.thickness || product.rawhide) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {product.thickness && (
                      <div className="space-y-1">
                        <span className="font-label-caps text-[10px] tracking-widest text-[#8e8e8e] uppercase font-bold block">
                          Thickness
                        </span>
                        <p className="font-body text-[15px] text-neutral-800 font-medium">
                          {product.thickness}
                        </p>
                      </div>
                    )}
                    {product.rawhide && (
                      <div className="space-y-1">
                        <span className="font-label-caps text-[10px] tracking-widest text-[#8e8e8e] uppercase font-bold block">
                          Rawhide Origin
                        </span>
                        <p className="font-body text-[15px] text-neutral-800 font-medium">
                          {product.rawhide}
                        </p>
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
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4"
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
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4"
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
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4"
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
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4"
                    dangerouslySetInnerHTML={{ __html: product.productDetails }}
                  />
                </div>
              )}

              <div className="pt-6 border-t border-neutral-100">
                <Link
                  className="text-xs font-sans text-neutral-400 hover:text-black tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                  to="/contract-furniture"
                >
                  <span className="inline-flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Furniture Collection</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <DetailsExtraSections privacyId="privacy-contract-furniture-detail" />
      </main>
    </div>
  );
}
