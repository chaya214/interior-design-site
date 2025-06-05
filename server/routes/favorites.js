const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// קבלת כל המועדפים של משתמש
router.get('/:userName', async (req, res) => {
  try {
    const { userName } = req.params;
    const favorites = await Favorite.find({ userName });
    const imageIds = favorites.map(f => f.imageId);
    res.json(imageIds);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בקבלת מועדפים' });
  }
});

// הוספת מועדף
router.post('/', async (req, res) => {
  try {
    const { userName, imageId } = req.body;
    const exists = await Favorite.findOne({ userName, imageId });
    if (exists) return res.status(400).json({ error: 'כבר קיים במועדפים' });

    const fav = new Favorite({ userName, imageId });
    await fav.save();
    res.status(201).json(fav);
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בהוספת מועדף' });
  }
});

// מחיקת מועדף
router.delete('/', async (req, res) => {
  try {
    const { userName, imageId } = req.body;
    const result = await Favorite.findOneAndDelete({ userName, imageId });
    if (!result) return res.status(404).json({ error: 'מועדף לא נמצא' });

    res.json({ message: 'נמחק בהצלחה' });
  } catch (err) {
    res.status(500).json({ error: 'שגיאה במחיקת מועדף' });
  }
});

module.exports = router;
