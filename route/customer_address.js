const express = require("express");
const { check } = require("express-validator");
const {
  getAddressById,
  createAddress,
  getAddress,
  getAllAddress,
  getAllAddressOfCustomer,
  updateAddress,
  deleteAddress,
} = require("../controller/customer_address");

const router = express.Router();

//Params
router.param("addressId", getAddressById);

//Create
router.post(
  "/address/create",
  check("first_name", "Please enter valid first name").isLength({ min: 3 }),
  check("last_name", "Please enter valid last name").isLength({ min: 3 }),
  check("customer_id", "Please add valid customer ID").notEmpty(),
  check("address1", "Please enter valid address").notEmpty(),
  check("zip", "Please enter valid zip code").isLength({ min: 6, max: 6 }),
  check("phone", "Please enter valid phone number")
    .isNumeric()
    .isLength({ min: 10 }),
  createAddress
);

//Read
router.get("/address/:addressId", getAddress);

//Read All
router.get("/addresses", getAllAddress);

//Read All
router.get("/addresses/:customerId", getAllAddressOfCustomer);

//Update Address
router.put(
  "/address/:addressId",
  check("first_name", "Please enter valid first name").isLength({ min: 3 }),
  check("last_name", "Please enter valid last name").isLength({ min: 3 }),
  check("customer_id", "Please add valid customer ID").notEmpty(),
  check("address1", "Please enter valid address").notEmpty(),
  check("zip", "Please enter valid zip code").isLength({ min: 6, max: 6 }),
  check("phone", "Please enter valid phone number")
    .isNumeric()
    .isLength({ min: 10 }),
  updateAddress
);

//Update Address
router.delete("/address/:addressId", deleteAddress);

module.exports = router;
