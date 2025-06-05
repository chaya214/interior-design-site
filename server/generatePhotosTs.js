// generatePhotosTs.js
const fs = require('fs');
const path = require('path');

const photosDir = path.join(__dirname, 'Photos');
const outputFile = path.join(__dirname, 'photos.ts');

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

function sanitizeFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function generate() {
  const files = fs.readdirSync(photosDir).filter(file => {
    return allowedExtensions.includes(path.extname(file).toLowerCase());
  });

  const renamedFiles = [];
  files.forEach((file, index) => {
    const ext = path.extname(file);
    const newFileName = `img${index + 1}${ext}`;
    const oldPath = path.join(photosDir, file);
    const newPath = path.join(photosDir, newFileName);
    fs.renameSync(oldPath, newPath);
    renamedFiles.push(newFileName);
  });

  let importLines = '';
  let exportLines = 'export const photos = {\n';

  renamedFiles.forEach((filename, index) => {
    const varName = `img${index + 1}`;
    importLines += `import ${varName} from './Photos/${filename}';\n`;
    exportLines += `  ${varName},\n`;
  });

  exportLines += '};\n';

  const result = importLines + '\n' + exportLines;

  fs.writeFileSync(outputFile, result);
  console.log('✅ photos.ts נוצר בהצלחה.');
}

generate();
