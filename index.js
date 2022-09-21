// Import express
const express = require("express");
const cors = require("cors");
const path = require("path");

// App Middleware
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
// Import Body parser
let bodyParser = require("body-parser");

// Import Mongoose
let mongoose = require("mongoose");

// Initialise the app
const app = express();

// Import routes
const apiRoutes = require("./api-routes");
const { application } = require("express");
app.use(cors(corsOptions));
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

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});

// Use Api routes in the App
app.use("/api", apiRoutes);
// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "./client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Send message for default URL
app.get("/", (req, res) =>
  res.send("Hello World with Express, deployed with Heroku!!!")
);

// // Have heroku to serve a static build file
// if (process.env.NODE_ENV === "production") {
//   // Have Node serve the files for our built React app
//   app.use(express.static(path.resolve(__dirname, "./client/build")));
//   // All other GET requests not handled before will return our React app
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
//   });
// }

// Export our app for testing purposes
module.exports = app;
