const express = require("express");
const { loginUser, registerUser, currentUser } = require("../controllers/user");
const user = require("../Models/Users");
const validateToken = require("../middleware/validate");
const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);
userRoutes.get("/current", validateToken, currentUser);
module.exports = userRoutes;
