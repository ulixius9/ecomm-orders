const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { currency_enum, status_enum } = require("./constants/order");

/*
// Temporary project caart schema 
const productCartSchema = mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});
*/
// const productCart = mongoose.model("ProductCart", productCartSchema);

const orderShema = mongoose.Schema(
  {
    // products: [productCartSchema],
    // Enter mannual aaray of product id for testing
    products: {
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
    subtotal: Number,
    subtotal_tax: Number,
    discount_total: { Type: Number, default: 0 },
    discount_tax: { Type: Number, default: 0 },
    shipping_total: Number,
    shipping_tax: Number,
    /*
    // Enter mannual id for testing 
    user: {
      type: ObjectId,
      ref: "User",
    },*/
    user: String,
    billing_address: String,
    shipping_address: String,
    payment_method: String,
    payment_method_title: String,
    transaction_id: String,
    date_paid: Date,
    date_completed: Date,
    cart_hash: String,
    refunds: Array,
    set_paid: Boolean,
    /*
    // Not sure to be included 
    items_count: { Type: Number},
    coupon_lines: Array,
    customer_note:String,
    wrapping_cost_total: { Type: Number },
    wrapping_cost_tax: { Type: Number},
    */
  },
  {
    timestamps: true,
  }
);

orderShema.virtual("subtotal_ex_tax").get(function () {
  return this.subtotal - this.subtotal_tax;
});
orderShema.virtual("discount_total_ex_tax").get(function () {
  return this.discount_total - this.discount_tax;
});
orderShema.virtual("shipping_ex_tax").get(function () {
  return this.shipping_total - this.shipping_tax;
});
orderShema.virtual("total_ex_tax").get(function () {
  return this.subtotal_ex_tax + this.shipping_ex_tax - this.discount_total;
});
orderShema.virtual("total_tax").get(function () {
  //To be verified: discount tax deduct /add
  return this.subtotal_tax + this.shipping_tax - this.discount_tax;
});
orderShema.virtual("total").get(function () {
  return this.total_ex_tax + this.total_tax;
});
// orderShema.virtual("wrapping_cost_ex_tax").get(function () {
//   return this.wrapping_cost_total - this.wrapping_cost_tax;
// });
module.exports = mongoose.model("Order", orderShema);
