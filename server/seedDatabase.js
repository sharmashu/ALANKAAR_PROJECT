import mongoose from 'mongoose';
import { seedProducts } from './data/sampleProducts.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// MongoDB connection string - replace with your actual connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alankaar_project';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Main seeding function
const main = async () => {
  try {
    console.log('🚀 Starting database seeding...');
    
    // Connect to database
    await connectDB();
    
    // Seed products
    await seedProducts();
    
    console.log('✅ Database seeding completed successfully!');
    console.log('📱 You can now view your products at: http://localhost:8080/products');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding script
main(); 