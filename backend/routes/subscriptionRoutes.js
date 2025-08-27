import express from 'express';

import { authenticateUser } from '../authMiddleware.js';
import { Subscription } from '../models/Subscription.js';

const router = express.Router();

//To get all subscriptions
router.get('/', authenticateUser, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id }); // SOFIE ADD

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json({
        success: true,
        response: null,
        message: 'No subscription was found',
      });
    }

    res.status(200).json({
      success: true,
      response: subscriptions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: 'Failed to fetch subscription',
    });
  }
});

//To get one subscription based on id (endpoint is /subscriptions/:id)
router.get('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        response: null,
        message: 'Subscription not found',
      });
    }

    res.status(200).json({
      success: true,
      response: subscription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Subscription couldn't be found",
    });
  }
});

//To create/save a subscription to the db (endpoint is /subscriptions)
router.post('/', authenticateUser, async (req, res) => {
  const {
    name,
    category,
    cost,
    status,
    freeTrial,
    trialDays,
    reminderDate,
    sendEmail,
  } = req.body;

  if (!req.user) {
    return res
      .status(403)
      .json({ error: 'You must be logged in to add a subscription' });
  }

  try {
    const subscription = new Subscription({
      name,
      category,
      cost,
      status,
      freeTrial,
      trialDays,
      reminderDate,
      sendEmail, // <-- add this
      user: req.user._id,
    });

    const newSubscription = await subscription.save();

    res.status(201).json({
      success: true,
      response: newSubscription,
      message: 'Subscription created successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: "Couldn't create subscription",
    });
  }
});

//To edit a subscription (endpoint is /subscriptions/:id)
router.patch('/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const { name, cost, freeTrial, trialDays, reminderDate, status, category, sendEmail } =
    req.body;

    console.log("Hej")

  try {
    const editSubscription = await Subscription.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { name, cost, freeTrial, trialDays, reminderDate, status, category, sendEmail },
      {
        new: true,
        runValidators: true,
      }
      
    );
    console.log("hejhej")
    if (!editSubscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }
    res.status(200).json(editSubscription);
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: 'Failed to fetch subscription',
    });
  }
});

// SOFIE ADD: To delete a subscription
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const deleted = await Subscription.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json({ success: true, message: 'Subscription deleted' });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete subscription',
      error,
    });
  }
});

export default router;
