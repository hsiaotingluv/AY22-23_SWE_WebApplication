const assert = require("assert");
const Contact = require("../model/contactModel");

// Find records
describe("Finding records", function () {
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

  // Find a record by name
  it("Finds a record from the database by name", function (done) {
    Contact.findOne({ name: "Mario" }).then(function (result) {
      assert(result.name === "Mario");
      assert(result.email === "mario@gmail.com");
      done();
    });
  });

  // Find a record by id
  it("Finds a record by unique id", function (done) {
    Contact.findOne({ _id: contact._id }).then(function (result) {
      assert(result._id.toString() === contact._id.toString());
      assert(result.name.toString() === contact.name.toString());
      assert(result.email.toString() === contact.email.toString());
      done();
    });
  });
});
