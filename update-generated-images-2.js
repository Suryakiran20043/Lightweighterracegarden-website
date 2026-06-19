const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\SURYA\\.gemini\\antigravity\\brain\\296b1f20-567c-4fb5-bc38-865f36591c4a';
const destDir = path.join(__dirname, 'public', 'images', 'products');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
  { id: 'prod_8', file: 'snake_gourd_1781794446751.png', dest: 'snake_gourd.png' },
  { id: 'prod_9', file: 'cucumber_1781794458453.png', dest: 'cucumber.png' },
  { id: 'prod_10', file: 'pumpkin_1781794469600.png', dest: 'pumpkin.png' },
  { id: 'prod_11', file: 'carrot_1781794482072.png', dest: 'carrot.png' },
  { id: 'prod_12', file: 'beetroot_1781794492796.png', dest: 'beetroot.png' },
  { id: 'prod_13', file: 'radish_1781794504769.png', dest: 'radish.png' },
  { id: 'prod_15', file: 'fenugreek_1781794516222.png', dest: 'fenugreek.png' },
  { id: 'prod_16', file: 'coriander_1781794528294.png', dest: 'coriander.png' },
  { id: 'prod_17', file: 'rose_1781794541019.png', dest: 'rose.png' }
];

let content = fs.readFileSync(path.join(__dirname, 'src/lib/data/products.ts'), 'utf8');

for (const map of mappings) {
  const srcFile = path.join(srcDir, map.file);
  const destFile = path.join(destDir, map.dest);
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
    
    const newImageUrl = `/images/products/${map.dest}`;
    const hoverImageUrl = `/api/package-image?name=Product&image=${encodeURIComponent(newImageUrl)}`;
    
    // Replace in content
    const regex = new RegExp(`("id":\\s*"${map.id}"[\\s\\S]*?"image":\\s*")[^"]+("[\\s\\S]*?"hoverImage":\\s*")[^"]+(")`, 'g');
    content = content.replace(regex, `$1${newImageUrl}$2${hoverImageUrl}$3`);
  } else {
    console.warn(`File not found: ${srcFile}`);
  }
}

fs.writeFileSync(path.join(__dirname, 'src/lib/data/products.ts'), content, 'utf8');
console.log('Successfully copied additional generated images and updated products.ts');
