const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const requireAdmin = require("../middlewares/admin");
const dashboardController = require("../controllers/dashboardController");

router.get("/admin/overview", auth, requireAdmin, dashboardController.getAdminOverview);

module.exports = router;
