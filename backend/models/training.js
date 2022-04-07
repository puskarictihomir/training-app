const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  startTime: Number,
  endTime: Number,
  createdAt: { type: Number, default: () => Date.now() },
  updatedAt: Number,
  trainingDurationInMinutes: Number,
});

module.exports = mongoose.model("Training", TrainingSchema);
