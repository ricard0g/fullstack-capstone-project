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

router.post('/register', async (req, res) => {
    try {
        const db = await connectToDatabase();

        const collection = db.collection('users');

        const existingEmail = await collection.findOne({ email: req.body.email });

        if (existingEmail) {
            return res.status(400).json({ message: "This email is already signed in." });
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
        })

        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info("User registered successfully");
        res.json({ authtoken, email });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
})

module.exports = router;