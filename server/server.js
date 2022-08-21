import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";

import authRouter from "./routes/auth.route.js";
import { mongoConnection } from "./config/db.js";

// Config .env to ./config/config.env
config({
  path: "./config/config.env",
});

// Connect to database
mongoConnection();

// Start app
const app = express();

// Parse body of requests
app.use(bodyParser.json());

// Development only
if (process.env.NODE_ENV === "development") {
  // CORS for local react frontend
  app.use(cors({ origin: process.env.CLIENT_URL }));

  // Logs info about requests
  app.use(morgan("dev"));
}

// Load all routes
app.use("/api/", authRouter);

// Invalid routes => 404 error
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// Listens on port 5000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
