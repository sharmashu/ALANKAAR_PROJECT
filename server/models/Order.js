import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema); 