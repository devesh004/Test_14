const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//connect to databse here

app.use(express.json());

// All routes

app.get("/", (req, res) => {
  res.send("Hi");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running");
});
