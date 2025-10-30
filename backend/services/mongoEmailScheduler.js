import express from 'express';
import _ from 'lodash';
import cron from 'node-cron';

import { ScheduledEmail } from '../models/ScheduledEmail.js';
import { Subscription } from '../models/Subscription.js';
import { sendEmail } from '../sendEmail.js';

const router = express.Router();

/**
 * Starts the MongoEmailScheduler as a function.
 * Checks every minute for scheduled emails and processes them.
 */
function startMongoEmailScheduler() {
  cron.schedule('* * * * *', async () => {
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
        await processEmailGroup(group);
      }
    } catch (error) {
      console.error('❌ Error processing due emails:', error);
    }
  });
}

// Helper function to process a group of emails
async function processEmailGroup(emailGroup) {
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

// Express route to delete all scheduled emails for a given subscription
router.delete('/:id', async (req, res) => {
  await ScheduledEmail.deleteMany({ subscriptionId: req.params.id });
});

// Export the function instead of a class instance
export default startMongoEmailScheduler;
