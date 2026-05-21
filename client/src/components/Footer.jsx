import React from "react";
import { FaFacebook, FaYoutube, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  const handleScrollToTop = (e) => {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-deep-forest dark:bg-pure-black text-off-white">
      <div className="w-full pt-section-gap pb-12 px-8 flex flex-col md:flex-row justify-between items-start gap-gutter max-w-container-max mx-auto">
        <div className="max-w-md">
          <img
            alt="Logo"
            className="h-10 w-auto mb-6 cursor-pointer hover:opacity-80 transition-opacity"
            src="/vite.png"
            loading="lazy"
            onClick={handleScrollToTop}
          />
          <p className="font-body-md text-surface-variant/70 leading-relaxed mb-8">
            At Vivosa, we bridge the gap between high-fashion aesthetics and
            planetary consciousness, ensuring that beauty never comes at an
            ethical cost.
          </p>
          <div className="flex gap-4">
            <a
              className="w-10 h-10 border border-off-white/20 flex items-center justify-center hover:bg-gold-accent hover:text-pure-black transition-all"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a
              className="w-10 h-10 border border-off-white/20 flex items-center justify-center hover:bg-gold-accent hover:text-pure-black transition-all"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Youtube"
            >
              <FaYoutube size={18} />
            </a>
            <a
              className="w-10 h-10 border border-off-white/20 flex items-center justify-center hover:bg-gold-accent hover:text-pure-black transition-all"
              href="https://x.com/skylinkfashion"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
            >
              <FaXTwitter size={18} />
            </a>
            <a
              className="w-10 h-10 border border-off-white/20 flex items-center justify-center hover:bg-gold-accent hover:text-pure-black transition-all"
              href="https://www.linkedin.com/company/vivosa-limited/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              className="w-10 h-10 border border-off-white/20 flex items-center justify-center hover:bg-gold-accent hover:text-pure-black transition-all"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h6 className="font-label-caps text-gold-accent mb-6 tracking-widest">Quick Links</h6>
            <ul className="space-y-4">
              <li>
                <a
                  className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300"
                  href="/"
                  onClick={(e) => { e.preventDefault(); window.location.href = "/"; window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300"
                  href="/about"
                  onClick={(e) => { e.preventDefault(); window.location.href = "/about"; window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300"
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); window.location.href = "/contact"; window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-caps text-gold-accent mb-6 tracking-widest">Sustainable Leather</h6>
            <ul className="space-y-4">
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/contract-furniture" onClick={(e) => { e.preventDefault(); window.location.href = "/contract-furniture"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Contract &amp; Furniture
                </a>
              </li>
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/leather-footwear" onClick={(e) => { e.preventDefault(); window.location.href = "/leather-footwear"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Leather for Footwear
                </a>
              </li>
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/leather-goods" onClick={(e) => { e.preventDefault(); window.location.href = "/leather-goods"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Leather Goods
                </a>
              </li>
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/leather-lining" onClick={(e) => { e.preventDefault(); window.location.href = "/leather-lining"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Leather Lining
                </a>
              </li>
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/automotive" onClick={(e) => { e.preventDefault(); window.location.href = "/automotive"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Automotive
                </a>
              </li>
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/marine-leather" onClick={(e) => { e.preventDefault(); window.location.href = "/marine-leather"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Marine Leather
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-label-caps text-gold-accent mb-6 tracking-widest">Apparel</h6>
            <ul className="space-y-4">
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/apparel" onClick={(e) => { e.preventDefault(); window.location.href = "/apparel"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Apparel Info
                </a>
              </li>
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/mensware" onClick={(e) => { e.preventDefault(); window.location.href = "/mensware"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Mensware
                </a>
              </li>
              <li>
                <a className="font-body-md text-surface-variant/70 hover:text-gold-accent transition-all duration-300" href="/womenswear" onClick={(e) => { e.preventDefault(); window.location.href = "/womenswear"; window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  Womenswear
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-8 pb-12">
        <div className="border-t border-off-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body-md text-surface-variant/50 text-sm">
            © {new Date().getFullYear()}. All Rights Reserved. | Developed By{" "}
            <a
              href="https://arbeittechnology.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-surface-variant/70 hover:text-gold-accent underline underline-offset-2 transition-colors duration-300 cursor-pointer"
            >
              Arbeit Technology
            </a>
          </p>
          <button
            className="flex items-center gap-2 font-label-caps text-[10px] text-surface-variant/70 hover:text-gold-accent transition-all"
            type="button"
            onClick={handleScrollToTop}
          >
            Back to Top
            <span className="material-symbols-outlined text-sm">
              keyboard_double_arrow_up
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}

