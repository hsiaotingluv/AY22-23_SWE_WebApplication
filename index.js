// Import express
const express = require("express");
// const cors = require("cors");
const path = require("path");
// Import Body parser
let bodyParser = require("body-parser");
// Setup server port
var port = process.env.PORT || 9000;
// Import Mongoose
let mongoose = require("mongoose");
// Initialise the app
const app = express();
// Import routes
const apiRoutes = require("./api-routes");
require("dotenv").config();
const jwt = require("jsonwebtoken");

app.use(express.json());

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/resthub", {
    useNewUrlParser: true,
  })
  .then((connect) => console.log("connected to mongodb!"))
  .catch((e) => console.log("could not connect to mongodb", e));

var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/posts", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.username === req.user.name));
});

// Use Api routes in the App
app.use("/api", apiRoutes);
// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Have heroku to serve a static build file
if (process.env.NODE_ENV === "production") {
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, "./client/build")));
  // All other GET requests not handled before will return our React app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
  });
}

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});

// Export our app for testing purposes
module.exports = app;
