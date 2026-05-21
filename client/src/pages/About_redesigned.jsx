import React, { useEffect } from "react";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Vivosa Manufacturing & Sourcing Hub";
  }, []);

  return (
    <main className="bg-[#edf7f2] text-[#0e7448] overflow-x-hidden min-h-screen pb-12">
      
      {/* 1. WHO WE ARE Section (Hero Background) */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-12 bg-black overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Sewing workshop"
            className="w-full h-full object-cover opacity-40 brightness-75 scale-105"
            src="/slides/about_hero.jpg"
          />
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto text-center">
          {/* Section Divider Header */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-[2px] w-12 sm:w-20 bg-white/40"></div>
            <h1 className="text-2xl sm:text-4xl font-bold uppercase tracking-[0.2em] text-white font-space">
              WHO WE ARE
            </h1>
            <div className="h-[2px] w-12 sm:w-20 bg-white/40"></div>
          </div>

          {/* 6 Cards in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="border border-white/20 p-2 rounded-2xl bg-white/10 back




























































































































































































































































































































































































































































              
              {/* Text Side */}
              <div className="md:col-span-7 space-y-6" style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif" }}>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  Sustainability isn't a goal at Vivosa; it's the foundation of our existence. From reducing our carbon footprint in logistics to strictly adhering to fair labor practices globally, we ensure our growth never comes at the cost of the planet or people.
                </p>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  We actively partner with eco-conscious manufacturers, prioritize low-impact materials, and implement waste-reduction strategies across our supply chain, ensuring that every product we source contributes to a cleaner, more sustainable future.
                </p>
              </div>

              {/* Tree Side */}
              <div className="md:col-span-5 flex justify-center items-center">
                <div className="w-52 h-52 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-inner group">
                  <span className="material-symbols-outlined text-[90px] text-[#4caf50] animate-pulse select-none">
                    nature_people
                  </span>
                </div>
              </div>

            </div>

            {/* Tree Background accent */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-y-12 translate-x-12 select-none">
              <span className="material-symbols-outlined text-[300px]">eco</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
