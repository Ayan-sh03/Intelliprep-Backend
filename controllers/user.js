const express = require("express");

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Models/Users");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !password || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvail = await User.findOne({ email });
  if (userAvail) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandotort");
  }
  const user = await User.findOne({ email });
  //cpmapare pass with hashed
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("password is not valid");
  }
});
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
