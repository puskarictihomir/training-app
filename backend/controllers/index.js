const Training = require("../models/training");
const Exercise = require("../models/exercise");
const User = require("../models/user");

const bycrypt = require("bcrypt");

const { createToken } = require("../utils/createToken");

exports.getTrainings = async (req, res) => {
  const trainings = await Training.find({ user: req.user._id });

  res.send(trainings);
};

exports.createTraining = async (req, res) => {
  try {
    const { body } = req;

    const exerciseIds = [];

    for (const b of body) {
      const exercise = await Exercise.create(b);

      if (exercise._id) {
        exerciseIds.push(exercise._id);
      }
    }

    if (exerciseIds.length) {
      const training = await Training.create({ exercises: exerciseIds, user: req.user._id });
    }

    res.send({ statusCode: 200 });
  } catch (error) {
    console.error("createTraining", error);
    res.send({ error: "Something went wrong" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.find({ username });

    if (existingUser.length === 0) {
      await User.create({ username, password });
      res.send({ statusCode: 200 });
    } else {
      res.send({ statusCode: 409 });
    }
  } catch (error) {
    console.error("registerUser", error);
    res.send({ error: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.find({ username });

    if (user.length === 0) {
      return res.send({ statusCode: 404 });
    }

    bycrypt.compare(password, user[0].password, async function (err, result) {
      if (result) {
        const { username, _id: userId } = user[0];

        const token = createToken();

        await User.updateOne({ _id: userId }, { token });

        res.send({ statusCode: 200, data: { username, userId, token } });
      } else {
        res.send({ statusCode: 401 });
      }
    });
  } catch (error) {
    console.log("user_login_post", error);
    res.send({ errorMessage: "Something went wrong" });
  }
};
