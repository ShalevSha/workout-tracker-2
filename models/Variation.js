const mongoose = require("mongoose");

const VariationSchema = new mongoose.Schema({
  setRecord: {
    weightUpdate: {
      type: Number,
      required: true,
    },
    repsUpdate: {
      type: Number,
      required: true,
    },
  },
  date: { type: Date, default: Date.now },
  exercisesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exercises", // Reference to ExerciseModel
    required: true,
  },
});

const VariationModel = mongoose.model("variations", VariationSchema);

module.exports = VariationModel;
