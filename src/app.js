const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const authRoutes = require("./routes/auth.route");
const workshopRoutes = require("./routes/workshop.route");
const courseRoutes = require("./routes/course.route");
const { connectDB } = require("../config/db");
const swaggerDocs = require("../config/swagger");
const swaggerUi = require('swagger-ui-express');
const userRoutes = require("./routes/user.route");

dotenv.config();
connectDB();

app.use(cors({
  origin: process.env.client_URL,
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
  res.send("Server is healthy!")
})

// Routes
app.use("/api/v1/", authRoutes, workshopRoutes, courseRoutes, userRoutes);

module.exports = app;