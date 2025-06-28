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
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.images?.[0] || '/placeholder.svg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              if (!e.currentTarget.src.includes('placeholder.svg')) {
                e.currentTarget.src = '/placeholder.svg';
              }
            }}
          />
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-primary">₹{product.price}</span>
            </div>
            
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
