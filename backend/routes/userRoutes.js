import bcrypt from "bcrypt"
import express from "express"

import { User } from "../models/User";

const router = express.Router();

// To get all users
router.get("/", async (req, res) => { 

  try {    
    const users = await User.find({})

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "No matching user"
      })
    }

    res.status(200).json({
      success: true,
      response: users
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch user"
    })
  }
})

// To register a new user
router.post("/", async (req, res) => {
  try {
    console.log('Incoming signup data:', req.body); // Testing user data

    const { name, email, password } = req.body
    const salt = bcrypt.genSaltSync()

    const user = new User({ name, email, password: bcrypt.hashSync(password, salt) })
    await user.save()

    res.status(200).json({
      success: true,
      message: "User created successfully",
      response: {
        id: user._id,
        accessToken: user.accessToken
      }
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create user",
      error: error.message,
      response: error
    })
  }
})

// To login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email in the database
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true,
        message: "Login successful",
        id: user.id,
        name: user.name,
        email: user.email,
        accessToken: user.accessToken,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
});

export default router;