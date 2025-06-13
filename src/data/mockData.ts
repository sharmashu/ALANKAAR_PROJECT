
export const categories = [
  { id: 'wall-posters', name: 'Wall Posters', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=300&fit=crop' },
  { id: 'frames', name: 'Frames', image: 'https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=300&h=300&fit=crop' },
  { id: 'neon-signs', name: 'Neon Signs', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop' },
  { id: 'custom-prints', name: 'Custom Prints', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=300&fit=crop' },
];

export const featuredProducts = [
  {
    id: '1',
    name: 'Abstract Art Collection | 3 Piece Set',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop',
    category: 'wall-posters',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Modern Minimalist Frame Set',
    price: 199,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'frames',
    rating: 4.6,
  },
  {
    id: '3',
    name: 'Custom LED Name Sign',
    price: 599,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    category: 'neon-signs',
    rating: 4.9,
  },
  {
    id: '4',
    name: 'Vintage Car Poster Set',
    price: 199,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop',
    category: 'wall-posters',
    rating: 4.7,
  },
  {
    id: '5',
    name: 'Nature Photography Print',
    price: 149,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop',
    category: 'wall-posters',
    rating: 4.5,
  },
  {
    id: '6',
    name: 'Neon Coffee Sign',
    price: 399,
    image: 'https://images.unsplash.com/photo-1509803874385-db7c23652552?w=400&h=400&fit=crop',
    category: 'neon-signs',
    rating: 4.8,
  },
];

export const allProducts = [
  ...featuredProducts,
  {
    id: '7',
    name: 'Botanical Print Series',
    price: 179,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
    category: 'wall-posters',
    rating: 4.4,
  },
  {
    id: '8',
    name: 'Gold Metal Frame',
    price: 89,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'frames',
    rating: 4.3,
  },
  {
    id: '9',
    name: 'Custom Family Portrait',
    price: 349,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    category: 'custom-prints',
    rating: 4.9,
  },
  {
    id: '10',
    name: 'Gaming Zone LED Strip',
    price: 799,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
    category: 'neon-signs',
    rating: 4.7,
  },
];

export const neonLedProducts = [
  {
    id: 'neon-1',
    name: 'Custom Text Neon Sign',
    price: 699,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=400&fit=crop',
    description: 'Personalized neon sign with your custom text. Available in multiple colors.',
    features: ['Custom text', 'Multiple colors', 'Remote control', 'Energy efficient'],
  },
  {
    id: 'neon-2',
    name: 'LED Strip Lighting Kit',
    price: 299,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop',
    description: 'Smart LED strip kit perfect for gaming setups and ambient lighting.',
    features: ['App controlled', 'Music sync', '16 million colors', 'Easy installation'],
  },
  {
    id: 'neon-3',
    name: 'Business Logo Sign',
    price: 999,
    image: 'https://images.unsplash.com/photo-1509803874385-db7c23652552?w=400&h=400&fit=crop',
    description: 'Professional LED sign for your business. Custom logo and design.',
    features: ['Weather resistant', 'Custom design', 'High brightness', 'Long lasting'],
  },
];
