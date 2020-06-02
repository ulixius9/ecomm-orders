const express = require("express");
const { check } = require("express-validator");
const {
  getMembershipById,
  createMembership,
  getMembership,
  getAllMemberships,
  updateMembershipStatus,
  updateMembership,
} = require("../controller/membership");

const router = express.Router();

//Params
router.param("membershipId", getMembershipById);

//Create
router.post(
  "/membership/create",
  check("product", "Chose valid product/plan").notEmpty(),
  check("billing_interval", "Enter valid billing interval").isNumeric(),
  check("start_date", "Enter valid start date").isISO8601().toDate(),
  check("next_payment_date", "Enter valid next payment date")
    .isISO8601()
    .toDate(),
  check("end_date", "Enter valid end date").isISO8601().toDate(),
  check("set_paid", "is paid?").isBoolean(),
  check("subtotal", "Please enter valid subtotal").isNumeric(),
  check("shipping_total", "Please enter valid shipping").isNumeric(),
  check("subtotal_tax", "Please enter valid subtotal tax").isNumeric(),
  check("shipping_tax", "Please enter valid shipping tax").isNumeric(),
  createMembership
);

//Read
router.get("/membership/:membershipId", getMembership);

//Read All
router.get("/memberships", getAllMemberships);

// Update Status
router.put("/membership/:membershipId/status", updateMembershipStatus);

//Update Membership
router.put(
  "/membership/:membershipId",
  check("product", "Chose valid product/plan").notEmpty(),
  check("billing_interval", "Enter valid billing interval").isNumeric(),
  check("start_date", "Enter valid start date").isISO8601().toDate(),
  check("next_payment_date", "Enter valid next payment date")
    .isISO8601()
    .toDate(),
  check("end_date", "Enter valid end date").isISO8601().toDate(),
  check("set_paid", "is paid?").isBoolean(),
  check("subtotal", "Please enter valid subtotal").isNumeric(),
  check("shipping_total", "Please enter valid shipping").isNumeric(),
  check("subtotal_tax", "Please enter valid subtotal tax").isNumeric(),
  check("shipping_tax", "Please enter valid shipping tax").isNumeric(),
  updateMembership
);

module.exports = router;
