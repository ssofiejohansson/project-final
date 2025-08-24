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
  //days of free trial
  trialDays: {
    type: Number,
    minlength: 0,
  },
  //Next remider email
  reminderDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
  },
  category: {
    type: String,
    enum: ['Entertainment', 'Food', 'Health', 'Learning', 'Other'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sendEmail: {
    type: Boolean,
    default: true,
  },
});

export const Subscription = mongoose.model('Subscription', subscriptionSchema);
