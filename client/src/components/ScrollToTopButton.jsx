import React, { useState, useEffect, useRef } from "react";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollUp, setIsScrollUp] = useState(false);
  const lastScrollY = useRef(0);
  const idleTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const atBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 20;

      // Clear the idle timeout whenever the user scrolls
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }

      // Visibility logic: Hide at bottom or top, show in the middle
      if (atBottom) {
        setIsVisible(false);
      } else if (currentScrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check scroll direction with a small threshold for stability
      if (currentScrollY < lastScrollY.current - 5) {
        setIsScrollUp(true);
      } else if (currentScrollY > lastScrollY.current + 5) {
        setIsScrollUp(false);
      }

      lastScrollY.current = currentScrollY;

      // Set an idle timeout to hide the button if user stops scrolling
      if (!atBottom && currentScrollY > 150) {
        idleTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 2000); // Hides after 2 seconds of inactivity
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (isScrollUp) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`fixed right-6 bottom-8 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-deep-forest/90 text-gold-accent border-2 border-gold-accent/40 shadow-lg backdrop-blur-md transition-all duration-500 ease-out hover:scale-110 hover:border-gold-accent hover:text-white hover:shadow-[0_0_25px_rgba(214,175,55,0.55)] cursor-pointer no-hover-scale ${
        isVisible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-50 pointer-events-none"
      }`}
      aria-label={isScrollUp ? "Scroll to top" : "Scroll to bottom"}
    >
      <span 
        className={`material-symbols-outlined text-[28px] font-bold transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          isScrollUp ? "rotate-0" : "rotate-180"
        }`}
      >
        arrow_upward
      </span>
    </button>
  );
}
