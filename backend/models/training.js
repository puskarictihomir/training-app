const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

module.exports = mongoose.model("Training", TrainingSchema);
