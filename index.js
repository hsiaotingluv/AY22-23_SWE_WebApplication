// Import express
const express = require("express");

// Import Body parser
let bodyParser = require("body-parser");

// Import Mongoose
let mongoose = require("mongoose");

// Initialise the app
const app = express();

// Import routes
const apiRoutes = require("./api-routes");
const { application } = require("express");
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/resthub", {
  useNewUrlParser: true,
});
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 9000;

// Send message for default URL
app.get("/", (req, res) =>
  res.send("Hello World with Express, deployed with Heroku!!!")
);

// Use Api routes in the App
app.use("/api", apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});

// Export our app for testing purposes
module.exports = app;
