import cors from 'cors';
import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';

import subscriptionRoutes from './routes/subscriptionRoutes';
import userRoutes from './routes/userRoutes';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/final-project';

mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint with API documentation
app.get('/', (req, res) => {
  const endpoints = expressListEndpoints(app);
  res.json({
    message: 'Welcome to Subscribee API',
    endpoints: endpoints,
  });
});

// Page endpoints
app.get('/home', (req, res) => {
  res.json({
    page: 'home',
    message: 'Welcome to Subscribee - Your subscription management platform',
    features: ['Manage subscriptions', 'Track expenses', 'Get insights'],
  });
});

app.get('/about', (req, res) => {
  res.json({
    page: 'about',
    message: 'About Subscribee',
    description:
      'Subscribee helps you manage and track all your subscriptions in one place',
  });
});

app.get('/login', (req, res) => {
  res.json({
    page: 'login',
    message: 'Login to your Subscribee account',
    endpoint: '/users/login',
  });
});

app.get('/signup', (req, res) => {
  res.json({
    page: 'signup',
    message: 'Create a new Subscribee account',
    endpoint: '/users/register',
  });
});

app.get('/admin', (req, res) => {
  res.json({
    page: 'admin',
    message: 'Admin dashboard',
    description: 'Administrative functions and user management',
  });
});


// Route connections
app.use('/users', userRoutes);
app.use('/subscriptions', subscriptionRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
