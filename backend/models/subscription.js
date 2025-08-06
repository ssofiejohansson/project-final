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
});

//test

export const Subscription = mongoose.model('Subscription', subscriptionSchema);