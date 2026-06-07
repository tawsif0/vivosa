const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const kidRoutes = require("./routes/kidRoutes");
const womenApparelRoutes = require("./routes/womenApparelRoutes");
const menApparelRoutes = require("./routes/menApparelRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sustainableLeatherRoutes = require("./routes/sustainableLeatherRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/kids", kidRoutes);
app.use("/api/women-apparel", womenApparelRoutes);
app.use("/api/men-apparel", menApparelRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/sustainable-leather", sustainableLeatherRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
