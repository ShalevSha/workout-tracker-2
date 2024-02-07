const express = require("express");
const router = express.Router();
const Weight = require("../models/Weights");

// Endpoint to get workout data
router.get("/workout", (req, res) => {
  fs.readFile("workoutData.json", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
    } else {
      res.send(data);
    }
  });
});

// add ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.send({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "somthing went wrong" });
  }
});
// get an idea
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.send({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "somthing went wrong" });
  }
});

// add an idea
router.post("/", async (req, res) => {
  const newIdea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await newIdea.save();
    const newVariation = new VariationModel({
      setRecord: { weightUpdate, repsUpdate },
      exercisesId, // Assuming exercisesId is passed in the request body
    });

    // Save the variation to the database
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: error });
  }
});

// update an idea
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username == req.body.username) {
      const updateedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        {
          new: true,
        }
      );
      res.send({ success: true, data: updateedIdea });
    } else {
      res.status(403).send({
        success: false,
        error: "you can update only the ideas you created",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "somthing went wrong" });
  }
});

// delete an idea
router.delete("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (idea.username == req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      res.send({ success: true, data: {} });
    } else {
      res.status(403).send({
        success: false,
        error: "you can delete only the ideas you created",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: "somthing went wrong" });
  }
});

module.exports = router;
