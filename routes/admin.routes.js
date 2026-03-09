const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createFacilityAdmin,
  listFacilitiesAdmin,
  getFacilityAdmin,
  updateFacilityAdmin,
  deleteFacilityAdmin,
} = require("../controllers/facility.controller");
const {
  listActiveDevicesAdmin,
  getActiveByDeviceAdmin,
  forceExitAdmin,
} = require("../controllers/device.controller");

// Protect all admin routes
router.use(auth);

// Facility CRUD only for (admin)
router.post("/facilities", createFacilityAdmin);
router.get("/facilities", listFacilitiesAdmin);
router.get("/facilities/:id", getFacilityAdmin);
router.put("/facilities/:id", updateFacilityAdmin);
router.delete("/facilities/:id", deleteFacilityAdmin);

// Devices (admin)

// @desc list of all active devices
// @route   GET /api/admin/devices/active
router.get("/devices/active", listActiveDevicesAdmin);

// @desc    Get active enrollment by device ID
// @route   GET /api/enrollments/admin/active-device/:deviceId
router.get("/admin/active-device/:deviceId", getActiveByDeviceAdmin);

// Force-exit with notification (admin)
router.post("/devices/:deviceId/force-exit", (req, res, next) => {
  // Reuse controller; map param to body
  req.body.deviceId = req.params.deviceId;
  return forceExitAdmin(req, res, next);
});

module.exports = router;
