const express = require("express");
const router = express.Router();
const { storeSnapshot } = require("../controllers/historyController");

router.post("/", storeSnapshot);

module.exports = router;
