import express from 'express';
import _ from 'lodash';
import cron from 'node-cron';

import { ScheduledEmail } from '../models/ScheduledEmail.js';
import { Subscription } from '../models/Subscription.js';
import { sendEmail } from '../sendEmail.js';

const router = express.Router();

/**
 * MongoEmailScheduler is responsible for managing the scheduling, batching, sending,
 * and retrying of reminder emails for user subscriptions.
 *
 * - It uses a cron job to check every minute for ScheduledEmail documents in MongoDB
 *   that are due to be sent (status 'scheduled' and nextRun <= now).
 * - Due emails are grouped by recipient and scheduled time (to the minute) to minimize
 *   inbox clutter by sending a single combined email per user per time slot.
 * - Each email is sent only if the related subscription's sendEmail flag is true.
 * - Handles both one-time and recurring emails, updating their status and scheduling
 *   the next run for recurring ones.
 * - Implements retry logic for failed sends (up to 3 attempts, with 5-minute intervals).
 * - Provides methods to schedule new emails, fetch all scheduled/sent emails, and stop the scheduler.
 * - Includes an Express route to delete all scheduled emails for a given subscription.
 */


// 1. Create the MongoEmailScheduler class.
class MongoEmailScheduler {
  constructor() {
    this.isRunning = false;
    this.emailService = null;
  }
  // 2. Set the email service
  setEmailService(emailService) {
    this.emailService = emailService;
  }

  startScheduler() {
    if (this.isRunning) return;

    // Check for new emails every minute.
    this.cronJob = cron.schedule('* * * * *', async () => {
      await this.processDueEmails();
    });

    this.isRunning = true;
  }

  // Queries database for emails to send.
  async processDueEmails() {
    try {
      const now = new Date();
      const dueEmails = await ScheduledEmail.find({
        status: 'scheduled',
        nextRun: { $lte: now },
      });

      if (dueEmails.length > 0) {
        console.log(`📧 Found ${dueEmails.length} due emails to process`);
      }

      // Group emails by recipient and scheduled time (to the minute)
      const grouped = _.groupBy(
        dueEmails,
        (email) =>
          `${email.to}|${new Date(email.nextRun).toISOString().slice(0, 16)}`
      );

      for (const groupKey in grouped) {
        const group = grouped[groupKey];
        await this.processEmailGroup(group);
      }
    } catch (error) {
      console.error('❌ Error processing due emails:', error);
    }
  }

  // New method to process a group of emails
  async processEmailGroup(emailGroup) {
    if (emailGroup.length === 0) return;
    const recipient = emailGroup[0].to;

    // Combine subjects/texts
    const combinedSubject = `Your ${emailGroup.length} scheduled updates`;
    const combinedText = emailGroup
      .map(
        (email, idx) =>
          `#${idx + 1}\nSubject: ${email.subject}\n${email.text}\n`
      )
      .join('\n---\n');

    try {
      await sendEmail({
        to: recipient,
        subject: combinedSubject,
        text: combinedText,
      });

      // Update all emails in the group based on their status. Either reoccurring emails get a new send date, or non-reoccurring emails are marked as sent.
      for (const email of emailGroup) {
        if (email.isRecurring) {
          const nextRun = new Date(email.nextRun);
          nextRun.setMonth(nextRun.getMonth() + 1);
          email.nextRun = nextRun;
          email.lastSent = new Date();
        } else {
          email.status = 'sent';
        }
        await email.save();
      }
    } catch (error) {
      for (const email of emailGroup) {
        email.attempts += 1;
        email.errorMessage = error.message;
        if (email.attempts < 3) {
          email.nextRun = new Date(Date.now() + 5 * 60 * 1000);
        } else {
          email.status = 'failed';
        }
        await email.save();
      }
      console.error(
        `Failed to send combined email to ${recipient}:`,
        error.message
      );
    }
  }

  async processEmail(email) {
    try {
      // 1. Fetch the related subscription from the database using the subscriptionId stored on the email.
      const subscription = await Subscription.findById(email.subscriptionId);

      // 2. If the subscription doesn't exist or its sendEmail flag is false, skip sending.
      if (!subscription || subscription.sendEmail === false) {
        email.status = 'skipped';
        await email.save();
        return;
      }

      // 3. If the subscription exists and sendEmail is true, send the email using your sendEmail function.
      await sendEmail({
        to: email.to,
        subject: email.subject,
        text: email.text,
      });

      // 4. After sending, update the email's status:
      if (email.isRecurring) {
        // If it's a recurring email, schedule the next run for one month later and update lastSent.
        const nextRun = new Date(email.nextRun);
        nextRun.setMonth(nextRun.getMonth() + 1);

        email.nextRun = nextRun;
        email.lastSent = new Date();
      } else {
        // If it's not recurring, just mark it as sent.
        email.status = 'sent';
      }

      // 5. Save the updated email document.
      await email.save();
    } catch (error) {
      // 6. If sending fails, increment the attempts counter and store the error message.
      email.attempts += 1;
      email.errorMessage = error.message;

      // 7. Retry logic: If attempts < 3, reschedule for 5 minutes later; otherwise, mark as failed.
      if (email.attempts < 3) {
        email.nextRun = new Date(Date.now() + 5 * 60 * 1000); // Retry in 5 minutes
      } else {
        email.status = 'failed';
      }

      // 8. Save the updated email document with error info.
      await email.save();
      // 9. Log the error for debugging.
      console.error(`Failed to send email to ${email.to}:`, error.message);
    }
  }

  // 1. Check if email reminders are enabled:
  async scheduleEmail(emailData) {
    if (!emailData.sendEmail) {
      return null;
    }
    try {
      // const { subscriptionId, to, subject, text, scheduledFor } = emailData;
      const { subscriptionId, to, subject, text, scheduledDateTime } = emailData;

      // 2. Convert the scheduled date to JavaScript date Object.
      //const scheduledDateTime = new Date(scheduledFor);
      const scheduledDate = new Date(scheduledDateTime);

      // 3. Create a new ScheduledEmail document in MongoDB with status set to "scheduled".
      const scheduledEmail = new ScheduledEmail({
        subscriptionId,
        to,
        subject,
        text,
        //scheduledDateTime,
        scheduledDateTime: scheduledDate,
        isRecurring: false,
        //nextRun: scheduledDateTime,
        nextRun: scheduledDate,
        status: 'scheduled',
      });

      // 4. Save the scheduled email to the database
      const savedEmail = await scheduledEmail.save();

      // 5. Return the saved email document
      return savedEmail;

      // 6. If any error occurs, log it and throw it to be handled by the caller.
    } catch (error) {
      console.error('❌ Error scheduling email:', error);
      throw error;
    }
  }

  // 1. Define an async method to get all scheduled (and sent) emails
  async getAllScheduledEmails() {
    try {
      // 2. Query the ScheduledEmail collection for emails with status 'scheduled' or 'sent'
      return await ScheduledEmail.find({
        status: { $in: ['scheduled', 'sent'] },
      })
        // 3. Sort the results by the nextRun date in ascending order (soonest first)
        .sort({ nextRun: 1 });
    } catch (error) {
      // 4. If an error occurs, log it and return an empty array
      console.error('❌ Error fetching scheduled emails:', error);
      return [];
    }
  }

  stop() {
    if (this.cronJob) {
      this.cronJob.stop();
      this.isRunning = false;
    }
  }
}

router.delete('/:id', async (req, res) => {
  await ScheduledEmail.deleteMany({ subscriptionId: req.params.id });
});

export default new MongoEmailScheduler();
