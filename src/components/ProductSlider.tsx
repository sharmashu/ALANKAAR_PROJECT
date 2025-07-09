import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';

interface Product {
  _id: string;
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
}

interface ProductSliderProps {
  products: Product[];
}

export function ProductSlider({ products }: ProductSliderProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!products || products.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [products]);

  if (!products || products.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        No products available
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {products.map((product, idx) => (
        <div
          key={product._id}
          className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
} 