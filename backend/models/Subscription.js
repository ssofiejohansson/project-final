import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  freeTrial: {
    type: Boolean,
    default: false,
  },
  //Next payment?
  expirationDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);