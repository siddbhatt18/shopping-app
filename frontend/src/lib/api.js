// src/lib/api.js
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const getProducts = (params) => api.get('/products', { params });
export const getProduct = (slug) => api.get(`/products/${slug}`);
export const getFeaturedProducts = () => api.get('/products/featured/list');

// Prices
export const getLivePrices = () => api.get('/prices/live');
export const calculatePrice = (data) => api.post('/prices/calculate', data);

// Cart
export const getCart = (userId) => api.get(`/cart/${userId}`);
export const addToCart = (data) => api.post('/cart', data);
export const updateCartItem = (userId, itemId, data) => 
  api.put(`/cart/${userId}/${itemId}`, data);
export const removeFromCart = (userId, itemId) => 
  api.delete(`/cart/${userId}/${itemId}`);
export const clearCart = (userId) => api.delete(`/cart/${userId}`);

// Orders
export const createOrder = (data) => api.post('/orders', data);
export const getUserOrders = (userId) => api.get(`/orders/user/${userId}`);
export const getOrder = (orderNumber) => api.get(`/orders/${orderNumber}`);

// Wishlist
export const getWishlist = (userId) => api.get(`/wishlist/${userId}`);
export const addToWishlist = (userId, productId, email) => 
  api.post(`/wishlist/${userId}/${productId}`, { email });
export const removeFromWishlist = (userId, productId) => 
  api.delete(`/wishlist/${userId}/${productId}`);

// Payment
export const createPaymentIntent = (data) => api.post('/payment/create-intent', data);
export const verifyPayment = (paymentIntentId) => 
  api.post('/payment/verify', { paymentIntentId });

// Admin
export const getAdminStats = () => api.get('/admin/stats');
export const createProduct = (data) => api.post('/admin/products', data);
export const updateProduct = (id, data) => api.put(`/admin/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/admin/products/${id}`);

export default api;