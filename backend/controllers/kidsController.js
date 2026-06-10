const { Readable } = require("stream");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const Kid = require("../models/Kid");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

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

const streamUpload = (buffer, folder = "vivosa/kids") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
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

exports.uploadMiddleware = upload.single("image");

exports.getPublicKids = async (req, res, next) => {
  try {
    const kids = await Kid.find({ isActive: true }).sort({ createdAt: 1 });
    res.json({ success: true, kids });
  } catch (error) {
    next(error);
  }
};

exports.getPublicKidById = async (req, res, next) => {
  try {
    const kid = await Kid.findOne({ _id: req.params.id, isActive: true });
    if (!kid) {
      return res.status(404).json({ success: false, error: "Kid item not found" });
    }

    res.json({ success: true, kid });
  } catch (error) {
    next(error);
  }
};

exports.getAllKids = async (req, res, next) => {
  try {
    const kids = await Kid.find({}).sort({ createdAt: 1 });
    res.json({ success: true, kids });
  } catch (error) {
    next(error);
  }
};

exports.createKid = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image is required" });
    }

    const title = String(req.body.title || "").trim();
    const productProduction = normalizeRichTextInput(req.body.productProduction);
    const materialComposition = normalizeRichTextInput(req.body.materialComposition);

    if (!title || !stripHtml(productProduction) || !stripHtml(materialComposition)) {
      return res.status(400).json({
        success: false,
        error: "Title, material composition, and product production are required",
      });
    }

    const uploaded = await streamUpload(req.file.buffer);
    const kid = await Kid.create({
      title,
      materialComposition,
      productProduction,
      image: {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      },
      createdBy: req.user?._id,
    });

    res.status(201).json({ success: true, kid });
  } catch (error) {
    next(error);
  }
};

exports.updateKid = async (req, res, next) => {
  try {
    const kid = await Kid.findById(req.params.id);
    if (!kid) {
      return res.status(404).json({ success: false, error: "Kid item not found" });
    }

    const title = req.body.title !== undefined ? String(req.body.title || "").trim() : kid.title;
    const productProduction =
      req.body.productProduction !== undefined
        ? normalizeRichTextInput(req.body.productProduction)
        : kid.productProduction;
    const materialComposition =
      req.body.materialComposition !== undefined
        ? normalizeRichTextInput(req.body.materialComposition)
        : kid.materialComposition;

    if (!title || !stripHtml(productProduction) || !stripHtml(materialComposition)) {
      return res.status(400).json({
        success: false,
        error: "Title, material composition, and product production are required",
      });
    }

    kid.title = title;
    kid.productProduction = productProduction;
    kid.materialComposition = materialComposition;

    if (req.file) {
      if (kid.image?.publicId) {
        await cloudinary.uploader.destroy(kid.image.publicId);
      }

      const uploaded = await streamUpload(req.file.buffer);
      kid.image = {
        url: uploaded.secure_url,
        publicId: uploaded.public_id,
      };
    }

    await kid.save();
    res.json({ success: true, kid });
  } catch (error) {
    next(error);
  }
};

exports.deleteKid = async (req, res, next) => {
  try {
    const kid = await Kid.findById(req.params.id);
    if (!kid) {
      return res.status(404).json({ success: false, error: "Kid item not found" });
    }

    if (kid.image?.publicId) {
      await cloudinary.uploader.destroy(kid.image.publicId);
    }

    await kid.deleteOne();
    res.json({ success: true, message: "Kid item deleted" });
  } catch (error) {
    next(error);
  }
};
