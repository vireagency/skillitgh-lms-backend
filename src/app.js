const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require("./routes/auth.route");
const workshopRoutes = require("./routes/workshop.route");
const courseRoutes = require("./routes/course.route");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("Server is healthy!")
})

// Routes
app.use("/api/v1/", authRoutes, workshopRoutes, courseRoutes);

// MongoDB connection
mongoose.connect(process.env.DB_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log("MongoDB connection failed!", err))

module.exports = app;