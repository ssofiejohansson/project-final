import mongoose from 'mongoose';

const scheduledEmailSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    scheduledDateTime: {
      type: Date,
      required: true,
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['scheduled', 'sent', 'failed'],
      default: 'scheduled',
    },
    lastSent: {
      type: Date,
    },
    nextRun: {
      type: Date,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    errorMessage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient querying of due emails
scheduledEmailSchema.index({ nextRun: 1, status: 1 });

export const ScheduledEmail = mongoose.model(
  'ScheduledEmail',
  scheduledEmailSchema
);
