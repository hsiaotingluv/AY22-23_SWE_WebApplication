const assert = require("assert");
const Contact = require("../model/contactModel");

// Save records
describe("Saving records", function () {
  // Save a record
  it("Saves a record to the database", function (done) {
    const contact = new Contact({
      name: "Mario",
      email: "mario@gmail.com",
    });

    contact.save().then(function () {
      assert(!contact.isNew);
      done();
    });
  });
});
