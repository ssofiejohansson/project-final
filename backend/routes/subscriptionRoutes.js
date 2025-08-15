import express from 'express';
import mongoose from 'mongoose';

import { authenticateUser } from "../authMiddleware.js"
import { Subscription } from '../models/Subscription.js';

const router = express.Router();

//To get all subscriptions
router.get("/", authenticateUser, async (req, res) => {

  try {
    const subscriptions = await Subscription.find({ user: req.user._id }) // SOFIE ADD


    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "No subscription was found",
      })
    }

    res.status(200).json({
      success: true,
      response: subscriptions,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch subscription"
    })
  }
});

//To get one subscription based on id (endpoint is /subscriptions/:id)
router.get("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params

  try {
    const subscription = await Subscription.findOne({ _id: id, user: req.user._id }) // SOFIE ADD


    if (!subscription) {
      return res.status(404).json({
        success: false,
        response: null,
        message: "Subscription not found"
      })
    }

    res.status(200).json({
      success: true,
      response: subscription
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Subscription couldn't be found"
    })
  }
})

//To create/save a subscription to the db (endpoint is /subscriptions)
router.post("/", authenticateUser, async (req, res) => {
  const { name, cost, freeTrial, trialDays, reminderDate, status, category, createdAt } = req.body

  if (!req.user) {
    return res.status(403).json({ error: "You must be logged in to add a subscription" })
  }

  try {
    const newSubscription = await new Subscription({
      name,
      cost,
      freeTrial,
      trialDays,
      reminderDate,
      status,
      category,
      createdAt,
      user: req.user._id,
    }).save()

    res.status(201).json({
      success: true,
      response: newSubscription,
      message: "Subscription created successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Couldn't create subscription"
    })
  }
})

//To edit a subscription (endpoint is /subscriptions/:id)
router.patch("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params
  const { name, cost, freeTrial, trialDays, reminderDate, status, category } = req.body

  try {
    const editSubscription = await Subscription.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { name, cost, freeTrial, trialDays, reminderDate, status, category },
      {
        new: true, runValidators: true
      })
    if (!editSubscription) {
      return res.status(404).json({ error: "Subscription not found" })
    }
    res.status(200).json(editSubscription)
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Failed to fetch subscription"
    })
  }
})

// SOFIE ADD: To delete a subscription
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const deleted = await Subscription.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ success: true, message: "Subscription deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete subscription", error });
  }
});

//To update reminderDate in DB
//
//Test in bash
// curl -X POST https://project-final-xhjy.onrender.com/subscriptions/update-reminders || http://localhost:8080/subscriptions/update-reminders  
// -H "Authorization: {secret from .env}  
// -H "Content-Type: application/json"
//


// router.patch('/update-reminders', async (req, res) => {
//   const authHeader = req.headers.authorization;

//   // Secure auth check
//   if (authHeader !== process.env.API_SECRET) {
//     return res.status(403).json({ error: 'Unauthorized' });
//   }

//   try {
//     const today = new Date();

//     console.log('Today:', today);
//     console.log('Connected to:', mongoose.connection.host, mongoose.connection.name);

//     // Find IDs first so we know what we're updating
//     const subsToUpdate = await Subscription.find({ reminderDate: { $lt: today } }).select('_id reminderDate');

//     if (subsToUpdate.length === 0) {
//       return res.json({ message: 'No subscriptions needed updating.' });
//     }

//     console.log('Found to update:', subsToUpdate.map(s => ({
//       id: s._id,
//       oldDate: s.reminderDate
//     })));

//     // Bulk update: add 1 month
//     const result = await Subscription.updateMany(
//       { _id: { $in: subsToUpdate.map(s => s._id) } },
//       [{
//         $set: {
//           reminderDate: {
//             $dateAdd: { startDate: '$reminderDate', unit: 'month', amount: 1 }
//           }
//         }
//       }]
//     );

//     console.log(`Matched ${result.matchedCount}, Modified ${result.modifiedCount}`);

//     // Fetch updated docs for verification
//     const updatedSubs = await Subscription.find({ _id: { $in: subsToUpdate.map(s => s._id) } })
//       .select('_id reminderDate')
//       .lean();

//     res.json({
//       message: `Updated ${updatedSubs.length} subscriptions.`,
//       updated: updatedSubs
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to update reminders' });
//   }
// });


export default router; 
