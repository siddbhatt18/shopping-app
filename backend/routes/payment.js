// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-intent', async (req, res) => {
  try {
    const { amount, currency = 'inr', metadata } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to paisa
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const { paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;