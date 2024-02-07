const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 5000;
mongoose.connect("mongodb+srv://Admin:Admin@db.e6le9.mongodb.net/test");

mongoose.connection.on("error", (err) => {
  console.log("failed");
});
mongoose.connection.on("connected", (connected) => {
  console.log("connected");
});

// Middleware to parse JSON bodies
app.use(express.json());

// Serve your static files (HTML, CSS, JS)
app.use(express.static("public"));
// Updated server-side route to accept a parameter
app.get("/workout/:value", async (req, res) => {
  try {
    const value = req.params.value;

    // Your logic to filter exercises based on the provided value
    const exercises = await ExerciseModel.find({ game: value });

    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/workout/:value", async (req, res) => {
  try {
    const value = req.params.value;

    // Your logic to filter exercises based on the provided value
    const exercises = await ExerciseModel.find({ game: value });

    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/variation", async (req, res) => {
  console.log(
    req.query.from,
    req.query.to,
    req.query.exerciseID,
    "exerciseIDexerciseID"
  );
  try {
    let query = {
      exercisesId: req.query.exerciseID,
    };

    if (req.query.from && req.query.to) {
      console.log("query");
      query.date = {
        $gte: new Date(req.query.from),
        $lte: new Date(req.query.to),
      };
    } else if (req.query.from && !req.query.to) {
      query.date = {
        $gte: new Date(req.query.from),
        $lte: new Date(req.query.to),
      };
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      query.date = {
        $lte: currentDate,
      };
    }

    // Find variations based on the query
    const variations = await VariationModel.find(query);
    console.log(variations, "variations");
    res.json(variations);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update workout data
app.put("/workout/:id", async (req, res) => {
  const exerciseId = req.params.id;
  console.log(
    req.body.variation.repsUpdate,
    req.body.variation.weightUpdate,
    exerciseId,
    "exerciseId"
  );

  try {
    const updatedExercise = await ExerciseModel.findByIdAndUpdate(
      exerciseId,
      req.body,
      { new: true }
    );

    if (!updatedExercise) {
      return res.status(404).json({ error: "Exercise not found" });
    }
    const newVariation = new VariationModel({
      setRecord: {
        weightUpdate: req.body.variation.weightUpdate,
        repsUpdate: req.body.variation.repsUpdate,
      },
      exercisesId: exerciseId,
    });
    await newVariation.save();

    res.json(updatedExercise);
  } catch (error) {
    console.error("Error updating exercise:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const weightsRouter = require("./routes/weights");
const ExerciseModel = require("./models/Weights");
const VariationModel = require("./models/variation");
app.use("/api/weights", weightsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
