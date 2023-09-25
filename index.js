const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const cardRoutes = require("./routes/flashcard");
const validateToken = require("./middleware/validate");
require("dotenv").config();

const app = express();
const PORT = 5000;
app.use(express.json());
app.use("/", userRoutes);
app.use("/api/v1/flashcards", cardRoutes);

//validate path
// app.use("/flashcards", validateToken);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log("Server is listening", PORT));
  } catch (err) {
    console.log(err);
  }
};

start();
