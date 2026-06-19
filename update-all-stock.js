const fs = require('fs');
const path = require('path');

// A robust dictionary of high-quality Wikimedia Commons images for each seed type
const imageMap = {
  // Vegetables (fixing the ones that weren't generated)
  'prod_14': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Spinach_leaves.jpg/800px-Spinach_leaves.jpg', // Spinach
  'prod_29': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Papaya_cross_section_BNC.jpg/800px-Papaya_cross_section_BNC.jpg', // Papaya

  // Flowers
  'prod_18': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Tagetes_erecta_Marigold.jpg/800px-Tagetes_erecta_Marigold.jpg', // Marigold
  'prod_19': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sunflower_sky_backdrop.jpg/800px-Sunflower_sky_backdrop.jpg', // Sunflower
  'prod_20': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Jasmine_Flower.jpg/800px-Jasmine_Flower.jpg', // Jasmine
  'prod_21': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Petunia_x_hybrida.jpg/800px-Petunia_x_hybrida.jpg', // Petunia
  'prod_22': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Zinnia_elegans_flower.jpg/800px-Zinnia_elegans_flower.jpg', // Zinnia
  'prod_23': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Dahlia_pinnata.jpg/800px-Dahlia_pinnata.jpg', // Dahlia
  'prod_24': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Cosmos_bipinnatus_-_pink.jpg/800px-Cosmos_bipinnatus_-_pink.jpg', // Cosmos
  'prod_25': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Calendula_officinalis_02.jpg/800px-Calendula_officinalis_02.jpg', // Calendula
  'prod_26': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Chrysanthemum_morifolium.jpg/800px-Chrysanthemum_morifolium.jpg', // Chrysanthemum

  // Fruits
  'prod_27': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Watermelon_cross_section.jpg/800px-Watermelon_cross_section.jpg', // Watermelon
  'prod_28': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cucumis_melo_var._cantalupo.jpg/800px-Cucumis_melo_var._cantalupo.jpg', // Muskmelon
  'prod_30': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Guava_cross_section.jpg/800px-Guava_cross_section.jpg', // Guava
  'prod_31': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Lemon.jpg/800px-Lemon.jpg', // Lemon
  'prod_32': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Orange-Whole-%26-Split.jpg/800px-Orange-Whole-%26-Split.jpg', // Orange
  'prod_33': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Pomegranate_open.jpg/800px-Pomegranate_open.jpg', // Pomegranate
  'prod_34': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Pitaya_cross_section.jpg/800px-Pitaya_cross_section.jpg', // Dragon Fruit
  'prod_35': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Passion_fruit.jpg/800px-Passion_fruit.jpg', // Passion Fruit
  'prod_36': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Strawberries.jpg/800px-Strawberries.jpg', // Strawberry

  // Roots & Tubers
  'prod_37': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/800px-Patates.jpg', // Potato
  'prod_38': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Sweet_potato.jpg/800px-Sweet_potato.jpg', // Sweet Potato
  'prod_39': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Ginger_Root.jpg/800px-Ginger_Root.jpg', // Ginger
  'prod_40': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Turmeric_rhizome.jpg/800px-Turmeric_rhizome.jpg', // Turmeric
  'prod_41': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Garlic.jpg/800px-Garlic.jpg', // Garlic
  'prod_42': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Onion_on_White.JPG/800px-Onion_on_White.JPG', // Onion
  'prod_43': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Yam_%28Dioscorea_alata%29_tubers.jpg/800px-Yam_%28Dioscorea_alata%29_tubers.jpg', // Yam
  'prod_44': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Maranta_arundinacea.jpg/800px-Maranta_arundinacea.jpg', // Arrowroot

  // Microgreens
  'prod_45': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Broccoli_sprouts.jpg/800px-Broccoli_sprouts.jpg', // Broccoli Microgreens
  'prod_46': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Sunflower_microgreens.jpg/800px-Sunflower_microgreens.jpg', // Sunflower Microgreens
  'prod_47': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mustard_sprouts.jpg/800px-Mustard_sprouts.jpg', // Mustard Microgreens
  'prod_48': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Radish_sprouts.jpg/800px-Radish_sprouts.jpg', // Radish Microgreens
  'prod_49': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Pea_shoots.jpg/800px-Pea_shoots.jpg', // Pea Shoots
  'prod_50': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Beet_microgreens.jpg/800px-Beet_microgreens.jpg', // Beetroot Microgreens
};

// Also apply a generic beautiful image for anything missing (Combo Packs, Pots, etc.)
const genericImages = {
  'combo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable_seeds_packets.jpg/800px-Vegetable_seeds_packets.jpg',
  'pots-planters': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Flower_pots_in_garden.jpg/800px-Flower_pots_in_garden.jpg',
  'grocery': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Assorted_spices_and_herbs.jpg/800px-Assorted_spices_and_herbs.jpg'
};

const filePath = path.join(__dirname, 'src/lib/data/products.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Parse the file to find categories and update
const lines = content.split('\n');
let currentId = '';
let currentCategory = '';
let count = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('"id":')) {
    currentId = line.split('"id":')[1].split('"')[1];
  }
  
  if (line.includes('"category":')) {
    currentCategory = line.split('"category":')[1].split('"')[1];
  }
  
  if (line.includes('"image":')) {
    let newImageUrl = null;
    
    // Check specific mapping
    if (imageMap[currentId]) {
      newImageUrl = imageMap[currentId];
    } else if (genericImages[currentCategory]) {
      // Check generic mapping
      newImageUrl = genericImages[currentCategory];
    } else if (!line.includes('/images/products/') && !line.includes('/images/vegetables/')) {
      // Give it a generic beautiful plant if it's still an Unsplash link that we want to replace
       newImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Planting_seeds.jpg/800px-Planting_seeds.jpg';
    }

    if (newImageUrl) {
      lines[i] = `    "image": "${newImageUrl}",`;
      
      // Update the hover image on the next line
      if (i + 1 < lines.length && lines[i+1].includes('"hoverImage":')) {
        const hoverImageUrl = `/api/package-image?name=Product&image=${encodeURIComponent(newImageUrl)}`;
        lines[i+1] = `    "hoverImage": "${hoverImageUrl}",`;
      }
      count++;
    }
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
console.log(`Successfully updated ${count} stock images across the catalog.`);
