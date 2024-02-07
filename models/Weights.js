const mongoose = require("mongoose");

const SetRecordSchema = new mongoose.Schema({
  weightUpdate: {
    type: Number,
    required: true,
  },
  repsUpdate: {
    type: Number,
    required: true,
  },
});

const ExerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  maxWeight: {
    type: Number,
    required: true,
  },
  setsRecord: {
    type: [SetRecordSchema],
    required: true,
  },
  date: { type: Date, default: Date.now },
});

const ExerciseModel = mongoose.model("exercises", ExerciseSchema);

module.exports = ExerciseModel;

// weight: {
//   type: Number,
//   required: [true, "add field"],
// },
// reps: {
//   type: Number,
//   required: [true, "add field"],
// },

// date: {
//   type: Date,
//   default: Date.now(),
// },
