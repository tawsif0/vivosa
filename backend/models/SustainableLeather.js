const mongoose = require("mongoose");

const SustainableLeatherSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fullName: { type: String },
    subtitle: { type: String },
    thickness: { type: String },
    rawhide: { type: String },
    image: {
      url: { type: String, required: true },
      publicId: { type: String },
    },
    rawMaterial: { type: String },
    processing: { type: String },
    productDetails: { type: String },
    desc: { type: String },
    category: {
      type: String,
      required: true,
      enum: ["contract-furniture", "leather-footwear", "leather-goods", "leather-lining", "automotive", "aviation"],
    },
    code: { type: String },
    name: { type: String },
    type: { type: String },
    colorName: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SustainableLeather", SustainableLeatherSchema);
