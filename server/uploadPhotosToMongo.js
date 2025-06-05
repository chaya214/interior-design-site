const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// סכימה חדשה לפי המבנה של photosData.json
const photoSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  url: String,
  category: String,
});

const Photo = mongoose.model('Photo', photoSchema);

async function uploadPhotosToMongo() {
  try {
    // התחברות ל־MongoDB
    await mongoose.connect('mongodb+srv://Shifra_efrat_chaya:8Wi2bPnpi9rsE4w7@cluster0.7y9rlcp.mongodb.net/Interior_design_inspiration_site?retryWrites=true&w=majority&appName=Cluster0');

    console.log('🟢 מחובר ל-MongoDB');

    // מחיקת כל הנתונים הקיימים באוסף photos
    await Photo.deleteMany({});
    console.log('🗑️ כל הנתונים הישנים נמחקו');

    // קריאת הקובץ photosData.json
    const dataPath = path.join(__dirname, 'photosData.json');
    const photos = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // הכנסת הנתונים למונגו
    await Photo.insertMany(photos);
    console.log('✅ כל התמונות החדשות נשמרו ל-MongoDB בהצלחה!');

    // ניתוק מהמסד
    await mongoose.disconnect();
    console.log('🔌 נותק מהמסד');
  } catch (err) {
    console.error('❌ שגיאה בהעלאה ל-MongoDB:', err);
  }
}

uploadPhotosToMongo();
