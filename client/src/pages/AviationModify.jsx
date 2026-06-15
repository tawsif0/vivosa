import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiEdit2, FiRefreshCw, FiTrash2, FiType, FiX } from "react-icons/fi";
import ConfirmModal from "../components/ConfirmModal";
import ImageUploadBox from "../components/Kids/ImageUploadBox";
import RichTextBox from "../components/Kids/RichTextBox";
import { deleteSustainableLeather, fetchAdminSustainableLeathers, updateSustainableLeather } from "../api/sustainableLeather";
import { stripRichText } from "../utils/richText";

const emptyForm = {
  code: "",
  name: "",
  rawMaterial: "",
  processing: "",
  productDetails: "",
  desc: "",
};

const AviationModify = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminSustainableLeathers("aviation");
      setItems(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to load aviation leathers");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreview(editingItem?.image?.url || "");
      return undefined;
    }
    const nextPreview = URL.createObjectURL(imageFile);
    setPreview(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [imageFile, editingItem]);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setForm({
      code: item.code || "",
      name: item.name || "",
      rawMaterial: item.rawMaterial || "",
      processing: item.processing || "",
      productDetails: item.productDetails || "",
      desc: item.desc || "",
    });
    setImageFile(null);
    setPreview(item.image?.url || "");
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreview("");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!editingItem) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating aviation leather item...");

    try {
      const payload = new FormData();
      const titleVal = [form.code.trim(), form.name.trim()].filter(Boolean).join(" ") || "Untitled Leather";
      payload.append("title", titleVal);
      payload.append("code", form.code.trim());
      payload.append("name", form.name.trim());
      payload.append("rawMaterial", form.rawMaterial.trim());
      payload.append("processing", form.processing.trim());
      payload.append("productDetails", form.productDetails);
      payload.append("desc", form.desc);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      await updateSustainableLeather(editingItem._id, payload);
      toast.dismiss(loadingToast);
      toast.success("Aviation leather item updated successfully");
      handleCancelEdit();
      loadItems();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to update item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (item) => {
    setDeleteTarget(item);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting item...");

    try {
      await deleteSustainableLeather(deleteTarget._id);
      toast.dismiss(loadingToast);
      toast.success("Item deleted successfully");
      setDeleteTarget(null);
      loadItems();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to delete item");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Sustainable Leather - Aviation
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 font-display">
            Modify Aviation Leather Items
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Manage or edit your aviation leathers here.
          </p>
        </div>
        <button
          onClick={loadItems}
          disabled={loading}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition"
        >
          <FiRefreshCw className={`h-4 w-4 text-slate-600 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {editingItem ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-slate-950">Editing {editingItem.title}</h3>
            <button
              onClick={handleCancelEdit}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-950 transition"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
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
                    onChange={handleFormChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
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
                    onChange={handleFormChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none"
                  />
                </label>
              </div>

              <RichTextBox
                label="Description"
                value={form.desc}
                onChange={(value) => setForm((previous) => ({ ...previous, desc: value }))}
              />

              <RichTextBox
                label="Raw Material"
                value={form.rawMaterial}
                onChange={(value) => setForm((previous) => ({ ...previous, rawMaterial: value }))}
              />

              <RichTextBox
                label="Processing"
                value={form.processing}
                onChange={(value) => setForm((previous) => ({ ...previous, processing: value }))}
              />

              <RichTextBox
                label="Final Product Characteristics"
                value={form.productDetails}
                onChange={(value) => setForm((previous) => ({ ...previous, productDetails: value }))}
              />
            </div>

            <div className="space-y-6">
              <ImageUploadBox
                label="Aviation Swatch Image"
                description="Click to upload/replace image"
                preview={preview}
                fileName={imageFile?.name}
                inputId="aviation-modify-image-upload"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                onClear={() => {
                  setImageFile(null);
                  setPreview("");
                }}
                uploadLabel="Replace Image"
                replaceLabel="Replace Image"
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                >
                  Save Changes
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
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="p-4">Image</th>
                  <th className="p-4">Code</th>
                  <th className="p-4">Name</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 overflow-hidden border border-slate-200/50">
                          {item.image?.url ? (
                            <img src={item.image.url} alt={item.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">No Image</div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 font-semibold text-slate-900">{item.code}</td>
                      <td className="p-4">{item.name}</td>
                      <td className="p-4 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => handleEditClick(item)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-red-600 transition-colors"
                          >
                            <FiTrash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-400">
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default AviationModify;
