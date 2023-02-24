const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const { generateUserData } = require("../utils/helpers");
const tokenService = require("../services/token.service");

router.post("/signUp", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: { message: "EMAIL_EXISTS", code: 400 } });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      ...generateUserData(),
      ...req.body,
      password: hashedPassword,
    });

    const tokens = tokenService.generate({ id: newUser._id });
    await tokenService.save(newUser._id, tokens.refreshToken);

    res.status(201).send({ ...tokens, userId: newUser._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server side error occurred. Try again later" });
  }
});

router.post("/signInWithPassword", async (req, res) => {});

router.post("/token", async (req, res) => {});

module.exports = router;
