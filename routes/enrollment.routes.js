const express = require("express");
const router = express.Router();
const {
  scanEntry,
  scanExit,
  forceExitAdmin,
  getActiveByDeviceAdmin,
} = require("../controllers/enrollment.controller");

// Public routes (for mobile app)
// @desc    Scan entry QR and enroll device (lock camera)
// @route   POST /api/enrollments/scan-entry
router.post("/scan-entry", scanEntry);

// @desc    Scan exit (unlock camera)
// @route   POST /api/enrollments/scan-exit
router.post("/scan-exit", scanExit);

// Admin route - will be protected by auth middleware when available
// @desc    Force exit for a device (admin override)
// @route   POST /api/enrollments/admin/force-exit
router.post("/admin/force-exit", forceExitAdmin);

// @desc    Get active enrollment by device ID (admin view)
// @route   GET /api/enrollments/admin/active-device/:deviceId
router.get("/admin/active-device/:deviceId", getActiveByDeviceAdmin);

module.exports = router;
