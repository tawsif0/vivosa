const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  userType: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  passwordResetToken: String,
  passwordResetExpires: Date,
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
  },
});

// Hash password and set role on create
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isNew) {
    const userCount = await mongoose.models.User.countDocuments();
    user.userType = userCount === 0 ? "admin" : "user";
    user.status = "active";
  }

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Generate auth token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid login credentials");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid login credentials");
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
