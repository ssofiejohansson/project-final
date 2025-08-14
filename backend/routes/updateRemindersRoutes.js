import express from "express";

import { Subscription } from "../models/Subscription"

const router = express.Router();

router.post("/update-reminders", async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader !== `${process.env.API_TOKEN}`) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    const today = new Date();
    const subs = await Subscription.find({ reminderDate: { $lt: today } });

    for (const sub of subs) {
      sub.reminderDate.setMonth(sub.reminderDate.getMonth() + 1);
      await sub.save();
    }

    res.json({ message: `Updated ${subs.length} subscriptions` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update reminders" });
  }
})

export default router;