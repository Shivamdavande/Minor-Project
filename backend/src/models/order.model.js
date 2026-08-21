const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "foodpartner", required: true },
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
    qty: { type: Number, required: true },
    totalBill: { type: Number, required: true },
    address: { type: String, required: true },
    video: String,
    title: String,
    status: { type: String, enum: ["pending", "accepted", "rejected", "delivered"], default: "pending" },
    deliveryTime: { type: String }, // e.g. "30 mins", set when accepted
  },
  { timestamps: true }
);

// ✅ Export the model, not the schema
module.exports = mongoose.model("Order", orderSchema);
