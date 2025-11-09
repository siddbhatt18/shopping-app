// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  supabaseId: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  fullName: String,
  phone: String,
  
  addresses: [{
    label: String, // 'Home', 'Work', etc.
    fullName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean,
  }],
  
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);