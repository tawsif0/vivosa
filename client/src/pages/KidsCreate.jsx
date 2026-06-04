import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiType } from "react-icons/fi";
import { createKid } from "../api/kids";
import ImageUploadBox from "../components/Kids/ImageUploadBox";
import RichTextBox from "../components/Kids/RichTextBox";
import { stripRichText } from "../utils/richText";

const emptyForm = {
  title: "",
  materialComposition: "",
  productProduction: "",
};

const KidsCreate = () => {
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
    if (
      !form.title.trim() ||
      !stripRichText(form.materialComposition) ||
      !stripRichText(form.productProduction) ||
      !imageFile
    ) {
      toast.error("Title, image, material composition, and product production are required");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Creating kid item...");

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("materialComposition", form.materialComposition);
      payload.append("productProduction", form.productProduction);
      payload.append("image", imageFile);

      await createKid(payload);
      toast.dismiss(loadingToast);
      toast.success("Kid item created");
      setForm(emptyForm);
      setImageFile(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to create kid item");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Kids
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Create Kids Item</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add a kids product with title, material composition, production notes, and image upload.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <label className="block">
            <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <FiType className="h-4 w-4" />
              Title
            </span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Kids sweatshirt set"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
            />
          </label>

          <RichTextBox
            label="Material Composition"
            value={form.materialComposition}
            onChange={(value) => setForm((previous) => ({ ...previous, materialComposition: value }))}
            placeholder="Add the material composition details here..."
            helper="Use the editor toolbar to format the composition details."
          />

          <RichTextBox
            label="Product Production"
            value={form.productProduction}
            onChange={(value) => setForm((previous) => ({ ...previous, productProduction: value }))}
            placeholder="Explain production notes, finishing, and product focus."
          />

        </div>

        <div className="space-y-6">
          <ImageUploadBox
            label="Image"
            description="Click to upload product image"
            preview={preview}
            fileName={imageFile?.name}
            inputId="kids-image-upload"
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            onClear={() => setImageFile(null)}
            uploadLabel="Upload Image"
            replaceLabel="Replace Image"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlus className="h-4 w-4" />
            {isSubmitting ? "Creating..." : "Create Kids Item"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default KidsCreate;
