const express = require("express");
const router = express.Router();

const index = require("../controllers/index");
const getUserDataMiddleware = require("../middleware/getUserDataMiddleware");

router.get("/", getUserDataMiddleware, index.getTrainings);

router.post("/create", getUserDataMiddleware, index.createTraining);

router.post("/register", index.registerUser);

router.post("/login", index.login);

module.exports = router;
