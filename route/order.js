const express = require("express");
const { check } = require("express-validator");
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrder,
  updateOrderStatus,
  updateOrder,
} = require("../controller/order");

const router = express.Router();

//Params
router.param("orderId", getOrderById);

// Create Order
router.post(
  "/order/create/",
  check("products", "Please place valid order").isArray({ min: 1 }),
  check("subtotal", "Please enter valid subtotal").isNumeric(),
  check("shipping_total", "Please enter valid shipping").isNumeric(),
  check("subtotal_tax", "Please enter valid subtotal tax").isNumeric(),
  check("shipping_tax", "Please enter valid shipping tax").isNumeric(),
  createOrder
);

// Read All
router.get("/order/all/", getAllOrders);

// Read One
router.get("/order/:orderId", getOrder);

// Update Status
router.put("/order/:orderId/status", updateOrderStatus);

// Update Order
router.put(
  "/order/:orderId",
  check("products", "Please place valid order").isArray({ min: 1 }),
  check("subtotal", "Please enter valid subtotal").isNumeric(),
  check("shipping_total", "Please enter valid shipping").isNumeric(),
  check("subtotal_tax", "Please enter valid subtotal tax").isNumeric(),
  check("shipping_tax", "Please enter valid shipping tax").isNumeric(),
  updateOrder
);

module.exports = router;
