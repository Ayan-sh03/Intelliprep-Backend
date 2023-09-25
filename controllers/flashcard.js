const express = require("express");
const asyncHandler = require("express-async-handler");
const Flashcard = require("../models/flashcard");

const getFlashcards = asyncHandler(async (req, res) => {
  try {
    const { username } = req.user;
    const cards = await Flashcard.find({ createdBy: username });

    if (!cards) res.status(404).json({ message: "Flashcard not found" });

    res.status(200).json({ cards: cards });
  } catch (error) {
    res.status(500).json({ message: "Bad request" });
  }
});

const getCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const card = await Flashcard.findOne({ _id: id });

  if (!card) res.status(404).json({ message: "Flashcard not found" });
  res.status(200).json({ card: card });
});

const createFlashcard = asyncHandler(async (req, res) => {
  const { username } = req.user;
  const { title, content } = req.body;
  if (!title || !content)
    res
      .status(400)
      .json({ message: "Bad Request - Please Add Title and Content" });

  const cards = await Flashcard.create({ title, content, createdBy: username });

  try {
    if (!cards) {
      res.status(500).json({
        message: "Internal Server Error - Failed to create flashcard",
      });
    } else {
      res.status(201).json(cards);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error - Something went wrong" });
  }
});

const editFlashcard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      { title, content },
      { new: true } // Return the updated document
    );

    if (!updatedFlashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.status(200).json(updatedFlashcard);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const deleteFlashcard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFlashcard = await Flashcard.findByIdAndRemove(id);

    if (!deletedFlashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  getFlashcards,
  createFlashcard,
  deleteFlashcard,
  editFlashcard,
  getCard,
};
