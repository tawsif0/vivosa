const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendMail } = require("../utils/mailer");

const sendEmail = async (mailOptions) => {
  try {
    await sendMail(mailOptions);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("Email could not be sent");
  }
};

const sanitizeUser = (user) => {
  if (!user) return user;
  const obj = user.toObject ? user.toObject() : { ...user };
  delete obj.password;
  delete obj.tokens;
  delete obj.passwordResetToken;
  delete obj.passwordResetExpires;
  return obj;
};

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const userCount = await User.countDocuments();
    const userType = userCount === 0 ? "admin" : "user";

    const user = new User({
      name,
      email,
      password,
      userType,
      status: "active",
    });

    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: "Welcome!",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Welcome ${name}!</h2>
            <p>Your account has been successfully created.</p>
            <p>You can now log in and access your dashboard.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error("Welcome email failed, but account was created:", emailError);
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return res.status(201).json({
      user: sanitizeUser(user),
      token,
      userType,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    user.lastLogin = new Date();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();

    res.json({
      user: sanitizeUser(user),
      token,
      userType: user.userType,
      status: user.status,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(400).json({ error: error.message });
  }
};

// Password reset functions
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>You requested a password reset for your account.</p>
          <p>Click the button below to reset your password (valid for 30 minutes):</p>
          <a href="${resetUrl}" 
             style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${resetUrl}</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ error: "Failed to send reset email" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Token is invalid or has expired" });
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSetupState = async (_req, res) => {
  try {
    const userCount = await User.countDocuments();

    return res.json({
      success: true,
      isInitialSetup: userCount === 0,
      userCount,
    });
  } catch (error) {
    console.error("Get setup state error:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = req.user;

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(sanitizeUser(user));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email"];

  try {
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates" });
    }

    if (req.body.email) {
      const existing = await User.findOne({
        email: req.body.email,
        _id: { $ne: req.user._id },
      });
      if (existing) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.json(sanitizeUser(req.user));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Admin: Get all users (non-admin)
exports.getAllUsers = async (req, res) => {
  try {
    const user = req.user;

    if (user.userType !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const users = await User.find({ userType: { $ne: "admin" } })
      .select("name email userType status createdAt lastLogin")
      .sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

// Admin: Delete user
exports.deleteUser = async (req, res) => {
  try {
    const adminUser = req.user;
    const { userId } = req.params;

    if (adminUser.userType !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (adminUser._id.toString() === userId) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }

    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToDelete.userType === "admin") {
      return res.status(400).json({ error: "Admin account cannot be deleted" });
    }

    await User.deleteOne({ _id: userToDelete._id });

    return res.json({
      success: true,
      message: "User deleted successfully",
      deletedUserId: userToDelete._id,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ error: error.message });
  }
};

// Admin: Update user status (active/inactive)
exports.updateUserStatus = async (req, res) => {
  try {
    const adminUser = req.user;
    const { userId } = req.params;
    const { status } = req.body;

    if (adminUser.userType !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    if (adminUser._id.toString() === userId) {
      return res.status(400).json({ error: "You cannot change your own status" });
    }

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const userToUpdate = await User.findById(userId);
    if (!userToUpdate) {
      return res.status(404).json({ error: "User not found" });
    }

    if (userToUpdate.userType === "admin") {
      return res.status(400).json({ error: "Admin status cannot be changed" });
    }

    userToUpdate.status = status;
    await userToUpdate.save();

    return res.json({
      success: true,
      message: "Status updated successfully",
      user: {
        _id: userToUpdate._id,
        status: userToUpdate.status,
      },
    });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(500).json({ error: error.message });
  }
};
