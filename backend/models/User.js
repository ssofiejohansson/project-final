import crypto from "crypto"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlenght: 3,
    maxlenght: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlenght: 5,
    maxlenght: 100,
  },
  password: {
    type: String,
    required: true,
    minlenght: 3,
    maxlenght: 100,
  },
  accesToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export const user = mongoose.model("User", userSchema)
