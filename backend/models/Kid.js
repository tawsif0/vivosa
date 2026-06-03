const mongoose = require("mongoose");

const kidSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    materialComposition: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
    },
    productProduction: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Kid = mongoose.model("Kid", kidSchema);

module.exports = Kid;
