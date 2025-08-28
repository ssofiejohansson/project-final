import sendEmail from './sendEmail.js';

export const sendTrialExpiredEmail = async (user, subscriptionName) => {
  const { email, name } = user;

  if (!email) {
    console.warn(`No email found for user ${name || user._id}`);
    return;
  }

  const subject = `Your free trial for ${subscriptionName} has ended`;
  const text = `Hi ${name || 'there'},\n\nYour free trial for "${subscriptionName}" has ended. 
                Watch out so you don´t spill valuable honey. 
                Remember to cancel if you don´t use it anymore.\n\nBest regards,\nSubscriBee Team`; 

  try {
    const result = await sendEmail({ to: email, subject, text });
    console.log(`Trial ended email sent to ${email} for subscription "${subscriptionName}"`);
    
    return result;
  } catch (err) {
    console.error(`Failed to send trial ended email to ${email}:`, err.message);
  }
};