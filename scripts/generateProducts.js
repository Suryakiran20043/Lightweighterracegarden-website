const fs = require('fs');
const path = require('path');

const categories = {
  'vegetables': [
    'Tomato', 'Brinjal', 'Okra', 'Green Chilli', 'Bottle Gourd', 'Bitter Gourd', 
    'Ridge Gourd', 'Snake Gourd', 'Cucumber', 'Pumpkin', 'Carrot', 'Beetroot', 
    'Radish', 'Spinach', 'Fenugreek', 'Coriander'
  ],
  'flower-seeds': [
    'Rose', 'Marigold', 'Sunflower', 'Jasmine', 'Petunia', 'Zinnia', 'Dahlia', 
    'Cosmos', 'Calendula', 'Chrysanthemum'
  ],
  'fruits-seeds': [
    'Watermelon', 'Muskmelon', 'Papaya', 'Guava', 'Lemon', 'Orange', 'Pomegranate', 
    'Dragon Fruit', 'Passion Fruit', 'Strawberry'
  ],
  'roots-tubers': [
    'Potato', 'Sweet Potato', 'Ginger', 'Turmeric', 'Garlic', 'Onion', 'Yam', 'Arrowroot'
  ],
  'microgreens': [
    'Broccoli', 'Sunflower', 'Mustard', 'Radish', 'Pea Shoots', 'Beetroot', 'Fenugreek', 'Kale', 'Spinach', 'Wheatgrass'
  ],
  'pots-planters': [
    'Grow Bags', 'HDPE Grow Bags', 'Terracotta Pots', 'Ceramic Pots', 'Hanging Pots', 'Vertical Planters', 'Seedling Trays', 'Balcony Planters', 'Self Watering Pots'
  ],
  'grocery': [
    'Turmeric Powder', 'Red Chilli Powder', 'Coriander Powder', 'Curry Leaf Powder', 'Mango Pickle', 'Gongura Pickle', 'Lemon Pickle', 'Garlic Pickle', 'Murukulu', 'Chekkalu', 'Mixture', 'Banana Chips', 'Boondi Laddu', 'Ariselu', 'Mysore Pak'
  ]
};

const imageIds = [
  '1592924357228-91a4daadcfea', '1594008988647-797de1de3e15', '1618386365622-78094157355e',
  '1585320806297-9794b3e4eeae', '1416879595882-3373a0480b5b', '1474979266404-7eaacbcd87c5',
  '1587049352846-4a222e784d38', '1608571423902-eed4a5ad8108', '1607006342465-b771dfec3298',
  '1599599810769-bcde5a160d32', '1589984662646-e7b2e4962f18', '1615485290382-441e4d049cb5',
  '1595858000454-e69e2b101689', '1581451006509-f5d6880ee117', '1576403215286-932d2df795b3',
  '1587411768638-e6b359f1f0a1', '1592622765809-5a111a14eb25', '1601662998767-f5da1de3331b'
];

let imageCounter = 0;
const products = [];

Object.entries(categories).forEach(([catId, items]) => {
  items.forEach((item) => {
    let name = item;
    // Append 'Seeds' for seed categories if not already there
    if (['vegetables', 'microgreens', 'flower-seeds', 'fruits-seeds', 'roots-tubers'].includes(catId) && !name.toLowerCase().includes('seed')) {
      name = `${name} Seeds`;
    }
    
    const slug = item.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const basePrice = Math.floor(Math.random() * 200) + 50;
    const discount = Math.random() > 0.5 ? Math.floor(Math.random() * 30) + 10 : 0;
    const price = discount > 0 ? Math.floor(basePrice * (1 - discount/100)) : basePrice;

    // cycle through images
    const imgId = imageIds[imageCounter % imageIds.length];
    imageCounter++;
    const imageUrl = `https://images.unsplash.com/photo-${imgId}?auto=format&fit=crop&w=800&q=80`;

    products.push({
      id: `prod_${products.length + 1}`,
      productId: `pid_${products.length + 1}`,
      name: name,
      slug: slug,
      category: catId,
      price: price,
      originalPrice: basePrice,
      discount: discount,
      rating: Number((Math.random() * 1 + 4).toFixed(1)), // 4.0 to 5.0
      reviewsCount: Math.floor(Math.random() * 150) + 5,
      stock: Math.floor(Math.random() * 100) + 10,
      image: imageUrl,
      hoverImage: `/api/package-image?name=${encodeURIComponent(name)}&image=${encodeURIComponent(imageUrl)}`,
      sku: `${catId.substring(0,3).toUpperCase()}-${slug.substring(0,4).toUpperCase()}-${Math.floor(Math.random()*1000)}`,
      desc: `Premium quality ${name.toLowerCase()} sourced organically. Perfect for your terrace garden. High germination rates and excellent yield.`,
      isOrganic: catId !== 'pots-planters',
      isBestSeller: Math.random() > 0.8
    });
  });
});

const fileContent = `export interface Product {
  id: string;
  productId: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  image: string;
  hoverImage: string;
  sku: string;
  desc: string;
  isOrganic: boolean;
  isBestSeller: boolean;
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};
`;

fs.mkdirSync(path.join(__dirname, '../src/lib/data'), { recursive: true });
fs.writeFileSync(path.join(__dirname, '../src/lib/data/products.ts'), fileContent);
console.log('Products generated successfully!');
