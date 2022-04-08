const express = require("express");
const router = express.Router();

const index = require("../controllers/index");
const getUserDataMiddleware = require("../middleware/getUserDataMiddleware");

router.get("/", getUserDataMiddleware, index.getTrainings);

router.get("/user", getUserDataMiddleware, index.getUser);

router.post("/create", getUserDataMiddleware, index.createTraining);

router.post("/register", index.registerUser);

router.post("/login", index.login);

router.post("/user/edit", getUserDataMiddleware, index.editUser);

router.post("/edit/:id", getUserDataMiddleware, index.editTraining);

router.get("/:id", getUserDataMiddleware, index.getTraining);

router.delete("/remove", getUserDataMiddleware, index.remove);

module.exports = router;
