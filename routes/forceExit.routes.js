const express = require("express");
const router = express.Router();
const {
  createForceExitRequest,
  getPendingRequestsList,
  approveRequest,
  denyRequest,
  getRequestStatus,
  completeForceExit,
} = require("../controllers/forceExit.controller");
const auth = require("../middleware/auth");

// @desc    Create a new force exit request (user app)
// @route   POST /api/force-exit/request
router.post("/request", createForceExitRequest);

// @desc    Get force exit request status for device
// @route   GET /api/force-exit/status/:deviceId
router.get("/status/:deviceId", getRequestStatus);

// @desc    Complete force exit (when user taps notification)
// @route   POST /api/force-exit/complete
router.post("/complete", completeForceExit);

// @desc    Get pending force exit requests (admin only)
// @route   GET /api/force-exit/pendingList
router.get("/pendingList", auth, getPendingRequestsList);

// @desc    Approve a force exit request (admin only)
// @route   POST /api/force-exit/approve/:requestId
router.post("/approve/:requestId", auth, approveRequest);

// @desc    Deny a force exit request (admin only)
// @route   POST /api/force-exit/deny/:requestId
router.post("/deny/:requestId", auth, denyRequest);

module.exports = router;
