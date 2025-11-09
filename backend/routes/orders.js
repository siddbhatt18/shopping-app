// backend/routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create order
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    
    // Generate order number
    const orderNumber = 'ORD' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    const order = new Order({
      ...orderData,
      orderNumber
    });

    await order.save();

    // Clear cart after order
    if (orderData.userId) {
      await Cart.findOneAndDelete({ userId: orderData.userId });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 })
      .populate('items.productId');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order
router.get('/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.productId');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status
router.patch('/:orderNumber/status', async (req, res) => {
  try {
    const { status, tracking } = req.body;
    
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (status) order.status = status;
    if (tracking) order.tracking = { ...order.tracking, ...tracking };

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;