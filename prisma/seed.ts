import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleProducts = [
  // --- Electronics ---
  {
    title: "Aura Noise-Cancelling Wireless Headphones",
    description: "Industry-leading active noise cancellation with 40-hour battery life, spatial audio, and memory foam comfort earcups.",
    price: 299.99,
    category: "Electronics",
    sku: "ELC-NC-001",
    stockCount: 45,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Pulse Wireless Mechanical Keyboard",
    description: "Compact 75% layout with hot-swappable tactile switches, RGB per-key backlighting, and dual Bluetooth/2.4G connectivity.",
    price: 139.5,
    category: "Electronics",
    sku: "ELC-KB-002",
    stockCount: 62,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "StreamVision 4K Ultra HD Webcam",
    description: "Crisp 4K video capture at 60fps with dual noise-cancelling mics, autofocus, and physical privacy shutter.",
    price: 119.99,
    category: "Electronics",
    sku: "ELC-CAM-003",
    stockCount: 30,
    imageUrl: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "OmniSound Portable Waterproof Bluetooth Speaker",
    description: "360-degree room-filling acoustic sound with deep bass, IPX7 waterproof rating, and 24-hour continuous playtime.",
    price: 79.0,
    category: "Electronics",
    sku: "ELC-SPK-004",
    stockCount: 88,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "HyperCharge 100W GaN Fast Charger",
    description: "Ultra-compact 4-port fast desktop & travel charger capable of powering two laptops and two smartphones simultaneously.",
    price: 54.99,
    category: "Electronics",
    sku: "ELC-CHG-005",
    stockCount: 110,
    imageUrl: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ProPrecision Wireless Ergonomic Mouse",
    description: "Sculpted ergonomic design with silent optical switches, infinite scroll wheel, and high-precision 4000 DPI sensor.",
    price: 69.99,
    category: "Electronics",
    sku: "ELC-MOU-006",
    stockCount: 54,
    imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
  },

  // --- Apparel & Footwear ---
  {
    title: "Merino Wool Everyday Crewneck Sweater",
    description: "100% extra-fine merino wool providing natural temperature regulation, odor resistance, and silky next-to-skin softness.",
    price: 110.0,
    category: "Apparel",
    sku: "APP-SWT-001",
    stockCount: 38,
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "All-Weather Technical Commuter Parka",
    description: "Windproof and breathable 3-layer shell with taped seams, magnetic storm flap, and hidden fleece hand pockets.",
    price: 245.0,
    category: "Apparel",
    sku: "APP-JKT-002",
    stockCount: 22,
    imageUrl: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "CloudStride Performance Runners",
    description: "Responsive engineered mesh upper with dual-density foam midsoles for effortless daily runs and urban commuting.",
    price: 140.0,
    category: "Apparel",
    sku: "APP-SHO-003",
    stockCount: 50,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Heritage Heavyweight Boxy Tee",
    description: "Vintage-washed 260 GSM organic combed cotton t-shirt with reinforced double-stitch collar and relaxed drape.",
    price: 38.0,
    category: "Apparel",
    sku: "APP-TEE-004",
    stockCount: 140,
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "FlexForm 4-Way Stretch Chino Trousers",
    description: "Smart tailored silhouette with hidden zippered pocket, moisture-wicking weave, and crease-resistant fabric.",
    price: 88.0,
    category: "Apparel",
    sku: "APP-PNT-005",
    stockCount: 42,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Alpine Thermal Beanie",
    description: "Ribbed knit beanie made from recycled cashmere blend. Lightweight yet extremely insulating for chilly mornings.",
    price: 32.0,
    category: "Apparel",
    sku: "APP-HAT-006",
    stockCount: 75,
    imageUrl: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80",
  },

  // --- Home & Office ---
  {
    title: "Ergonomic Lumbar Task Chair",
    description: "Breathable self-adjusting mesh backrest, 4D adjustable armrests, and dynamic pneumatic height cylinder.",
    price: 389.0,
    category: "Home & Office",
    sku: "HMO-CHR-001",
    stockCount: 18,
    imageUrl: "https://images.unsplash.com/photo-1580481077198-444498305f63?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Minimalist Solid Walnut Desk Shelf",
    description: "Handcrafted American solid walnut monitor riser with integrated aluminum trays for pens, cables, and sticky notes.",
    price: 125.0,
    category: "Home & Office",
    sku: "HMO-DSK-002",
    stockCount: 29,
    imageUrl: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Lumina ScreenBar Eye-Care Desk Lamp",
    description: "Space-saving monitor-mounted task light with auto-dimming ambient sensor and zero screen glare technology.",
    price: 95.0,
    category: "Home & Office",
    sku: "HMO-LMP-003",
    stockCount: 47,
    imageUrl: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Barista Touch Pour-Over Kettle",
    description: "Gooseneck precision spout electric kettle with variable temperature dial and 60-minute keep-warm function.",
    price: 135.0,
    category: "Home & Office",
    sku: "HMO-KET-004",
    stockCount: 35,
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Artisan Ceramic Mug Set (Set of 4)",
    description: "Stoneware matte glazed artisan mugs, heat retentive, dishwasher-safe, hand-finished by master potters.",
    price: 48.0,
    category: "Home & Office",
    sku: "HMO-MUG-005",
    stockCount: 60,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Aromatherapy Ultrasonic Stone Diffuser",
    description: "Hand-poured porcelain cover ultrasonic mist diffuser with gentle warm ambient glow and automatic shut-off.",
    price: 65.0,
    category: "Home & Office",
    sku: "HMO-DIF-006",
    stockCount: 52,
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80",
  },

  // --- Fitness & Outdoors ---
  {
    title: "Apex HydroInsulated 32oz Water Bottle",
    description: "Double-wall vacuum insulation keeps drinks cold for 24 hours or piping hot for 12 hours. Leakproof chug cap included.",
    price: 36.0,
    category: "Fitness",
    sku: "FIT-BTL-001",
    stockCount: 120,
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "EcoGrip Natural Rubber Yoga Mat",
    description: "6mm dense non-slip natural tree rubber mat with laser-etched alignment guides for superior stability.",
    price: 78.0,
    category: "Fitness",
    sku: "FIT-YOG-002",
    stockCount: 40,
    imageUrl: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Velocity Adjustable Speed Jump Rope",
    description: "Dual ball-bearing rapid rotation system with coated steel cable and knurled non-slip aluminum handles.",
    price: 24.5,
    category: "Fitness",
    sku: "FIT-ROP-003",
    stockCount: 95,
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ThermaRecovery Deep Tissue Massage Gun",
    description: "Brushless motor delivering up to 3200 percussions per minute with 5 attachments and quiet glide technology.",
    price: 159.0,
    category: "Fitness",
    sku: "FIT-MSG-004",
    stockCount: 25,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "ProResistance 5-Piece Exercise Band Set",
    description: "100% natural latex stackable resistance bands with cushioned foam handles, door anchor, and travel pouch.",
    price: 29.99,
    category: "Fitness",
    sku: "FIT-BND-005",
    stockCount: 85,
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Nomad Ultralight Camp Chair",
    description: "Aircraft-grade aluminum frame packs down to 14 inches and weighs just 2 lbs while supporting up to 300 lbs.",
    price: 84.0,
    category: "Fitness",
    sku: "FIT-OUT-006",
    stockCount: 33,
    imageUrl: "https://images.unsplash.com/photo-1533240332313-0db49b459ad6?auto=format&fit=crop&w=800&q=80",
  },

  // --- Accessories & Everyday Carry ---
  {
    title: "Venture Water-Resistant Everyday Backpack (24L)",
    description: "Weatherproof recycled Cordura exterior, 16-inch fleece laptop sleeve, hidden passport pocket, and luggage pass-through.",
    price: 165.0,
    category: "Accessories",
    sku: "ACC-BPK-001",
    stockCount: 31,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Slim Bifold Leather Cardholder",
    description: "Handcrafted full-grain vegetable-tanned Italian leather with RFID blocking protection for up to 8 cards and folded cash.",
    price: 45.0,
    category: "Accessories",
    sku: "ACC-WLT-002",
    stockCount: 65,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Solaris Polarized Acetate Sunglasses",
    description: "Hand-polished cellulose acetate frames with scratch-resistant TAC polarized lenses providing 100% UVA/UVB protection.",
    price: 89.0,
    category: "Accessories",
    sku: "ACC-SGL-003",
    stockCount: 48,
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Chrono Classic Sapphire Automatic Watch",
    description: "Japanese automatic movement, scratch-proof sapphire crystal face, 5ATM water resistance, and interchangeable leather strap.",
    price: 285.0,
    category: "Accessories",
    sku: "ACC-WCH-004",
    stockCount: 19,
    imageUrl: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Modular Cord Organizer Roll",
    description: "Waxed canvas travel organizer with elastic loops and zippered mesh pockets for chargers, dongles, and styluses.",
    price: 28.0,
    category: "Accessories",
    sku: "ACC-ORG-005",
    stockCount: 77,
    imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Matte Titanium Key Carabiner Multi-Tool",
    description: "Grade 5 titanium ultra-light keychain with integrated bottle opener, pry edge, and box-cutter notch.",
    price: 22.0,
    category: "Accessories",
    sku: "ACC-KEY-006",
    stockCount: 104,
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  },
];

async function main() {
  console.log("Seeding database with realistic mock products...");

  // Clean existing products to make seed idempotent
  await prisma.product.deleteMany({});

  for (const product of sampleProducts) {
    await prisma.product.create({
      data: product,
    });
  }

  const count = await prisma.product.count();
  console.log(`Successfully seeded ${count} products.`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
