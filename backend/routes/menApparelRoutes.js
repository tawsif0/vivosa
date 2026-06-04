const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const requireAdmin = require("../middlewares/admin");
const menApparelController = require("../controllers/menApparelController");

router.get("/public", menApparelController.getPublicItems);
router.get("/public/:id", menApparelController.getPublicItemById);

router.get("/admin", auth, requireAdmin, menApparelController.getAllAdminItems);
router.post("/admin", auth, requireAdmin, menApparelController.uploadMiddleware, menApparelController.createItem);
router.put("/admin/:id", auth, requireAdmin, menApparelController.uploadMiddleware, menApparelController.updateItem);
router.delete("/admin/:id", auth, requireAdmin, menApparelController.deleteItem);

module.exports = router;
