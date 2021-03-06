const Training = require("../models/training");
const Exercise = require("../models/exercise");
const User = require("../models/user");

const bycrypt = require("bcrypt");
const dayjs = require("dayjs");

const { createToken } = require("../utils/createToken");

exports.getTrainings = async (req, res) => {
  const recordsPerPage = +req.query.recordsPerPage;
  const page = +req.query.page;
  const skip = (page - 1) * recordsPerPage;
  const trainings = await Training.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(recordsPerPage);

  const count = await Training.count({ user: req.user._id });

  res.send({ trainings, count });
};

exports.createTraining = async (req, res) => {
  try {
    const { exercises, trainingDuration } = req.body;

    if (!exercises.filter((e) => e.name && e.sets && e.reps).length) {
      return res.status(400).send({ error: "Missing data" });
    }

    const exerciseIds = [];

    for (const e of exercises) {
      const exercise = await Exercise.create(e);

      if (exercise._id) {
        exerciseIds.push(exercise._id);
      }
    }

    const startTime = Date.now() - +trainingDuration * 60000;

    const training = await Training.create({
      exercises: exerciseIds,
      user: req.user._id,
      startTime,
      endTime: Date.now(),
      trainingDurationInMinutes: +trainingDuration,
    });

    return res.status(200).send({ msg: "Created training" });
  } catch (error) {
    console.error("createTraining", error);
    res.send({ error: "Something went wrong" });
  }
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      await User.create({ username, password });
      return res.status(200).send({ msg: "Registered" });
    } else {
      return res.status(409).send({ error: "Username taken" });
    }
  } catch (error) {
    console.error("registerUser", error);
    res.send({ error: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).send({ error: "No such user" });
    }

    bycrypt.compare(password, user.password, async function (err, result) {
      if (err) return err;

      if (result) {
        const { username, _id: userId } = user;

        const token = createToken();

        await User.updateOne({ _id: userId }, { token });

        res.status(200).send({ username, userId, token });
      } else {
        res.status(401).send({ error: "Incorrect credentials" });
      }
    });
  } catch (error) {
    console.log("login", error);
    res.send({ errorMessage: "Something went wrong" });
  }
};

exports.getTraining = async (req, res) => {
  const training = await Training.findOne({ _id: req.params.id }).populate("exercises");

  res.send({ training });
};

exports.remove = async (req, res) => {
  await Training.deleteOne({ _id: req.body.id });

  res.send({ id: req.body.id });
};

exports.editTraining = async (req, res) => {
  try {
    const { exercises, trainingDuration } = req.body;

    if (!exercises.filter((e) => e.name && e.sets && e.reps).length) {
      return res.status(400).send({ error: "Missing data" });
    }

    const exerciseIds = [];

    for (const e of exercises) {
      const exercise = await Exercise.create(e);

      if (exercise._id) {
        exerciseIds.push(exercise._id);
      }
    }

    const training = await Training.updateOne(
      { _id: req.params.id },
      {
        exercises: exerciseIds,
        user: req.user._id,
        updatedAt: Date.now(),
        trainingDurationInMinutes: +trainingDuration,
      }
    );

    return res.status(200).send({ msg: "Updated training" });
  } catch (error) {
    console.error("editTraining", error);
    res.send({ error: "Something went wrong" });
  }
};

exports.getUser = async (req, res) => {
  res.send({ user: req.user });
};

exports.editUser = async (req, res) => {
  try {
    const { fullName, dateOfBirth } = req.body;

    const imageString = createToken();

    let image = req.user.image || "";

    if (req.files && req.files.profileImage) {
      const file = req.files.profileImage;
      const fileExtension = file.name.split(".").pop();
      const path = __dirname + "/../../public/images/" + imageString + "." + fileExtension;

      file.mv(path, (err) => {
        if (err) {
          console.log(err);
        }
      });

      image = imageString + "." + fileExtension;
    }

    const user = await User.updateOne(
      { _id: req.user._id },
      {
        fullName,
        user: req.user._id,
        dateOfBirth: new Date(dateOfBirth),
        updatedAt: Date.now(),
        image,
      }
    );

    return res.send({ msg: "Updated user" });
  } catch (error) {
    console.error("editUser", error);
    res.send({ error: "Something went wrong" });
  }
};
