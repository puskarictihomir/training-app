const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  sets: Number,
  reps: Number,
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
