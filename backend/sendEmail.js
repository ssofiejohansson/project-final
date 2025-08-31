import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function verifyTransporter() {
  try {
    await transporter.verify();    
    return true;
  } catch (error) {
    console.error('❌ Email transporter verification failed:', error);
    return false;
  }
}

export async function sendEmail({ to, subject, text }) {
  try {   
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

    return result;
  } catch (error) {
    console.error(`❌ Email sending failed:`, error);
    console.error(`❌ Error details:`, error.code, error.command);

    if (error.response) console.error('SMTP Response:', error.response);
    if (error.responseCode) console.error('SMTP Code:', error.responseCode);

    throw error;
  }
}