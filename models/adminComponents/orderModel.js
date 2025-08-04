const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: [{
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
  }],
  amount: Number,
  razorpayPaymentId: String,
  razorpayOrderId: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', orderSchema);
