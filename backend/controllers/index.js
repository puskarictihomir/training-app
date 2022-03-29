const Training = require("../models/training");
const Exercise = require("../models/exercise");
const User = require("../models/user");

exports.getTrainings = async (req, res) => {
  const trainings = await Training.find({});

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
      await Training.create({ exercises: exerciseIds });
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

    await User.create({ username, password });

    res.send({ statusCode: 200 });
  } catch (error) {
    console.error("registerUser", error);
    res.send({ error: "Something went wrong" });
  }
};
