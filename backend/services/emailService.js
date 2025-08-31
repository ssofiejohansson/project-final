import { sendEmail } from '../sendEmail.js';

export class EmailService {
  async sendImmediateEmail(emailData) {
    try {
      await sendEmail({
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
      });
    } catch (error) {
      console.error(`❌ Failed to send email to ${emailData.to}:`, error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
