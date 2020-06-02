const Membership = require("../model/membership");
const { validationResult } = require("express-validator");

exports.getMembershipById = (req, res, next, id) => {
  //TODO: Populate products and maybe users
  Membership.findById(id).exec((err, membership) => {
    if (err) {
      console.log(err);
      return res.status(404).json({
        error: err,
      });
    }
    req.membership = membership;
    next();
  });
};

exports.createMembership = (req, res) => {
  // req.body.membership.user = req.profile;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  const membership = new Membership(req.body);
  membership.save((err, membership) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your membership in DB",
      });
    }
    res.status(200).json(membership);
  });
};

exports.getAllMemberships = (req, res) => {
  //Populate Users
  Membership.find().exec((err, memberships) => {
    if (err) {
      return res.status(400).json({
        error: "No memberships found in DB",
      });
    }
    res.status(200).json(memberships);
  });
};

exports.getMembership = (req, res) => {
  res.status(200).json(req.membership);
};

exports.updateMembershipStatus = (req, res) => {
  Membership.findByIdAndUpdate(
    { _id: req.membership._id },
    { $set: { status: req.body.status } },
    { new: true, useFindAndModify: false },
    (err, membership) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update membership status",
        });
      }
      res.status(200).json(membership);
    }
  );
};

exports.updateMembership = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ error: errors.array() });
  Membership.findByIdAndUpdate(
    { _id: req.membership._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedMembership) => {
      if (err || !updatedMembership)
        return res.status(400).json({ error: "Can not update membership" });
      res.status(200).json(updatedMembership);
    }
  );
};
