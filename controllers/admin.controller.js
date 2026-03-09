const mongoose = require("mongoose");
const Admin = require("../models/Admin.model");

// @desc    List admins (paginated, searchable by username)
// @route   GET /api/admin/admins
exports.getAllAdminsList = async (req, res) => {
  try {
    const { page = 1, limit = 20, q } = req.query;

    const pageNum = Math.max(parseInt(page, 10) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit, 10) || 20, 1), 100);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (q) {
      filter.username = { $regex: q, $options: "i" };
    }

    const [items, total] = await Promise.all([
      Admin.find(filter)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Admin.countDocuments(filter),
    ]);

    return res.status(200).json({
      status: "success",
      data: {
        items,
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// @desc    Get admin detail by id (or username fallback)
// @route   GET /api/admin/admins/:id
exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    let admin = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      admin = await Admin.findById(id).select("-password");
    }

    // Fallback: allow lookup by username for convenience
    if (!admin) {
      admin = await Admin.findOne({
        username: id.toLowerCase?.() ?? id,
      }).select("-password");
    }

    if (!admin) {
      return res
        .status(404)
        .json({ status: "error", message: "Admin not found" });
    }

    return res.status(200).json({ status: "success", data: admin });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
