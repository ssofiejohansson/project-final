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

router.post("/update-reminders", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== `${process.env.MONGO_URL}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const today = new Date();
    const subs = await Subscription.find({ reminderDate: { $lt: today } });

    console.log("Today:", today);    

    console.log('Connected to:', mongoose.connection.host, mongoose.connection.name);

    for (const sub of subs) {
      sub.reminderDate.setMonth(sub.reminderDate.getMonth() + 1);
      await sub.save();
      //console.log("Found subs:", subs.map(s => ({ id: s._id, reminderDate: s.reminderDate })));
    }

    res.json({ message: `Updated ${subs.length} subscriptions. Subscriptions updated:${subs.map(s => s.reminderDate && s._id)}` });
   

    // const check = await Subscription.find({ _id: { $in: subs.map(s => s._id) } });
    // console.log('Freshly fetched from DB:', check.map(c => c.reminderDate));


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update reminders" });
  }
})

export default router; 
