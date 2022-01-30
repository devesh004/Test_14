const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();

//connect to databse here
connectDB();

app.use(express.json());

// All routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hi");
});

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running");
});
