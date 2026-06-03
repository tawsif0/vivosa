const requireAdmin = (req, res, next) => {
  if (req.user?.userType !== "admin") {
    return res.status(403).json({ success: false, error: "Admin access required" });
  }

  return next();
};

module.exports = requireAdmin;
