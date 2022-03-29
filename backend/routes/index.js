const express = require("express");
const router = express.Router();

const index = require("../controllers/index");

router.get("/", index.getTrainings);

router.post("/create", index.createTraining);

router.post("/register", index.registerUser);

module.exports = router;
