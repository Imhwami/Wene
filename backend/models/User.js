const mongoose = require('mongoose');

// Define the address schema
const addressSchema = new mongoose.Schema({
  address_details: { type: String},
  address_note: { type: String },
  city: { type: String },
  postal_code: { type: Number },
  phone_number: { type: Number },
});

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: { type: Object },
  addresses: [addressSchema],
  date: { type: Date, default: Date.now },
});

const User = mongoose.model('Users', userSchema);

module.exports = User;
