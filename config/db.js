// config/db.js

const mongoose = require("mongoose");

const connectDB = (handler) => async (req, res) => {
  console.log("connectDB");
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(
    "mongodb+srv://shalevsharaby:shalevsharaby@cluster0.dkhfin9.mongodb.net/weights?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true, // Change to true
    }
  );
  console.log("connected");
  return handler(req, res);
};

module.exports = connectDB;
