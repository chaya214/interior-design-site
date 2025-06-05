 const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
//   id: String,
//   title: String,
//   description: String,
//   imageUrl: String,
//   room: String,
//   styles: [String],
//   designer: String,
//   featured: Boolean,
// });
const imageSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  imageUrl: String,
  url: String, // 👈 הוסיפי את זה כאן!
  room: String,
  styles: [String],
  designer: String,
  featured: Boolean,
});
console.log("🧬 Image schema loaded"); // לבדוק שהמודול נטען


 module.exports = mongoose.model('Image', imageSchema,"photos");
