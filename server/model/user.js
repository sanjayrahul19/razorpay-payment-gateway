const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
    time: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const payment = mongoose.model("users", paymentSchema);

module.exports = payment;
