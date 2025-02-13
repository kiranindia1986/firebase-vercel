const express = require("express");
const { getUnreadCounts } = require("../controllers/unreadCountsController");
const router = express.Router();

router.get("/:userId", (req, res) => getUnreadCounts(req, res));

module.exports = router;
