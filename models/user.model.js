const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'El campo username es requerido'],
    minLength: [3, 'el campo username debe de tener al menos 3 caracteres'],
    maxLength: [10, 'el campo username debe de tener como mucho 10 caracteres']
  },
  email: {
    type: String,
    match: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  password: String,
  active: Boolean,
  role: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
});

module.exports = mongoose.model('user', userSchema);