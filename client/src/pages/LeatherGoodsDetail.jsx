import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPublicSustainableLeather } from "../api/sustainableLeather";
import DetailsExtraSections from "../components/DetailsExtraSections";

export default function LeatherGoodsDetail() {
  const { productId } = useParams();
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
        <Link to="/leather-goods" className="text-accent-gold font-semibold uppercase text-xs tracking-widest border-b border-accent-gold/40 pb-1">
          Back to Collection
        </Link>
      </div>
    );
  }

  // Use colorName for the elegant spaced banner header (e.g. "C R E A M")
  const articleName = product.colorName || product.title;

  // Format the color name with spaces between letters for the header (e.g. "C R E A M")
  const spacedName = articleName.toUpperCase().split("").join(" ");

  let sectionIndex = 1;
  const hasSpecs = !!(product.rawMaterial || product.processing || product.productDetails);

  return (
    <div className="bg-white text-primary font-body min-h-screen selection:bg-accent-gold/30">
      <main className="pt-20 md:pt-[88px]">
        {/* Dark Header Banner exactly matching the mockup */}
        <section className="bg-[#222222] text-white py-14 px-6 md:px-12 lg:px-24 border-b border-neutral-800 relative">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10">
            {/* Left Column: Title and Subtitle */}
            <div className="space-y-3">
              <h1 className="font-display text-xl md:text-2xl lg:text-3xl tracking-[0.15em] font-light uppercase text-white leading-tight">
                {articleName.toUpperCase()}
              </h1>
              <p className="font-label-caps text-label-caps text-[#8e8e8e] text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-medium">
                {product.subtitle}
              </p>
            </div>

            {/* Right Column: Breadcrumbs (Refactored to match navbar naming structure) */}
            <div className="font-label-caps text-[10px] md:text-[11px] tracking-[0.2em] text-[#8e8e8e] uppercase mt-6 md:mt-0 flex flex-wrap items-center gap-1.5 font-medium">
              <Link to="/" className="hover:text-white hover:font-bold transition-colors duration-300">
                HOME
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <Link to="/leather-goods" className="hover:text-white hover:font-bold transition-colors duration-300">
                LEATHER GOODS
              </Link>
              <span className="text-[#555555] select-none">/</span>
              <span className="text-white font-semibold">{articleName.toUpperCase()}</span>
            </div>
          </div>
        </section>

        {/* Dynamic Product Specification Section: Full-bleed 50/50 Catalog Layout */}
        <section className="bg-white border-b border-neutral-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0">

            {/* Left Column: Full-width, full-height image */}
            <div className="w-full h-[350px] sm:h-[450px] lg:h-auto min-h-[450px] overflow-hidden bg-neutral-100">
              <img
                className="w-full h-full object-cover"
                alt={product.fullName}
                src={product.image?.url}
              />
            </div>

            {/* Right Column: Detailed Product Specs with luxurious padding */}
            <div className="py-16 px-6 sm:px-12 lg:px-20 xl:px-24 flex flex-col justify-center space-y-10 bg-white">
              {/* Full exact title header — same as live site */}
              <div className="space-y-2 border-b border-neutral-100 pb-6 max-w-xl">
                <h2 className="font-display text-2xl md:text-3xl font-light tracking-wide text-neutral-800 uppercase">
                  {product.name || product.title}
                </h2>
                {product.code && (
                  <p className="font-label-caps text-xs tracking-widest text-neutral-500 uppercase">
                    {product.code}
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

              {/* 1. RAW MATERIAL */}
              {product.rawMaterial && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    {sectionIndex++}. RAW MATERIAL
                  </h3>
                  <div
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4"
                    dangerouslySetInnerHTML={{ __html: product.rawMaterial }}
                  />
                </div>
              )}

              {/* 2. PROCESSING */}
              {product.processing && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    {sectionIndex++}. PROCESSING
                  </h3>
                  <div
                    className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light rich-content space-y-4"
                    dangerouslySetInnerHTML={{ __html: product.processing }}
                  />
                </div>
              )}

              {/* 3. PRODUCT */}
              {product.productDetails && (
                <div className="space-y-3 max-w-xl">
                  <h3 className="font-display text-[13px] md:text-sm font-bold tracking-[0.2em] text-neutral-800 uppercase">
                    {sectionIndex++}. PRODUCT
                  </h3>
                  <div className="font-body text-[14px] md:text-[15px] text-secondary leading-relaxed font-light space-y-4">
                    {(product.thickness || product.rawhide) && (
                      <p>
                        <span className="font-medium text-neutral-800">{articleName}</span> is a premium leather goods article
                        {product.thickness && <> with a customized thickness of <span className="font-medium text-neutral-800">{product.thickness}</span></>}
                        {product.rawhide && <> crafted carefully using fine <span className="font-medium text-neutral-800">{product.rawhide}</span> hides</>}
                        .
                      </p>
                    )}
                    <div
                      className="rich-content"
                      dangerouslySetInnerHTML={{ __html: product.productDetails }}
                    />
                  </div>
                </div>
              )}
              <div className={hasSpecs ? "pt-6 border-t border-neutral-100" : ""}>
                <Link
                  className="text-xs font-sans text-neutral-400 hover:text-black tracking-[0.2em] uppercase transition-colors underline underline-offset-4"
                  to="/leather-goods"
                >
                  Back to Goods Collection
                </Link>
              </div>
            </div>

          </div>
        </section>

        <DetailsExtraSections privacyId="privacy-leather-goods-detail" />
      </main>
    </div>
  );
}
