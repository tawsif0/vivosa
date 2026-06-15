import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiType } from "react-icons/fi";
import { createSustainableLeather } from "../api/sustainableLeather";
import ImageUploadBox from "../components/Kids/ImageUploadBox";
import RichTextBox from "../components/Kids/RichTextBox";
import { stripRichText } from "../utils/richText";

const emptyForm = {
  code: "",
  name: "",
  rawMaterial: "",
  processing: "",
  productDetails: "",
  desc: "",
};

const AviationCreate = () => {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return undefined;
    }
    const nextPreview = URL.createObjectURL(imageFile);
    setPreview(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [imageFile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!imageFile) {
      toast.error("Swatch image is required");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating aviation leather item...");

    try {
      const payload = new FormData();
      payload.append("category", "aviation");
      const titleVal = [form.code.trim(), form.name.trim()].filter(Boolean).join(" ") || "Untitled Leather";
      payload.append("title", titleVal);
      payload.append("code", form.code.trim());
      payload.append("name", form.name.trim());
      payload.append("rawMaterial", form.rawMaterial.trim());
      payload.append("processing", form.processing.trim());
      payload.append("productDetails", form.productDetails);
      payload.append("desc", form.desc);
      payload.append("image", imageFile);

      await createSustainableLeather(payload);
      toast.dismiss(loadingToast);
      toast.success("Aviation leather item created");
      setForm(emptyForm);
      setImageFile(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to create item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Sustainable Leather - Aviation
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900 font-display">Create Aviation Item</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add an admin-controlled leather article with code, name, and rich text descriptions.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <FiType className="h-4 w-4" />
                Code / Article Number
              </span>
              <input
                type="text"
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="e.g. AV091B"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                <FiType className="h-4 w-4" />
                Name
              </span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Nimbus Grey"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
              />
            </label>
          </div>

          <RichTextBox
            label="Description"
            value={form.desc}
            onChange={(value) => setForm((previous) => ({ ...previous, desc: value }))}
            placeholder="Add description details of this aviation leather..."
          />

          <RichTextBox
            label="Raw Material"
            value={form.rawMaterial}
            onChange={(value) => setForm((previous) => ({ ...previous, rawMaterial: value }))}
            placeholder="e.g. Selected European bull hides."
          />

          <RichTextBox
            label="Processing"
            value={form.processing}
            onChange={(value) => setForm((previous) => ({ ...previous, processing: value }))}
            placeholder="e.g. Flame retardant treated and lightweight finished in Italy."
          />

          <RichTextBox
            label="Final Product Characteristics"
            value={form.productDetails}
            onChange={(value) => setForm((previous) => ({ ...previous, productDetails: value }))}
            placeholder="Detailed description of final product characteristics..."
          />
        </div>

        <div className="space-y-6">
          <ImageUploadBox
            label="Aviation Leather Swatch Image"
            description="Click to upload high-resolution aviation leather swatch image"
            preview={preview}
            fileName={imageFile?.name}
            inputId="aviation-image-upload"
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            onClear={() => setImageFile(null)}
            uploadLabel="Upload Swatch Image"
            replaceLabel="Replace Swatch Image"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlus className="h-4 w-4" />
            {isSubmitting ? "Creating..." : "Create Aviation Leather Item"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AviationCreate;
