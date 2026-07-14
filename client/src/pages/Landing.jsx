import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { submitContactForm } from "../api/contact";

const WEB3FORMS_ACCESS_KEY = "2c59bc83-be0f-4302-ba0a-bbbb401b349d";

export default function Landing() {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleContactChange = (e) => {
    setContactForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (isSubmittingContact) return;
    setIsSubmittingContact(true);

    const fullName = `${contactForm.firstName} ${contactForm.lastName}`.trim();

    try {
      // Primary: send the message to the client's inbox via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New enquiry from Vivosa website",
          from_name: "Vivosa Website",
          name: fullName,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to send message");
      }

      // Best-effort: also store in the admin dashboard. Ignore failures so
      // email delivery is never blocked by the backend being unavailable.
      submitContactForm({
        name: fullName,
        email: contactForm.email,
        message: contactForm.message,
        company: "",
        phone: "",
        interest: "General Inquiry (Landing)",
      }).catch(() => {});

      setContactForm({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
      toast.success("Your message has been sent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const logoScrollRef = useRef(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isLogoDragging, setIsLogoDragging] = useState(false);
  const startLogoXRef = useRef(0);
  const scrollLeftLogoRef = useRef(0);

  const [apparelSlide, setApparelSlide] = useState(0);
  const [leatherSlide, setLeatherSlide] = useState(0);

  // Scroll position for hero image parallax animation
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const apparelSlides = [
    { src: "/slides/L1.png", alt: "Apparel Sourcing Slide 1" },
    { src: "/slides/L2.png", alt: "Apparel Sourcing Slide 2" },
    { src: "/slides/L3.png", alt: "Apparel Sourcing Slide 3" },
    { src: "/slides/L4.png", alt: "Apparel Sourcing Slide 4" },
    { src: "/slides/L5.png", alt: "Apparel Sourcing Slide 5" },
  ];

  const leatherSlides = [
    { src: "/slides/s1.png", alt: "Leather Sourcing Slide 1" },
    { src: "/slides/s2.png", alt: "Leather Sourcing Slide 2" },
    { src: "/slides/s3.png", alt: "Leather Sourcing Slide 3" },
    { src: "/slides/s4.png", alt: "Leather Sourcing Slide 4" },
    { src: "/slides/s5.png", alt: "Leather Sourcing Slide 5" },
    { src: "/slides/s6.png", alt: "Leather Sourcing Slide 6" },
    { src: "/slides/s7.png", alt: "Leather Sourcing Slide 7" },
    { src: "/slides/s8.png", alt: "Leather Sourcing Slide 8" },
  ];

  // Auto-advance sliders independently
  useEffect(() => {
    const apparelTimer = setInterval(() => {
      setApparelSlide((prev) => (prev + 1) % apparelSlides.length);
    }, 6000);
    const leatherTimer = setInterval(() => {
      setLeatherSlide((prev) => (prev + 1) % leatherSlides.length);
    }, 7000);
    return () => {
      clearInterval(apparelTimer);
      clearInterval(leatherTimer);
    };
  }, []);

  // Butter-smooth continuous infinite autoplay marquee loop for Accreditations
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isLogoHovered && !isLogoDragging && logoScrollRef.current) {
        const el = logoScrollRef.current;
        el.scrollLeft += 0.8; // Smooth moderate speed

        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLogoHovered, isLogoDragging]);

  const handleLogoMouseDown = (e) => {
    setIsLogoDragging(true);
    if (logoScrollRef.current) {
      startLogoXRef.current = e.pageX - logoScrollRef.current.offsetLeft;
      scrollLeftLogoRef.current = logoScrollRef.current.scrollLeft;
    }
  };

  const handleLogoMouseMove = (e) => {
    if (!isLogoDragging || !logoScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - logoScrollRef.current.offsetLeft;
    const walk = (x - startLogoXRef.current) * 1.5;
    const el = logoScrollRef.current;
    let targetScroll = scrollLeftLogoRef.current - walk;

    if (targetScroll < 0) {
      targetScroll += el.scrollWidth / 2;
    } else if (targetScroll >= el.scrollWidth / 2) {
      targetScroll -= el.scrollWidth / 2;
    }

    el.scrollLeft = targetScroll;
  };

  const handleLogoMouseUpOrLeave = () => {
    setIsLogoDragging(false);
  };

  const accreditationLogos = [
    {
      alt: "Better Cotton Initiative Logo",
      src: "/logos/better-cotton.png",
    },
    {
      alt: "OEKO-TEX Certified Logo",
      src: "/logos/cert-1000046080.jpg",
    },
    {
      alt: "GOTS Certified Logo",
      src: "/logos/cert-1000046081.png",
    },
    {
      alt: "Global Standard Certification",
      src: "/logos/cert-1000046082.jpg",
    },
    {
      alt: "BSI Certification",
      src: "/logos/bsi.jpg",
    },
    {
      alt: "BSCI Certified Factory",
      src: "/logos/bsic.jpg",
    },
    {
      alt: "ISO Standard Compliance",
      src: "/logos/iso.png",
    },
    {
      alt: "LWG - Leather Working Group Logo",
      src: "/logos/lwg.jpg",
    },
    {
      alt: "Accredited Sourcing Standard Logo",
      src: "/logos/chrome-screenshot.jpg",
    },
  ];

  return (
    <div
      id="top"
      className="bg-surface text-on-surface selection:bg-gold-accent selection:text-pure-black"
    >
      {/* Hero Section */}
      <header className="relative min-h-[100svh] flex items-center overflow-hidden pt-28 pb-16 lg:py-24 bg-gradient-to-br from-deep-forest to-[#002115]">
        <div className="absolute inset-0 z-0">
          <img
            className="absolute inset-0 w-full h-full object-cover object-[50%_center] brightness-[0.22] contrast-[1.05] z-0"
            alt="Vivosa Leather Sourcing Factory Worker with Green Leather"
            src="/hero-bg.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#004b35]/95 via-[#004b35]/85 to-[#004b35]/70 z-10"></div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto w-full text-off-white px-4 sm:px-6 lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-6 max-w-2xl">
              <span className="font-label-caps text-gold-accent tracking-[0.3em] uppercase block mb-6 mt-12 lg:mt-20">
                Redefining Craftsmanship
              </span>
              <h1 className="text-lg text-display-lg-mobile md:text-display-lg mb-8">
                Welcome to Vivosa.
              </h1>
              <p className="font-body-lg text-body-lg mb-6 text-surface-variant/90 leading-relaxed">
                We are delighted to hear your ideas and designs, and we love
                working together ethically bring your dream project to life.
              </p>
              <p className="font-body-lg text-body-lg mb-10 text-surface-variant/90 leading-relaxed">
                Our commitment is to sustainable sourcing with honesty and
                integrity and providing the best service. We believe that
                experience, efficiency, professionalism, social responsibility,
                environmental awareness, and a relentless drive for innovation
                are the keys to creating authentic products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <a
                  className="px-8 sm:px-10 py-4 bg-deep-forest border border-deep-forest text-off-white font-label-caps uppercase hover:bg-transparent hover:border-off-white transition-all duration-300 inline-flex items-center justify-center gap-2 group"
                  href="#about"
                >
                  View More
                  <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </a>
                <a
                  className="px-8 sm:px-10 py-4 border border-off-white text-off-white font-label-caps uppercase hover:bg-off-white hover:text-deep-forest transition-all duration-300 inline-flex items-center justify-center gap-2"
                  href="#contact"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    mail
                  </span>
                  Contact Us
                </a>
              </div>
            </div>

            {/* Right Column: Overlapping Images Layout */}
            <div className="lg:col-span-6 relative flex justify-center items-center mt-12 lg:mt-0">
              <div className="relative w-full max-w-[500px] h-[350px] sm:h-[450px] md:h-[480px]">
                {/* Left Image: Apparel (Smiling girls stitching) */}
                <div
                  className="group absolute left-0 bottom-4 w-[62%] aspect-[4/3] rounded-2xl overflow-hidden border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-10 will-change-transform hover:z-30"
                  style={{
                    transform: `translateY(${Math.min(scrollY * 0.08, 60)}px)`,
                  }}
                >
                  <img
                    src="/Landing/dd.png"
                    alt="Apparel manufacturing stitching"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Right Image: Leather Cutting */}
                <div
                  className="group absolute right-0 top-4 w-[58%] aspect-[3/4] rounded-2xl overflow-hidden border-[10px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-20 will-change-transform hover:z-30"
                  style={{
                    transform: `translateY(-${Math.min(scrollY * 0.08, 60)}px)`,
                  }}
                >
                  <img
                    src="/Landing/sa.png"
                    alt="Artisan hands cutting leather"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer group z-20 hidden lg:flex"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <span className="font-label-caps text-[10px] tracking-[0.2em] text-white/80 group-hover:text-gold-accent transition-colors duration-300">
            SCROLL DOWN
          </span>
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/60 group-hover:border-gold-accent flex justify-center p-1.5 transition-colors duration-300">
            <div className="w-[4px] h-[10px] bg-white group-hover:bg-gold-accent rounded-full animate-wheel-scroll"></div>
          </div>
        </div>
      </header>

      {/* Excellence Section (Vision & Mission Statement) */}
      <section
        className="py-16 md:py-20 lg:py-24 max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop"
        id="about"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center">
          <div className="relative group">
            <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-28 h-28 sm:w-40 sm:h-40 bg-emerald-mint -z-10 transition-transform duration-500 group-hover:scale-110"></div>
            <div className="overflow-hidden shadow-2xl rounded-2xl">
              <img
                className="w-full aspect-[4/5] object-cover hover-zoom-img rounded-2xl"
                alt="Leather Sourcing and Craftsmanship"
                src="/slides/about_hero.avif"
              />
            </div>
          </div>
          <div>
            <span className="font-label-caps text-gold-accent tracking-widest block mb-4">
              Our Core Strategy
            </span>
            <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-deep-forest mb-8">
              Our Vision &amp; Mission
            </h2>
            <div className="space-y-8 font-body-lg text-on-surface-variant leading-relaxed">
              <div>
                <h4 className="font-label-caps text-sm text-gold-accent uppercase tracking-wider mb-2 font-semibold">
                  OUR VISION
                </h4>
                <p className="mb-3">
                  Our vision extends outside our business. We aspire to make a
                  good impact on the globe, from the communities where we obtain
                  our raw materials to how our products help our consumers live
                  livelier.
                </p>
                <p>
                  Our top priorities are customer satisfaction and their values
                  and working together to build a pleasant and trustable work
                  environment. We are committed to listening to our customers
                  and consistently offering reliable, innovative, and
                  long-lasting quality solutions to guarantee their safety and
                  sustainability.
                </p>
              </div>

              <div>
                <h4 className="font-label-caps text-sm text-gold-accent uppercase tracking-wider mb-2 font-semibold">
                  OUR MISSION
                </h4>
                <p className="mb-3">
                  Our mission is to work with our partners to create a brighter
                  future. Engaging with us means we invite our clients to join.
                </p>
                <p>
                  In our commitment to sustainability, we actively seek social,
                  economic, and environmental sustainability, placing a high
                  priority on the welfare of our employees and the community,
                  prioritizing constant enhancement and proactive growth.
                </p>
              </div>
            </div>

            <div className="mt-10 sm:mt-12 grid grid-cols-3 gap-4 sm:gap-8">
              <div className="text-center">
                <span className="block font-display-lg text-4xl text-gold-accent mb-2">
                  100%
                </span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  Sustainable Sourcing
                </span>
              </div>
              <div className="text-center">
                <span className="block font-display-lg text-4xl text-gold-accent mb-2">
                  50+
                </span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  Global Partners
                </span>
              </div>
              <div className="text-center">
                <span className="block font-display-lg text-4xl text-gold-accent mb-2">
                  Zero
                </span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">
                  Compromise
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Identity & Philosophy Section */}
      <section className="py-16 md:py-24 bg-surface-container-low border-b border-outline/5">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="font-label-caps text-gold-accent tracking-widest block mb-4">
                Our Identity
              </span>
              <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-deep-forest mb-6">
                Stay Lively. Express Yourself.
              </h2>
              <p className="font-display-lg text-2xl md:text-3xl text-leather-tan leading-snug italic font-normal">
                &quot;Vivosa means stay lively — expressing your individuality
                and inner self through your choices.&quot;
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6 font-body-lg text-on-surface-variant leading-relaxed">
              <p>
                <strong>Vivosa</strong> is a young, active firm that is deeply
                involved in both the leather and apparel industries. It was
                founded by individuals with over 30 years of professional
                experience, proven technical proficiency, and a constant
                willingness to take on new challenges and accomplish new goals.
              </p>
              <p>
                Our primary objective is sourcing materials ethically from
                sustainable manufacturers who are ecologically conscious,
                strictly follow fair business practices, and have been working
                in the sector for decades. As a result, we have built a strong
                presence in the UK, Europe, and numerous other global markets.
              </p>
              <p>
                We believe that wearing and using what resonates with you and
                makes you feel confident is far more important than following
                trends blindly. Every individual is unique, with their own
                choices and lifestyle. By combining these individual needs with
                premium craftsmanship, exceptional pricing, and sustainability,
                we design products that keep our customers satisfied and lively.
                This is the core reason behind selecting <strong>Vivosa</strong>{" "}
                as our company name.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Values */}
      <section
        className="py-16 md:py-20 lg:py-24 max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop"
        id="why-choose-us"
      >
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto">
          <span className="font-label-caps text-gold-accent tracking-widest block mb-4">
            Core Philosophy
          </span>
          <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-deep-forest mb-6">
            WHY CHOOSE US
          </h2>
          <div className="space-y-4 font-body-lg text-on-surface-variant leading-relaxed">
            <p className="font-semibold text-lg text-deep-forest">
              Customers choose us for our expertise, efficiency, and commitment
              to building long-term partnerships based on trust and value. We
              understand that sourcing is more than just finding products — it
              is about fostering lasting relationships, ensuring quality, and
              creating value for every stakeholder.
            </p>
            <p>
              Because of our years of experience in apparel and leather
              manufacturing, we have become a trusted partner for global buyers,
              brands, suppliers, and factories. We work exclusively with
              carefully selected manufacturers who hold internationally
              recognized certifications, ensuring that every product meets the
              highest standards of quality, safety, sustainability, and ethical
              practices.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Card 1: Ethical Sourcing */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                eco
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                Ethical Sourcing
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                We guarantee that materials are sourced from internationally
                renowned sustainable producers who care about the community and
                environment and have been making ethical products for over 50
                years.
              </p>
            </div>
          </div>

          {/* Card 2: Wide Range */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                category
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                Wide range of products
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                To satisfy all your sourcing demands, we provide an extensive
                variety of premium products in both sustainable leather and
                bespoke clothing manufacturing.
              </p>
            </div>
          </div>

          {/* Card 3: Customizations */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                tune
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                Customizations
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                We welcome modifications in your approved order, confirmed by
                samples, including any cut, style, colour, pattern, packing, or
                print ideas you wish to bring to life.
              </p>
            </div>
          </div>

          {/* Card 4: Quality Control */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                verified
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                Quality control
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                Our in-house quality control team conducts rigorous
                pre-production, inline, and final inspections to ensure both
                leather and apparel products contain zero defects.
              </p>
            </div>
          </div>

          {/* Card 5: Exceptional Price */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                payments
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                Exceptionals price
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                We guarantee that our premium products are reasonably priced. We
                encourage clients to check our quality and pricing with quotes
                and samples from other vendors.
              </p>
            </div>
          </div>

          {/* Card 6: Research & Innovation */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                psychology
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                Researching and innovation
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                Our team conducts extensive research to support innovation,
                offering cutting-edge technologies and deep market insight to
                drive new products and procedures.
              </p>
            </div>
          </div>

          {/* Card 7: Customer Satisfaction */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                sentiment_very_satisfied
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                Customer Satisfaction
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                Your satisfaction is our top priority. We guarantee a
                hassle-free and enjoyable experience from the initial order
                placement to final delivery.
              </p>
            </div>
          </div>

          {/* Card 8: Fast Delivery */}
          <div className="p-6 md:p-8 border border-outline/10 hover-lift hover-lift-gold bg-surface transition-colors duration-500 flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-4xl text-gold-accent mb-6">
                local_shipping
              </span>
              <h4 className="font-headline-md text-deep-forest mb-4 text-xl">
                First Delivery
              </h4>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-xs">
                We work directly with trusted global logistics partners to
                ensure all deliveries happen strictly on schedule, no matter
                where you are located.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Dual Category Cinematic Showcase */}
      <section className="relative overflow-hidden select-none" id="production">
        {/* Ken Burns zoom keyframes + progress-bar fill */}
        <style>{`
          @keyframes kenBurnsZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
          @keyframes progressFill {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}</style>

        {/* ── Section Header ── */}
        <div className="relative z-10 bg-[#0c1a14] text-center pt-14 pb-10 md:pt-20 md:pb-14 px-4">
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <span className="relative font-label-caps text-gold-accent tracking-[0.35em] uppercase block mb-5 text-xs">
            What We Source
          </span>
          <h2 className="relative font-display-lg text-4xl md:text-6xl lg:text-7xl text-white font-bold leading-tight">
            Two Industries.{" "}
            <span className="italic font-light" style={{ color: "#cda250" }}>
              One Vision.
            </span>
          </h2>
          <div
            className="w-16 h-[2px] mx-auto mt-7"
            style={{ background: "#cda250" }}
          />
        </div>

        {/* ── Full-bleed Split Panels ── */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ─── LEFT: APPAREL ─── */}
          <div
            className="relative group overflow-hidden cursor-pointer flex items-center justify-center bg-[#05110c]"
            style={{ height: "420px" }}
            onClick={() =>
              setApparelSlide((prev) => (prev + 1) % apparelSlides.length)
            }
          >
            {/* Background blurred image to fill space beautifully without pixelation */}
            <img
              key={`apparel-bg-${apparelSlide}`}
              src={apparelSlides[apparelSlide].src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
            />

            {/* Foreground crisp native 300x300 resolution image */}
            <img
              key={`apparel-fg-${apparelSlide}`}
              src={apparelSlides[apparelSlide].src}
              alt={apparelSlides[apparelSlide].alt}
              className="relative w-[300px] h-[300px] object-contain z-10 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-105 mb-12"
              loading="eager"
            />

            {/* Rich gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020705]/95 via-[#020705]/50 to-transparent pointer-events-none z-10" />

            {/* Gold vertical divider on right edge (desktop) */}
            <div
              className="absolute top-0 right-0 w-[1px] h-full pointer-events-none hidden md:block"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, #cda250 40%, #cda250 60%, transparent)",
                opacity: 0.35,
              }}
            />

            {/* Category badge */}
            <div className="absolute top-8 left-8 z-10">
              <span
                className="px-4 py-2 font-label-caps text-xs tracking-widest backdrop-blur-sm border"
                style={{
                  borderColor: "rgba(205,162,80,0.45)",
                  color: "#cda250",
                  background: "rgba(0,0,0,0.45)",
                }}
              >
                01 / APPAREL
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
              <h3
                className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase leading-none mb-3"
                style={{ color: "#cda250" }}
              >
                APPAREL
              </h3>

              {/* Animated underline */}
              <div
                className="h-[2px] mb-4 transition-all duration-700 origin-left group-hover:w-24"
                style={{ width: "3rem", background: "#cda250" }}
              />

              <p className="text-white/70 text-xs leading-relaxed max-w-sm mb-4 font-body-lg">
                Knitwear, woven, denim &amp; workwear — sourced from
                Bangladesh's finest BSCI-certified, sustainably operating
                factories.
              </p>

              {/* Progress-bar slide indicators */}
              <div className="flex gap-2 items-center">
                {apparelSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setApparelSlide(idx);
                    }}
                    aria-label={`Apparel slide ${idx + 1}`}
                    className="relative h-[3px] rounded-full overflow-hidden"
                    style={{
                      width: apparelSlide === idx ? "2.5rem" : "0.75rem",
                      background: "rgba(255,255,255,0.15)",
                      transition: "width 0.4s ease",
                    }}
                  >
                    {apparelSlide === idx && (
                      <span
                        key={`apparel-progress-${apparelSlide}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: "#cda250",
                          animation: "progressFill 6s linear forwards",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: LEATHER ─── */}
          <div
            className="relative group overflow-hidden cursor-pointer flex items-center justify-center bg-[#05110c]"
            style={{ height: "420px" }}
            onClick={() =>
              setLeatherSlide((prev) => (prev + 1) % leatherSlides.length)
            }
          >
            {/* Background blurred image to fill space beautifully without pixelation */}
            <img
              key={`leather-bg-${leatherSlide}`}
              src={leatherSlides[leatherSlide].src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
            />

            {/* Foreground crisp native 300x300 resolution image */}
            <img
              key={`leather-fg-${leatherSlide}`}
              src={leatherSlides[leatherSlide].src}
              alt={leatherSlides[leatherSlide].alt}
              className="relative w-[300px] h-[300px] object-contain z-10 pointer-events-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-transform duration-700 group-hover:scale-105 mb-12"
              loading="eager"
            />

            {/* Rich gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020705]/95 via-[#020705]/50 to-transparent pointer-events-none z-10" />

            {/* Category badge */}
            <div className="absolute top-8 left-8 z-10">
              <span
                className="px-4 py-2 font-label-caps text-xs tracking-widest backdrop-blur-sm border"
                style={{
                  borderColor: "rgba(205,162,80,0.45)",
                  color: "#cda250",
                  background: "rgba(0,0,0,0.45)",
                }}
              >
                02 / LEATHER
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
              <h3
                className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest uppercase leading-none mb-3"
                style={{ color: "#cda250" }}
              >
                LEATHER
              </h3>

              <div
                className="h-[2px] mb-4 transition-all duration-700 origin-left group-hover:w-24"
                style={{ width: "3rem", background: "#cda250" }}
              />

              <p className="text-white/70 text-xs leading-relaxed max-w-sm mb-4 font-body-lg">
                Premium Italian-tanned hides for furniture, footwear, leather
                goods &amp; automotive — over 1,000 articles in a vast range of
                colours and finishes.
              </p>

              {/* Progress-bar slide indicators */}
              <div className="flex gap-2 items-center">
                {leatherSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLeatherSlide(idx);
                    }}
                    aria-label={`Leather slide ${idx + 1}`}
                    className="relative h-[3px] rounded-full overflow-hidden"
                    style={{
                      width: leatherSlide === idx ? "2.5rem" : "0.75rem",
                      background: "rgba(255,255,255,0.15)",
                      transition: "width 0.4s ease",
                    }}
                  >
                    {leatherSlide === idx && (
                      <span
                        key={`leather-progress-${leatherSlide}`}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: "#cda250",
                          animation: "progressFill 7s linear forwards",
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luxury Dual Sourcing Showcase: Apparel & Leather Overview */}
      <section
        className="py-16 md:py-24 bg-[#faf8f5] relative overflow-hidden border-b border-outline/5 select-none"
        id="sourcing-details"
      >
        {/* Abstract organic elegant design background details */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold-accent/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-mint/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop space-y-16 md:space-y-20 lg:space-y-24">
          {/* Row 1: Apparel Sourcing (Image Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Left Image Frame with offset luxury gallery border */}
            <div className="lg:col-span-6 relative group">
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#0e7448]/30 rounded-lg pointer-events-none -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-outline/10 bg-surface-container">
                <img
                  src="/slides/slide_apparel_row.jpg"
                  alt="Premium Apparel Sourcing Factory"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-[#0e7448]/90 backdrop-blur-md border border-[#cda250]/30 text-[#cda250] font-label-caps text-[10px] tracking-widest rounded shadow-lg">
                  01 / DIVISION
                </div>
              </div>
            </div>

            {/* Right Text Block */}
            <div className="lg:col-span-6 space-y-6">
              <span className="font-label-caps text-[#cda250] tracking-widest uppercase block text-xs">
                Elite Apparel Sourcing
              </span>
              <h3 className="font-display-lg text-4xl lg:text-[45px] font-bold text-[#0e7448] leading-tight">
                Apparel manufacturing
              </h3>
              <div className="w-16 h-[2px] bg-[#cda250]"></div>
              <p className="font-body-lg text-on-surface-variant leading-relaxed text-sm md:text-base">
                We source premium raw materials from trusted mills and suppliers
                across Bangladesh and beyond. Our in-house and partner factories
                are equipped with modern machinery and skilled labour to manage
                the full production process.
              </p>
              <p className="font-body-lg text-on-surface-variant leading-relaxed text-sm md:text-base">
                This process includes design and fabric procurement, cutting,
                sewing, finishing, quality control, and shipping — all carried
                out to meet international standards and customer demands. Each
                stage, from fabric sourcing to cutting, stitching, finishing,
                and quality control, is conducted under strict supervision to
                ensure excellence.
              </p>
              <div className="pt-4">
                <a
                  href="/knitwear"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#0e7448] text-off-white font-label-caps text-xs font-bold uppercase tracking-wider hover:bg-[#cda250] hover:text-pure-black hover:scale-[1.03] transition-all duration-300 rounded-sm shadow-lg"
                >
                  Check Apparel
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Row 2: Leather Sourcing (Text Left, Image Right - Alternating for premium editorial layout) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
            {/* Left Text Block */}
            <div className="lg:col-span-6 space-y-6 order-2 lg:order-1">
              <span className="font-label-caps text-[#cda250] tracking-widest uppercase block text-xs">
                Artisanal Leather Sourcing
              </span>
              <h3 className="font-display-lg text-4xl lg:text-[45px] font-bold text-[#0e7448] leading-tight">
                Leather
              </h3>
              <div className="w-16 h-[2px] bg-[#cda250]"></div>
              <p className="font-body-lg text-on-surface-variant leading-relaxed text-sm md:text-base">
                Similarly,” from desalting to finishing, each raw hide goes
                through multiple stages of production, with every colour of
                leather carrying its own unique story.
              </p>
              <p className="font-body-lg text-on-surface-variant leading-relaxed text-sm md:text-base">
                The process involves technicians, designers, and skilled
                artisans, all working with dedication to meet the highest
                quality standards and ensure customer satisfaction. This
                reflects our manufacturing company’s capabilities and commitment
                to excellence, ensuring that each piece of leather is the result
                of outstanding craftsmanship.
              </p>
              <div className="pt-4">
                <a
                  href="/leather-goods"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#0e7448] text-off-white font-label-caps text-xs font-bold uppercase tracking-wider hover:bg-[#cda250] hover:text-pure-black hover:scale-[1.03] transition-all duration-300 rounded-sm shadow-lg"
                >
                  Check Leather
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>

            {/* Right Image Frame with offset luxury gallery border */}
            <div className="lg:col-span-6 relative group order-1 lg:order-2">
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#0e7448]/30 rounded-lg pointer-events-none -z-10 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-2xl border border-outline/10 bg-surface-container">
                <img
                  src="/slides/slide_leather_sourcing.png"
                  alt="Premium finished leather swatches for sourcing"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-6 right-6 px-4 py-2 bg-[#0e7448]/90 backdrop-blur-md border border-[#cda250]/30 text-[#cda250] font-label-caps text-[10px] tracking-widest rounded shadow-lg">
                  02 / DIVISION
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations (Logos) */}
      <section className="py-16 md:py-20 bg-surface-container-low border-y border-outline/5 overflow-hidden select-none">
        <div className="max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop mb-12 text-center">
          <span className="font-label-caps text-gold-accent tracking-widest uppercase block mb-4">
            Certifications
          </span>
          <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-deep-forest mb-6">
            Our Accreditation Speaks For Itself
          </h2>
          <p className="font-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            We work with selected manufacturers who have achieved
            internationally recognized certifications, giving you full
            confidence in our practices. Below are some of the key
            certifications in apparel and leather manufacturing, relevant to
            buyers, factories, suppliers, and brands. These certifications
            confirm compliance with international standards for quality,
            environmental responsibility, safety, and ethical practices.
          </p>
        </div>

        {/* Infinite Marquee Wrapper */}
        <div className="w-full relative flex py-4">
          <div
            ref={logoScrollRef}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => {
              handleLogoMouseUpOrLeave();
              setIsLogoHovered(false);
            }}
            onMouseDown={handleLogoMouseDown}
            onMouseMove={handleLogoMouseMove}
            onMouseUp={handleLogoMouseUpOrLeave}
            className="flex overflow-x-auto gap-8 px-6 md:px-margin-desktop hide-scrollbar cursor-grab active:cursor-grabbing select-none py-2 w-full"
            style={{
              scrollBehavior: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {[...accreditationLogos, ...accreditationLogos].map((logo, idx) => (
              <div
                key={`${logo.alt}-${idx}`}
                className="h-20 w-40 flex-shrink-0 bg-white p-4 rounded shadow-sm flex items-center justify-center border border-outline/5 transition-all duration-300 hover:shadow-md cursor-pointer relative group/item select-none"
              >
                <img
                  alt={logo.alt}
                  className="h-12 w-auto object-contain max-w-full opacity-80 group-hover/item:scale-105 transition-transform duration-500 pointer-events-none select-none"
                  src={logo.src}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="py-16 md:py-20 lg:py-24 max-w-container-max mx-auto px-4 sm:px-6 lg:px-margin-desktop"
        id="contact"
      >
        <div className="bg-deep-forest text-off-white overflow-hidden shadow-2xl rounded-2xl flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 sm:p-10 lg:p-20 relative">
            <div className="relative z-10">
              <h2 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl mb-8">
                Get In Touch
              </h2>
              <p className="font-body-lg text-surface-variant/80 mb-12">
                We are ready to bring your vision to life. Visit our office or
                reach out to our global logistics team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                {/* United Kingdom Office */}
                <div className="border-t border-gold-accent/30 pt-6">
                  <span className="font-label-caps text-[10px] tracking-widest text-gold-accent block mb-4">
                    UNITED KINGDOM
                  </span>
                  <p className="font-body-md opacity-80 mb-5 leading-relaxed">
                    19 Northampton Rd, Wellingborough,
                    <br />
                    NN8 3HG, UK
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="mailto:enquiries@vivosa.co.uk"
                      className="font-body-md opacity-80 hover:text-gold-accent transition-colors block"
                    >
                      enquiries@vivosa.co.uk
                    </a>
                    <a
                      href="tel:02074126809"
                      className="font-body-md opacity-80 hover:text-gold-accent transition-colors inline-flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-[20px] shrink-0">
                        call
                      </span>
                      02-074-126-809
                    </a>

                    <a
                      href="https://wa.me/447912843155"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body-md opacity-80 hover:text-gold-accent transition-colors inline-flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      +44 7912 843155
                    </a>
                  </div>
                </div>

                {/* Bangladesh Office */}
                <div className="border-t border-gold-accent/30 pt-6">
                  <span className="font-label-caps text-[10px] tracking-widest text-gold-accent block mb-4">
                    BANGLADESH
                  </span>
                  <p className="font-body-md opacity-80 mb-5 leading-relaxed">
                    849/3, Arabian Tower, 8th Floor,
                    <br />
                    Begum Rokeya Sarani, Shewrapara,
                    <br />
                    Mirpur, Dhaka-1216, Bangladesh
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://wa.me/8801720030407"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body-md opacity-80 hover:text-gold-accent transition-colors inline-flex items-center gap-2"
                    >
                      <svg
                        className="w-5 h-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      +880 1720-030407
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <img
                className="w-full h-full object-cover"
                alt="A subtle atelier background texture."
                src="/slides/sustainability_bg.jpg"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:w-1/2 bg-off-white p-6 sm:p-10 lg:p-20 text-on-surface">
            <form className="space-y-8" onSubmit={handleContactSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="relative">
                  <label className="block font-label-caps text-[10px] text-deep-forest mb-2">
                    First Name
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-deep-forest py-2 focus:ring-0 focus:border-deep-forest transition-colors px-0"
                    type="text"
                    name="firstName"
                    value={contactForm.firstName}
                    onChange={handleContactChange}
                    required
                  />
                </div>
                <div className="relative">
                  <label className="block font-label-caps text-[10px] text-deep-forest mb-2">
                    Last Name
                  </label>
                  <input
                    className="w-full bg-transparent border-0 border-b border-deep-forest py-2 focus:ring-0 focus:border-deep-forest transition-colors px-0"
                    type="text"
                    name="lastName"
                    value={contactForm.lastName}
                    onChange={handleContactChange}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <label className="block font-label-caps text-[10px] text-deep-forest mb-2">
                  Email Address
                </label>
                <input
                  className="w-full bg-transparent border-0 border-b border-deep-forest py-2 focus:ring-0 focus:border-deep-forest transition-colors px-0"
                  type="email"
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  required
                />
              </div>

              <div className="relative">
                <label className="block font-label-caps text-[10px] text-deep-forest mb-2">
                  Message
                </label>
                <textarea
                  className="w-full bg-transparent border-0 border-b border-deep-forest py-2 focus:ring-0 focus:border-deep-forest transition-colors px-0 resize-none"
                  rows="4"
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  required
                ></textarea>
              </div>

              <button
                disabled={isSubmittingContact}
                className="w-full py-5 bg-deep-forest text-off-white font-label-caps uppercase tracking-widest hover:bg-gold-accent hover:text-pure-black transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
                type="submit"
              >
                {isSubmittingContact ? "Sending..." : "Send Message"}
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
