import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiRefreshCw, FiTrash2, FiCheckCircle, FiMessageSquare, FiInbox } from "react-icons/fi";
import ConfirmModal from "../components/ConfirmModal";
import {
  deleteContact,
  fetchAdminContacts,
  markAllContactsRead,
  toggleContactStatus,
} from "../api/contact";

const ContactUsers = ({ onUnreadCountChange }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminContacts();
      setContacts(data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to load contact submissions");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const unreadCount = contacts.filter((contact) => contact.status !== "read").length;
  const totalCount = contacts.length;

  useEffect(() => {
    onUnreadCountChange?.(unreadCount);
  }, [onUnreadCountChange, unreadCount]);

  const handleToggleStatus = async (contact) => {
    try {
      const updated = await toggleContactStatus(contact._id);
      setContacts((previous) =>
        previous.map((entry) => (entry._id === contact._id ? updated : entry)),
      );
      toast.success(`Marked as ${updated?.status || "updated"}`);
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update status");
    }
  };

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;

    setMarkingAllRead(true);
    const loadingToast = toast.loading("Marking all messages as read...");

    try {
      await markAllContactsRead();
      const now = new Date().toISOString();
      setContacts((previous) =>
        previous.map((entry) =>
          entry.status === "read"
            ? entry
            : {
                ...entry,
                status: "read",
                readAt: entry.readAt || now,
              },
        ),
      );
      toast.dismiss(loadingToast);
      toast.success("All contact submissions marked as read");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to mark all submissions as read");
    } finally {
      setMarkingAllRead(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    const loadingToast = toast.loading("Deleting contact submission...");

    try {
      await deleteContact(deleteTarget._id);
      toast.dismiss(loadingToast);
      toast.success("Contact submission deleted");
      setContacts((previous) => previous.filter((entry) => entry._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to delete contact submission");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Admin
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Contact Users</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-600">
              Review messages submitted through the public contact form.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleMarkAllRead}
              disabled={loading || markingAllRead || unreadCount === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiInbox className={`h-4 w-4 ${markingAllRead ? "animate-pulse" : ""}`} />
              {markingAllRead ? "Marking..." : "Mark as Read All"}
            </button>
            <button
              type="button"
              onClick={loadContacts}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
            >
              <FiRefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Total</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{totalCount}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">New</p>
            <p className="mt-1 text-2xl font-bold text-amber-700">{unreadCount}</p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">Read</p>
            <p className="mt-1 text-2xl font-bold text-emerald-700">{totalCount - unreadCount}</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-6 text-center text-slate-600">Loading contact submissions...</div>
        ) : contacts.length === 0 ? (
          <div className="p-6 text-center text-slate-600">No contact submissions found.</div>
        ) : (
          <div className="space-y-3 p-3 sm:p-4">
            {contacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">{contact.name}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                          contact.status === "read"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {contact.status || "new"}
                      </span>
                    </div>
                    <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                      <p>
                        <span className="font-semibold text-slate-900">Company:</span>{" "}
                        {contact.company || "-"}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Email:</span>{" "}
                        {contact.email ? (
                          <a
                            href={`mailto:${contact.email}`}
                            className="inline-flex items-center text-slate-700 transition-colors hover:text-emerald-700 hover:underline hover:underline-offset-4"
                            aria-label={`Email ${contact.name || "contact"}`}
                          >
                            {contact.email}
                          </a>
                        ) : (
                          "-"
                        )}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Phone:</span>{" "}
                        {contact.phone ? (
                          <a
                            href={`tel:${String(contact.phone).replace(/[^\d+]/g, "")}`}
                            className="inline-flex items-center text-slate-700 transition-colors hover:text-emerald-700 hover:underline hover:underline-offset-4"
                            aria-label={`Call ${contact.name || "contact"}`}
                          >
                            {contact.phone}
                          </a>
                        ) : (
                          "-"
                        )}
                      </p>
                      <p>
                        <span className="font-semibold text-slate-900">Interest:</span>{" "}
                        {contact.interest || "-"}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                        <FiMessageSquare className="h-4 w-4" />
                        Message
                      </div>
                      <p className="whitespace-pre-line text-sm leading-6 text-slate-700">
                        {contact.message}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500">
                      Submitted:{" "}
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleString() : "N/A"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row xl:w-[180px] xl:flex-col xl:self-stretch">
                      {contact.status !== "read" ? (
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(contact)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto xl:w-full"
                        >
                          <FiCheckCircle className="h-4 w-4" />
                          Mark Read
                        </button>
                      ) : null}
                    <button
                      type="button"
                      onClick={() => setDeleteTarget(contact)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:w-auto xl:w-full"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Contact Submission"
        message={`Delete the message from "${deleteTarget?.name || ""}"? This cannot be undone.`}
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

export default ContactUsers;
