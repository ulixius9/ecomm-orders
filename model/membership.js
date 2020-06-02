const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { currency_enum, status_enum } = require("./constants/membership");

const membershipShema = mongoose.Schema(
  {
    //Product refers to plan that is being subscribed
    product: {
      type: Array,
      required: true,
    },
    currency: {
      type: String,
      enum: currency_enum,
      default: "INR",
    },
    status: {
      type: String,
      enum: status_enum,
      default: "pending",
    },
    billing_period: {
      type: String,
      enum: ["month", "year"],
      default: "month",
      required: true,
    },
    billing_interval: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    trial_end_date: Date,
    next_payment_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    set_paid: { type: Boolean, required: true },
    subtotal: Number,
    subtotal_tax: Number,
    discount_total: { Type: Number, default: 0 },
    discount_tax: { Type: Number, default: 0 },
    shipping_total: Number,
    shipping_tax: Number,
    user: String,
    billing_address: String,
    shipping_address: String,
    payment_method: String,
    payment_method_title: String,
    transaction_id: String,
    date_paid: Date,
    date_completed: Date,
    cart_hash: String,
  },
  {
    timestamps: true,
    _id: true,
  }
);

membershipShema.virtual("subtotal_ex_tax").get(function () {
  return this.subtotal - this.subtotal_tax;
});
membershipShema.virtual("discount_total_ex_tax").get(function () {
  return this.discount_total - this.discount_tax;
});
membershipShema.virtual("shipping_ex_tax").get(function () {
  return this.shipping_total - this.shipping_tax;
});
membershipShema.virtual("total_ex_tax").get(function () {
  return this.subtotal_ex_tax + this.shipping_ex_tax - this.discount_total;
});
membershipShema.virtual("total_tax").get(function () {
  //To be verified: discount tax deduct /add
  return this.subtotal_tax + this.shipping_tax - this.discount_tax;
});
membershipShema.virtual("total").get(function () {
  return this.total_ex_tax + this.total_tax;
});

module.exports = mongoose.model("Membership", membershipShema);
