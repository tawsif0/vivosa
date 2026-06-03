const mongoose = require("mongoose");

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    interest: {
      type: String,
      trim: true,
      default: "",
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "read"],
      default: "new",
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

const ContactSubmission = mongoose.model("ContactSubmission", contactSubmissionSchema);

module.exports = ContactSubmission;
