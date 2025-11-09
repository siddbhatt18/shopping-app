// backend/models/Cart.js
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1, min: 1 },
    customization: {
      engraving: String,
      metalType: String,
      purity: String,
    },
    addedAt: { type: Date, default: Date.now }
  }],
  
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);