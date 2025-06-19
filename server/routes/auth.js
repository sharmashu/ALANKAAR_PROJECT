import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { logger } from '../config/winston.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    logger.info('Received registration request with body:', {
      email: req.body.email,
      name: req.body.name,
      hasPassword: !!req.body.password,
      headers: req.headers
    });
    
    const { name, email, password } = req.body;
    
    // Check if user already exists
    logger.info('Checking for existing user...');
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Registration failed: Email already exists', { email });
      return res.status(400).json({ error: 'Email is already registered' });
    }
    logger.info('No existing user found with this email');

    // Validate required fields
    if (!name || !email || !password) {
      logger.warn('Registration failed: Missing required fields', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasPassword: !!password 
      });
      return res.status(400).json({ error: 'All fields are required' });
    }
    logger.info('All required fields are present');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      logger.warn('Registration failed: Invalid email format', { email });
      return res.status(400).json({ error: 'Invalid email format' });
    }
    logger.info('Email format is valid');

    // Validate password strength
    if (password.length < 6) {
      logger.warn('Registration failed: Password too short');
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    logger.info('Password meets minimum length requirement');

    logger.info('Creating new user...');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    
    logger.info('Attempting to save user to database...');
    try {
      const savedUser = await user.save();
      logger.info('User saved successfully:', { 
        userId: savedUser._id,
        email: savedUser.email,
        name: savedUser.name
      });
      
      logger.info('Generating JWT token...');
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      logger.info('Sending successful response...');
      res.status(201).json({ user: savedUser, token });
    } catch (dbError) {
      logger.error('Database error while saving user:', {
        error: dbError.message,
        code: dbError.code,
        name: dbError.name
      });
      throw dbError;
    }
  } catch (error) {
    logger.error('Registration error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; 