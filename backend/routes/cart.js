// backend/routes/cart.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate('items.productId');
    
    if (!cart) {
      return res.json({ items: [] });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to cart
router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity = 1, customization } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if product already in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
      if (customization) {
        cart.items[existingItemIndex].customization = customization;
      }
    } else {
      cart.items.push({ productId, quantity, customization });
    }

    await cart.save();
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update cart item
router.put('/:userId/:itemId', async (req, res) => {
  try {
    const { quantity, customization } = req.body;
    
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const item = cart.items.id(req.params.itemId);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    if (quantity) item.quantity = quantity;
    if (customization) item.customization = customization;

    await cart.save();
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from cart
router.delete('/:userId/:itemId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
    await cart.save();
    await cart.populate('items.productId');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Clear cart
router.delete('/:userId', async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.params.userId });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;