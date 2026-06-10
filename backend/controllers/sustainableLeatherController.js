const { Readable } = require("stream");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const SustainableLeather = require("../models/SustainableLeather");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

const streamUpload = (buffer, folder = "vivosa/sustainable-leather") =>
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
      }
    );
    Readable.from(buffer).pipe(stream);
  });

exports.uploadMiddleware = upload.single("image");

exports.getPublicItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ success: false, error: "Category is required" });
    }
    const items = await SustainableLeather.find({ category, isActive: true }).sort({ createdAt: 1 });
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

exports.getPublicItemById = async (req, res, next) => {
  try {
    const item = await SustainableLeather.findOne({ _id: req.params.id, isActive: true });
    if (!item) {
      return res.status(404).json({ success: false, error: "Sustainable leather item not found" });
    }
    res.json({ success: true, item });
  } catch (error) {
    next(error);
  }
};

exports.getAllAdminItems = async (req, res, next) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const items = await SustainableLeather.find(query).sort({ createdAt: 1 });
    res.json({ success: true, items });
  } catch (error) {
    next(error);
  }
};

exports.createItem = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image is required" });
    }

    const uploadRes = await streamUpload(req.file.buffer);

    const {
      title,
      fullName,
      subtitle,
      thickness,
      rawhide,
      rawMaterial,
      processing,
      productDetails,
      desc,
      category,
      code,
      name,
      type,
      colorName,
    } = req.body;

    const newItem = await SustainableLeather.create({
      title,
      fullName,
      subtitle,
      thickness,
      rawhide,
      rawMaterial,
      processing,
      productDetails,
      desc,
      category,
      code,
      name,
      type,
      colorName,
      image: {
        url: uploadRes.secure_url,
        publicId: uploadRes.public_id,
      },
      createdBy: req.user._id,
    });

    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    next(error);
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const item = await SustainableLeather.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    const {
      title,
      fullName,
      subtitle,
      thickness,
      rawhide,
      rawMaterial,
      processing,
      productDetails,
      desc,
      code,
      name,
      type,
      colorName,
      isActive,
    } = req.body;

    let imageUpdate = {};
    if (req.file) {
      if (item.image?.publicId) {
        await cloudinary.uploader.destroy(item.image.publicId).catch((err) => {
          console.error("Failed to delete old image from Cloudinary:", err);
        });
      }
      const uploadRes = await streamUpload(req.file.buffer);
      imageUpdate = {
        image: {
          url: uploadRes.secure_url,
          publicId: uploadRes.public_id,
        },
      };
    }

    const updatedItem = await SustainableLeather.findByIdAndUpdate(
      req.params.id,
      {
        title,
        fullName,
        subtitle,
        thickness,
        rawhide,
        rawMaterial,
        processing,
        productDetails,
        desc,
        code,
        name,
        type,
        colorName,
        isActive: isActive === undefined ? item.isActive : isActive === "true" || isActive === true,
        ...imageUpdate,
      },
      { new: true }
    );

    res.json({ success: true, item: updatedItem });
  } catch (error) {
    next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const item = await SustainableLeather.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, error: "Item not found" });
    }

    if (item.image?.publicId) {
      await cloudinary.uploader.destroy(item.image.publicId).catch((err) => {
        console.error("Failed to delete image from Cloudinary during delete:", err);
      });
    }

    await SustainableLeather.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
