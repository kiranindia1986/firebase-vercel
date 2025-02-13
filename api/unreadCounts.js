const express = require("express");
const { getUnreadCounts } = require("../controllers/unreadCountsController"); // ✅ Import controller

const router = express.Router();

router.get("/:userId", getUnreadCounts); // ✅ Fix incorrect parameter

module.exports = router;
