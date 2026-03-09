const express = require("express");
const router = express.Router();
const {
  scanEntry,
  scanExit,
  restoreFromPush,
} = require("../controllers/enrollment.controller");

// Public routes (for mobile app)
// @desc    Scan entry QR and enroll device (lock camera)
// @route   POST /api/enrollments/scan-entry
router.post("/scan-entry", scanEntry);

// @desc    Scan exit (unlock camera)
// @route   POST /api/enrollments/scan-exit
router.post("/scan-exit", scanExit);

// @desc    Visitor tap on push to restore permissions
// @route   POST /api/enrollments/restore-from-push
router.post("/restore-from-push", restoreFromPush);

module.exports = router;
