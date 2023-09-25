const mongoose = require("mongoose");

const flashcardSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: 50,
    minLength: 10,
  },
  content: {
    type: String,
    required: [true, "Content is required"],
    maxlength: 200,
  },
  createdBy: {
    type: String,
    required: true,
    index: true, // Add an index for createdBy
  },
});

module.exports = mongoose.model("Flashcard", flashcardSchema);
