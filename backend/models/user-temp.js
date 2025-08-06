import crypto from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
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
  accessToken: {
    type: String,
<<<<<<< HEAD:backend/models/user.js
    default: () => crypto.randomBytes(128).toString('hex'),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
=======
    default: () => crypto.randomBytes(128).toString("hex")
  }
})

export const User = mongoose.model("User", userSchema)
>>>>>>> 094fc6a22273daeb63887a83968a365d9e0769b6:backend/models/user-temp.js
