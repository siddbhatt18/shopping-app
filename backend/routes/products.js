// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { 
      category, 
      metal, 
      minPrice, 
      maxPrice, 
      purity, 
      sort,
      search,
      page = 1,
      limit = 12 
    } = req.query;

    let query = { isActive: true };

    // Filters
    if (category) query.category = category;
    if (metal) query['metal.type'] = metal;
    if (purity) query['metal.purity'] = purity;
    if (minPrice || maxPrice) {
      query.basePrice = {};
      if (minPrice) query.basePrice.$gte = Number(minPrice);
      if (maxPrice) query.basePrice.$lte = Number(maxPrice);
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Sort
    let sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { basePrice: 1 };
    if (sort === 'price-high') sortOption = { basePrice: -1 };
    if (sort === 'popular') sortOption = { sales: -1 };

    const products = await Product.find(query)
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Increment views
    product.views += 1;
    await product.save();
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true, isFeatured: true })
      .limit(8)
      .sort({ sales: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;