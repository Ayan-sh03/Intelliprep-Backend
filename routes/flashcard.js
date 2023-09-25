const express = require("express");
const validateToken = require("../middleware/validate");
const {
  getFlashcards,
  createFlashcard,
  editFlashcard,
  deleteFlashcard,
  getCard,
} = require("../controllers/flashcard");

const cardRouter = express.Router();

// cardRouter.use(validateToken);

cardRouter
  .get("/", validateToken, getFlashcards)
  .get("/:id", validateToken, getCard)
  .post("/", validateToken, createFlashcard);
cardRouter
  .patch("/:id", validateToken, editFlashcard)
  .delete("/:id", validateToken, deleteFlashcard);

module.exports = cardRouter;
