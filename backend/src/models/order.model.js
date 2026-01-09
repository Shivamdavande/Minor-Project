const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodPartner", required: true },
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem", required: true },
    qty: { type: Number, required: true },
    totalBill: { type: Number, required: true },
    address: { type: String, required: true },
    video: String,
    title: String,
    status: { type: String, enum: ["pending", "accepted", "cancelled"], default: "pending" },
  },
  { timestamps: true }
);

// ✅ Export the model, not the schema
module.exports = mongoose.model("Order", orderSchema);
