const Order = require("../model/order");
const { validationResult } = require("express-validator");

exports.getOrderById = (req, res, next, id) => {
  //TODO: Populate products and maybe users
  Order.findById(id).exec((err, order) => {
    if (err) {
      return res.status(404).json({
        error: "No order found in DB",
      });
    }
    req.order = order;
    next();
  });
};

exports.createOrder = (req, res) => {
  // req.body.order.user = req.profile;
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.status(200).json(order);
  });
};

exports.getAllOrders = (req, res) => {
  //Populate Users and Products
  Order.find().exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: "No orders found in DB",
      });
    }
    res.status(200).json(orders);
  });
};

exports.getOrder = (req, res) => {
  res.status(200).json(req.order);
};

exports.updateOrderStatus = (req, res) => {
  Order.findByIdAndUpdate(
    { _id: req.order._id },
    { $set: { status: req.body.status } },
    { new: true, useFindAndModify: false },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.status(200).json(order);
    }
  );
};

exports.updateOrder = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ error: errors.array()[0].msg });
  Order.findByIdAndUpdate(
    { _id: req.order._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, updatedOrder) => {
      if (err || !updatedOrder)
        return res.status(400).json({ error: "Can not update order" });
      res.status(200).json(updatedOrder);
    }
  );
};
