var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

// .env
require("dotenv").config();

var apiRouter = require("./routes/api");

var app = express();

// Allow requests from any origin
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// trust first proxy
app.set("trust proxy", 1);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static('uploads'));

app.use("/api", apiRouter);

module.exports = app;
