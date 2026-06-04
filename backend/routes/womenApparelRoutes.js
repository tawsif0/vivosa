const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const requireAdmin = require("../middlewares/admin");
const womenApparelController = require("../controllers/womenApparelController");

router.get("/public", womenApparelController.getPublicItems);
router.get("/public/:id", womenApparelController.getPublicItemById);

router.get("/admin", auth, requireAdmin, womenApparelController.getAllAdminItems);
router.post("/admin", auth, requireAdmin, womenApparelController.uploadMiddleware, womenApparelController.createItem);
router.put("/admin/:id", auth, requireAdmin, womenApparelController.uploadMiddleware, womenApparelController.updateItem);
router.delete("/admin/:id", auth, requireAdmin, womenApparelController.deleteItem);

module.exports = router;
