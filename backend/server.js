import cors from 'cors';
import express from 'express';
import expressListEndpoints from 'express-list-endpoints';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mongoEmailScheduler from './services/mongoEmailScheduler.js';

// Import routes
import userRoutes from './routes/userRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

dotenv.config();

const mongoUrl =
  process.env.MONGO_URL || 'mongodb://localhost:27017/subscribee-app';

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('📦 Connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.name}`);

    // Start the email scheduler
    mongoEmailScheduler.startScheduler();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });

mongoose.Promise = Promise;

const port = process.env.PORT || 8081;
const app = express();

app.use(cors());
app.use(express.json());

// Root endpoint
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
app.use('/email', emailRoutes);

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log('📧 MongoDB email scheduler is active');
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoEmailScheduler.stop();
  mongoose.connection.close();
  process.exit(0);
});
