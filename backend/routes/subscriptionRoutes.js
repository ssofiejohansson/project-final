import express from 'express';

const router = express.Router();

// Placeholder routes for subscriptions
router.get('/', (req, res) => {
  res.json({ message: 'Subscriptions endpoint' });
});

export default router;
