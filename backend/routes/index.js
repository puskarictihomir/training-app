const express = require("express");
const router = express.Router();

const index = require("../controllers/index");

router.post("/create", index.create_training);

module.exports = router;
