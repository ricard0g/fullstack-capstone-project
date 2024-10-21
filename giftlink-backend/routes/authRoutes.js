const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connectToDatabase = require("../models/db");
const dotenv = require("dotenv");
const pino = require("pino");
dotenv.config();

const logger = pino();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const collection = db.collection("users");

    const existingEmail = await collection.findOne({ email: req.body.email });

    if (existingEmail) {
      return res
        .status(400)
        .json({ message: "This email is already signed in." });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;

    const newUser = await collection.insertOne({
      email: email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hash,
      createdAt: new Date(),
    });

    const payload = {
      user: {
        id: newUser.insertedId,
      },
    };

    const authtoken = jwt.sign(payload, JWT_SECRET);

    logger.info("User registered successfully");
    res.json({ authtoken, email });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const collection = db.collection("users");

    const theUser = await collection.findOne({ email: req.body.email });

    if (theUser) {
      let result = await bcrypt.compare(req.body.password, theUser.password);
      if (!result) {
        logger.error("Passwords do not match");
        return res.status(404).json({ error: "Wrong password" });
      }
      const userName = theUser.firstName;
      const userEmail = theUser.email;

      let payload = {
        user: {
          id: theUser._id.toString(),
        },
      };
      jwt.sign(user._id, JWT_SECRET);
    } else {
      logger.error("User not found");
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {}
});

module.exports = router;
