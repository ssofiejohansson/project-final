import express from 'express';
import mongoose from 'mongoose';

import { Subscription } from "../models/Subscription.js";

// adjust path

const router = express.Router();

router.patch('/update-reminders', async (req, res) => {
  const authHeader = req.headers.authorization;

  // Secure auth check
  if (authHeader !== process.env.API_SECRET) {
    return res.status(403).json({ 
      error: 'Unauthorized', 
      success: false, 
      message: "Failed to delete subscription", error });
  }

  try {
    const today = new Date();

    console.log('Today:', today);
    console.log('Connected to:', mongoose.connection.host, mongoose.connection.name);

    // Find IDs first so we know what we're updating
    const subsToUpdate = await Subscription.find({ reminderDate: { $lt: today } }).select('_id reminderDate');

    if (subsToUpdate.length === 0) {
      return res.json({ message: 'No subscriptions needed updating.' });
    }

    console.log('Found to update:', subsToUpdate.map(s => ({
      id: s._id,
      oldDate: s.reminderDate
    })));

    // Bulk update: add 1 month
    const result = await Subscription.updateMany(
      { _id: { $in: subsToUpdate.map(s => s._id) } },
      [{
        $set: {
          reminderDate: {
            $dateAdd: { startDate: '$reminderDate', unit: 'month', amount: 1 }
          }
        }
      }]
    );

    console.log(`Matched ${result.matchedCount}, Modified ${result.modifiedCount}`);

    // Fetch updated docs for verification
    const updatedSubs = await Subscription.find({ _id: { $in: subsToUpdate.map(s => s._id) } })
      .select('_id reminderDate')
      .lean();

    res.json({
      message: `Updated ${updatedSubs.length} subscriptions.`,
      updated: updatedSubs
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update reminders' });
  }
});

export default router;
