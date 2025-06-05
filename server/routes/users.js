

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// הרשמה
router.post('/', async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const username = userName; // ✅ תיקון כאן

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'שם המשתמש כבר קיים' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: 'נרשמת בהצלחה' });
  } catch (error) {
    console.error('שגיאה בהרשמה:', error);
    res.status(500).json({ success: false, message: 'שגיאה בשרת' });
  }
});

// התחברות
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;
    const username = userName; // ✅ תיקון גם כאן

    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ success: false, message: 'שם משתמש או סיסמה שגויים' });
    }

    res.json({ success: true, message: 'התחברת בהצלחה' });
  } catch (error) {
    console.error('שגיאה בהתחברות:', error);
    res.status(500).json({ success: false, message: 'שגיאה בשרת' });
  }
});

// הוספת מועדף למשתמש
router.post('/:username/favorites', async (req, res) => {
  const { username } = req.params;
  const { imageId } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'משתמש לא נמצא' });

    if (!user.favorites.includes(imageId)) {
      user.favorites.push(imageId);
      await user.save();
    }

    res.json({ success: true, message: 'נוסף למועדפים', favorites: user.favorites });
  } catch (err) {
    console.error('שגיאה בהוספת מועדף:', err);
    res.status(500).json({ success: false, message: 'שגיאה בשרת' });
  }
});

// קבלת רשימת מועדפים למשתמש
router.get('/:username/favorites', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'משתמש לא נמצא' });

    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    console.error('שגיאה בשליפת מועדפים:', err);
    res.status(500).json({ success: false, message: 'שגיאה בשרת' });
  }
});

// הסרת מועדף למשתמש
router.delete('/:username/favorites/:imageId', async (req, res) => {
  const { username, imageId } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ success: false, message: 'משתמש לא נמצא' });

    user.favorites = user.favorites.filter((id) => id !== imageId);
    await user.save();

    res.json({ success: true, message: 'הוסר מהמועדפים', favorites: user.favorites });
  } catch (err) {
    console.error('שגיאה בהסרת מועדף:', err);
    res.status(500).json({ success: false, message: 'שגיאה בשרת' });
  }
});



// קריאת כל המשתמשים (GET /all)
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // לא מחזיר סיסמאות
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'שגיאה בשרת' });
  }
});

// עדכון משתמש לפי ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'משתמש לא נמצא' });
    }
    res.json({ success: true, message: 'המשתמש עודכן', user: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: 'שגיאה בעדכון', error: err.message });
  }
});

// מחיקת משתמש לפי ID
// router.delete('/:password', async (req, res) => {
//     console.log("התחיל למחוק");

//   try {
//     console.log("התחיל למחוק");
    
//     const deletedUser = await User.findOneAndDelete({ password: req.params.password });
//     if (!deletedUser) {
//       return res.status(404).json({ success: false, message: 'משתמש לא נמצא' });
//     }
//     res.json({ success: true, message: 'המשתמש נמחק' });
//   } catch (err) { 
// console.log(err.message)
//     res.status(500).json({ success: false, message: 'שגיאה במחיקה', error: err.message });
//   }
// });

// // routes/users.js
// router.delete('/', async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     // חיפוש משתמש לפי שם משתמש וסיסמה
//     const deletedUser = await User.findOneAndDelete({ username, password });

//     if (!deletedUser) {
//       return res.status(404).json({ success: false, message: 'שם משתמש או סיסמה שגויים' });
//     }

//     res.json({ success: true, message: 'המשתמש נמחק בהצלחה' });
//   } catch (err) {
//     console.error('שגיאה במחיקת המשתמש:', err.message);
//     res.status(500).json({ success: false, message: 'שגיאה בשרת', error: err.message });
//   }
// });
// ב־routes/users.js
// router.delete('/', async (req, res) => {
//   try {
//     console.log("📥 בקשת מחיקה התקבלה:", req.body);
//     const { username, password } = req.body;

//     const deletedUser = await User.findOneAndDelete({ username, password });

//     if (!deletedUser) {
//       console.log("❌ לא נמצא משתמש למחיקה עם:", username, password);
//       return res.status(404).json({ success: false, message: 'שם משתמש או סיסמה שגויים' });
//     }

//     console.log("✅ המשתמש נמחק:", deletedUser.username);
//     res.json({ success: true, message: 'המשתמש נמחק בהצלחה' });
//   } catch (err) {
//     console.error('שגיאה במחיקת המשתמש:', err.message);
//     res.status(500).json({ success: false, message: 'שגיאה בשרת', error: err.message });
//   }
// });



// router.delete('/delete', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, password }); // ← תיקון כאן
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'משתמש לא נמצא או סיסמה שגויה' });
//     }

//     await User.deleteOne({ _id: user._id });
//     res.json({ success: true, message: 'המשתמש נמחק בהצלחה' });
//   } catch (err) {
//     console.error('שגיאה במחיקת משתמש:', err);
//     res.status(500).json({ success: false, message: 'שגיאת שרת' });
//   }
// });

router.delete('/delete', async (req, res) => {
  const { username, password } = req.query; // ← שים לב: query, לא body
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(404).json({ success: false, message: 'משתמש לא נמצא או סיסמה שגויה' });
    }

    await User.deleteOne({ _id: user._id });
    res.json({ success: true, message: 'המשתמש נמחק בהצלחה' });
  } catch (err) {
    console.error('שגיאה במחיקת משתמש:', err);
    res.status(500).json({ success: false, message: 'שגיאת שרת' });
  }
});

// קבלת כל המשתמשים
router.get('/all', async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // לא להחזיר סיסמאות
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'שגיאה בשרת', error: err.message });
  }
});

module.exports = router;
