import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiRefreshCw, FiTrash2, FiCheckCircle, FiMessageSquare, FiInbox, FiX } from "react-icons/fi";
import ConfirmModal from "../components/ConfirmModal";
import {
  deleteContact,
  fetchAdminContacts,
  markAllContactsRead,
  toggleContactStatus,
  composeEmail,
} from "../api/contact";

const interestLabels = {
  leather: "Leather Collection",
  apparel: "Apparel Manufacturing",
  sourcing: "Sustainable Sourcing",
  custom: "Custom Projects",
  sample_book: "Sample Book",
};

const getInterestLabel = (val) => interestLabels[val] || val || "-";

const getDefaultEmailTemplate = (contact) => {
  const name = contact?.name || "";
  const interest = contact?.interest || "";
  
  if (interest === "sample_book") {
    return {
      subject: "Response to your Sample Book Inquiry - Vivosa",
      content: `Dear ${name},

Thank you for your interest in Vivosa. We have received your request for a Sample Book. 

We are preparing our latest sample materials to send to you. Please let us know if there are any specific leather articles or colors you are most interested in.

Kind regards,
The Vivosa Team`
    };
  } else if (interest === "leather") {
    return {
      subject: "Response to your Leather Collection Inquiry - Vivosa",
      content: `Dear ${name},

Thank you for reaching out regarding our Leather Collection. 

We offer premium, sustainable leather articles suitable for aviation, automotive, footwear, and more. Our team is reviewing your requirements and will follow up shortly to help you select the best materials.

Kind regards,
The Vivosa Team`
    };
  } else if (interest === "apparel") {
    return {
      subject: "Response to your Apparel Manufacturing Inquiry - Vivosa",
      content: `Dear ${name},

Thank you for contacting us about our Apparel Manufacturing services. 

We partner with leading brands to deliver world-class apparel with ethical precision. We will be in touch soon to discuss your specific design and production needs.

Kind regards,
The Vivosa Team`
    };
  } else if (interest === "sourcing") {
    return {
      subject: "Response to your Sustainable Sourcing Inquiry - Vivosa",
      content: `Dear ${name},

Thank you for inquiring about our Sustainable Sourcing options. 

We are committed to ethical production and green supply chains. One of our sourcing specialists will reach out to you shortly to gather details.

Kind regards,
The Vivosa Team`
    };
  } else if (interest === "custom") {
    return {
      subject: "Response to your Custom Project Inquiry - Vivosa",
      content: `Dear ${name},

Thank you for your inquiry regarding Custom Projects. 

We welcome collaboration on custom leather finishes, colors, and cuts. We will contact you soon to explore your vision.

Kind regards,
The Vivosa Team`
    };
  } else {
    return {
      subject: "Response to your Inquiry - Vivosa",
      content: `Dear ${name},

Thank you for your message and interest in Vivosa. 

We have received your general inquiry and our team is currently reviewing it. We will get back to you shortly.

Kind regards,
The Vivosa Team`
    };
  }
};

const ContactUsers = ({ onUnreadCountChange }) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Compose email state
  const [activeComposeContact, setActiveComposeContact] = useState(null);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [emailAttachment, setEmailAttachment] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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

  const handleComposeClick = (contact) => {
    const template = getDefaultEmailTemplate(contact);
    setEmailTo(contact.email || "");
    setEmailSubject(template.subject);
    setEmailContent(template.content);
    setEmailAttachment(null);
    setActiveComposeContact(contact);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!activeComposeContact) return;
    setIsSendingEmail(true);
    const loadingToast = toast.loading("Sending email...");
    try {
      const formData = new FormData();
      formData.append("to", emailTo);
      formData.append("subject", emailSubject);
      formData.append("content", emailContent);
      formData.append("submissionId", activeComposeContact._id);
      if (emailAttachment) {
        formData.append("attachment", emailAttachment);
      }
      await composeEmail(formData);
      toast.dismiss(loadingToast);
      toast.success("Email sent successfully!");
      // Auto mark as read in local state
      setContacts((prev) =>
        prev.map((c) =>
          c._id === activeComposeContact._id
            ? { ...c, status: "read", readAt: c.readAt || new Date().toISOString() }
            : c
        )
      );
      setActiveComposeContact(null);
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.error || "Failed to send email");
    } finally {
      setIsSendingEmail(false);
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
            {contacts.map((contact) => {
              const isGetInTouch = contact.interest?.includes("(Landing)");
              return (
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
                        {isGetInTouch ? (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                            Get In Touch
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700">
                            Contact Page
                          </span>
                        )}
                      </div>
                      <div className="grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
                        {(!isGetInTouch || contact.company) && (
                          <p>
                            <span className="font-semibold text-slate-900">Company:</span>{" "}
                            {contact.company || "-"}
                          </p>
                        )}
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
                        {(!isGetInTouch || contact.phone) && (
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
                        )}
                        {!isGetInTouch && (
                          <p>
                            <span className="font-semibold text-slate-900">Interest:</span>{" "}
                            {getInterestLabel(contact.interest)}
                          </p>
                        )}
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
                    <button
                      type="button"
                      onClick={() => handleComposeClick(contact)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:w-auto xl:w-full"
                    >
                      <FiMessageSquare className="h-4 w-4" />
                      Compose Email
                    </button>
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
            );
          })}
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

      {activeComposeContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Compose Response Email</h3>
                <p className="text-xs text-slate-500">Replying to {activeComposeContact.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveComposeContact(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSendEmail} className="p-6 overflow-y-auto space-y-4 flex-1 text-left">


              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Email To
                </label>
                <input
                  type="text"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-900 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-900 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Content (HTML Supported)
                </label>
                <textarea
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  required
                  rows={8}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-slate-900 transition font-sans resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 mb-1">
                  Attachment File (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    onChange={(e) => setEmailAttachment(e.target.files?.[0] || null)}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 transition cursor-pointer"
                  />
                  {emailAttachment && (
                    <button
                      type="button"
                      onClick={() => setEmailAttachment(null)}
                      className="text-xs font-semibold text-red-500 hover:underline"
                    >
                      Clear File
                    </button>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setActiveComposeContact(null)}
                  className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60 transition min-w-[120px]"
                >
                  {isSendingEmail ? "Sending..." : "Send Email"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactUsers;
