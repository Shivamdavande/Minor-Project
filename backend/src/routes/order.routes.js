const express = require("express");
const router = express.Router();

const { authUserMiddleware, authFoodPartnerMiddleware } = require("../middlewares/auth.middleware");

const {
  createOrder,
  getPartnerOrders,
  updateOrderStatus,
  getUserOrders
} = require("../controllers/order.controller");


// CREATE ORDER (User)
router.post("/create", authUserMiddleware, createOrder);

// GET ORDERS FOR USER
router.get("/user", authUserMiddleware, getUserOrders);

// GET ORDERS FOR PARTNER
router.get("/partner/me", authFoodPartnerMiddleware, getPartnerOrders);

// UPDATE ORDER STATUS (Partner)
router.put("/status/:id", authFoodPartnerMiddleware, updateOrderStatus);

module.exports = router;
