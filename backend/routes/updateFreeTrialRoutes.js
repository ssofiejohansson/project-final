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

    const subsToUpdate = await Subscription.find({ freeTrial: { $gt: 0 } }).select('_id freeTrial'); //$gt greater then

     if (subsToUpdate.length === 0) {
      return res.json({ message: 'No subscriptions needed updating.' });
    }

   const result = await Subscription.updateMany(
    { freeTrial: { $gt: 0 } },  // only decrement where > 0
    { $inc: { freeTrial: -1 } } // ✅ decrement
);

    const updatedSubs = await Subscription.find({ _id: { $in: subsToUpdate.map(s => s._id) }})
    .select("_id freeTrial")
    .lean();

    res.json({
      message: `Updated ${result.modifiedCount} subscriptions`,
      updated: updatedSubs
    });


  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to update freeTrial",
      success: false,
      message: err.message
    });
  }
});

export default router;