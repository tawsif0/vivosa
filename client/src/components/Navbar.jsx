import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function DesktopDropdown({ label, items, isOpen, isActive, onToggle, onClose }) {
  return (
    <div className="relative">
      <button
        type="button"
        className={
          isOpen || isActive
            ? "inline-flex items-center gap-2 font-body-md text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent border-b border-deep-forest dark:border-gold-accent pb-1 transition-colors duration-300"
            : "inline-flex items-center gap-2 font-body-md text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300"
        }
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={onToggle}
        onBlur={(event) => {
          if (
            !event.currentTarget.parentElement?.contains(event.relatedTarget)
          ) {
            onClose();
          }
        }}
      >
        {label}
        <span className="material-symbols-outlined text-[18px]">
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      {isOpen ? (
        <div
          className="absolute left-0 mt-4 min-w-64 rounded-2xl border border-outline/10 bg-surface/95 backdrop-blur-md shadow-xl overflow-hidden"
          role="menu"
        >
          {items.map((item) => {
            const isItemActive = window.location.pathname === item.href;
            return (
              <a
                key={`${label}-${item.label}`}
                className={
                  isItemActive
                    ? "block px-5 py-3 font-body-md text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent bg-surface-container-low transition-colors duration-300"
                    : "block px-5 py-3 font-body-md text-body-md tracking-wide uppercase text-on-surface-variant hover:text-leather-tan hover:bg-surface-container-low transition-colors duration-300"
                }
                href={item.href}
                role="menuitem"
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function MobileAccordion({ label, items, isOpen, isActive, onToggle, onItemClick }) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className={
          isOpen || isActive
            ? "w-full inline-flex items-center justify-between rounded-xl bg-deep-forest px-4 py-3 font-label-caps text-[12px] uppercase tracking-widest text-gold-accent"
            : "w-full inline-flex items-center justify-between rounded-xl bg-deep-forest px-4 py-3 font-label-caps text-[12px] uppercase tracking-widest text-off-white"
        }
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {label}
        <span className="material-symbols-outlined text-[18px]">
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      {isOpen ? (
        <div className="pl-2 flex flex-col gap-2">
          {items.map((item) => {
            const isItemActive = window.location.pathname === item.href;
            return (
              <a
                key={`m-${label}-${item.label}`}
                className={
                  isItemActive
                    ? "rounded-xl px-3 py-2 text-sm font-semibold tracking-wider uppercase text-deep-forest bg-surface-container-low transition"
                    : "rounded-xl px-3 py-2 text-sm font-semibold tracking-wider uppercase text-on-surface hover:bg-surface-container-low transition"
                }
                href={item.href}
                onClick={onItemClick}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState(null); // "leather" | "apparel" | null
  const [mobileOpenSection, setMobileOpenSection] = useState(null); // "leather" | "apparel" | null
  const location = useLocation();

  const data = useMemo(
    () => ({
      leather: {
        label: "Sustainable Leather",
        items: [
          { label: "Contact & Furniture", href: "/contract-furniture" },
          { label: "Leather for Footwear", href: "/leather-footwear" },
          { label: "Leather Goods", href: "/leather-goods" },
          { label: "Leather Lining", href: "/leather-lining" },
          { label: "Automotive", href: "/automotive" },
          { label: "Marine Leather", href: "/marine-leather" },
        ],
      },
      apparel: {
        label: "Apparel",
        items: [
          { label: "Info", href: "/apparel" },
          { label: "Mensware", href: "/mensware" },
          { label: "Womenswear", href: "/womenswear" },
        ],
      },
    }),
    [],
  );

  const closeAll = () => {
    setIsMobileMenuOpen(false);
    setDesktopOpenDropdown(null);
    setMobileOpenSection(null);
  };

  const handleNavClick = () => {
    closeAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-md dark:bg-primary/80 shadow-sm border-b border-outline/10 cursor-pointer"
      onClick={(e) => {
        if (
          e.target === e.currentTarget ||
          e.target.id === "nav-container" ||
          e.target.classList.contains("max-w-container-max")
        ) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
    >
      <div
        id="nav-container"
        className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 max-w-container-max mx-auto"
      >
        <Link
          className="flex items-center gap-4"
          to="/"
          aria-label="Home"
          onClick={handleNavClick}
        >
          <img alt="Logo" className="h-12 sm:h-14 w-auto" src="/vite.png" />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <Link
            className={
              location.pathname === "/"
                ? "font-body-md text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent border-b border-deep-forest dark:border-gold-accent pb-1 transition-colors duration-300"
                : "font-body-md text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300"
            }
            to="/"
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            className={
              location.pathname === "/about"
                ? "font-body-md text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent border-b border-deep-forest dark:border-gold-accent pb-1 transition-colors duration-300"
                : "font-body-md text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300"
            }
            to="/about"
            onClick={handleNavClick}
          >
            About Us
          </Link>

          <DesktopDropdown
            label={data.leather.label}
            items={data.leather.items}
            isOpen={desktopOpenDropdown === "leather"}
            isActive={data.leather.items.some(item => location.pathname === item.href)}
            onToggle={() =>
              setDesktopOpenDropdown((value) =>
                value === "leather" ? null : "leather",
              )
            }
            onClose={() => setDesktopOpenDropdown(null)}
          />

          <DesktopDropdown
            label={data.apparel.label}
            items={data.apparel.items}
            isOpen={desktopOpenDropdown === "apparel"}
            isActive={data.apparel.items.some(item => location.pathname === item.href)}
            onToggle={() =>
              setDesktopOpenDropdown((value) =>
                value === "apparel" ? null : "apparel",
              )
            }
            onClose={() => setDesktopOpenDropdown(null)}
          />
        </div>

        <div className="flex items-center gap-3">
          <a
            className="hidden sm:inline-flex px-6 py-2 bg-deep-forest text-off-white font-label-caps uppercase hover:bg-leather-tan transition-all duration-300 scale-95 hover:scale-100"
            href="/contact"
            onClick={handleNavClick}
          >
            Contact Us
          </a>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-outline/20 bg-surface/70 px-3 py-2 text-deep-forest dark:text-gold-accent hover:bg-surface/90 transition"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              setIsMobileMenuOpen((value) => !value);
              setDesktopOpenDropdown(null);
            }}
          >
            <span className="material-symbols-outlined text-[22px]">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={isMobileMenuOpen ? "md:hidden" : "hidden"}>
        <div className="px-4 sm:px-6 lg:px-8 pb-4 max-w-container-max mx-auto">
          <div className="rounded-2xl border border-outline/10 bg-surface/95 dark:bg-primary/95 p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              <Link
                className="font-body-md text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300 py-2"
                to="/"
                onClick={handleNavClick}
              >
                Home
              </Link>
              <Link
                className="font-body-md text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300 py-2"
                to="/about"
                onClick={handleNavClick}
              >
                About Us
              </Link>

              <MobileAccordion
                label={data.leather.label}
                items={data.leather.items}
                isOpen={mobileOpenSection === "leather"}
                isActive={data.leather.items.some(item => location.pathname === item.href)}
                onToggle={() =>
                  setMobileOpenSection((value) =>
                    value === "leather" ? null : "leather",
                  )
                }
                onItemClick={handleNavClick}
              />

              <MobileAccordion
                label={data.apparel.label}
                items={data.apparel.items}
                isOpen={mobileOpenSection === "apparel"}
                isActive={data.apparel.items.some(item => location.pathname === item.href)}
                onToggle={() =>
                  setMobileOpenSection((value) =>
                    value === "apparel" ? null : "apparel",
                  )
                }
                onItemClick={handleNavClick}
              />

              <a
                className="font-body-md text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300 py-2"
                href="/contact"
                onClick={handleNavClick}
              >
                Contact
              </a>

              <a
                className="mt-2 inline-flex justify-center px-6 py-3 bg-deep-forest text-off-white font-label-caps uppercase hover:bg-leather-tan transition-all duration-300"
                href="/contact"
                onClick={handleNavClick}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
