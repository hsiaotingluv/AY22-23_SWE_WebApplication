const mongoose = require("mongoose");

// ES6 Promises
mongoose.Promise = global.Promise;

// Connect to db before tests run
before(function (done) {
  // Connect to mongodb
  mongoose.connect("mongodb://localhost/resthub");
  mongoose.connection
    .once("open", function () {
      console.log("Connection has been made, now make fireworks...");
      done();
    })
    .on("error", function (error) {
      console.log("Connection error:", error);
    });
});

// Drop the contacts collection before each test
beforeEach(function (done) {
  // Drop the collection
  mongoose.connection.collections.contacts.drop(function () {
    done();
  });
});
