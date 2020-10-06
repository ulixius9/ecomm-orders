//VARIABLES
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { currency_enum, status_enum } = require("./constants/order");

//ORDERS SCHEMA
const orderShema = mongoose.Schema(
  {
    // products: [productCartSchema],
    // Enter mannual aaray of product id for testing
    products: [
      {
        product_id: {
          type: ObjectId,
          ref: "Product",
        },
        varient_id: {
          type: ObjectId,
          ref: "",
        },
        quantity: Number,
        sku: String,
        price_inc_tax: Number,
        price_ex_tax: Number,
      },
    ],
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
    user: {
      type: ObjectId,
      ref: "Customers",
    },
    billing_address: {
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      address_line_1: {
        type: String,
        required: true,
      },
      address_line_2: {
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
    },
    shipping_address: {
      first_name: {
        type: String,
      },
      last_name: {
        type: String,
      },
      address_line_1: {
        type: String,
        required: true,
      },
      address_line_2: {
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
    },
    payment_method: String,
    payment_method_title: String,
    transaction_id: String,
    date_paid: Date,
    date_completed: Date,
    cart_hash: String,
    refunds: Array,
    set_paid: Boolean,
    tag: String,
    send_recipts: Boolean,
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


//VIRTUAL FIELDS TO ORDERS SCHEMA 
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

//MODULE EXPORT
module.exports = mongoose.model("Order", orderShema);
