import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const products = [
  {
    name: 'Halcyon Linen Shirt',
    tagline: 'Breathable, unbothered, everyday.',
    description: 'A relaxed-fit linen shirt cut for warm days and slow mornings. Garment-dyed for a soft, lived-in feel.',
    price: 58,
    compareAtPrice: 72,
    category: 'Apparel',
    tags: ['linen', 'shirt', 'summer'],
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800',
    stock: 24,
    sku: 'VM-APP-001'
  },
  {
    name: 'Nomad Canvas Tote',
    tagline: 'One bag, every errand.',
    description: 'Heavyweight 16oz canvas tote with a reinforced base and leather straps built to carry groceries or laptops alike.',
    price: 42,
    category: 'Accessories',
    tags: ['bag', 'canvas', 'everyday-carry'],
    image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800',
    stock: 40,
    sku: 'VM-ACC-002'
  },
  {
    name: 'Orbit Ceramic Mug',
    tagline: 'Your coffee, elevated.',
    description: 'Hand-thrown stoneware mug with a matte glaze finish. Microwave and dishwasher safe, holds 12oz.',
    price: 22,
    category: 'Home',
    tags: ['ceramic', 'kitchen', 'coffee'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800',
    stock: 60,
    sku: 'VM-HOM-003'
  },
  {
    name: 'Drift Wool Throw',
    tagline: 'Softness for the long nights.',
    description: 'A generously sized recycled-wool throw blanket, woven in a herringbone pattern. Adds warmth to any room.',
    price: 89,
    compareAtPrice: 110,
    category: 'Home',
    tags: ['blanket', 'wool', 'cozy'],
    image: 'https://loremflickr.com/800/600/wool,blanket,throw',
    stock: 15,
    sku: 'VM-HOM-004'
  },
  {
    name: 'Meridian Leather Wallet',
    tagline: 'Slim by design.',
    description: 'Full-grain leather bifold wallet with six card slots and a slip pocket. Ages beautifully with use.',
    price: 65,
    category: 'Accessories',
    tags: ['leather', 'wallet'],
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    stock: 32,
    sku: 'VM-ACC-005'
  },
  {
    name: 'Solace Candle — Cedar & Fig',
    tagline: 'Light one, breathe out.',
    description: 'Hand-poured soy candle with a 45-hour burn time. Notes of cedarwood, fig leaf, and warm amber.',
    price: 28,
    category: 'Home',
    tags: ['candle', 'fragrance'],
    image: 'https://loremflickr.com/800/600/candle,cedar',
    stock: 50,
    sku: 'VM-HOM-006'
  },
  {
    name: 'Trail Ridge Sneakers',
    tagline: 'Built for pavement and everything past it.',
    description: 'Lightweight everyday sneakers with a recycled-foam midsole and a durable rubber outsole.',
    price: 96,
    category: 'Footwear',
    tags: ['sneakers', 'shoes'],
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
    stock: 18,
    sku: 'VM-FTW-007'
  },
  {
    name: 'Quiet Hours Notebook',
    tagline: 'For the thoughts worth keeping.',
    description: 'A5 dot-grid notebook with a debossed cover, 160 pages of 100gsm paper that resists ink bleed.',
    price: 19,
    category: 'Stationery',
    tags: ['notebook', 'paper'],
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800',
    stock: 70,
    sku: 'VM-STA-008'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected. Seeding products...');

  await Product.deleteMany({});
  await Product.insertMany(products);

  console.log(`Seeded ${products.length} products.`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
