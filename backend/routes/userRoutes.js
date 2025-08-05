import bcrypt from "bcrypt"
import express from "express"

import { User } from "../models/User";

const router = express.Router();

// To register a new user
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync()

    const user = new User({ email, password: bcrypt.hashSync(password, salt) })
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

// KOLLA Skillnad???
// app.get("/users", async (req, res) => {
//   const { email } = req.params

//   try{
//     const user = await User.find(email)

//     if(!user) {
//       return res.status(404).json({
//         success: false,
//         response: null,
//         message: "No matching user"
//       })
//     }

//     res.status(200).json({
//       success: true,
//       response: user
//     }) 

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       response: error,
//       message: "Failed to fetch user"
//     })
//   }
// })

// app.post("/users", postUser)

// app.post("/login", async (req, res) => {
//   const user = await User.findOne({eamil: req.body.email})

//   if(user && bcrypt.compareSync(req.body.password, user.password)){
//     res.status(200).json({userId: user._id, accessToken: user.accessToken})
//   } else {
//     res.status(401).json({ error: "Invalid email or password"})
//   }
// })

