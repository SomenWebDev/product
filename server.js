const express = require("express");
const app = express();

const rateLimit = require("express-rate-limit");

const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
require("dotenv").config();

const mongoose = require("mongoose");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
});

app.use(limiter);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
