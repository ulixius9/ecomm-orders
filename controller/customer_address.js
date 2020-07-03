const Address = require("../model/customer_address");
const { validationResult } = require("express-validator");

exports.getAddressById = (req, res, next, id) => {
  //TODO: Populate products and maybe users
  Address.findById(id).exec((err, address) => {
    if (err) {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    }
    req.address = address;
    next();
  });
};

exports.createAddress = (req, res) => {
  // req.body.address.user = req.profile;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const address = new Address(req.body);
  address.save((err, address) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your address in DB",
      });
    }
    res.status(200).json(address);
  });
};

exports.getAllAddress = (req, res) => {
  //Populate Users
  Address.find().exec((err, addresses) => {
    if (err) {
      return res.status(400).json({
        error: "No addresses found in DB",
      });
    }
    res.status(200).json(addresses);
  });
};

exports.getAddress = (req, res) => {
  res.status(200).json(req.address);
};

exports.getAllAddressOfCustomer = (req, res) => {
  //Populate Users
  Address.find({ customer_id: req.params.customerId }).exec(
    (err, addresses) => {
      if (err) {
        return res.status(400).json({
          error: "No addresses found in DB",
        });
      }
      res.status(200).json(addresses);
    }
  );
};

exports.updateAddress = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  Address.findByIdAndUpdate(
    { _id: req.address._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedAddress) => {
      if (err || !updatedAddress)
        return res.status(400).json({ error: "Can not update address" });
      res.status(200).json(updatedAddress);
    }
  );
};

exports.deleteAddress = (req, res) => {
  Address.deleteOne({ _id: req.address._id }, function (err) {
    if (err)
      return res.status(400).json({ error: "Unable to DELETE this address" });
    return res.status(200).json({ success: "Address deleted successfully" });
  });
};
