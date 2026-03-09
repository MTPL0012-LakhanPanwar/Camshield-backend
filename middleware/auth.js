const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin.model");

// Simple bearer JWT auth for admin APIs
module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ status: "error", message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.type !== "admin_auth") {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid token" });
    }

    const admin = await Admin.findById(decoded.sub).select("-password");
    if (!admin) {
      return res
        .status(401)
        .json({ status: "error", message: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized", error: err.message });
  }
};
