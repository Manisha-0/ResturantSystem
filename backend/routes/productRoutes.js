// Import required modules
const express = require('express');
const router = express.Router();
const Cart = require('../models/cardModel');
const Product = require('../models/productModel');

// Route to get the cart
router.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.findOne().populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to add a product to the cart
router.post('/cart/add', async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const cartItem = { product: productId, quantity };
    const cart = await Cart.findOneAndUpdate({}, { $push: { items: cartItem } }, { new: true, upsert: true });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update a product quantity in the cart
router.patch('/cart/update/:productId', async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { 'items.product': productId },
      { $set: { 'items.$.quantity': quantity } },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to remove a product from the cart
router.delete('/cart/remove/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const cart = await Cart.findOneAndUpdate({}, { $pull: { items: { product: productId } } }, { new: true });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
