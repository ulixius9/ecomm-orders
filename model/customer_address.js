const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const addressSchema = mongoose.Schema({
  customer_id: {
    type: ObjectId,
    ref: "Customers",
  },
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    default: null,
  },
  state: String,
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  zip: {
    type: String,
  },
  phone: {
    type: String,
  },
  default: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Address", addressSchema);
