// Import Mongoose
const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
