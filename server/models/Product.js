import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: [0, 'Price cannot be negative']
  },
  description: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  features: [{ 
    type: String 
  }]
}, { timestamps: true });

export default mongoose.model('Product', productSchema); 