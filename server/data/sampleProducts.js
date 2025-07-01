import Product from '../models/Product.js';

const sampleProducts = [
  {
    id: "PROD001",
    name: "Wireless Bluetooth Headphones",
    price: 89.99,
    description: "Premium wireless headphones with noise cancellation technology, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals alike.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500"
    ],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone",
      "Foldable design"
    ]
  },
  {
    id: "PROD002",
    name: "Smart Fitness Watch",
    price: 199.99,
    description: "Advanced fitness tracking watch with heart rate monitoring, GPS, sleep tracking, and water resistance. Compatible with iOS and Android devices.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500"
    ],
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Sleep analysis",
      "Water resistant (50m)",
      "7-day battery life"
    ]
  },
  {
    id: "PROD003",
    name: "Organic Cotton T-Shirt",
    price: 24.99,
    description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors. Perfect for everyday wear with a relaxed fit and soft texture.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500"
    ],
    features: [
      "100% organic cotton",
      "Multiple colors available",
      "Relaxed fit",
      "Machine washable",
      "Sustainable production"
    ]
  },
  {
    id: "PROD004",
    name: "Stainless Steel Water Bottle",
    price: 34.99,
    description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and perfect for outdoor activities.",
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500"
    ],
    features: [
      "24-hour cold retention",
      "12-hour hot retention",
      "BPA-free",
      "Leak-proof design",
      "32oz capacity"
    ]
  },
  {
    id: "PROD005",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    description: "Compact and powerful portable speaker with 360-degree sound, waterproof design, and 20-hour battery life. Perfect for outdoor gatherings and travel.",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500"
    ],
    features: [
      "360-degree sound",
      "IPX7 waterproof",
      "20-hour battery life",
      "Bluetooth 5.0",
      "Built-in microphone"
    ]
  },
  {
    id: "PROD006",
    name: "Ceramic Coffee Mug Set",
    price: 29.99,
    description: "Beautiful handcrafted ceramic coffee mug set with 4 mugs, perfect for home or office use. Microwave and dishwasher safe with elegant design.",
    images: [
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500"
    ],
    features: [
      "Set of 4 mugs",
      "Microwave safe",
      "Dishwasher safe",
      "Handcrafted ceramic",
      "12oz capacity each"
    ]
  },
  {
    id: "PROD007",
    name: "Wireless Charging Pad",
    price: 49.99,
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Features LED indicator, non-slip base, and efficient charging technology.",
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500",
      "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=500"
    ],
    features: [
      "Qi wireless charging",
      "10W fast charging",
      "LED indicator",
      "Non-slip base",
      "Universal compatibility"
    ]
  },
  {
    id: "PROD008",
    name: "Yoga Mat Premium",
    price: 64.99,
    description: "High-quality yoga mat made from eco-friendly materials with excellent grip and cushioning. Perfect for yoga, pilates, and fitness activities.",
    images: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=500"
    ],
    features: [
      "Eco-friendly materials",
      "Non-slip surface",
      "6mm thickness",
      "72\" x 24\" size",
      "Includes carrying strap"
    ]
  },
  {
    id: "PROD009",
    name: "Smart LED Desk Lamp",
    price: 89.99,
    description: "Modern smart desk lamp with adjustable brightness, color temperature, and app control. Features USB charging port and memory function.",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500"
    ],
    features: [
      "Adjustable brightness",
      "Color temperature control",
      "Smart app control",
      "USB charging port",
      "Memory function"
    ]
  },
  {
    id: "PROD010",
    name: "Leather Wallet Minimalist",
    price: 44.99,
    description: "Slim and elegant leather wallet with RFID protection and multiple card slots. Handcrafted from genuine leather with precise stitching.",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500"
    ],
    features: [
      "Genuine leather",
      "RFID protection",
      "6 card slots",
      "2 bill compartments",
      "Slim design"
    ]
  },
  {
    id: "PROD011",
    name: "Digital Kitchen Scale",
    price: 39.99,
    description: "Precise digital kitchen scale with tare function, multiple units, and easy-to-read LCD display. Perfect for cooking and baking needs.",
    images: [
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
    ],
    features: [
      "11lb capacity",
      "0.1oz precision",
      "Tare function",
      "Multiple units",
      "Auto-off feature"
    ]
  },
  {
    id: "PROD012",
    name: "Aromatherapy Diffuser",
    price: 54.99,
    description: "Ultrasonic aromatherapy diffuser with LED mood lighting and timer settings. Creates a relaxing atmosphere with essential oils.",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500",
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500"
    ],
    features: [
      "300ml capacity",
      "LED mood lighting",
      "Timer settings",
      "Auto-shutoff",
      "Whisper-quiet operation"
    ]
  },
  {
    id: "PROD013",
    name: "Portable Power Bank",
    price: 69.99,
    description: "High-capacity portable power bank with fast charging technology and multiple USB ports. Perfect for charging phones, tablets, and other devices on the go.",
    images: [
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500",
      "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=500"
    ],
    features: [
      "20,000mAh capacity",
      "Fast charging",
      "Multiple USB ports",
      "LED power indicator",
      "Compact design"
    ]
  },
  {
    id: "PROD014",
    name: "Bamboo Cutting Board Set",
    price: 49.99,
    description: "Premium bamboo cutting board set with 3 different sizes. Natural antibacterial properties and reversible design for versatile use.",
    images: [
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500"
    ],
    features: [
      "Set of 3 boards",
      "Natural bamboo",
      "Antibacterial properties",
      "Reversible design",
      "Dishwasher safe"
    ]
  },
  {
    id: "PROD015",
    name: "Wireless Gaming Mouse",
    price: 119.99,
    description: "High-performance wireless gaming mouse with customizable RGB lighting, programmable buttons, and ultra-precise sensor for competitive gaming.",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
      "https://images.unsplash.com/photo-1605773527852-c546a8584ea3?w=500"
    ],
    features: [
      "25K DPI sensor",
      "RGB lighting",
      "Programmable buttons",
      "70-hour battery life",
      "Ultra-lightweight design"
    ]
  }
];

// Function to seed the database
export const seedProducts = async () => {
  try {
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    
    console.log(`Successfully seeded ${insertedProducts.length} products`);
    return insertedProducts;
  } catch (error) {
    console.error('Error seeding products:', error);
    throw error;
  }
};

// Function to get sample products without inserting
export const getSampleProducts = () => {
  return sampleProducts;
};

export default sampleProducts; 