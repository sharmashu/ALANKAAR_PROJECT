import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard, Product } from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('A4');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the specific product
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const productData = await response.json();
        setProduct(productData);
        
        // Fetch all products for related products
        const allProductsResponse = await fetch(`${API_BASE_URL}/api/products`);
        if (allProductsResponse.ok) {
          const allProducts = await allProductsResponse.json();
          // Get related products (first 4 products excluding current)
          const related = allProducts
            .filter((p: Product) => p.id !== productData.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      size: selectedSize,
      quantity,
    });
  };

  const sizes = ['A3', 'A4', 'A2', 'Custom'];
  const sizeDescriptions = {
    A3: '297 × 420 mm',
    A4: '210 × 297 mm', 
    A2: '420 × 594 mm',
    Custom: 'Custom dimensions'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage] || '/placeholder-image.jpg'}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
          </div>
          
          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square bg-muted rounded border cursor-pointer hover:border-primary ${
                    selectedImage === index ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.price}</span>
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Product Features */}
          {product.features && product.features.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold mb-3">Size</h3>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size} {sizeDescriptions[size as keyof typeof sizeDescriptions] && 
                      `(${sizeDescriptions[size as keyof typeof sizeDescriptions]})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4">
            <Button onClick={handleAddToCart} className="flex-1">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
