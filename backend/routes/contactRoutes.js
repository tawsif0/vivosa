const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const requireAdmin = require("../middlewares/admin");
const contactController = require("../controllers/contactController");

router.post("/", contactController.submitContactForm);
router.get("/admin", auth, requireAdmin, contactController.getAdminContacts);
router.patch("/admin/:id/status", auth, requireAdmin, contactController.updateContactStatus);
router.patch("/admin/mark-all-read", auth, requireAdmin, contactController.markAllContactsRead);
router.delete("/admin/:id", auth, requireAdmin, contactController.deleteContact);

module.exports = router;
