const ContactSubmission = require("../models/ContactSubmission");

const normalizeContactInput = (value) => String(value || "").trim();

exports.submitContactForm = async (req, res, next) => {
  try {
    const name = normalizeContactInput(req.body.name);
    const company = normalizeContactInput(req.body.company);
    const email = normalizeContactInput(req.body.email);
    const phone = normalizeContactInput(req.body.phone);
    const interest = normalizeContactInput(req.body.interest);
    const message = normalizeContactInput(req.body.message);

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    const contact = await ContactSubmission.create({
      name,
      company,
      email,
      phone,
      interest,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      contact,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAdminContacts = async (req, res, next) => {
  try {
    const contacts = await ContactSubmission.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, contacts });
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const contact = await ContactSubmission.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: "Contact submission not found" });
    }

    const nextStatus = contact.status === "new" ? "read" : "new";
    contact.status = nextStatus;
    contact.readAt = nextStatus === "read" ? new Date() : undefined;
    await contact.save();

    return res.json({ success: true, contact });
  } catch (error) {
    next(error);
  }
};

exports.markAllContactsRead = async (req, res, next) => {
  try {
    const result = await ContactSubmission.updateMany(
      { status: { $ne: "read" } },
      { $set: { status: "read", readAt: new Date() } },
    );

    return res.json({
      success: true,
      message: "All contact submissions marked as read",
      modifiedCount: result.modifiedCount || 0,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const contact = await ContactSubmission.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, error: "Contact submission not found" });
    }

    await contact.deleteOne();
    return res.json({ success: true, message: "Contact submission deleted" });
  } catch (error) {
    next(error);
  }
};
