const ContactSubmission = require("../models/ContactSubmission");
const nodemailer = require("nodemailer");
const multer = require("multer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

exports.uploadMiddleware = upload.single("attachment");

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

exports.composeEmail = async (req, res, next) => {
  try {
    const { to, subject, content, submissionId } = req.body;

    if (!to || !subject || !content) {
      return res.status(400).json({ success: false, error: "To, subject, and content are required" });
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM,  // Always use the configured backend sender
      to,
      subject,
      html: content.replace(/\n/g, "<br>"),
    };

    if (req.file) {
      mailOptions.attachments = [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        },
      ];
    }

    await transporter.sendMail(mailOptions);

    // Auto mark as read
    if (submissionId) {
      const contact = await ContactSubmission.findById(submissionId);
      if (contact) {
        contact.status = "read";
        contact.readAt = new Date();
        await contact.save();
      }
    }

    return res.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Compose email error:", error);
    return res.status(500).json({ success: false, error: "Failed to send email: " + error.message });
  }
};
