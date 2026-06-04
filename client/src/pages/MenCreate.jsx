import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiPlus, FiType, FiTrash2, FiImage, FiX } from "react-icons/fi";
import { createMenApparel } from "../api/menApparel";
import ImageUploadBox from "../components/Kids/ImageUploadBox";
import RichTextBox from "../components/Kids/RichTextBox";
import { stripRichText } from "../utils/richText";

const emptyForm = {
  title: "",
  description: "",
};

const PRESET_COLORS = [
  { name: "Red", value: "#dc2626" },
  { name: "Blue", value: "#2563eb" },
  { name: "Green", value: "#16a34a" },
  { name: "Yellow", value: "#ca8a04" },
  { name: "Black", value: "#000000" },
  { name: "White", value: "#ffffff" },
  { name: "Purple", value: "#9333ea" },
  { name: "Pink", value: "#db2777" },
  { name: "Gray", value: "#6b7280" },
  { name: "Orange", value: "#ea580c" },
];

const categoryNames = {
  sweater: "Sweater",
  "jackets-coats": "Jackets & Coats",
  pants: "Pants",
  joggers: "Joggers",
  "polo-shirt": "Polo Shirt",
  shirts: "Shirts",
  "t-shirts": "T-shirts",
};

const categoryTitlePlaceholders = {
  sweater: "e.g. Mens Cashmere Crewneck Sweater",
  "jackets-coats": "e.g. Mens Winter Parka Coat",
  pants: "e.g. Mens Slim Fit Chino Pants",
  joggers: "e.g. Mens Tech Fleece Joggers",
  "polo-shirt": "e.g. Mens Pique Polo Shirt",
  shirts: "e.g. Mens Linen Oxford Button-Down",
  "t-shirts": "e.g. Mens Heavyweight Cotton Tee",
};

const categoryDescriptionPlaceholders = {
  sweater: "Add sweater materials, wool composition, knit style details...",
  "jackets-coats": "Add outerwear details, weatherproofing, shell/lining composition...",
  pants: "Add chino cotton blend, stretch percent, and waist details...",
  joggers: "Add comfort fleece blend, waistband, and athletic fit details...",
  "polo-shirt": "Add polo pique fabric, collar design, and cuffs details...",
  shirts: "Add linen/cotton weave, pocket style, and fit details...",
  "t-shirts": "Add tee fabric weight (GSM), neck design, and comfort details...",
};

const MenCreate = ({ category }) => {
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Section Labels Customization
  const [colorSectionTitle, setColorSectionTitle] = useState("AVAILABLE COLORS");
  const [customSectionTitle, setCustomSectionTitle] = useState("OPTIONS & STYLES");

  // Variant States
  const [variants, setVariants] = useState([]);
  const [variantType, setVariantType] = useState("color"); // "color" or "custom"
  const [variantLabel, setVariantLabel] = useState("");
  const [variantValue, setVariantValue] = useState("#2563eb");
  const [variantImageFile, setVariantImageFile] = useState(null);
  const [variantImagePreview, setVariantImagePreview] = useState("");

  const categoryLabel = categoryNames[category] || "Product";
  const titlePlaceholder = categoryTitlePlaceholders[category] || "e.g. Premium item";
  const descriptionPlaceholder = categoryDescriptionPlaceholders[category] || "Enter product description details here...";

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return undefined;
    }
    const nextPreview = URL.createObjectURL(imageFile);
    setPreview(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [imageFile]);

  useEffect(() => {
    if (!variantImageFile) {
      setVariantImagePreview("");
      return undefined;
    }
    const nextPreview = URL.createObjectURL(variantImageFile);
    setVariantImagePreview(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [variantImageFile]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleAddVariant = () => {
    let finalLabel = variantLabel.trim();
    let finalValue = variantType === "color" ? variantValue : customSectionTitle.trim();

    if (variantType === "custom") {
      finalLabel = `Option ${variants.filter((v) => v.type === "custom").length + 1}`;
      if (!variantImageFile) {
        toast.error("Variant image is required for custom variants");
        return;
      }
    } else {
      if (!finalLabel) {
        toast.error("Color variant label is required");
        return;
      }
    }

    const newVariant = {
      type: variantType,
      label: finalLabel,
      value: finalValue,
      imageFile: variantType === "color" ? null : variantImageFile,
      preview: variantType === "color" ? "" : variantImagePreview,
    };

    setVariants((prev) => [...prev, newVariant]);
    setVariantLabel("");
    setVariantImageFile(null);
    setVariantImagePreview("");
  };

  const handleRemoveVariant = (index) => {
    setVariants((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.title.trim() || !stripRichText(form.description) || !imageFile) {
      toast.error("Title, main image, and materials description are required");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading(`Creating ${categoryLabel} item...`);

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("description", form.description);
      payload.append("category", category);
      payload.append("image", imageFile);
      payload.append("colorSectionTitle", colorSectionTitle.trim());
      payload.append("customSectionTitle", customSectionTitle.trim());

      // Append variants metadata as JSON string (excluding files)
      const variantsMetadata = variants.map((v) => ({
        type: v.type,
        label: v.label,
        value: v.value,
      }));
      payload.append("variants", JSON.stringify(variantsMetadata));

      // Append variant files
      variants.forEach((v, index) => {
        if (v.imageFile) {
          payload.append(`variantImage_${index}`, v.imageFile);
        }
      });

      await createMenApparel(payload);
      toast.dismiss(loadingToast);
      toast.success(`${categoryLabel} item created`);
      setForm(emptyForm);
      setImageFile(null);
      setVariants([]);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || `Failed to create ${categoryLabel} item`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
          Men &apos;s {categoryLabel}
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-900">Create Men &apos;s {categoryLabel} Item</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add an admin controlled men apparel item with custom color variants, labels, and image uploads.
        </p>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
              placeholder={titlePlaceholder}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
            />
          </label>

          <RichTextBox
            label="Materials & Description"
            value={form.description}
            onChange={(value) => setForm((previous) => ({ ...previous, description: value }))}
            placeholder={descriptionPlaceholder}
            helper="Use the editor toolbar to format the details."
          />

          {/* Variants Management */}
          <div className="border-t border-slate-100 pt-6">
            <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Product Variants & Colors
            </span>

            {/* List of Added Variants */}
            {variants.length > 0 && (
              <div className="mb-6 space-y-2">
                <p className="text-xs font-semibold text-slate-500">Added Variants ({variants.length})</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {variants.map((v, index) => (
                    <div key={index} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                      <div className="flex items-center gap-3">
                        {v.type === "color" ? (
                          <>
                            <div
                              className="h-6 w-6 rounded-full border border-slate-200"
                              style={{ backgroundColor: v.value }}
                            />
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{v.label}</p>
                              <p className="text-[10px] text-slate-400 uppercase">{v.value}</p>
                            </div>
                          </>
                        ) : (
                          v.preview && (
                            <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center p-1 border border-slate-100 overflow-hidden shrink-0">
                              <img
                                src={v.preview}
                                alt="Variant preview"
                                className="max-w-full max-h-full object-contain rounded"
                              />
                            </div>
                          )
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRemoveVariant(index)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add Variant Form Panel */}
            <div className="rounded-2xl bg-slate-50/50 border border-slate-100 p-4 space-y-4">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setVariantType("color")}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    variantType === "color"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  Color Variant
                </button>
                <button
                  type="button"
                  onClick={() => setVariantType("custom")}
                  className={`flex-1 rounded-xl py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    variantType === "custom"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  Custom Variant
                </button>
              </div>

              {/* Dynamic Label Editor */}
              <div className="border border-slate-200 rounded-xl p-3 bg-white">
                {variantType === "color" ? (
                  <label className="block">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Color Swatches Section Label</span>
                    <input
                      type="text"
                      value={colorSectionTitle}
                      onChange={(e) => setColorSectionTitle(e.target.value)}
                      placeholder="AVAILABLE COLORS"
                      className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 outline-none text-xs transition focus:border-slate-900"
                    />
                  </label>
                ) : (
                  <label className="block">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Custom Variant Section Label</span>
                    <input
                      type="text"
                      value={customSectionTitle}
                      onChange={(e) => setCustomSectionTitle(e.target.value)}
                      placeholder="OPTIONS & STYLES"
                      className="w-full h-9 rounded-lg border border-slate-200 bg-slate-50 px-3 outline-none text-xs transition focus:border-slate-900"
                    />
                  </label>
                )}
              </div>

              {variantType === "color" ? (
                <div className="space-y-3">
                  {/* Preset Selector */}
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-2">Preset Colors</span>
                    <div className="flex flex-wrap gap-2">
                      {PRESET_COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => {
                            setVariantValue(c.value);
                            setVariantLabel(c.name);
                          }}
                          className={`h-7 w-7 rounded-full border-2 transition ${
                            variantValue === c.value ? "border-slate-900 scale-110" : "border-slate-200"
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <label className="block w-24">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Color Picker</span>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={variantValue}
                          onChange={(e) => setVariantValue(e.target.value)}
                          className="h-10 w-full p-1 border border-slate-200 rounded-xl bg-white cursor-pointer"
                        />
                      </div>
                    </label>

                    <label className="block flex-1">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Color Name / Label</span>
                      <input
                        type="text"
                        value={variantLabel}
                        onChange={(e) => setVariantLabel(e.target.value)}
                        placeholder="e.g. Navy Blue"
                        className="w-full h-10 rounded-xl border border-slate-200 bg-white px-3 outline-none transition focus:border-slate-900 text-sm"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="p-2 border border-slate-200 rounded-xl bg-slate-100/50">
                  <p className="text-xs text-slate-500 font-medium">
                    Adding custom variant item under <strong>{customSectionTitle || "OPTIONS & STYLES"}</strong>. Just upload your image below.
                  </p>
                </div>
              )}

              {/* Variant specific image uploader */}
              {variantType === "custom" && (
                <div className="border border-dashed border-slate-200 rounded-xl p-3 bg-white">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-2">Variant Image (Required)</span>
                  {variantImagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={variantImagePreview}
                        alt="variant image"
                        className="h-16 w-16 object-cover rounded-lg border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => setVariantImageFile(null)}
                        className="absolute -top-1.5 -right-1.5 bg-red-600 text-white rounded-full p-0.5"
                      >
                        <FiX className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setVariantImageFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="men-variant-image-uploader"
                      />
                      <label
                        htmlFor="men-variant-image-uploader"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer font-semibold"
                      >
                        <FiImage className="h-4 w-4" />
                        Upload Variant Image
                      </label>
                    </div>
                  )}
                </div>
              )}

              <button
                type="button"
                onClick={handleAddVariant}
                className="w-full rounded-xl border border-slate-900 bg-white text-slate-950 hover:bg-slate-50 py-2.5 text-xs font-bold transition flex items-center justify-center gap-1"
              >
                <FiPlus className="h-4 w-4" />
                Add Variant to List
              </button>
            </div>
          </div>

        </div>

        <div className="space-y-6">
          <ImageUploadBox
            label="Product Main Image"
            description="Click to upload primary product image"
            preview={preview}
            fileName={imageFile?.name}
            inputId="men-image-upload"
            onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            onClear={() => setImageFile(null)}
            uploadLabel="Upload Main Image"
            replaceLabel="Replace Main Image"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiPlus className="h-4 w-4" />
            {isSubmitting ? "Creating..." : `Create ${categoryLabel} Item`}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default MenCreate;
