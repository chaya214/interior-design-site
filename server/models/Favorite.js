const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
