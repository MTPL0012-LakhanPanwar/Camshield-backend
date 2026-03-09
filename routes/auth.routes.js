const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

// Admin auth (username + password)
router.post("/admin/register", register);
router.post("/admin/login", login);

module.exports = router;
