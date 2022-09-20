const assert = require("assert");
const Contact = require("../model/contactModel");

// Describe our tests
describe("Updating records", function () {
  var contact;

  // Add a contact to the db before each tests
  beforeEach(function (done) {
    contact = new Contact({
      name: "Mario",
      email: "mario@gmail.com",
    });
    contact.save().then(function () {
      done();
    });
  });

  // Update name of a contact by name
  it("Updates the name of a record by name", function (done) {
    Contact.findOneAndUpdate({ name: "Mario" }, { name: "Luigi" }).then(
      function () {
        Contact.findOne({ _id: contact._id }).then(function (result) {
          assert(result.name === "Luigi");
          assert(result.email === "mario@gmail.com");
          done();
        });
      }
    );
  });

  // Update email of a contact by id
  it("Updates the email of a record by id", function (done) {
    Contact.updateOne({ _id: contact._id }, { email: "luigi@gmail.com" }).then(
      function () {
        Contact.findOne({ _id: contact._id }).then(function (result) {
          assert(result.name === "Mario");
          assert(result.email === "luigi@gmail.com");
          done();
        });
      }
    );
  });
});
