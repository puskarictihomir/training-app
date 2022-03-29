const express = require("express");
const router = express.Router();

const index = require("../controllers/index");

router.get("/", index.getTrainings);

router.post("/create", index.createTraining);

module.exports = router;
