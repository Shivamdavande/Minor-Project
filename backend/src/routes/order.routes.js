const express = require("express");
const router = express.Router();

const {
  createOrder,
  getPartnerOrders,
  updateOrderStatus
} = require("../controllers/order.controller");


// CREATE ORDER
router.post("/create", createOrder);

// GET ORDERS FOR PARTNER
router.get("/partner/:id", getPartnerOrders);

// UPDATE ORDER STATUS
router.put("/status/:id", updateOrderStatus);

module.exports = router;
