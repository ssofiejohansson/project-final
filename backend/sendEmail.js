import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

console.log('Email configuration check:', {
  user: process.env.EMAIL_USER ? '✅ Set' : '❌ Missing',
  pass: process.env.EMAIL_PASS ? '✅ Set' : '❌ Missing',
  userValue: process.env.EMAIL_USER, // Remove this after testing
});

// Fix: Change createTransporter to createTransport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Add transporter verification
async function verifyTransporter() {
  try {
    await transporter.verify();
    console.log('✅ Email transporter verified successfully');
    return true;
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error);
    return false;
  }
}

async function sendEmail({ to, subject, text }) {
  try {
    console.log(`🔄 Attempting to send email to: ${to}`);

    // Verify transporter before sending
    const isVerified = await verifyTransporter();
    if (!isVerified) {
      throw new Error('Email transporter verification failed');
    }

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    console.log(`✅ Email sent successfully! Message ID: ${result.messageId}`);
    console.log(`📧 Full response:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Email sending failed:`, error);
    console.error(`❌ Error details:`, error.code, error.command);

    if (error.response) console.error('SMTP Response:', error.response);
    if (error.responseCode) console.error('SMTP Code:', error.responseCode);

    throw error;
  }
}

export default sendEmail;
