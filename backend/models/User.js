import crypto from "crypto"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  accesToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

export const User = mongoose.model("User", userSchema)