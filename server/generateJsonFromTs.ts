// import fs from 'fs';

// // נתוני התמונות שלך
// import { images } from './data';
// import { photos } from './photos';

// // מחליף את המזהה של התמונה בשם הקובץ המקורי
// const imagesWithUrls = images.map((img) => ({
//   ...img,
//   imageUrl: photos[img.imageUrl.split('.')[1]], // למשל img3 => photos.img3
// }));

// fs.writeFileSync('images.json', JSON.stringify(imagesWithUrls, null, 2), 'utf-8');
// console.log('✅ images.json נוצר בהצלחה');



// generateJsonFromPhotos.ts
const fs = require('fs');
const path= require( 'path');

const photosDir = path.join(__dirname, 'Photos');
const outputPath = path.join(__dirname, 'photosData.json');

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

const images = fs.readdirSync(photosDir).filter(file => {
  const ext = path.extname(file).toLowerCase();
  return allowedExtensions.includes(ext);
});

const data = images.map((filename, index) => ({
  id: index + 1,
  filename: filename,
  path: `Photos/${filename}`,
}));

fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log('✅ נוצר בהצלחה photosData.json');
