const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\SURYA\\.gemini\\antigravity\\brain\\296b1f20-567c-4fb5-bc38-865f36591c4a';
const destDir = path.join(__dirname, 'public', 'images', 'vegetables');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
  { id: 'prod_1', file: 'tomato_seeds_1781794123192.png', dest: 'tomato.png' },
  { id: 'prod_2', file: 'brinjal_seeds_1781794135113.png', dest: 'brinjal.png' },
  { id: 'prod_3', file: 'okra_seeds_1781794146420.png', dest: 'okra.png' },
  { id: 'prod_4', file: 'chilli_seeds_1781794157231.png', dest: 'chilli.png' },
  { id: 'prod_5', file: 'bottle_gourd_1781794168428.png', dest: 'bottle_gourd.png' },
  { id: 'prod_6', file: 'bitter_gourd_1781794180505.png', dest: 'bitter_gourd.png' },
  { id: 'prod_7', file: 'ridge_gourd_1781794194389.png', dest: 'ridge_gourd.png' },
  { id: 'prod_29', file: 'spinach_seeds_1781794204926.png', dest: 'spinach.png' }
];

let content = fs.readFileSync(path.join(__dirname, 'src/lib/data/products.ts'), 'utf8');

for (const map of mappings) {
  const srcFile = path.join(srcDir, map.file);
  const destFile = path.join(destDir, map.dest);
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    
    const newImageUrl = `/images/vegetables/${map.dest}`;
    const hoverImageUrl = `/api/package-image?name=Vegetable&image=${encodeURIComponent(newImageUrl)}`;
    
    // Replace in content
    const regex = new RegExp(`("id":\\s*"${map.id}"[\\s\\S]*?"image":\\s*")[^"]+("[\\s\\S]*?"hoverImage":\\s*")[^"]+(")`, 'g');
    content = content.replace(regex, `$1${newImageUrl}$2${hoverImageUrl}$3`);
  } else {
    console.warn(`File not found: ${srcFile}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'src/lib/data/products.ts'), content, 'utf8');
console.log('Successfully copied images and updated products.ts');
