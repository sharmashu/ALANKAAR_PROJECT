
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/lib/supabase';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.image || '',
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <CardContent className="p-3 md:p-4">
        <div className="space-y-2">
          <h3 className="font-medium text-xs md:text-sm group-hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </h3>
          
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-primary text-primary" />
            <span className="text-xs text-muted-foreground">4.5</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-primary text-sm md:text-base">₹{product.price}</span>
              {product.stock < 10 && (
                <span className="text-xs text-red-500">Low Stock</span>
              )}
            </div>
            
            <Button
              size="sm"
              variant="outline"
              className="h-7 w-7 md:h-8 md:w-8 p-0"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
