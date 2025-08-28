import express from "express";

import  { Subscription }  from "../models/Subscription.js";
import { sendTrialExpiredEmail } from "../services/sendTrialExpiredEmail.js";

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
    //Find all subscriptions that have days left
    const subsToUpdate = await Subscription.find({ trialDays: { $gt: 0 } }).select('_id trialDays'); //$gt greater then

    if (subsToUpdate.length === 0) {
    return res.json({ message: 'No subscriptions needed updating.' });
    }

    //Find subscriptions that are expiring today (trialDays == 1, freeTrial == true)
    const expiringSubs = await Subscription.find({
      trialDays: 1,
      freeTrial: true,
    })
      .populate("user", "email name") 
      .lean();

    // 2. Send email to each user
    for (const sub of expiringSubs) {
      if (sub.user?.email) {
        await sendTrialExpiredEmail({
          email: sub.user.email,
          name: sub.user.name,
        });
        console.log(`Sent trial ended email to ${sub.user.email}`);
      }
    }

    const result = await Subscription.updateMany(
    { trialDays: { $gte: 0 } }, 
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

    
    //Send email to user if Free trial checkbox change from true to false
    if (user.trialdays - 1 <= 0 && user.freeTrial) {
      // update DB: set freeTrial=false
      await db.user.update({ id: user.id, trialdays: 0, freeTrial: false });

      // send email
      await sendTrialExpiredEmail(user);
      }



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