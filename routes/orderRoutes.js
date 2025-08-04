const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const Order = require('../models/adminComponents/orderModel');
  const { cartItems, amount, razorpayPaymentId, razorpayOrderId } = req.body;

  try {
    const order = new Order({ cartItems, amount, razorpayPaymentId, razorpayOrderId });
    await order.save();
    res.status(201).json({ message: 'Order saved successfully!' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order saving failed' });
  }
});
