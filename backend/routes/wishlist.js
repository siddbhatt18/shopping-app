// backend/routes/wishlist.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get wishlist
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ supabaseId: req.params.userId })
      .populate('wishlist');
    
    res.json(user?.wishlist || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add to wishlist
router.post('/:userId/:productId', async (req, res) => {
  try {
    let user = await User.findOne({ supabaseId: req.params.userId });
    
    if (!user) {
      user = new User({ 
        supabaseId: req.params.userId,
        email: req.body.email 
      });
    }

    if (!user.wishlist.includes(req.params.productId)) {
      user.wishlist.push(req.params.productId);
      await user.save();
    }

    await user.populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Remove from wishlist
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const user = await User.findOne({ supabaseId: req.params.userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== req.params.productId
    );
    await user.save();
    await user.populate('wishlist');
    
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;