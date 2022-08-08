const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  department: String,
  available: Boolean,
  created_at: Date
});

module.exports = mongoose.model('product', productSchema);