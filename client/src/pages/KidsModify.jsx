import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiEdit2, FiImage, FiRefreshCw, FiTrash2, FiType } from "react-icons/fi";
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

  const startEdit = (kid) => {
    setEditingKid(kid);
    setForm({
      title: kid.title || "",
      materialComposition: toRichTextHtml(kid.materialComposition),
      productProduction: toRichTextHtml(kid.productProduction),
    });
    setImageFile(null);
    setPreview("");
  };

  const cancelEdit = () => {
    setEditingKid(null);
    setForm(emptyForm);
    setImageFile(null);
    setPreview("");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const submitEdit = async (event) => {
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

      await updateKid(editingKid._id, payload);
      toast.dismiss(loadingToast);
      toast.success("Kid item updated");
      await loadKids();
      cancelEdit();
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to update kid item");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting kid item...");

    try {
      await deleteKid(deleteTarget._id);
      toast.dismiss(loadingToast);
      toast.success("Kid item deleted");
      setKids((previous) => previous.filter((kid) => kid._id !== deleteTarget._id));
      if (editingKid?._id === deleteTarget._id) {
        cancelEdit();
      }
      setDeleteTarget(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to delete kid item");
    } finally {
      setIsDeleting(false);
    }
  };

  const editTitle = useMemo(
    () => (editingKid ? `Edit: ${editingKid.title}` : "Select a kid item to edit"),
    [editingKid],
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
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
            type="button"
            onClick={loadKids}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
          >
            <FiRefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
              Loading kids items...
            </div>
          ) : kids.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
              No kids items found.
            </div>
          ) : (
            kids.map((kid) => (
              <motion.div
                key={kid._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
                  <div className="h-28 w-full overflow-hidden rounded-2xl bg-slate-100 md:h-24 md:w-24 md:shrink-0">
                    <img
                      src={kid.image?.url}
                      alt={kid.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold text-slate-900">
                      {kid.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                      {stripRichText(kid.materialComposition)}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                      {stripRichText(kid.productProduction)}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2 md:flex-col">
                    <button
                      type="button"
                      onClick={() => startEdit(kid)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <FiEdit2 className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(kid)}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Editor
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{editTitle}</h3>
          </div>

          {editingKid ? (
            <form onSubmit={submitEdit} className="space-y-4">
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

              <ImageUploadBox
                label="Image"
                description="Click to replace product image"
                preview={preview}
                currentImage={editingKid.image?.url}
                fileName={imageFile?.name}
                inputId="kids-edit-image-upload"
                onChange={(event) => setImageFile(event.target.files?.[0] || null)}
                onClear={() => setImageFile(null)}
                uploadLabel="Upload Image"
                replaceLabel="Replace Image"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FiEdit2 className="h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              Select a kids item from the list to edit it here.
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Kids Item"
        message={`Are you sure you want to delete "${deleteTarget?.title || ""}"? This will remove it from the public kids pages.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDanger
        isLoading={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default KidsModify;

