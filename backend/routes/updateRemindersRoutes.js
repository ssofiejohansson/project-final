//Remove
import express from "express";

import { Subscription } from "../models/Subscription"

//Test in bash
//$ curl -X POST https://project-final-xhjy.onrender.com/api/update-reminders  
// -H "Authorization: {secret from .env}  
// -H "Content-Type: application/json"

const router = express.Router();

router.post("/update-reminders", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== `${process.env.MONGO_URL}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const today = new Date();
    const subs = await Subscription.find({ reminderDate: { $lt: today } });

    for (const sub of subs) {
      sub.reminderDate.setMonth(sub.reminderDate.getMonth() + 1);
      await sub.save();
    }

    res.json({ message: `Updated ${subs.length} subscriptions. Subscriptions updated: ${subs._id}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update reminders" });
  }
})

export default router;