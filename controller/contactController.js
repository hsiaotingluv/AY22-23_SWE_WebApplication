// Import contact model
Contact = require("../model/contactModel");

// Handle index actions
exports.index = function (req, res) {
  Contact.get(function (err, contacts) {
    if (err) {
      console.log("INDEX FAILED");
      res.json({
        status: "error",
        message: err,
      });
      return;
    }
    res.json({
      status: "success",
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  });
};

// Handle create contact actions
exports.new = function (req, res) {
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;

  if (
    !contact.name ||
    typeof contact.name !== "string" ||
    (contact.email && typeof contact.email !== "string") ||
    (contact.gender && typeof contact.gender !== "string") ||
    (contact.phone && typeof contact.phone !== "string")
  ) {
    return res.status(400).json({
      message: "Invalid Params, name cannot be empty",
    });
  }

  // save the contact and check for errors
  contact.save(function (err) {
    if (err) {
      console.log("SAVE FAILED");
      res.send(err);
      return;
    }
    res.json({
      message: "New contact created!",
      data: contact,
    });
  });
};

// Handle view contact info
exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) {
      console.log("VIEW FAILED");
      res.send(err);
      return;
    }
    res.json({
      message: "Contact details loading..",
      data: contact,
    });
  });
};

// Handle update contact info
exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (
      !contact.name ||
      typeof contact.name !== "string" ||
      (contact.email && typeof contact.email !== "string") ||
      (contact.gender && typeof contact.gender !== "string") ||
      (contact.phone && typeof contact.phone !== "string")
    ) {
      return res.status(400).json({
        message: "Invalid Params, name cannot be empty",
      });
    }

    if (err) res.send(err);
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    // save the contact and check for errors
    contact.save(function (err) {
      if (err) {
        console.log("UPDATE FAILED");
        res.send(err);
        return;
      }
      res.json({
        message: "Contact Info updated",
        data: contact,
      });
    });
  });
};

// Handle delete contact
exports.delete = function (req, res) {
  Contact.remove(
    {
      _id: req.params.contact_id,
    },
    function (err, contact) {
      if (err) {
        console.log("DELETE FAILED");
        res.send(err);
        return;
      }
      res.json({
        status: "success",
        message: "Contact deleted",
      });
    }
  );
};
