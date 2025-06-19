import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { logger } from './config/winston.js';
import corsOptions from './config/cors.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import userRoutes from './routes/users.js';
import errorHandler from './middleware/error.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Log MongoDB URI (without sensitive data)
const mongoURI = process.env.MONGODB_URI;
if (!mongoURI) {
  logger.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}
logger.info('MongoDB URI is configured:', mongoURI.split('@')[1] || 'localhost connection');

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB with more detailed options
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
.then(() => {
  logger.info('Successfully connected to MongoDB');
  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  logger.error('MongoDB connection error details:', {
    name: error.name,
    message: error.message,
    code: error.code,
    stack: error.stack
  });
  process.exit(1);
}); 