const assert = require("assert");
const Contact = require("../contactModel");

// Delete records
describe("Deleting records", function () {
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

  // Delete a record
  it("Deletes a record from the database", function (done) {
    Contact.findOneAndRemove({ name: "Mario" }).then(function () {
      Contact.findOne({ name: "Mario" }).then(function (result) {
        assert(result === null);
        done();
      });
    });
  });
});
