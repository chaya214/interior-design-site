


const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

console.log(" images route loaded");

router.get('/', async (req, res) => {
  console.log("📸 קיבלנו בקשה ל־/api/images");
  try {
    const images = await Image.find();
    console.log("🧬 Images from MongoDB:", images);

    const formattedImages = images.map(img => ({
      id: img.id || img._id.toString(),
      title: img.title || '',
      room: img.room || '',
      styles: img.styles || [],
      imageUrl: img.url || img.imageUrl || '',
      imageUrl: url ,// 👈 הוספה קריטית — זה מה שחסר!

      designer: img.designer || ''
    }));

    formattedImages.forEach((img, i) => {
      if (!img.imageUrl) {
        console.warn(`⚠️ תמונה ${i} חסרה imageUrl`, img);
      }
    });

    console.log("📤 Sending images to frontend:", formattedImages.length);

    res.json(formattedImages);
  } catch (err) {
    console.error('❌ שגיאה בקבלת תמונות:', err);
    res.status(500).json({ message: 'שגיאה בקבלת התמונות' });
  }
});



//  יצירת תמונה חדשה (POST)
router.post('/', async (req, res) => {
  try {
    const newImage = new Image(req.body);
    await newImage.save();
    res.status(201).json({ success: true, image: newImage });
  } catch (err) {
    console.error('❌ שגיאה ביצירת תמונה:', err);
    res.status(400).json({ success: false, message: 'שגיאה ביצירת תמונה', error: err.message });
  }
});
//יצירת תמונה- רק למתכנת
async function createImage(data) {
  try {
    const newImage = new Image(data);
    await newImage.save();
    console.log('🖼️ תמונה חדשה נשמרה:', newImage);
    return newImage;
  } catch (err) {
    console.error('❌ שגיאה ביצירת תמונה:', err);
    throw err;
  }
}

//  עדכון תמונה לפי ID (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedImage) {
      return res.status(404).json({ success: false, message: 'תמונה לא נמצאה' });
    }
    res.json({ success: true, message: 'התמונה עודכנה', image: updatedImage });
  } catch (err) {
    console.error('❌ שגיאה בעדכון תמונה:', err);
    res.status(400).json({ success: false, message: 'שגיאה בעדכון', error: err.message });
  }
});

//  מחיקת תמונה לפי ID (DELETE)
async function deleteImageById(id) {
  try {
    const deleted = await Image.findByIdAndDelete(id);
    if (!deleted) {
      console.warn(`⚠️ תמונה עם מזהה ${id} לא נמצאה למחיקה`);
    } else {
      console.log(`🗑️ תמונה ${id} נמחקה בהצלחה`);
    }
  } catch (err) {
    console.error(`❌ שגיאה במחיקת תמונה ${id}:`, err);
  }
}
module.exports = router;
