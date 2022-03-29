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
  startTime: Date,
  endTime: Date,
});

module.exports = mongoose.model("Training", TrainingSchema);
