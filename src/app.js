const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require("./routes/auth.route");
const workshopRoutes = require("./routes/workshop.route");
const courseRoutes = require("./routes/course.route");
const { connectDB } = require("./config/db");

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("Server is healthy!")
})

// Routes
app.use("/api/v1/", authRoutes, workshopRoutes, courseRoutes);

module.exports = app;