import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function DesktopDropdown({
  label,
  items,
  isOpen,
  isActive,
  onToggle,
  onClose,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className={
          isOpen || isActive
            ? "inline-flex items-center gap-1 md:gap-1.5 font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-gold-accent border-b border-gold-accent pb-1 transition-colors duration-300 no-hover-scale"
            : "inline-flex items-center gap-1 md:gap-1.5 font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-white/90 hover:text-gold-accent transition-colors duration-300 no-hover-scale"
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
          className="absolute left-0 mt-4 min-w-64 rounded-2xl border border-white/10 bg-[#003222]/95 backdrop-blur-md shadow-xl overflow-hidden"
          role="menu"
        >
          {items.map((item) => {
            const isItemActive = window.location.pathname === item.href;
            return (
              <a
                key={`${label}-${item.label}`}
                className={
                  isItemActive
                    ? "block px-5 py-3 font-body-md text-body-md tracking-wide uppercase text-gold-accent bg-white/5 transition-colors duration-300"
                    : "block px-5 py-3 font-body-md text-body-md tracking-wide uppercase text-white/80 hover:text-gold-accent hover:bg-white/5 transition-colors duration-300"
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
          isOpen
            ? "w-full inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-gold-accent no-hover-scale"
            : "w-full inline-flex items-center justify-between rounded-xl border border-white/10 bg-transparent px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-gold-accent hover:bg-white/5 no-hover-scale"
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
        <div className="pl-4 flex flex-col gap-1.5 border-l border-white/10 ml-4 mt-1">
          {items.map((item) => {
            const isItemActive = window.location.pathname === item.href;
            return (
              <a
                key={`m-${label}-${item.label}`}
                className={
                  isItemActive
                    ? "rounded-xl px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-gold-accent bg-white/5 transition"
                    : "rounded-xl px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-white/80 hover:text-gold-accent hover:bg-white/5 transition"
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

function DesktopApparelDropdown({
  isOpen,
  isActive,
  onToggle,
  onClose,
  mensItems,
  womensItems,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className={
          isOpen || isActive
            ? "inline-flex items-center gap-1 md:gap-1.5 font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-gold-accent border-b border-gold-accent pb-1 transition-colors duration-300 no-hover-scale"
            : "inline-flex items-center gap-1 md:gap-1.5 font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-white/90 hover:text-gold-accent transition-colors duration-300 no-hover-scale"
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
        Apparel
        <span className="material-symbols-outlined text-[13px] lg:text-[16px] xl:text-[18px]">
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      {isOpen ? (
        <div
          className="absolute left-1/2 -translate-x-1/2 mt-4 w-[600px] rounded-2xl border border-white/10 bg-[#003222]/95 backdrop-blur-md shadow-xl overflow-hidden p-6 grid grid-cols-3 gap-6"
          role="menu"
          onMouseDown={(e) => e.preventDefault()}
        >
          {/* Men's Column */}
          <div>
            <h6 className="font-semibold text-xs text-gold-accent tracking-wider uppercase mb-3 border-b border-white/10 pb-1">
              Men's
            </h6>
            <div className="flex flex-col gap-1.5">
              {mensItems.map((item) => {
                const isItemActive = window.location.pathname === item.href;
                return (
                  <a
                    key={`apparel-men-${item.label}`}
                    href={item.href}
                    className={`text-xs uppercase tracking-wide transition-colors py-0.5 ${
                      isItemActive
                        ? "text-gold-accent font-semibold"
                        : "text-white/80 hover:text-gold-accent"
                    }`}
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
          </div>

          {/* Women's Column */}
          <div>
            <h6 className="font-semibold text-xs text-gold-accent tracking-wider uppercase mb-3 border-b border-white/10 pb-1">
              Women's
            </h6>
            <div className="flex flex-col gap-1.5">
              {womensItems.map((item) => {
                const isItemActive = window.location.pathname === item.href;
                return (
                  <a
                    key={`apparel-women-${item.label}`}
                    href={item.href}
                    className={`text-xs uppercase tracking-wide transition-colors py-0.5 ${
                      isItemActive
                        ? "text-gold-accent font-semibold"
                        : "text-white/80 hover:text-gold-accent"
                    }`}
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
          </div>

          {/* Kids Column */}
          <div>
            <h6 className="font-semibold text-xs text-gold-accent tracking-wider uppercase mb-3 border-b border-white/10 pb-1">
              Kids
            </h6>
            <div className="flex flex-col gap-2">
              <a
                href="/kids"
                className={`text-xs uppercase tracking-wide font-bold transition-colors py-0.5 ${
                  window.location.pathname === "/kids"
                    ? "text-gold-accent"
                    : "text-white/80 hover:text-gold-accent"
                }`}
                onClick={() => {
                  onClose();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Kids Collection
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MobileApparelAccordion({
  isOpen,
  isActive,
  onItemClick,
  mensItems,
  womensItems,
}) {
  const [isMenOpen, setIsMenOpen] = useState(false);
  const [isWomenOpen, setIsWomenOpen] = useState(false);

  const isMenActive = mensItems.some(
    (item) => window.location.pathname === item.href,
  );
  const isWomenActive = womensItems.some(
    (item) => window.location.pathname === item.href,
  );
  const isKidsActive = window.location.pathname === "/kids";

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        className={
          isOpen
            ? "w-full inline-flex items-center justify-between rounded-xl border border-white/20 bg-white/5 px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-gold-accent no-hover-scale"
            : "w-full inline-flex items-center justify-between rounded-xl border border-white/10 bg-transparent px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-gold-accent hover:bg-white/5 no-hover-scale"
        }
        aria-expanded={isOpen}
        onClick={onItemClick}
      >
        Apparel
        <span className="material-symbols-outlined text-[18px]">
          {isOpen ? "expand_less" : "expand_more"}
        </span>
      </button>

      {isOpen ? (
        <div className="pl-4 flex flex-col gap-3 border-l border-outline/10 ml-4 mt-1">
          {/* Men's Header/List */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setIsMenOpen(!isMenOpen)}
              className={`w-full text-left text-xs font-semibold uppercase tracking-wider flex justify-between items-center pr-2 py-1 ${
                isMenActive
                  ? "text-gold-accent"
                  : "text-white/80 hover:text-gold-accent"
              }`}
            >
              <span>Men's</span>
              <span className="material-symbols-outlined text-[14px]">
                {isMenOpen ? "expand_less" : "expand_more"}
              </span>
            </button>
            {isMenOpen && (
              <div className="pl-3 flex flex-col gap-1.5 border-l border-white/10 ml-2">
                {mensItems.map((item) => {
                  const isItemActive = window.location.pathname === item.href;
                  return (
                    <a
                      key={`m-app-men-${item.label}`}
                      className={`text-[11px] uppercase tracking-wider transition-colors ${
                        isItemActive
                          ? "text-gold-accent font-semibold"
                          : "text-white/70 hover:text-gold-accent"
                      }`}
                      href={item.href}
                      onClick={onItemClick}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Women's Header/List */}
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setIsWomenOpen(!isWomenOpen)}
              className={`w-full text-left text-xs font-semibold uppercase tracking-wider flex justify-between items-center pr-2 py-1 ${
                isWomenActive
                  ? "text-gold-accent"
                  : "text-white/80 hover:text-gold-accent"
              }`}
            >
              <span>Women's</span>
              <span className="material-symbols-outlined text-[14px]">
                {isWomenOpen ? "expand_less" : "expand_more"}
              </span>
            </button>
            {isWomenOpen && (
              <div className="pl-3 flex flex-col gap-1.5 border-l border-white/10 ml-2">
                {womensItems.map((item) => {
                  const isItemActive = window.location.pathname === item.href;
                  return (
                    <a
                      key={`m-app-women-${item.label}`}
                      className={`text-[11px] uppercase tracking-wider transition-colors ${
                        isItemActive
                          ? "text-gold-accent font-semibold"
                          : "text-white/70 hover:text-gold-accent"
                      }`}
                      href={item.href}
                      onClick={onItemClick}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Kids Link */}
          <div className="py-1">
            <a
              className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                isKidsActive
                  ? "text-gold-accent"
                  : "text-white/80 hover:text-gold-accent"
              }`}
              href="/kids"
              onClick={onItemClick}
            >
              Kids Collection
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState(null); // "leather" | "apparel" | null
  const [mobileOpenSection, setMobileOpenSection] = useState(null); // "leather" | "apparel" | null
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
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
          { label: "Sweatshirts", href: "/mens/joggers" },
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

  const searchItems = useMemo(
    () => [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      ...data.leather.items,
      ...data.mens.items,
      ...data.womens.items,
      { label: "Kids Collection", href: "/kids" },
    ],
    [data],
  );

  const filteredSearchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];

    return searchItems
      .filter(
        (item) =>
          item.label.toLowerCase().includes(term) ||
          item.href.toLowerCase().includes(term),
      )
      .slice(0, 6);
  }, [searchItems, searchTerm]);

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
      className="fixed top-0 left-0 w-full z-50 bg-[#004b35]/95 backdrop-blur-md shadow-sm border-b border-white/10 cursor-pointer"
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
          Our website is under construction due to technical issues. We
          apologize for any inconvenience and are working to resolve the issue
          as soon as possible.
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
          <img
            alt="Logo"
            className="h-8 md:h-10 lg:h-12 xl:h-14 w-auto transition-all duration-300"
            src="/vite.png"
          />
        </Link>

        <div className="hidden md:flex md:gap-3 lg:gap-5 xl:gap-8 items-center">
          <Link
            className={
              location.pathname === "/"
                ? "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-gold-accent border-b border-gold-accent pb-1 transition-colors duration-300"
                : "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-white/90 hover:text-gold-accent transition-colors duration-300"
            }
            to="/"
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            className={
              location.pathname === "/about"
                ? "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-gold-accent border-b border-gold-accent pb-1 transition-colors duration-300"
                : "font-body-md text-[11px] lg:text-sm xl:text-body-md tracking-wide uppercase text-white/90 hover:text-gold-accent transition-colors duration-300"
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
            isActive={data.leather.items.some(
              (item) => location.pathname === item.href,
            )}
            onToggle={() =>
              setDesktopOpenDropdown((value) =>
                value === "leather" ? null : "leather",
              )
            }
            onClose={() => setDesktopOpenDropdown(null)}
          />

          <DesktopApparelDropdown
            isOpen={desktopOpenDropdown === "apparel"}
            isActive={
              data.mens.items.some((item) => location.pathname === item.href) ||
              data.womens.items.some(
                (item) => location.pathname === item.href,
              ) ||
              location.pathname === "/kids"
            }
            onToggle={() =>
              setDesktopOpenDropdown((value) =>
                value === "apparel" ? null : "apparel",
              )
            }
            onClose={() => setDesktopOpenDropdown(null)}
            mensItems={data.mens.items}
            womensItems={data.womens.items}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              className={
                isSearchOpen
                  ? "inline-flex items-center justify-center p-2 rounded-full text-gold-accent bg-white/10 transition-colors duration-300 no-hover-scale"
                  : "inline-flex items-center justify-center p-2 rounded-full text-white hover:text-gold-accent hover:bg-white/10 transition-colors duration-300 no-hover-scale"
              }
              aria-label="Search"
              aria-expanded={isSearchOpen}
              onClick={(event) => {
                event.stopPropagation();
                setDesktopOpenDropdown(null);
                setIsSearchOpen((value) => {
                  if (value) setSearchTerm("");
                  return !value;
                });
              }}
            >
              <span className="material-symbols-outlined text-[22px] xl:text-[24px]">
                {isSearchOpen ? "close" : "search"}
              </span>
            </button>

            {isSearchOpen && (
              <div
                className="absolute right-0 top-full mt-3 w-[min(320px,calc(100vw-5rem))] xl:w-[400px] rounded-2xl border border-white/10 bg-[#003222]/95 backdrop-blur-md shadow-xl p-3 z-30"
                onClick={(event) => event.stopPropagation()}
              >
                <input
                  type="text"
                  value={searchTerm}
                  autoFocus
                  placeholder="Search apparel, leather, contact..."
                  className="w-full rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs text-white placeholder:text-white/50 focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/20 transition"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && filteredSearchResults[0]) {
                      navigate(filteredSearchResults[0].href);
                      setSearchTerm("");
                      setIsSearchOpen(false);
                    } else if (event.key === "Escape") {
                      setIsSearchOpen(false);
                      setSearchTerm("");
                    }
                  }}
                />
                {filteredSearchResults.length > 0 && (
                  <div className="mt-2 rounded-2xl border border-white/10 bg-[#002816] shadow-xl overflow-hidden">
                    {filteredSearchResults.map((result) => (
                      <button
                        key={result.href}
                        type="button"
                        className="w-full text-left px-4 py-3 text-xs uppercase tracking-wide text-white/90 hover:bg-white/5 hover:text-gold-accent transition"
                        onClick={() => {
                          navigate(result.href);
                          setSearchTerm("");
                          setIsSearchOpen(false);
                        }}
                      >
                        {result.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <a
            className="hidden md:inline-flex px-4 py-2 xl:px-6 xl:py-2.5 bg-deep-forest text-off-white font-body-md text-[11px] lg:text-sm xl:text-body-md uppercase border border-white/10 hover:border-gold-accent hover:bg-leather-tan transition-all duration-300 scale-95 hover:scale-100"
            href="/contact"
            onClick={handleNavClick}
          >
            Contact Us
          </a>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-white hover:text-gold-accent hover:bg-white/10 transition-colors duration-300 no-hover-scale"
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

      <div className={isMobileMenuOpen ? "md:hidden" : "hidden"}>
        <div className="px-4 sm:px-6 lg:px-8 pb-4 max-w-container-max mx-auto">
          <div className="rounded-2xl border border-white/10 bg-[#004b35]/95 backdrop-blur-md p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl border border-white/10 bg-[#003222]/95 p-3 mb-3">
                <input
                  type="text"
                  value={searchTerm}
                  placeholder="Search pages, apparel, leather..."
                  className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white placeholder:text-white/50 focus:border-gold-accent focus:outline-none focus:ring-2 focus:ring-gold-accent/20 transition"
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onClick={(event) => event.stopPropagation()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && filteredSearchResults[0]) {
                      navigate(filteredSearchResults[0].href);
                      setSearchTerm("");
                      setIsMobileMenuOpen(false);
                    }
                  }}
                />
                {filteredSearchResults.length > 0 && (
                  <div className="mt-2 rounded-2xl border border-white/10 bg-[#002816] text-left overflow-hidden">
                    {filteredSearchResults.map((result) => (
                      <button
                        key={result.href}
                        type="button"
                        className="w-full px-4 py-3 text-xs uppercase tracking-wide text-white/90 hover:bg-white/5 hover:text-gold-accent transition"
                        onClick={() => {
                          navigate(result.href);
                          setSearchTerm("");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {result.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link
                className={
                  location.pathname === "/"
                    ? "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-gold-accent bg-white/5 border border-gold-accent/20 transition-all duration-300 no-hover-scale"
                    : "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-gold-accent hover:bg-white/5 border border-transparent transition-all duration-300 no-hover-scale"
                }
                to="/"
                onClick={handleNavClick}
              >
                Home
              </Link>
              <Link
                className={
                  location.pathname === "/about"
                    ? "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-gold-accent bg-white/5 border border-gold-accent/20 transition-all duration-300 no-hover-scale"
                    : "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-gold-accent hover:bg-white/5 border border-transparent transition-all duration-300 no-hover-scale"
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
                isActive={data.leather.items.some(
                  (item) => location.pathname === item.href,
                )}
                onItemClick={() =>
                  setMobileOpenSection((value) =>
                    value === "leather" ? null : "leather",
                  )
                }
              />

              <MobileApparelAccordion
                isOpen={mobileOpenSection === "apparel"}
                isActive={
                  data.mens.items.some(
                    (item) => location.pathname === item.href,
                  ) ||
                  data.womens.items.some(
                    (item) => location.pathname === item.href,
                  ) ||
                  location.pathname === "/kids"
                }
                onItemClick={() =>
                  setMobileOpenSection((value) =>
                    value === "apparel" ? null : "apparel",
                  )
                }
                mensItems={data.mens.items}
                womensItems={data.womens.items}
              />

              <Link
                className={
                  location.pathname === "/contact"
                    ? "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-gold-accent bg-white/5 border border-gold-accent/20 transition-all duration-300 no-hover-scale"
                    : "rounded-xl px-4 py-3 font-body-md text-sm font-semibold uppercase tracking-wider text-white/90 hover:text-gold-accent hover:bg-white/5 border border-transparent transition-all duration-300 no-hover-scale"
                }
                to="/contact"
                onClick={handleNavClick}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
