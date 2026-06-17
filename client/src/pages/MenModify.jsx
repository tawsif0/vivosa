import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiEdit2, FiImage, FiRefreshCw, FiTrash2, FiType, FiPlus, FiX } from "react-icons/fi";
import ConfirmModal from "../components/ConfirmModal";
import ImageUploadBox from "../components/Kids/ImageUploadBox";
import { deleteMenApparel, fetchAdminMenApparel, updateMenApparel } from "../api/menApparel";
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

const MenModify = ({ category }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminMenApparel(category);
      setItems(data);
    } catch (error) {
      toast.error(error.response?.data?.error || `Failed to load ${categoryLabel} items`);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

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

  const handleEditClick = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description || "",
    });
    setImageFile(null);
    setPreview(item.image?.url || "");
    setVariants(item.variants || []);
    setColorSectionTitle(item.colorSectionTitle || "AVAILABLE COLORS");
    setCustomSectionTitle(item.customSectionTitle || "OPTIONS & STYLES");

    // Reset temporary variant inputs
    setVariantLabel("");
    setVariantImageFile(null);
    setVariantImagePreview("");
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreview("");
    setVariants([]);
  };

  const handleFormChange = (event) => {
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
    if (!form.title.trim() || !stripRichText(form.description)) {
      toast.error("Title and materials composition are required");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading(`Updating ${categoryLabel} item...`);

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("description", form.description);
      payload.append("category", category);
      payload.append("colorSectionTitle", colorSectionTitle.trim());
      payload.append("customSectionTitle", customSectionTitle.trim());

      if (imageFile) {
        payload.append("image", imageFile);
      }

      // Re-compile metadata and attachments
      const variantsMetadata = [];
      variants.forEach((v, index) => {
        variantsMetadata.push({
          type: v.type,
          label: v.label,
          value: v.value,
          // Keep existing properties if it was not created this session
          image: v.image || undefined,
        });

        if (v.imageFile) {
          payload.append(`variantImage_${index}`, v.imageFile);
        }
      });

      payload.append("variants", JSON.stringify(variantsMetadata));

      const updated = await updateMenApparel(editingItem._id, payload);
      toast.dismiss(loadingToast);
      toast.success(`${categoryLabel} item updated`);

      setItems((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
      handleCancelEdit();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || `Failed to update ${categoryLabel} item`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTrigger = (item) => {
    setDeleteTarget(item);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const loadingToast = toast.loading(`Deleting ${categoryLabel} item...`);

    try {
      await deleteMenApparel(deleteTarget._id);
      toast.dismiss(loadingToast);
      toast.success(`${categoryLabel} item deleted`);
      setItems((prev) => prev.filter((item) => item._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || `Failed to delete ${categoryLabel} item`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Men &apos;s {categoryLabel}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Modify Men &apos;s {categoryLabel} Catalog</h2>
          <p className="mt-1 text-sm text-slate-600">
            Edit details, custom variants, or delete items from the men apparel database.
          </p>
        </div>
        <button
          onClick={loadItems}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <FiRefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Reload
        </button>
      </div>

      {editingItem ? (
        <div className="border border-slate-200 rounded-2xl bg-white p-6 space-y-4 shadow-md">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-800">Editing: {editingItem.title}</h3>
            <button
              onClick={handleCancelEdit}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 transition"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <FiType className="h-4 w-4" />
                  Title
                </span>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder={titlePlaceholder}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </label>

              <RichTextBox
                label="Materials & Composition"
                value={form.description}
                onChange={(value) => setForm((previous) => ({ ...previous, description: value }))}
                placeholder="Add materials, lining, and care instructions..."
              />

              {/* Variants Panel */}
              <div className="border-t border-slate-100 pt-6">
                <span className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Product Variants & Colors
                </span>

                {/* List of Added Variants */}
                {variants.length > 0 && (
                  <div className="mb-6 space-y-2">
                    <p className="text-xs font-semibold text-slate-500">Variants ({variants.length})</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {variants.map((v, index) => {
                        const variantPreview = v.preview || v.image?.url;
                        return (
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
                                variantPreview && (
                                  <div className="h-16 w-16 bg-white rounded-lg flex items-center justify-center p-1 border border-slate-100 overflow-hidden shrink-0">
                                    <img
                                      src={variantPreview}
                                      alt="Variant preview"
                                      className="max-w-full max-h-full object-contain rounded"
                                    />
                                  </div>
                                )
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveVariant(index)}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-500 transition-colors"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Add Variant Form Panel */}
                <div className="rounded-2xl bg-slate-50/50 border border-slate-100 p-4 space-y-4">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setVariantType("color")}
                      className={`flex-1 rounded-xl py-2 text-xs font-semibold uppercase tracking-wider transition ${variantType === "color"
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-white text-slate-600 border border-slate-200"
                        }`}
                    >
                      Color Variant
                    </button>
                    <button
                      type="button"
                      onClick={() => setVariantType("custom")}
                      className={`flex-1 rounded-xl py-2 text-xs font-semibold uppercase tracking-wider transition ${variantType === "custom"
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
                              className={`h-7 w-7 rounded-full border-2 transition ${variantValue === c.value ? "border-slate-900 scale-110" : "border-slate-200"
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
                          <input
                            type="color"
                            value={variantValue}
                            onChange={(e) => setVariantValue(e.target.value)}
                            className="h-10 w-full p-1 border border-slate-200 rounded-xl bg-white cursor-pointer"
                          />
                        </label>

                        <label className="block flex-1">
                          <span className="text-[10px] font-semibold text-slate-400 uppercase block mb-1">Color Name / Label</span>
                          <input
                            type="text"
                            value={variantLabel}
                            onChange={(e) => setVariantLabel(e.target.value)}
                            placeholder="e.g. Midnight Black"
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

                  {/* Image Uploader */}
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
                            id="men-variant-image-modifier"
                          />
                          <label
                            htmlFor="men-variant-image-modifier"
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
                label="Replace Main Image (Optional)"
                description="Click to upload a new primary product image"
                preview={preview}
                fileName={imageFile?.name}
                inputId="men-image-edit-upload"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                onClear={() => {
                  setImageFile(null);
                  setPreview(editingItem.image?.url || "");
                }}
                uploadLabel="Upload Main Image"
                replaceLabel="Replace Main Image"
              />

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {isSubmitting ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-900 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-500 font-semibold">Loading items...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-slate-400 font-semibold">No items found in this category.</p>
            </div>
          ) : (
            <div>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                      <th className="pb-4 pr-4">Image</th>
                      <th className="pb-4">Title</th>
                      <th className="pb-4">Variants</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 text-sm">
                    {items.map((item) => (
                      <tr key={item._id} className="group hover:bg-slate-50/40 transition-colors">
                        <td className="py-3 pr-4">
                          <img
                            src={item.image?.url}
                            alt={stripRichText(item.title)}
                            className="h-14 w-14 rounded-xl object-contain bg-slate-50 border border-slate-100"
                          />
                        </td>
                        <td className="py-3 font-semibold text-slate-950 pr-4">
                          <div className="max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg truncate">
                            {stripRichText(item.title)}
                          </div>
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex flex-wrap gap-1.5 max-w-[260px]">
                            {(item.variants || []).map((v, idx) => {
                              if (v.type === "color") {
                                return (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-slate-100 bg-white text-[10px] text-slate-600 font-medium"
                                  >
                                    <span
                                      className="h-2 w-2 rounded-full border border-black/10 shrink-0"
                                      style={{ backgroundColor: v.value }}
                                    />
                                    {v.label}
                                  </span>
                                );
                              } else {
                                return (
                                  <img
                                    key={idx}
                                    src={v.image?.url}
                                    alt="variant preview"
                                    className="h-6 w-6 rounded border border-slate-200 bg-white shrink-0 object-contain"
                                    title={v.label}
                                  />
                                );
                              }
                            })}
                            {(item.variants || []).length === 0 && (
                              <span className="text-xs text-slate-400 font-normal">None</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(item)}
                              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 transition shadow-sm"
                              title="Edit Product"
                            >
                              <FiEdit2 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTrigger(item)}
                              className="rounded-xl border border-slate-200 bg-white p-2 text-red-600 hover:bg-red-50 hover:border-red-100 transition shadow-sm"
                              title="Delete Product"
                            >
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card Grid View */}
              <div className="grid gap-4 md:hidden">
                {items.map((item) => (
                  <div key={item._id} className="rounded-xl border border-slate-100 bg-slate-50/30 p-4 flex flex-col gap-3">
                    <div className="flex gap-3">
                      <div className="h-16 w-16 rounded-xl bg-white overflow-hidden border border-slate-100 shrink-0">
                        {item.image?.url ? (
                          <img src={item.image.url} alt={stripRichText(item.title)} className="h-full w-full object-contain" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">No Image</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-slate-950 truncate text-sm">{stripRichText(item.title) || "Untitled"}</p>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {(item.variants || []).map((v, idx) => {
                            if (v.type === "color") {
                              return (
                                <span
                                  key={idx}
                                  className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-slate-100 bg-white text-[10px] text-slate-600 font-medium"
                                >
                                  <span
                                    className="h-2 w-2 rounded-full border border-black/10 shrink-0"
                                    style={{ backgroundColor: v.value }}
                                  />
                                  {v.label}
                                </span>
                              );
                            } else {
                              return (
                                <img
                                  key={idx}
                                  src={v.image?.url}
                                  alt="variant preview"
                                  className="h-6 w-6 rounded border border-slate-200 bg-white shrink-0 object-contain"
                                  title={v.label}
                                />
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 border-t border-slate-100/60 pt-2.5">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-slate-700 hover:bg-slate-50 transition shadow-sm text-xs flex items-center gap-1 font-semibold"
                      >
                        <FiEdit2 className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTrigger(item)}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-red-600 hover:bg-red-50 hover:border-red-100 transition shadow-sm text-xs flex items-center gap-1 font-semibold"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmText={isDeleting ? "Deleting..." : "Delete Item"}
        cancelText="Cancel"
      />
    </div>
  );
};

export default MenModify;
