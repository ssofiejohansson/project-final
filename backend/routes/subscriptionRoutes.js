import express from 'express';
import cron from 'node-cron';

import { authenticateUser } from '../authMiddleware.js';
import { Subscription } from '../models/Subscription.js';
const ScheduledEmail = require('../models/ScheduledEmail');

export const router = express.Router();

// Initialize global cron jobs object
global.cronJobs = global.cronJobs || {};

//To get all subscriptions
router.get('/', authenticateUser, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user._id });

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
      sendEmail,
      user: req.user._id,
    });

    const newSubscription = await subscription.save();

    // Schedule email if sendEmail is true
    if (sendEmail) {
      const job = cron.schedule(reminderDate, () => {
        // Logic to send email
        console.log(`Sending email for subscription: ${newSubscription._id}`);
      });

      // Save the cron job to the global object
      global.cronJobs[newSubscription._id] = job;
    }

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
  const {
    name,
    cost,
    freeTrial,
    trialDays,
    reminderDate,
    status,
    category,
    sendEmail,
  } = req.body;

  try {
    const editSubscription = await Subscription.findOneAndUpdate(
      { _id: id, user: req.user._id },
      {
        name,
        cost,
        freeTrial,
        trialDays,
        reminderDate,
        status,
        category,
        sendEmail,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!editSubscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // If sendEmail is updated to true, schedule the email
    if (sendEmail && !global.cronJobs[id]) {
      const job = cron.schedule(reminderDate, () => {
        // Logic to send email
        console.log(`Sending email for subscription: ${editSubscription._id}`);
      });

      // Save the cron job to the global object
      global.cronJobs[id] = job;
    }

    // If sendEmail is updated to false, stop the cron job
    if (!sendEmail && global.cronJobs[id]) {
      global.cronJobs[id].stop();
      delete global.cronJobs[id];
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

// To delete a subscription
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the subscription
    const deleted = await Subscription.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Delete all scheduled emails for this subscription
    await ScheduledEmail.deleteMany({ subscriptionId: id });

    // Cancel any node-cron jobs for this subscription
    if (global.cronJobs && global.cronJobs[id]) {
      global.cronJobs[id].stop();
      delete global.cronJobs[id];
    }

    res.status(200).json({
      message: 'Subscription and related scheduled emails deleted',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error });
  }
});
