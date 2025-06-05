const fs = require('fs');
const path = require('path');

// נתיב לתיקיית התמונות
const photosDir = path.join(__dirname, 'Photos');
// נתיב לקובץ הפלט
const outputPath = path.join(__dirname, 'photosData.json');

// סיומות מותרים
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

// קריאת שמות הקבצים מהתיקייה
const images = fs.readdirSync(photosDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return allowedExtensions.includes(ext);
});

// יצירת אובייקטי JSON תואמים למבנה הגלריה
const data = images.map((filename, index) => {
  const baseName = path.parse(filename).name;

  return {
    id: (index + 1).toString(),
    title: baseName.replace(/[-_]/g, ' '), // יוצר כותרת משם הקובץ
    description: '', // ניתן להשלים ידנית בהמשך או אוטומטית
    url: `https://res.cloudinary.com/dcjycwapj/image/upload/v1234567890/photos/${filename}`,
    category: '' // ניתן למלא ידנית לפי הצורך
  };
});

// כתיבה לקובץ JSON
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ נוצר בהצלחה photosData.json');
