// backend/routes/prices.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Cache for prices (update every 30 minutes)
let priceCache = {
  data: null,
  timestamp: null
};

const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

router.get('/live', async (req, res) => {
  try {
    // Check cache
    if (priceCache.data && priceCache.timestamp && 
        (Date.now() - priceCache.timestamp < CACHE_DURATION)) {
      return res.json(priceCache.data);
    }

    // Fetch from Gold API
    const response = await axios.get('https://www.goldapi.io/api/XAU/INR', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY
      }
    });

    const silverResponse = await axios.get('https://www.goldapi.io/api/XAG/INR', {
      headers: {
        'x-access-token': process.env.GOLD_API_KEY
      }
    });

    const prices = {
      gold: {
        '24K': Math.round(response.data.price_gram_24k),
        '22K': Math.round(response.data.price_gram_22k),
        '18K': Math.round(response.data.price_gram_18k),
        '14K': Math.round(response.data.price_gram_14k),
      },
      silver: {
        '925': Math.round(silverResponse.data.price_gram_24k * 0.925),
      },
      platinum: {
        'PT950': 3200 // Static, update manually or use another API
      },
      lastUpdated: new Date().toISOString(),
      change24h: response.data.ch_24h || 0
    };

    // Update cache
    priceCache = {
      data: prices,
      timestamp: Date.now()
    };

    res.json(prices);
  } catch (error) {
    console.error('Price API Error:', error.message);
    
    // Fallback prices if API fails
    const fallbackPrices = {
      gold: { '24K': 6200, '22K': 5700, '18K': 4650, '14K': 3625 },
      silver: { '925': 75 },
      platinum: { 'PT950': 3200 },
      lastUpdated: new Date().toISOString(),
      change24h: 0,
      isEstimated: true
    };
    
    res.json(fallbackPrices);
  }
});

// Calculate product price with current rates
router.post('/calculate', async (req, res) => {
  try {
    const { metalType, purity, weight, makingCharges = 0, stonePrice = 0 } = req.body;

    // Get current prices
    const pricesResponse = await axios.get(`http://localhost:${process.env.PORT || 5000}/api/prices/live`);
    const currentPrices = pricesResponse.data;

    let metalPricePerGram = 0;
    if (currentPrices[metalType] && currentPrices[metalType][purity]) {
      metalPricePerGram = currentPrices[metalType][purity];
    }

    const metalPrice = metalPricePerGram * weight;
    const subtotal = metalPrice + makingCharges + stonePrice;
    const gst = subtotal * 0.03; // 3% GST
    const total = subtotal + gst;

    res.json({
      metalPricePerGram,
      metalPrice,
      makingCharges,
      stonePrice,
      subtotal,
      gst,
      total,
      breakdown: {
        metalWeight: weight,
        metalType,
        purity,
        currentRate: metalPricePerGram
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;