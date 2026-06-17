import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function DesktopDropdown({ label, items, isOpen, isActive, onToggle, onClose }) {
  return (
    <div className="relative">
      <button
        type="button"
        className={
          isOpen || isActive
            ? "inline-flex items-center gap-1 md:gap-1.5 font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent border-b border-deep-forest dark:border-gold-accent pb-1 transition-colors duration-300 no-hover-scale"
            : "inline-flex items-center gap-1 md:gap-1.5 font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300 no-hover-scale"
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
        <span className="material-symbols-outlined text-[13px] lg:text-[16px] xl:text-[18px]">
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

function MobileAccordion({ label, items, isOpen, isActive, onItemClick }) {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className={
          isOpen || isActive
            ? "w-full inline-flex items-center justify-between rounded-xl border border-deep-forest/20 dark:border-gold-accent/20 bg-deep-forest/5 dark:bg-gold-accent/5 px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-gold-accent no-hover-scale"
            : "w-full inline-flex items-center justify-between rounded-xl border border-outline/10 bg-transparent px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-off-white hover:text-leather-tan dark:hover:text-gold-accent hover:bg-deep-forest/5 dark:hover:bg-gold-accent/5 no-hover-scale"
        }
        aria-expanded={isOpen}
        onClick={onItemClick}
      >
        {label}
        <span className="material-symbols-outlined text-[18px]">
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      {isOpen ? (
        <div className="pl-4 flex flex-col gap-1.5 border-l border-outline/10 ml-4 mt-1">
          {items.map((item) => {
            const isItemActive = window.location.pathname === item.href;
            return (
              <a
                key={`m-${label}-${item.label}`}
                className={
                  isItemActive
                    ? "rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-deep-forest dark:text-gold-accent bg-deep-forest/5 dark:bg-gold-accent/5 transition"
                    : "rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-deep-forest/80 dark:text-off-white/80 hover:text-leather-tan dark:hover:text-gold-accent hover:bg-deep-forest/5 dark:hover:bg-gold-accent/5 transition"
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
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState(null); // "leather" | "mens" | "womens" | null
  const [mobileOpenSection, setMobileOpenSection] = useState(null); // "leather" | "mens" | "womens" | null
  const location = useLocation();

  const data = useMemo(
    () => ({
      leather: {
        label: "Sustainable Leather",
        items: [
          { label: "Contract & Furniture", href: "/contract-furniture" },
          { label: "Footware", href: "/leather-footwear" },
          { label: "Leather Goods", href: "/leather-goods" },
          { label: "Lining", href: "/leather-lining" },
          { label: "Automotive", href: "/automotive" },
          { label: "Aviation", href: "/aviation-leather" },
        ],
      },
      mens: {
        label: "Men's",
        items: [
          { label: "Sweaters", href: "/mens/sweaters" },
          { label: "Jackets & Coats", href: "/mens/jackets-and-coats" },
          { label: "Pants", href: "/mens/pants" },
          { label: "Joggers", href: "/mens/joggers" },
          { label: "Polo Shirt", href: "/mens/polo-shirt" },
          { label: "Shirts", href: "/mens/shirts" },
          { label: "T-shirts", href: "/mens/t-shirts" },
        ],
      },
      womens: {
        label: "Women's",
        items: [
          { label: "Sweaters", href: "/womens/sweaters" },
          { label: "Jackets & Coats", href: "/womens/jackets-and-coats" },
          { label: "Pants", href: "/womens/pants" },
          { label: "Polo Shirts", href: "/womens/polo-shirts" },
          { label: "Shirts", href: "/womens/shirts" },
          { label: "T-shirts", href: "/womens/t-shirts" },
          { label: "Swim & Lingerie", href: "/womens/swim-lingerie" },
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
      {/* Alert Banner for Construction/Technical Issues */}
      <div
        className="w-full bg-[#D32F2F] text-white py-2 px-4 text-center text-[11px] xs:text-xs md:text-sm font-medium tracking-wide flex items-center justify-center gap-2 border-b border-red-700/20 select-text cursor-default transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="material-symbols-outlined text-[14px] xs:text-[16px] md:text-[18px] animate-pulse select-none text-white/90">
          warning
        </span>
        <span className="max-w-[1200px] leading-relaxed font-sans font-semibold">
          Our website is under construction due to technical issues. We apologize for any inconvenience and are working to resolve the issue as soon as possible.
        </span>
      </div>

      <div
        id="nav-container"
        className="w-full flex items-center justify-between px-3 md:px-4 lg:px-8 py-3 md:py-4 max-w-container-max mx-auto"
      >
        <Link
          className="flex items-center gap-4"
          to="/"
          aria-label="Home"
          onClick={handleNavClick}
        >
          <img alt="Logo" className="h-8 md:h-10 lg:h-12 xl:h-14 w-auto transition-all duration-300" src="/vite.png" />
        </Link>

        <div className="hidden md:flex md:gap-3 lg:gap-5 xl:gap-8 items-center">
          <Link
            className={
              location.pathname === "/"
                ? "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent border-b border-deep-forest dark:border-gold-accent pb-1 transition-colors duration-300"
                : "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300"
            }
            to="/"
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            className={
              location.pathname === "/about"
                ? "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent border-b border-deep-forest dark:border-gold-accent pb-1 transition-colors duration-300"
                : "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300"
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
            label={data.mens.label}
            items={data.mens.items}
            isOpen={desktopOpenDropdown === "mens"}
            isActive={data.mens.items.some(item => location.pathname === item.href)}
            onToggle={() =>
              setDesktopOpenDropdown((value) =>
                value === "mens" ? null : "mens",
              )
            }
            onClose={() => setDesktopOpenDropdown(null)}
          />

          <DesktopDropdown
            label={data.womens.label}
            items={data.womens.items}
            isOpen={desktopOpenDropdown === "womens"}
            isActive={data.womens.items.some(item => location.pathname === item.href)}
            onToggle={() =>
              setDesktopOpenDropdown((value) =>
                value === "womens" ? null : "womens",
              )
            }
            onClose={() => setDesktopOpenDropdown(null)}
          />

          <Link
            className={
              location.pathname === "/kids"
                ? "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-deep-forest dark:text-gold-accent border-b border-deep-forest dark:border-gold-accent pb-1 transition-colors duration-300"
                : "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-on-surface-variant dark:text-surface-variant hover:text-leather-tan dark:hover:text-gold-accent transition-colors duration-300"
            }
            to="/kids"
            onClick={handleNavClick}
          >
            Kids
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            className="hidden md:inline-flex px-4 py-2 xl:px-6 xl:py-2.5 bg-deep-forest text-off-white font-body-md text-[11px] lg:text-sm xl:text-body-md uppercase hover:bg-leather-tan transition-all duration-300 scale-95 hover:scale-100"
            href="/contact"
            onClick={handleNavClick}
          >
            Contact Us
          </a>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-deep-forest dark:text-gold-accent hover:bg-deep-forest/10 dark:hover:bg-gold-accent/10 transition-colors duration-300 no-hover-scale"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => {
              setIsMobileMenuOpen((value) => !value);
              setDesktopOpenDropdown(null);
            }}
          >
            <span className="material-symbols-outlined text-[24px]">
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
                className={
                  location.pathname === "/"
                    ? "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-gold-accent bg-deep-forest/5 dark:bg-gold-accent/5 border border-deep-forest/20 dark:border-gold-accent/20 transition-all duration-300 no-hover-scale"
                    : "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-off-white hover:text-leather-tan dark:hover:text-gold-accent hover:bg-deep-forest/5 dark:hover:bg-gold-accent/5 border border-transparent transition-all duration-300 no-hover-scale"
                }
                to="/"
                onClick={handleNavClick}
              >
                Home
              </Link>
              <Link
                className={
                  location.pathname === "/about"
                    ? "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-gold-accent bg-deep-forest/5 dark:bg-gold-accent/5 border border-deep-forest/20 dark:border-gold-accent/20 transition-all duration-300 no-hover-scale"
                    : "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-off-white hover:text-leather-tan dark:hover:text-gold-accent hover:bg-deep-forest/5 dark:hover:bg-gold-accent/5 border border-transparent transition-all duration-300 no-hover-scale"
                }
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
                onItemClick={() =>
                  setMobileOpenSection((value) =>
                    value === "leather" ? null : "leather",
                  )
                }
              />

              <MobileAccordion
                label={data.mens.label}
                items={data.mens.items}
                isOpen={mobileOpenSection === "mens"}
                isActive={data.mens.items.some(item => location.pathname === item.href)}
                onItemClick={() =>
                  setMobileOpenSection((value) =>
                    value === "mens" ? null : "mens",
                  )
                }
              />

              <MobileAccordion
                label={data.womens.label}
                items={data.womens.items}
                isOpen={mobileOpenSection === "womens"}
                isActive={data.womens.items.some(item => location.pathname === item.href)}
                onItemClick={() =>
                  setMobileOpenSection((value) =>
                    value === "womens" ? null : "womens",
                  )
                }
              />

              <Link
                className={
                  location.pathname === "/kids"
                    ? "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-gold-accent bg-deep-forest/5 dark:bg-gold-accent/5 border border-deep-forest/20 dark:border-gold-accent/20 transition-all duration-300 no-hover-scale"
                    : "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-off-white hover:text-leather-tan dark:hover:text-gold-accent hover:bg-deep-forest/5 dark:hover:bg-gold-accent/5 border border-transparent transition-all duration-300 no-hover-scale"
                }
                to="/kids"
                onClick={handleNavClick}
              >
                Kids
              </Link>

              <Link
                className={
                  location.pathname === "/contact"
                    ? "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-gold-accent bg-deep-forest/5 dark:bg-gold-accent/5 border border-deep-forest/20 dark:border-gold-accent/20 transition-all duration-300 no-hover-scale"
                    : "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-deep-forest dark:text-off-white hover:text-leather-tan dark:hover:text-gold-accent hover:bg-deep-forest/5 dark:hover:bg-gold-accent/5 border border-transparent transition-all duration-300 no-hover-scale"
                }
                to="/contact"
                onClick={handleNavClick}
              >
                Contact
              </Link>

              <a
                className="mt-2 inline-flex justify-center rounded-xl px-6 py-3 bg-deep-forest text-off-white font-body-md text-sm font-semibold uppercase hover:bg-leather-tan transition-all duration-300 no-hover-scale"
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
