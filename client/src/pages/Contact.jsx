import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { submitContactForm } from "../api/contact";

const WEB3FORMS_ACCESS_KEY = "2c59bc83-be0f-4302-ba0a-bbbb401b349d";

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
      // Primary: send the inquiry to the client's inbox via Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New inquiry from Vivosa Contact page",
          from_name: "Vivosa Website",
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          interest: formData.interest,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.message || "Failed to submit inquiry");
      }

      // Best-effort: also store in the admin dashboard. Ignore failures so
      // email delivery is never blocked by the backend being unavailable.
      submitContactForm(formData).catch(() => {});

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
      toast.error(error.message || "Failed to submit inquiry");
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

              {/* Bangladesh Office */}
              <div className="border-t border-on-tertiary-container/30 pt-8">
                <span className="font-label-caps text-[10px] tracking-widest text-on-surface-variant mb-4 block">
                  BANGLADESH
                </span>
                <h3 className="font-headline-md text-2xl md:text-headline-md text-primary mb-4">
                  Address
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                  849/3, Arabian Tower, 8th Floor,
                  <br />
                  Begum Rokeya Sarani, Shewrapara,
                  <br />
                  Mirpur, Dhaka-1216, Bangladesh.
                </p>
                <div className="font-body-md text-body-md text-primary flex flex-col gap-2">
                  <a
                    className={`${contactLinkClass} inline-flex items-center gap-2`}
                    href="https://wa.me/8801720030407"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Message us on WhatsApp"
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

          {/* Right: Enquiry Form */}
          <div id="inquiry-form-section" className="lg:col-span-7 bg-surface-container-lowest p-6 md:p-16 border border-outline-variant/10 shadow-sm">
            <h2 className="font-headline-xl text-4xl md:text-headline-xl text-primary mb-8">
              Enquiry Form
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
