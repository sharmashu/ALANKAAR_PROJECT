
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  originalPrice?: number;
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
      image: product.image,
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border-0 shadow-md bg-white dark:bg-gray-800">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-gray-50 dark:bg-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </Link>
      
      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-medium text-sm text-gray-800 dark:text-gray-200 group-hover:text-orange-500 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {product.rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400">{product.rating}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 dark:text-gray-100">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 dark:text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            
            <Button
              size="sm"
              className="h-8 w-8 p-0 bg-orange-500 hover:bg-orange-600 text-white border-0"
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
