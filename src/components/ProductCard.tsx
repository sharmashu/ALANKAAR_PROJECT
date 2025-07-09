import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

export interface Product {
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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '', // Use first image as main image
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <Link to={`/product/${product._id}`}>
        <div className="aspect-square overflow-hidden bg-muted flex items-center justify-center">
          <img
            src={product.images?.[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-contain mx-auto my-auto transition-transform duration-300"
            onError={(e) => {
              if (!e.currentTarget.src.includes('placeholder.svg')) {
                e.currentTarget.src = '/placeholder.svg';
              }
            }}
          />
        </div>
      </Link>
      
      <CardContent className="p-5">
        <div className="space-y-3">
          <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-primary text-base md:text-lg">₹{product.price}</span>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
