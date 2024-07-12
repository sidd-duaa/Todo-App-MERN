import express from "express";
import mongoose from "mongoose";
import apiRoute, { apiProtected } from "./routes/api.js";
import { DB_CONNECT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

const app = express();

mongoose.connect(DB_CONNECT)
  .then(() => console.log('Connected to database'))
  .catch((error) => console.error('Error connecting to database:', error));

const PORT = 8000;

app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/', AuthMiddleware, apiProtected);

app.listen(PORT, () => console.log("Server is running"));