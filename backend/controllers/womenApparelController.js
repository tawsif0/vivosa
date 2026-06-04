const { Readable } = require("stream");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const WomenApparel = require("../models/WomenApparel");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

const getRealTimestamp = async () => {
  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 3000);
    const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC", { signal: controller.signal });
    clearTimeout(id);
    if (res.ok) {
      const data = await res.json();
      if (data && data.unixtime) {
        return data.unixtime;
      }
    }
  } catch (err) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 2000);
      const resDate = await fetch("https://www.google.com", { method: "HEAD", signal: controller.signal });
      clearTimeout(id);
      const dateStr = resDate.headers.get("date");
      if (dateStr) {
        return Math.round(new Date(dateStr).getTime() / 1000);
      }
    } catch (e) {
      // ignore
    }
  }
  return Math.round(Date.now() / 1000);
};

const normalizeRichTextInput = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .map((item) => `<p>${item}</p>`)
      .join("");
  }

  const raw = String(value || "").trim();
  if (!raw) return "";

  if (/<[a-z][\s\S]*>/i.test(raw)) {
    return raw;
  }

  return raw
    .split(/\n+/)
    .map((line) => String(line || "").trim())
    .filter(Boolean)
    .map((line) => `<p>${line}</p>`)
    .join("");
};

const stripHtml = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const streamUpload = async (buffer, folder = "vivosa/women") => {
  const timestamp = await getRealTimestamp();
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        timestamp: timestamp,
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};

exports.uploadMiddleware = upload.any();

exports.getPublicItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) {
      filter.category = category;
    }
    const items = await WomenApparel.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

exports.getPublicItemById = async (req, res, next) => {
  try {
    const item = await WomenApparel.findOne({ _id: req.params.id, isActive: true });
    if (!item) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.getAllAdminItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      filter.category = category;
    }
    const items = await WomenApparel.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const files = req.files || [];
    const mainImageFile = files.find((f) => f.fieldname === "image");

    if (!mainImageFile) {
      return res.status(400).json({ success: false, error: "Main image is required" });
    }

    const title = String(req.body.title || "").trim();
    const category = String(req.body.category || "").trim();
    const description = normalizeRichTextInput(req.body.description);
    const colorSectionTitle = req.body.colorSectionTitle !== undefined ? String(req.body.colorSectionTitle || "").trim() : "AVAILABLE COLORS";
    const customSectionTitle = req.body.customSectionTitle !== undefined ? String(req.body.customSectionTitle || "").trim() : "OPTIONS & STYLES";

    if (!title || !category || !stripHtml(description)) {
      return res.status(400).json({
        success: false,
        error: "Title, category, and description are required",
      });
    }

    // Upload main image
    const mainUploaded = await streamUpload(mainImageFile.buffer);

    // Parse variants metadata
    let rawVariants = [];
    if (req.body.variants) {
      try {
        rawVariants = JSON.parse(req.body.variants);
      } catch (err) {
        rawVariants = [];
      }
    }

    const variants = [];
    for (let i = 0; i < rawVariants.length; i++) {
      const v = rawVariants[i];
      const variantImageFile = files.find((f) => f.fieldname === `variantImage_${i}`);
      let imageObj = undefined;

      if (variantImageFile) {
        const uploadedVariant = await streamUpload(variantImageFile.buffer);
        imageObj = {
          url: uploadedVariant.secure_url,
          publicId: uploadedVariant.public_id,
        };
      }

      variants.push({
        type: v.type || "color",
        label: v.label,
        value: v.value,
        image: imageObj,
      });
    }

    const item = await WomenApparel.create({
      title,
      description,
      category,
      colorSectionTitle,
      customSectionTitle,
      image: {
        url: mainUploaded.secure_url,
        publicId: mainUploaded.public_id,
      },
      variants,
      createdBy: req.user?._id,
    });

    res.status(201).json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const item = await WomenApparel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    const title = req.body.title !== undefined ? String(req.body.title || "").trim() : item.title;
    const category = req.body.category !== undefined ? String(req.body.category || "").trim() : item.category;
    const description =
      req.body.description !== undefined
        ? normalizeRichTextInput(req.body.description)
        : item.description;
    const colorSectionTitle = req.body.colorSectionTitle !== undefined ? String(req.body.colorSectionTitle || "").trim() : item.colorSectionTitle;
    const customSectionTitle = req.body.customSectionTitle !== undefined ? String(req.body.customSectionTitle || "").trim() : item.customSectionTitle;

    if (!title || !category || !stripHtml(description)) {
      return res.status(400).json({
        success: false,
        error: "Title, category, and description are required",
      });
    }

    item.title = title;
    item.category = category;
    item.description = description;
    item.colorSectionTitle = colorSectionTitle;
    item.customSectionTitle = customSectionTitle;

    const files = req.files || [];
    const mainImageFile = files.find((f) => f.fieldname === "image");

    // Update main image if new file is supplied
    if (mainImageFile) {
      if (item.image?.publicId) {
        try {
          await cloudinary.uploader.destroy(item.image.publicId);
        } catch (e) {
          // ignore error
        }
      }
      const uploadedMain = await streamUpload(mainImageFile.buffer);
      item.image = {
        url: uploadedMain.secure_url,
        publicId: uploadedMain.public_id,
      };
    }

    // Parse and handle variant changes
    if (req.body.variants !== undefined) {
      let rawVariants = [];
      try {
        rawVariants = JSON.parse(req.body.variants);
      } catch (err) {
        rawVariants = [];
      }

      // Collect publicIds of deleted/replaced variant images so we can clean Cloudinary
      const currentPublicIds = new Set(
        item.variants
          .map((v) => v.image?.publicId)
          .filter(Boolean)
      );

      const nextVariants = [];
      for (let i = 0; i < rawVariants.length; i++) {
        const v = rawVariants[i];
        const variantImageFile = files.find((f) => f.fieldname === `variantImage_${i}`);
        
        let imageObj = undefined;
        if (v.image && v.image.url && v.image.publicId) {
          imageObj = v.image;
          currentPublicIds.delete(v.image.publicId);
        }

        if (variantImageFile) {
          // If replacing an existing variant image, queue the old publicId for deletion
          if (imageObj?.publicId) {
            currentPublicIds.add(imageObj.publicId);
          }
          const uploadedVariant = await streamUpload(variantImageFile.buffer);
          imageObj = {
            url: uploadedVariant.secure_url,
            publicId: uploadedVariant.public_id,
          };
        }

        nextVariants.push({
          type: v.type || "color",
          label: v.label,
          value: v.value,
          image: imageObj,
        });
      }

      // Delete unused variant images from Cloudinary
      for (const publicId of currentPublicIds) {
        try {
          await cloudinary.uploader.destroy(publicId);
        } catch (e) {
          // ignore
        }
      }

      item.variants = nextVariants;
    }

    await item.save();
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await WomenApparel.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    // Delete main image
    if (item.image?.publicId) {
      try {
        await cloudinary.uploader.destroy(item.image.publicId);
      } catch (e) {
        // ignore
      }
    }

    // Delete variant images
    if (item.variants && item.variants.length > 0) {
      for (const variant of item.variants) {
        if (variant.image?.publicId) {
          try {
            await cloudinary.uploader.destroy(variant.image.publicId);
          } catch (e) {
            // ignore
          }
        }
      }
    }

    await item.deleteOne();
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
