// backend/models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Supabase user ID
  orderNumber: { type: String, unique: true, required: true },
  
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number,
    customization: {
      engraving: String,
      metalType: String,
      purity: String,
    },
    image: String,
  }],
  
  pricing: {
    subtotal: Number,
    metalPrice: Number,
    makingCharges: Number,
    gst: Number,
    shipping: Number,
    total: Number,
    currentGoldRate: Number, // Store rate at time of order
    currentSilverRate: Number,
  },
  
  shippingAddress: {
    fullName: String,
    phone: String,
    email: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  
  payment: {
    method: { type: String, enum: ['card', 'upi', 'netbanking', 'emi'] },
    status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
    transactionId: String,
    stripePaymentIntentId: String,
    emiTenure: Number, // if EMI selected
  },
  
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  
  tracking: {
    carrier: String,
    trackingNumber: String,
    estimatedDelivery: Date,
  },
  
  notes: String,
  
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);