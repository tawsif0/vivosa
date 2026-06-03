const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const kidRoutes = require("./routes/kidRoutes");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Security middleware
app.use(helmet());
app.use(cors("*"));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/kids", kidRoutes);
app.use("/api/contact", contactRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
