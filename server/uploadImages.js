const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// קונפיגורציה
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folderPath = path.join(__dirname, 'photos');

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('בעיה בקריאת התיקייה:', err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    cloudinary.uploader.upload(
      filePath,
      {
        upload_preset: 'my_preset',
        folder: 'interior-gallery', // אופציונלי: לשים בתיקייה ב־Cloudinary
      },
      (error, result) => {
        if (error) {
          console.error('שגיאה בהעלאה:', error);
        } else {
          console.log(`✅ ${file} הועלה בהצלחה`);
          console.log('URL:', result.secure_url);
        }
      }
    );
  });
});
