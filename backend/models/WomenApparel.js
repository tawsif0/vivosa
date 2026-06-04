const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["color", "custom"],
    default: "color",
  },
  label: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: String,
    trim: true,
  },
  image: {
    url: {
      type: String,
    },
    publicId: {
      type: String,
    },
  },
});

const womenApparelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "sweater",
        "jackets-coats",
        "pants",
        "polo-shirts",
        "shirts",
        "t-shirts",
        "swim-lingerie",
      ],
    },
    colorSectionTitle: {
      type: String,
      default: "AVAILABLE COLORS",
    },
    customSectionTitle: {
      type: String,
      default: "OPTIONS & STYLES",
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
    variants: [variantSchema],
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

const WomenApparel = mongoose.model("WomenApparel", womenApparelSchema);

module.exports = WomenApparel;
