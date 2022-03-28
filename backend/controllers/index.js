const Training = require("../models/training");
const Exercise = require("../models/exercise");

exports.get_trainings = async (req, res) => {
  const trainings = await Training.find({});

  res.send(trainings);
};

exports.create_training = async (req, res) => {
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
    console.error("create_training", error);
    res.send({ error: "Something went wrong" });
  }
};
