import express from 'express';
import Order from '../models/Order.js';
import auth from '../middleware/auth.js';
import { sendOrderDetailsEmail } from '../utils/emailService.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find().populate('user products');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders for the logged-in user
router.get('/my', auth, async (req, res) => {
  try {
    const userId = req.user.email;
    const orders = await Order.find({ email: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user products');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create an order
router.post('/', auth, async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an order
router.put('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order
router.delete('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public endpoint to store order and send order details email
router.post('/send-order-email', async (req, res) => {
  try {
    const orderDetails = req.body;
    const orderNumber = uuidv4();
    // If user is authenticated, get userId from req.user (if available)
    let userId = undefined;
    if (req.user && req.user._id) {
      userId = req.user._id;
    } else if (orderDetails.userId) {
      userId = orderDetails.userId;
    }
    // Store order in DB
    const order = new Order({ ...orderDetails, orderNumber, userId });
    await order.save();
    // Send email after DB entry
    await sendOrderDetailsEmail({ ...orderDetails, orderNumber });
    res.status(200).json({ message: 'Order stored and email sent successfully', orderNumber });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 