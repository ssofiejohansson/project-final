import express from "express";
import mongoose from "mongoose";

import  {Subscription}  from "../models/Subscription.js";

const router = express.Router();

router.patch("/update-freetrial", async (req, res) => {
  const authHeader = req.headers.authorization;

  if(authHeader !== process.env.API_SECRET) {
    return res.status(403).json({
      error: "Unauthorized",
      success: false
    });
  }

  try {

    const subsToUpdate = await Subscription.find({ trialDays: { $gt: 0 } }).select('_id trialDays'); //$gt greater then

     if (subsToUpdate.length === 0) {
      return res.json({ message: 'No subscriptions needed updating.' });
    }

  //  const result = await Subscription.updateMany(
  //   { trialDays: { $gt: 0 } },  // only decrement where > 0
  //   { $inc: { trialDays: -1 } } // ✅ decrement

  const result = await Subscription.updateMany(
  { trialDays: { $gte: 0 } }, // include those at 0 so we can flip freeTrial
  [
    {
      $set: {
        // decrement trialDays but never below 0
        trialDays: { $max: [{ $subtract: ["$trialDays", 1] }, 0] },
        // freeTrial is true if trialDays (before decrement) > 1
        freeTrial: { $gt: ["$trialDays", 1] }
      }
    }
  ]
);

    const updatedSubs = await Subscription.find({ _id: { $in: subsToUpdate.map(s => s._id) }})
    .select("_id trialDays")
    .lean();

    res.json({
      message: `Updated ${result.modifiedCount} subscriptions`,
      updated: updatedSubs
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to update trialDays",
      success: false,
      message: err.message
    });
  }
});

export default router;