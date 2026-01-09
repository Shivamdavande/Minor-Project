const Order = require("../models/order.model");

exports.createOrder = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // <- log request
    const order = await Order.create({
      partnerId: req.body.partnerId,
      foodId: req.body.foodId,
      qty: req.body.qty,
      totalBill: req.body.totalBill,
      address: req.body.address,
      video: req.body.video,
      title: req.body.title,
    });
    console.log("Order Created:", order);
    res.json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error); // <- log full error
    res.status(500).json({ success: false, message: error.message });
  }
};



// 🟡 GET ALL ORDERS FOR ONE PARTNER
exports.getPartnerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ partnerId: req.params.id }).sort({
      createdAt: -1,
    });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching partner orders:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 🔵 UPDATE ORDER STATUS
exports.updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
