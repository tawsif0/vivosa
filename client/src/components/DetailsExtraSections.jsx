import React from "react";
import { Link } from "react-router-dom";

export default function DetailsExtraSections({ privacyId = "privacy" }) {
  return (
    <>
      {/* Centered KEEP INFORMED Section */}
      <section className="bg-[#f9f9f9] py-16 px-4 border-t border-neutral-100 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-[11px] font-bold tracking-[0.35em] uppercase text-black mb-6 font-sans">
            KEEP INFORMED ABOUT OUR NEWS
          </h2>
          <form
            className="flex flex-col sm:flex-row gap-0 max-w-sm mx-auto border border-neutral-300 overflow-hidden"
            onSubmit={(e) => {
              e.preventDefault();
              // eslint-disable-next-line no-alert
              alert("Subscribed successfully!");
            }}
          >
            <input
              type="email"
              placeholder="ENTER YOUR EMAIL ADDRESS"
              className="w-full px-4 py-3 bg-white text-xs font-sans placeholder-neutral-400 focus:outline-none border-0 text-black rounded-none no-hover-scale"
              required
            />
            <button
              type="submit"
              className="bg-[#1c1c1c] text-white px-6 py-3 font-semibold text-xs tracking-widest uppercase hover:bg-black transition-colors shrink-0 rounded-none no-hover-scale"
            >
              SUBSCRIBE
            </button>
          </form>
          <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-neutral-500">
            <input
              type="checkbox"
              id={privacyId}
              className="accent-black cursor-pointer"
              required
            />
            <label htmlFor={privacyId} className="cursor-pointer font-sans select-none">
              I declare that I have read and accepted the privacy policy.{" "}
              <span className="underline cursor-pointer">(Read the policy)</span>
            </label>
          </div>
        </div>
      </section>

      {/* Three-Column HOW TO CONTACT US Section */}
      <section className="bg-white py-16 px-4 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-[11px] font-bold tracking-[0.4em] uppercase text-black mb-12 font-sans">
            HOW TO CONTACT US
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left text-xs max-w-4xl mx-auto">
            <div className="flex gap-4 items-start">
              <div className="bg-[#1c1c1c] text-white p-2 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.15 15.15 0 0 0 6.57 6.57l2.2-2.2a1 1 0 0 1 .9-.27 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1 1 0 0 1-.27.9l-2.2 2.2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold tracking-[0.2em] uppercase text-neutral-400 mb-1 font-sans">
                  PHONE
                </h3>
                <p className="text-neutral-900 font-sans tracking-wide leading-relaxed font-light">
                  +44 (0) 123 456 789
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#1c1c1c] text-white p-2 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold tracking-[0.2em] uppercase text-neutral-400 mb-1 font-sans">
                  ADDRESS
                </h3>
                <p className="text-neutral-900 font-sans tracking-wide leading-relaxed font-light">
                  19 Northampton Rd, Wellingborough,
                  <br />
                  NN8 3HG, United Kingdom
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-[#1c1c1c] text-white p-2 shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold tracking-[0.2em] uppercase text-neutral-400 mb-1 font-sans">
                  EMAIL
                </h3>
                <p className="text-neutral-900 font-sans tracking-wide leading-relaxed font-light">
                  london@vivosa.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark call-to-action Footer Banner */}
      <section className="bg-[#0f0f0f] text-white py-12 px-4 text-center border-t border-neutral-800">
        <h3 className="text-[11px] font-bold tracking-[0.25em] uppercase mb-6 text-neutral-400 font-sans">
          WOULD YOU LIKE TO RECEIVE MORE INFORMATION ABOUT OUR PRODUCTS?
        </h3>
        <Link
          to="/contact"
          className="inline-block bg-[#dcdcdc] text-black font-semibold text-[10px] tracking-[0.25em] uppercase py-3 px-8 hover:bg-white transition-colors rounded-none no-hover-scale"
        >
          CONTACT US
        </Link>
      </section>
    </>
  );
}

