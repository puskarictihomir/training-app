const express = require("express");
const router = express.Router();

const index = require("../controllers/index");

router.get("/", index.get_trainings);

router.post("/create", index.create_training);

module.exports = router;
