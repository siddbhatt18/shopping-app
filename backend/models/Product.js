// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['rings', 'necklaces', 'earrings', 'bracelets', 'pendants', 'bangles']
  },
  
  // Pricing
  basePrice: { type: Number, required: true },
  makingCharges: { type: Number, default: 0 },
  gst: { type: Number, default: 3 }, // GST percentage
  
  // Metal details
  metal: {
    type: { 
      type: String, 
      enum: ['gold', 'silver', 'platinum', 'diamond'],
      required: true 
    },
    purity: { 
      type: String, 
      enum: ['14K', '18K', '22K', '24K', '925', 'PT950'],
      required: true 
    },
    weight: { type: Number, required: true }, // in grams
  },
  
  // Stones (if any)
  stones: [{
    type: { type: String, enum: ['diamond', 'ruby', 'emerald', 'sapphire', 'none'] },
    carats: Number,
    quantity: Number,
    pricePerCarat: Number
  }],
  
  // Images
  images: [{ type: String }],
  mainImage: { type: String, required: true },
  
  // Inventory
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true, required: true },
  
  // Customization options
  allowCustomization: { type: Boolean, default: false },
  engravingAvailable: { type: Boolean, default: false },
  engravingPrice: { type: Number, default: 500 },
  
  // SEO
  slug: { type: String, unique: true, required: true },
  tags: [String],
  
  // Status
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  
  // Statistics
  views: { type: Number, default: 0 },
  sales: { type: Number, default: 0 },
  
}, { timestamps: true });

// Index for search
productSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Product', productSchema);