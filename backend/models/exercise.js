const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: String,
  sets: Number,
  reps: Number,
  createdAt: { type: Number, default: () => Date.now() },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
