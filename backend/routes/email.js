import express from 'express';
import sendEmail from '../sendEmail.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await sendEmail({ to, subject, text });
    res.status(200).json({ message: 'Email sent!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
