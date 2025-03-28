"use strict";

// ====== Module Imports ======
const express = require("express");
const http = require("http");
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const moment = require("moment");

// ====== Middleware Imports ======
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");
const session = require("express-session");

// ====== Custom Imports ======
const response = require("./src/tools/response");

// ====== Environment Setup ======
dotenv.config({ path: path.join(__dirname, "./env/.env.dev") });

// ====== Express App Initialization ======
const app = express();

// ====== Session Configuration ======
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// ====== Middleware Setup (Order Matters) ======
app.use(cookieParser("testing, ", { httpOnly: true }));

// Logger
app.use(morgan("dev"));

// File Upload
app.use(fileUpload());

// Security Headers
app.use(helmet());

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-XSRF-TOKEN"],
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware: Add Timestamps
app.use((req, res, next) => {
  req.customDate = moment().format("DD MMM YYYY HH:mm:ss");
  req.customTime = moment().format("HH:mm:ss").toUpperCase();
  req.customTimestamp = moment().format("YYYY-MM-DD HH:mm:ss").toUpperCase();
  req.startTime = new Date().getTime();
  next();
});

// ====== Routes Registration ======
const routesDir = path.join(__dirname, "./src/interface/routes");
fs.readdirSync(routesDir).forEach((file) => {
  const routePath = path.join(routesDir, file);
  const routePathWithoutExt = path.parse(routePath).name;

  const dashedRoutePath = routePathWithoutExt
    .replace(/([a-zA-Z])(?=[A-Z])/g, "$1-")
    .toLowerCase();

  console.log(`/api/${dashedRoutePath}`);
  console.log("routePath", routePath);
  app.use(`/api/${dashedRoutePath}`, require(routePath));
});

app.get("/api/csrf-token", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken, {
    httpOnly: false, // Allow JS access to send in headers
    secure: process.env.NODE_ENV === "production", // HTTPS only in production
    sameSite: "Lax", // Protect against CSRF
  });
  return response(req, res, {
    status: 200,
    message: "CSRF Token Set",
    data: {
      csrfToken,
    },
  });
  res.status(200).json({ csrfToken });
});

// ====== Error Handler ======
app.use((err, req, res, next) => {
  response(req, res, {
    status: err.status || 500,
    message: err.message || "Internal Server Error",
  });
});

// ====== Server Setup ======
const port = process.env.PORT || 3000;
app.set("port", port);

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// ====== Error & Listening Handlers ======
function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`[OK] ${process.env.SERVICE_NAME} running on port: ${port}`);
}
