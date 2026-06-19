const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/data/products.ts');
let content = fs.readFileSync(filePath, 'utf8');

const imageUpdates = {
  'prod_1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/800px-Tomato_je.jpg', // Tomato
  'prod_2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Solanum_melongena_24_08_2012_%281%29.JPG/800px-Solanum_melongena_24_08_2012_%281%29.JPG', // Brinjal
  'prod_3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Okra_pieces.jpg/800px-Okra_pieces.jpg', // Okra
  'prod_4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Green_Chilli_India.jpg/800px-Green_Chilli_India.jpg', // Green Chilli
  'prod_5': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lagenaria_siceraria_calabash.jpg/800px-Lagenaria_siceraria_calabash.jpg', // Bottle Gourd
  'prod_6': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Bitter_gourd.jpeg/800px-Bitter_gourd.jpeg', // Bitter Gourd
  'prod_7': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Luffa_acutangula.jpg/800px-Luffa_acutangula.jpg', // Ridge Gourd
  'prod_8': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Snake_gourd_1.jpg/800px-Snake_gourd_1.jpg', // Snake Gourd
  'prod_9': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Sponge_gourd.jpg/800px-Sponge_gourd.jpg', // Sponge Gourd
  'prod_10': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Ash_gourd_India.jpg/800px-Ash_gourd_India.jpg', // Ash Gourd
  'prod_11': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/French_beans.jpg/800px-French_beans.jpg', // Beans (Bush)
  'prod_12': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Phaseolus_vulgaris_seedpods.jpg/800px-Phaseolus_vulgaris_seedpods.jpg', // Beans (Pole)
  'prod_13': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cluster_beans.jpg/800px-Cluster_beans.jpg', // Cluster Beans
  'prod_14': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Cowpea_pods.jpg/800px-Cowpea_pods.jpg', // Cowpea
  'prod_15': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Carrots_at_a_market.jpg/800px-Carrots_at_a_market.jpg', // Carrot
  'prod_16': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Beetroot_2.jpg/800px-Beetroot_2.jpg', // Beetroot
  'prod_17': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/White_radish.jpg/800px-White_radish.jpg', // Radish (White)
  'prod_18': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Red_Radishes.jpg/800px-Red_Radishes.jpg', // Radish (Red)
  'prod_19': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Turnip_roots.jpg/800px-Turnip_roots.jpg', // Turnip
  'prod_20': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Red_Onion.jpg/800px-Red_Onion.jpg', // Onion
  'prod_21': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Cabbage_and_cross_section.jpg/800px-Cabbage_and_cross_section.jpg', // Cabbage
  'prod_22': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cauliflower.JPG/800px-Cauliflower.JPG', // Cauliflower
  'prod_23': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Broccoli_florets.jpg/800px-Broccoli_florets.jpg', // Broccoli
  'prod_24': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Capsicum_annuum_green_peppers.jpg/800px-Capsicum_annuum_green_peppers.jpg', // Capsicum (Green)
  'prod_25': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Red_bell_pepper.jpg/800px-Red_bell_pepper.jpg', // Capsicum (Red)
  'prod_26': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yellow_bell_pepper.jpg/800px-Yellow_bell_pepper.jpg', // Capsicum (Yellow)
  'prod_27': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Pumpkin_2007.jpg/800px-Pumpkin_2007.jpg', // Pumpkin
  'prod_28': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cucumber.jpg/800px-Cucumber.jpg', // Cucumber
  'prod_29': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Spinach_leaves.jpg/800px-Spinach_leaves.jpg', // Spinach (Palak)
  'prod_30': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Fenugreek_leaves.jpg/800px-Fenugreek_leaves.jpg', // Fenugreek (Methi)
  'prod_31': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Coriander_leaves.jpg/800px-Coriander_leaves.jpg', // Coriander (Dhania)
  'prod_32': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Amaranthus_viridis_leaves.jpg/800px-Amaranthus_viridis_leaves.jpg', // Amaranthus (Green)
  'prod_33': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Amaranthus_tricolor.jpg/800px-Amaranthus_tricolor.jpg', // Amaranthus (Red)
  'prod_34': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mint_leaves.jpg/800px-Mint_leaves.jpg' // Mint (Pudina)
};

// Regex to match "id": "prod_1", ... "image": "...", "hoverImage": "..."
for (const [id, newImageUrl] of Object.entries(imageUpdates)) {
  const hoverImageUrl = `/api/package-image?name=Vegetable&image=${encodeURIComponent(newImageUrl)}`;
  
  // Find the block for this product ID and replace the image and hoverImage
  const regex = new RegExp(`("id":\\s*"${id}"[\\s\\S]*?"image":\\s*")[^"]+("[\\s\\S]*?"hoverImage":\\s*")[^"]+(")`, 'g');
  content = content.replace(regex, `$1${newImageUrl}$2${hoverImageUrl}$3`);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated vegetable images in products.ts');
