<<<<<<< Updated upstream
=======
<<<<<<< HEAD
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const mongoUrl =
  'mongodb+srv://sofieannamatilda:rQ58C4zpa5QANMx9@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';
const port = 5000;
=======
>>>>>>> Stashed changes
import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
>>>>>>> 094fc6a22273daeb63887a83968a365d9e0769b6
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Endpoints with listEndpoints
<<<<<<< HEAD
app.get('/', (req, res) => {
  const endpoints = listEndpoints(app);
  res.json({
    message: 'Welcome to Subscribee',
    endpoints: endpoints,
  });
});
=======
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json({
    message: "Welcome to Subscribee",
    endpoints: endpoints
  })
})
>>>>>>> 094fc6a22273daeb63887a83968a365d9e0769b6

//Connection to routes
app.use("/users", userRoutes);

//Connection to routes
app.use("/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
