import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiEdit2, FiImage, FiRefreshCw, FiTrash2, FiType, FiX } from "react-icons/fi";
import ConfirmModal from "../components/ConfirmModal";
import ImageUploadBox from "../components/Kids/ImageUploadBox";
import RichTextBox from "../components/Kids/RichTextBox";
import { deleteKid, fetchAdminKids, updateKid } from "../api/kids";
import { stripRichText, toRichTextHtml } from "../utils/richText";

const emptyForm = {
  title: "",
  materialComposition: "",
  productProduction: "",
};

const KidsModify = () => {
  const [kids, setKids] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingKid, setEditingKid] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadKids = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminKids();
      setKids(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to load kids items");
      setKids([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKids();
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setPreview("");
      return undefined;
    }
    const nextPreview = URL.createObjectURL(imageFile);
    setPreview(nextPreview);
    return () => URL.revokeObjectURL(nextPreview);
  }, [imageFile]);

  const handleEditClick = (kid) => {
    setEditingKid(kid);
    setForm({
      title: kid.title || "",
      materialComposition: kid.materialComposition || "",
      productProduction: kid.productProduction || "",
    });
    setImageFile(null);
    setPreview(kid.image?.url || "");
  };

  const handleCancelEdit = () => {
    setEditingKid(null);
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
    if (!editingKid) return;

    if (
      !form.title.trim() ||
      !stripRichText(form.materialComposition) ||
      !stripRichText(form.productProduction)
    ) {
      toast.error("Title, material composition, and product production are required");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Updating kid item...");

    try {
      const payload = new FormData();
      payload.append("title", form.title.trim());
      payload.append("materialComposition", form.materialComposition);
      payload.append("productProduction", form.productProduction);

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const updated = await updateKid(editingKid._id, payload);
      toast.dismiss(loadingToast);
      toast.success("Kid item updated");

      setKids((prev) => prev.map((k) => (k._id === updated._id ? updated : k)));
      handleCancelEdit();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to update kid item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTrigger = (kid) => {
    setDeleteTarget(kid);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting kid item...");

    try {
      await deleteKid(deleteTarget._id);
      toast.dismiss(loadingToast);
      toast.success("Kid item deleted");
      setKids((prev) => prev.filter((k) => k._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to delete kid item");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
            Kids
          </p>
          <h2 className="mt-2 text-2xl font-bold text-slate-900">Modify Kids Items</h2>
          <p className="mt-1 text-sm text-slate-600">
            Review, edit, or delete items that appear on the public kids section.
          </p>
        </div>
        <button
          onClick={loadKids}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <FiRefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Reload
        </button>
      </div>

      {editingKid ? (
        <div className="border border-slate-200 rounded-2xl bg-white p-6 space-y-4 shadow-md">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <h3 className="font-bold text-lg text-slate-800">Editing: {editingKid.title}</h3>
            <button
              onClick={handleCancelEdit}
              className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 transition"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-slate-900"
                />
              </label>

              <RichTextBox
                label="Material Composition"
                value={form.materialComposition}
                onChange={(value) => setForm((previous) => ({ ...previous, materialComposition: value }))}
                placeholder="Add the material composition details here..."
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
                label="Replace Image (Optional)"
                description="Click to upload a new product image"
                preview={preview}
                fileName={imageFile?.name}
                inputId="kids-edit-image-upload"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                onClear={() => {
                  setImageFile(null);
                  setPreview(editingKid.image?.url || "");
                }}
                uploadLabel="Upload Image"
                replaceLabel="Replace Image"
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
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-900 border-t-transparent" />
              <p className="mt-4 text-sm text-slate-500 font-semibold">Loading items...</p>
            </div>
          ) : kids.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-slate-400 font-semibold">No items found in kids collection.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <th className="pb-4 pr-4">Image</th>
                    <th className="pb-4">Title</th>
                    <th className="pb-4">Material Composition</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {kids.map((kid) => (
                    <tr key={kid._id} className="group hover:bg-slate-50/40 transition-colors">
                      <td className="py-3 pr-4">
                        <img
                          src={kid.image?.url}
                          alt={kid.title}
                          className="h-14 w-14 rounded-xl object-contain bg-slate-50 border border-slate-100"
                        />
                      </td>
                      <td className="py-3 font-semibold text-slate-950 pr-4">
                        <div className="max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg truncate">
                          {kid.title}
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <div
                          className="text-xs text-slate-500 font-normal line-clamp-2 max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg"
                          dangerouslySetInnerHTML={{ __html: toRichTextHtml(kid.materialComposition) }}
                        />
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(kid)}
                            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50 transition shadow-sm"
                            title="Edit Product"
                          >
                            <FiEdit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTrigger(kid)}
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

export default KidsModify;
