import express from 'express';
import cron from 'node-cron';

import { authenticateUser } from '../authMiddleware.js';
import { ScheduledEmail } from '../models/ScheduledEmail.js';
import { Subscription } from '../models/Subscription.js';
import mongoEmailScheduler from './mongoEmailScheduler.js';

const router = express.Router();

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


    // Instead, schedule email only if sendEmail is true
    if (sendEmail) {
      await mongoEmailScheduler.scheduleEmail({
        to: req.user.email,
        subject: `Reminder for ${name}`,
        text: `Your subscription for ${name} is due on ${reminderDate}`,
        scheduledDateTime: reminderDate,
        isRecurring: false,
        sendEmail: true,
        subscriptionId: newSubscription._id, // Used for tracking and deletion scheduled emails later
      });
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
      return res.status(404).json({
        success: false,
        response: null,
        message: 'Subscription not found',
      });
    }

    // If sendEmail is updated to true, schedule the email if not already scheduled
    if (sendEmail) {
      await mongoEmailScheduler.scheduleEmail({
        to: req.user.email,
        subject: `Reminder for ${name}`,
        text: `Your subscription for ${name} is due on ${reminderDate}`,
        scheduledDateTime: reminderDate,
        isRecurring: false,
        sendEmail: true,
        subscriptionId: editSubscription._id,
      });
    } else {
      // If sendEmail is updated to false, delete any scheduled emails for this subscription
      await ScheduledEmail.deleteMany({ subscriptionId: id });
    }

    res.status(200).json(editSubscription);
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error,
      message: 'Failed to update subscription',
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

export default router;