import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { submitContactForm } from "../api/contact";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const interestParam = searchParams.get("interest");

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (interestParam) {
      setFormData((prev) => ({ ...prev, interest: interestParam }));
      
      // Delay slightly to allow full render before scrolling
      setTimeout(() => {
        const element = document.getElementById("inquiry-form-section");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [interestParam]);
  const contactLinkClass =
    "inline-flex w-fit items-center gap-2 text-primary transition-colors duration-300 hover:text-on-tertiary-container hover:underline hover:underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-on-tertiary-container/40 rounded-sm";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm(formData);
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        interest: "",
        message: "",
      });
      toast.success("Your inquiry has been submitted");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to submit inquiry");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-primary min-h-[500px] md:min-h-[716px] flex flex-col justify-center items-center text-center px-4 md:px-margin-desktop py-20 md:py-section-gap">
        <span className="font-label-caps text-label-caps text-gray-400 tracking-[0.3em] mb-6 block">
          GET IN TOUCH
        </span>
        <h1 className="font-display-lg text-5xl md:text-display-lg text-secondary-fixed max-w-4xl mx-auto mb-8 leading-tight">
          CONNECT WITH THE MANUFACTURE
        </h1>
        <p className="font-body-lg text-body-lg text-white/80 max-w-2xl opacity-90 leading-relaxed">
          Partnering with global brands to deliver sustainable excellence. Our
          team is ready to scale your vision with ethical precision.
        </p>
      </section>

      {/* Contact Section */}
      <section className="bg-surface-container-low px-4 md:px-margin-desktop py-16 md:py-section-gap">
        <div className="max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left: Contact Details */}
          <div className="lg:col-span-5 pr-0 md:pr-12 mb-16 lg:mb-0">
            <h2 className="font-headline-xl text-4xl md:text-headline-xl text-primary mb-12 leading-tight">
              Contact Details
            </h2>
            <div className="space-y-10">
              {/* UK Office */}
              <div className="border-t border-on-tertiary-container/30 pt-8">
                <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant mb-4 block">
                  UNITED KINGDOM
                </span>
                <h3 className="font-headline-md text-2xl md:text-headline-md text-primary mb-4">
                  Address
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                  19 Northampton Rd, Wellingborough,
                  <br />
                  NN8 3HG, United Kingdom.
                </p>
                <div className="font-body-md text-body-md text-primary flex flex-col gap-2">
                  <a
                    className={contactLinkClass}
                    href="tel:02074126809"
                    aria-label="Call the UK address"
                  >
                    02-074-126-809
                  </a>
                  <a
                    className={contactLinkClass}
                    href="mailto:enquiries@vivosa.co.uk"
                    aria-label="Email the UK address"
                  >
                    enquiries@vivosa.co.uk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div id="inquiry-form-section" className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-16 border border-outline-variant/10 shadow-sm">
            <h2 className="font-headline-xl text-4xl md:text-headline-xl text-primary mb-8">
              Inquiry Form
            </h2>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Name */}
                <div className="relative group">
                  <input
                    className="peer w-full bg-transparent border-0 border-b border-outline py-4 focus:ring-0 focus:border-outline transition-all font-body-md text-on-surface placeholder-transparent"
                    id="name"
                    name="name"
                    placeholder=" "
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <label
                    className="absolute left-0 top-4 text-on-surface-variant font-label-caps text-label-caps uppercase pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-on-surface-variant peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                </div>
                {/* Company */}
                <div className="relative group">
                  <input
                    className="peer w-full bg-transparent border-0 border-b border-outline py-4 focus:ring-0 focus:border-outline transition-all font-body-md text-on-surface placeholder-transparent"
                    id="company"
                    name="company"
                    placeholder=" "
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                  <label
                    className="absolute left-0 top-4 text-on-surface-variant font-label-caps text-label-caps uppercase pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-on-surface-variant peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                    htmlFor="company"
                  >
                    Company Name
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Email */}
                <div className="relative group">
                  <input
                    className="peer w-full bg-transparent border-0 border-b border-outline py-4 focus:ring-0 focus:border-outline transition-all font-body-md text-on-surface placeholder-transparent"
                    id="email"
                    name="email"
                    placeholder=" "
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <label
                    className="absolute left-0 top-4 text-on-surface-variant font-label-caps text-label-caps uppercase pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-on-surface-variant peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                    htmlFor="email"
                  >
                    Business Email
                  </label>
                </div>
                {/* Phone */}
                <div className="relative group">
                  <input
                    className="peer w-full bg-transparent border-0 border-b border-outline py-4 focus:ring-0 focus:border-outline transition-all font-body-md text-on-surface placeholder-transparent"
                    id="phone"
                    name="phone"
                    placeholder=" "
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label
                    className="absolute left-0 top-4 text-on-surface-variant font-label-caps text-label-caps uppercase pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-on-surface-variant peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Interest Select */}
              <div className="relative">
                <select
                  className="w-full bg-transparent border-0 border-b border-outline py-4 pr-4 focus:ring-0 focus:border-outline appearance-none transition-all font-body-md text-on-surface cursor-pointer"
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                >
                  <option value="" disabled>
                    Area of Interest
                  </option>
                  <option value="leather">Leather Collection</option>
                  <option value="apparel">Apparel Manufacturing</option>
                  <option value="sourcing">Sustainable Sourcing</option>
                  <option value="custom">Custom Projects</option>
                  <option value="sample_book">Sample Book</option>
                </select>
              </div>

              {/* Message */}
              <div className="relative group">
                <textarea
                  className="peer w-full bg-transparent border-0 border-b border-outline py-4 focus:ring-0 focus:border-outline transition-all font-body-md text-on-surface placeholder-transparent resize-none"
                  id="message"
                  name="message"
                  placeholder=" "
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <label
                  className="absolute left-0 top-4 text-on-surface-variant font-label-caps text-label-caps uppercase pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-on-tertiary-container peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]"
                  htmlFor="message"
                >
                  Tell us about your requirements
                </label>
              </div>

              <button
                disabled={isSubmitting}
                className="w-full md:w-auto px-8 py-4 md:px-12 md:py-5 bg-on-tertiary-container text-surface-container-lowest font-label-caps text-label-caps flex items-center justify-center gap-3 hover:bg-on-tertiary-fixed-variant transition-all duration-500 group cursor-pointer tracking-widest"
                type="submit"
              >
                {isSubmitting ? "SENDING..." : "SUBMIT INQUIRY"}
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1 text-[18px]">
                  arrow_forward
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-primary px-4 md:px-margin-desktop py-16 md:py-section-gap">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-headline-xl text-4xl md:text-headline-xl text-secondary-fixed mb-12 md:mb-20 text-center leading-tight">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* FAQ 1 */}
            <div className="bg-primary-container p-6 md:p-8 border-l border-on-tertiary-container/30 hover:border-on-tertiary-container transition-colors duration-300">
              <span className="material-symbols-outlined text-white mb-6 text-3xl">
                precision_manufacturing
              </span>
              <h3 className="font-headline-md text-2xl md:text-headline-md text-on-primary mb-4">
                Samples &amp; Prototyping
              </h3>
              <p className="font-body-md text-body-md text-white/75 leading-relaxed">
                Prototyping takes 14-21 business days. We provide complete
                material cards and technical sheets for every development.
              </p>
            </div>
            {/* FAQ 2 */}
            <div className="bg-primary-container p-6 md:p-8 border-l border-on-tertiary-container/30 hover:border-on-tertiary-container transition-colors duration-300">
              <span className="material-symbols-outlined text-white mb-6 text-3xl">
                inventory_2
              </span>
              <h3 className="font-headline-md text-2xl md:text-headline-md text-on-primary mb-4">
                MOQ &amp; Lead Times
              </h3>
              <p className="font-body-md text-body-md text-white/75 leading-relaxed">
                Standard MOQ starts at 100 units per style. Global lead times
                range from 60 to 90 days depending on material availability.
              </p>
            </div>
            {/* FAQ 3 */}
            <div className="bg-primary-container p-6 md:p-8 border-l border-on-tertiary-container/30 hover:border-on-tertiary-container transition-colors duration-300">
              <span className="material-symbols-outlined text-white mb-6 text-3xl">
                verified
              </span>
              <h3 className="font-headline-md text-2xl md:text-headline-md text-on-primary mb-4">
                Sustainability Data
              </h3>
              <p className="font-body-md text-body-md text-white/75 leading-relaxed">
                Request full LWG, ISO 14001, and Sedex certifications via our
                partner portal for transparent supply chain mapping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Visual Anchor with Quote */}
      <section className="h-[400px] md:h-[614px] relative overflow-hidden bg-primary">
        <img
          alt="Luxury Textile Texture"
          className="w-full h-full object-cover grayscale opacity-30 mix-blend-overlay"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAsQE9OM8T_Kgq-4WA3pLPt40b9YM1sXIBpWj5cwYE9_-4Fe-si68JvQqxSwidLEh7FU4KZuUoP07NmiMpdlnrx3UCUde2mGMrYivVPyV1biInPfhhm4uCEbVaDgqSga5kBJmJpjY3MeBGyPiFRIhCcMV10-P97KGn3HsI0RLywcYelH_J5xJxgEHCovA0PdVSAhJNVZZOfyyx7dPOB71qJIfUtGbwk-YQKAoYiYiLgenkqz_ydLm_Otn3Edwq6QFLjfqrBLw4m7M"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/60 flex items-center justify-center p-4 md:p-margin-desktop">
          <div className="max-w-2xl text-center">
            <h2 className="font-display-lg text-3xl md:text-headline-xl lg:text-display-lg text-surface-container-lowest italic leading-tight">
              "Sustainable luxury is not a choice, but a commitment to the
              future of craft."
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
