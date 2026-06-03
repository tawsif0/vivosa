const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const requireAdmin = require("../middlewares/admin");
const kidsController = require("../controllers/kidsController");

router.get("/public", kidsController.getPublicKids);
router.get("/public/:id", kidsController.getPublicKidById);

router.get("/admin", auth, requireAdmin, kidsController.getAllKids);
router.post("/admin", auth, requireAdmin, kidsController.uploadMiddleware, kidsController.createKid);
router.put("/admin/:id", auth, requireAdmin, kidsController.uploadMiddleware, kidsController.updateKid);
router.delete("/admin/:id", auth, requireAdmin, kidsController.deleteKid);

module.exports = router;
