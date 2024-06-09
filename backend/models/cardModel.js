// Import Mongoose
const mongoose = require('mongoose');

// Define cart item schema
const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// Define cart schema
const cartSchema = new mongoose.Schema({

  items: [cartItemSchema],
  totalCost: {
    type: Number,
    required: true
  }
});

// Create Cart model
module.exports  = mongoose.model('Cart', cartSchema);


