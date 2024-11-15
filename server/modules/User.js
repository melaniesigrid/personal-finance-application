// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  // You can add additional user fields as needed
});

module.exports = mongoose.model('User', userSchema);
