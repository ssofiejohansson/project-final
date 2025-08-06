import cors from "cors";
import express from "express";
import expressListEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import userRoutes from "./routes/userRoutes";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";

mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());

// Endpoints with listEndpoints
app.get("/", (req, res) => {
  const endpoints = expressListEndpoints(app)
  res.json({
    message: "Welcome to Subscribee",
    endpoints: endpoints
  })
})

//Connection to routes
app.use("/users", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
