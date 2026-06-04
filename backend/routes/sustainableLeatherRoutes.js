const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const requireAdmin = require("../middlewares/admin");
const controller = require("../controllers/sustainableLeatherController");

router.get("/public", controller.getPublicItems);
router.get("/public/:id", controller.getPublicItemById);

router.get("/admin", auth, requireAdmin, controller.getAllAdminItems);
router.post("/admin", auth, requireAdmin, controller.uploadMiddleware, controller.createItem);
router.put("/admin/:id", auth, requireAdmin, controller.uploadMiddleware, controller.updateItem);
router.delete("/admin/:id", auth, requireAdmin, controller.deleteItem);

module.exports = router;
