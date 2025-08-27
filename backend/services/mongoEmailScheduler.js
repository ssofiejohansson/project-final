import cron from 'node-cron';
import { ScheduledEmail } from '../models/ScheduledEmail.js';
import sendEmail from '../sendEmail.js'; 
import _ from 'lodash'; 

class MongoEmailScheduler {
  constructor() {
    this.isRunning = false;
    this.emailService = null;
  }

  setEmailService(emailService) {
    this.emailService = emailService;
  }

  startScheduler() {
    if (this.isRunning) return;

    // Check for due emails every minute
    this.cronJob = cron.schedule('* * * * *', async () => {
      await this.processDueEmails();
    });

    this.isRunning = true;    
  }

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

      // Group by recipient and scheduledDateTime (rounded to minute)
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

      // Update all emails in the group
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
      // Send the email using sendEmail function
      await sendEmail({
        to: email.to,
        subject: email.subject,
        text: email.text,
      });      

      // Update status
      if (email.isRecurring) {
        // Calculate next run date (next month, same day)
        const nextRun = new Date(email.nextRun);
        nextRun.setMonth(nextRun.getMonth() + 1);

        email.nextRun = nextRun;
        email.lastSent = new Date();
      
      } else {
        email.status = 'sent';        
      }

      await email.save();
    } catch (error) {
      email.attempts += 1;
      email.errorMessage = error.message;

      // Retry logic
      if (email.attempts < 3) {
        email.nextRun = new Date(Date.now() + 5 * 60 * 1000); // Retry in 5 minutes      
      } else {
        email.status = 'failed';        
      }

      await email.save();
      console.error(`Failed to send email to ${email.to}:`, error.message);
    }
  }

  async scheduleEmail(emailData) {
    try {
      const scheduledDateTime = new Date(emailData.scheduledDateTime);

      const scheduledEmail = new ScheduledEmail({
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        scheduledDateTime: scheduledDateTime,
        isRecurring: emailData.isRecurring || false,
        nextRun: scheduledDateTime,
        status: 'scheduled',
      });

      const savedEmail = await scheduledEmail.save();    

      return savedEmail;
    } catch (error) {
      console.error('❌ Error scheduling email:', error);
      throw error;
    }
  }

  async getAllScheduledEmails() {
    try {
      return await ScheduledEmail.find({
        status: { $in: ['scheduled', 'sent'] },
      }).sort({ nextRun: 1 });
    } catch (error) {
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

export default new MongoEmailScheduler();
