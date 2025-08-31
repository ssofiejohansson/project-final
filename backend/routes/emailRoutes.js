import express from 'express';
import mongoEmailScheduler from '../services/mongoEmailScheduler.js';
import { sendEmail } from '../sendEmail.js';

export const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Email routes working!' });
});

// Get all scheduled email reminders
router.get('/reminders', async (req, res) => {
  try {
    const reminders = await mongoEmailScheduler.getAllScheduledEmails();

    const formattedReminders = reminders.map((reminder) => ({
      id: reminder._id,
      email: reminder.to,
      subject: reminder.subject,
      type: reminder.isRecurring ? 'recurring' : 'one-time',
      nextRun: reminder.nextRun,
      status: reminder.status,
      createdAt: reminder.createdAt,
      isRecurring: reminder.isRecurring,
      lastSent: reminder.lastSent,
      attempts: reminder.attempts,
    }));

    res.status(200).json({
      message: 'Email reminders retrieved successfully',
      reminders: formattedReminders,
      count: formattedReminders.length,
    });
  } catch (error) {
    console.error('Error retrieving reminders:', error);
    res.status(500).json({ error: 'Failed to retrieve reminders' });
  }
});

// Schedule or send email
router.post('/', async (req, res) => {
  try {
    const {
      to,
      subject,
      text,
      sendImmediately,
      scheduledDateTime,
      isRecurring,
    } = req.body;

    if (sendImmediately) {
      // Send the email using sendEmail function
      try {
        await sendEmail({
          to,
          subject,
          text,
        });

        res.status(200).json({
          message: 'Email sent successfully!',
          recipient: to,
        });
      } catch (emailError) {
        console.error(`❌ Failed to send email to ${to}:`, emailError);
        res.status(500).json({
          error: 'Failed to send email',
          details: emailError.message,
        });
      }
    } else {
      // Schedule using MongoDB
      const scheduledEmail = await mongoEmailScheduler.scheduleEmail({
        to,
        subject,
        text,
        scheduledDateTime,
        isRecurring: isRecurring || false,
      });

      res.status(200).json({
        message: 'Email scheduled successfully!',
        scheduledEmail: {
          id: scheduledEmail._id,
          to: scheduledEmail.to,
          scheduledDateTime: scheduledEmail.scheduledDateTime,
          isRecurring: scheduledEmail.isRecurring,
          status: scheduledEmail.status,
        },
      });
    }
  } catch (error) {
    console.error('Error processing email request:', error);
    res.status(500).json({ error: 'Failed to process email request' });
  }
});

// Debug endpoint to see all emails in MongoDB
router.get('/debug/all', async (req, res) => {
  try {
    const { ScheduledEmail } = await import('../models/ScheduledEmail.js');
    const allEmails = await ScheduledEmail.find({}).sort({ createdAt: -1 });
    res.json({
      message: 'All emails in database',
      emails: allEmails,
      count: allEmails.length,
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add this test endpoint
router.post('/test-config', async (req, res) => {
  try {
    const { to } = req.body;

    if (!to) {
      return res.status(400).json({ error: 'Email address required for test' });
    }

    const result = await sendEmail({
      to,
      subject: 'Test Email from Subscribee',
      text: 'This is a test email to verify the configuration works.',
    });

    res.status(200).json({
      message: 'Test email sent successfully!',
      messageId: result.messageId,
      response: result.response,
    });
  } catch (error) {
    console.error('Test email failed:', error);
    res.status(500).json({
      error: 'Test email failed',
      details: error.message,
      code: error.code,
      command: error.command,
    });
  }
});
