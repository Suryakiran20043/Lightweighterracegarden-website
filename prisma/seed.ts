import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing records
  await prisma.review.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 2. Create Core Categories
  const seeds = await prisma.category.create({
    data: {
      name: 'Terrace Seeds',
      slug: 'seeds',
      description: 'High germination, organic seeds optimized for home balconies and terrace setups.',
    },
  });

  const fertilizers = await prisma.category.create({
    data: {
      name: 'Lightweight Growing Essentials',
      slug: 'fertilizers',
      description: 'Coco peat, organic vermicompost, perlite mixes and vertical grow bags.',
    },
  });

  const grocery = await prisma.category.create({
    data: {
      name: 'Traditional Pantry',
      slug: 'grocery',
      description: 'Cold-pressed Ghani oils, wild honey, heritage grains and native sweeteners.',
    },
  });

  const care = await prisma.category.create({
    data: {
      name: 'Ayurvedic Personal Care',
      slug: 'care',
      description: 'Chemical-free herbal hair oils, neem cleansers, and handmade turmeric soaps.',
    },
  });

  // 3. Create Products, Variants & Inventories
  // Product 1
  const tomato = await prisma.product.create({
    data: {
      name: 'Premium Cherry Tomato Seeds',
      slug: 'cherry-tomato-seeds',
      description: 'Easy-to-grow, high-yield sweet cherry tomato seeds. Ideal for lightweight grow bags on balconies.',
      categoryId: seeds.id,
      basePrice: 99.0,
      images: ['https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80'],
      isFeatured: true,
      status: 'ACTIVE',
    },
  });

  const tomatoVariant = await prisma.productVariant.create({
    data: {
      productId: tomato.id,
      name: 'Standard Pack (50 seeds)',
      price: 99.0,
      sku: 'SEED-TOM-CHY',
    },
  });

  await prisma.inventory.create({
    data: {
      variantId: tomatoVariant.id,
      stock: 150,
      lowStockAlertLimit: 10,
    },
  });

  // Product 2
  const soil = await prisma.product.create({
    data: {
      name: 'Lightweight Premium Potting Soil',
      slug: 'lightweight-potting-soil',
      description: 'Enriched with organic compost, coco-peat, and perlite. Weighs 60% less than normal garden soil.',
      categoryId: fertilizers.id,
      basePrice: 399.0,
      images: ['https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80'],
      isFeatured: true,
      status: 'ACTIVE',
    },
  });

  const soilVariant = await prisma.productVariant.create({
    data: {
      productId: soil.id,
      name: '5 kg Crate bag',
      price: 399.0,
      sku: 'SOIL-LT-5KG',
    },
  });

  await prisma.inventory.create({
    data: {
      variantId: soilVariant.id,
      stock: 80,
      lowStockAlertLimit: 5,
    },
  });

  // Product 3
  const honey = await prisma.product.create({
    data: {
      name: 'Organic Wild Forest Honey',
      slug: 'wild-forest-honey',
      description: 'Raw and unfiltered honey sourced from tribal forests. A natural sweetener packed with minerals.',
      categoryId: grocery.id,
      basePrice: 380.0,
      images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80'],
      isFeatured: true,
      status: 'ACTIVE',
    },
  });

  const honeyVariant = await prisma.productVariant.create({
    data: {
      productId: honey.id,
      name: '500g Jar',
      price: 380.0,
      sku: 'HONEY-WLD-500',
    },
  });

  await prisma.inventory.create({
    data: {
      variantId: honeyVariant.id,
      stock: 45,
      lowStockAlertLimit: 5,
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
