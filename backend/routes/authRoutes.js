const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");

// Public routes
router.post("/register", authController.registerUser);
router.get("/setup-state", authController.getSetupState);
router.post("/login", authController.loginUser);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);

// Protected routes
router.get("/profile", auth, authController.getUserProfile);
router.put("/profile", auth, authController.updateUserProfile);
router.put("/change-password", auth, authController.changePassword);

// Admin routes
router.get("/admin/all-users", auth, authController.getAllUsers);
router.delete("/admin/users/:userId", auth, authController.deleteUser);
router.patch("/admin/users/:userId/status", auth, authController.updateUserStatus);

module.exports = router;
