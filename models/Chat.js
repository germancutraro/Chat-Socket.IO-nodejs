const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  name: String,
  message: String
});

module.exports = mongoose.model('chat', chatSchema);
