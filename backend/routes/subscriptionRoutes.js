import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Subscription route works!');
});

export default router; 