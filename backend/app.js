const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//  Load environment variables
const dotenv = require("dotenv");
dotenv.config();

// MongoDB
const connectDB = require("./src/config/db.config");

const { setRoutes } = require("./src/routes/index");

// Logger
const createLogger = require("./src/utils/logger");
const logger = createLogger("AppLogger");

// CORS options
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));

setRoutes(app);

app.listen(PORT, () => {
  logger.info(`Server is running on PORT: ${PORT}`);
});
