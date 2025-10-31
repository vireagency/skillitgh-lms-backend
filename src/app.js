const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const authRoutes = require("./routes/auth.route");
const workshopRoutes = require("./routes/workshop.route");
const courseRoutes = require("./routes/course.route");
const { connectDB } = require("../config/db");
const swaggerDocs = require("../config/swagger");
const swaggerUi = require("swagger-ui-express");
const userRoutes = require("./routes/user.route");
const helmet = require("helmet");
app.set("trust proxy", 1);
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const notificationRoutes = require("./routes/notification.route");
//const hpp = require('hpp');
//const compression = require('compression');
//const mongoSanitize = require('express-mongo-sanitize');

const cookieParser = require("cookie-parser");

dotenv.config();
connectDB();

// Middlewares

app.use(helmet()); // Set security HTTP headers
//app.use(compression()); // Compress response bodies for all requests
//app.use(mongoSanitize()); // Sanitize data against NoSQL injection attacks
//app.use(xss()); // Sanitize data against XSS attacks
//app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
  })
); // Limit requests to 100 per 15 minutes

app.use(
  cors({
    origin: [
      process.env.client_URL,
      process.env.client_URL_PROD1,
      process.env.client_URL_PROD2,
      process.env.FRONTEND_URL,
      process.env.skillit_lms,
      process.env.skillitgh,
    ],
    credentials: true,
  })
);
//app.use(cors({ origin: "*", credentials: true })); // Allow all origins for development
//app.options('*', cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is healthy!");
});

// Routes
app.use(
  "/api/v1/",
  authRoutes,
  workshopRoutes,
  courseRoutes,
  userRoutes,
  notificationRoutes
);

module.exports = app;
