import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { categories, featuredProducts } from '@/data/mockData';
import { ProductSlider } from '@/components/ProductSlider';
import { AuthTest } from '@/components/AuthTest';

// Define the Product interface
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

// Cache key for localStorage
const CACHE_KEY = 'alankaar_carousel_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch products from backend with caching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if we have cached data
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const now = Date.now();
          
          // Check if cache is still valid (less than 24 hours old)
          if (now - timestamp < CACHE_DURATION) {
            console.log('Using cached carousel data');
            setProducts(data);
            setLoading(false);
            return;
          } else {
            // Cache expired, remove it
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // Fetch fresh data from API
        console.log('Fetching fresh carousel data from API');
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Cache the data with timestamp
        const cacheData = {
          data,
          timestamp: Date.now()
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_BASE_URL]);

  // Memoized carousel images to prevent recalculation on every render
  const carouselImages = useMemo(() => {
    const imageProductMap: { image: string; productId: string; productName: string }[] = [];
    
    products.forEach(product => {
      if (product.images && product.images.length > 0) {
        // Add all images from each product with product info
        product.images.forEach(image => {
          if (image && !imageProductMap.find(item => item.image === image)) {
            imageProductMap.push({
              image,
              productId: product._id,
              productName: product.name
            });
          }
        });
      }
    });
    
    return imageProductMap;
  }, [products]);
  
  // Memoized gallery splits to prevent recalculation
  const { posterGallery1, posterGallery2 } = useMemo(() => {
    const gallery1 = carouselImages.slice(0, Math.ceil(carouselImages.length / 2));
    const gallery2 = carouselImages.slice(Math.ceil(carouselImages.length / 2));
    return { posterGallery1: gallery1, posterGallery2: gallery2 };
  }, [carouselImages]);

  const offers = [
    "BUY 4 GET 3 FREE!",
    "BUY 5 GET 5 FREE!",
    "BUY 6 GET 12 FREE!",
    "BUY 10 GET 20 FREE!",
    "BUY 20 GET 50 FREE!",
    "FREE DELIVERY FOR PREPAID ORDERS!",
    "BUY 4 GET 3 FREE!",
    "BUY 5 GET 5 FREE!",
    "BUY 6 GET 12 FREE!",
  ];

  // Function to clear cache (useful for development or when data is stale)
  const clearCache = () => {
    localStorage.removeItem(CACHE_KEY);
    console.log('Cache cleared');
    // Reload the page to fetch fresh data
    window.location.reload();
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <div className="space-y-2">
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
            <Button variant="outline" onClick={clearCache} className="ml-2">
              Clear Cache & Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundImage: 'url("/img.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Hero Section */}
      <section className="relative min-h-[400px] bg-gradient-to-br from-[#130a17] to-[#0c0712] flex items-center justify-center py-12 lg:py-20">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-8">
          {/* Left: Heading and Tagline */}
          <div className="flex-1 flex flex-col items-end justify-center max-w-md">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white/90 leading-tight" style={{ fontFamily: 'Inria Serif, serif', textAlign: 'left' }}>
              <span className="block">Feel It.</span>
              <span className="block">Frame It.</span>
              <span className="block" style={{ color: '#FFD600' }}>Alankaar.</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 mt-4" style={{ textAlign: 'left', fontFamily: 'Inria Serif, serif', fontWeight: 500 }}>Wall decor that feels luxe, priced just right.</p>
          </div>
          {/* Right: Product Slider */}
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-black/90 rounded-3xl shadow-xl p-4 w-[340px] h-[340px] md:w-[400px] md:h-[400px] flex items-center justify-center overflow-hidden relative">
              {/* Product Slider */}
              <ProductSlider products={products} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-semibold mb-4 text-white">Featured Categories</h2>
          </div>
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-8 justify-center items-center">
            <Link to="/products" className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
              <div className="rounded-3xl bg-black/90 h-48 sm:h-60 md:h-72 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-semibold text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                Posters and Frames
              </div>
            </Link>
            <Link to="/products" className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
              <div className="rounded-3xl bg-black/90 h-48 sm:h-60 md:h-72 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-semibold text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                Printed Garments
              </div>
            </Link>
            <Link to="/products" className="w-full sm:w-1/2 md:w-1/3 max-w-xs">
              <div className="rounded-3xl bg-black/90 h-48 sm:h-60 md:h-72 flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-semibold text-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
                Accessories
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers - Now using real products from backend */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="w-full max-w-none px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular products loved by customers worldwide
            </p>
          </div>
          {/* Carousel */}
          <div className="overflow-x-hidden overflow-y-hidden w-full flex items-center p-0 m-0">
            <div className="flex flex-nowrap min-w-0 w-full animate-carousel-fast gap-4 items-center py-32">
              {[...products, ...products].map((product, idx) => (
                <div key={product._id + '-' + idx} className="flex-shrink-0 w-1/2 sm:w-1/4 lg:w-1/6 h-96 flex items-center justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 lg:py-36">
        <div className="w-full max-w-none px-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-10">Why Choose Us?</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-24 lg:gap-16 w-full">
            {[
              {
                icon: <Star className="h-14 w-14 text-primary" />,
                title: 'Premium Quality',
                description: 'High-quality materials and printing for lasting beauty',
              },
              {
                icon: <span className="text-4xl">🎨</span>,
                title: 'Custom Designs',
                description: 'Personalized artwork tailored to your unique style',
              },
              {
                icon: <span className="text-4xl">🚚</span>,
                title: 'Fast Shipping',
                description: 'Quick delivery to bring your vision to life sooner',
              },
              {
                icon: <span className="text-4xl">💎</span>,
                title: 'Expert Craftsmanship',
                description: 'Professionally crafted with attention to detail',
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-10 hover:shadow-lg transition-shadow scale-105 lg:scale-110">
                <CardContent className="space-y-6">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold text-2xl mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-lg">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24" style={{ background: 'linear-gradient(90deg, #6d2997 0%, #3e206e 100%)' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-white mb-8">Ready to Transform Your Space?</h2>
          <p className="text-2xl md:text-3xl font-serif text-white/90 max-w-4xl mx-auto">
            Join thousands of satisfied customers who have transformed their homes with our premium art collection.
          </p>
        </div>
      </section>

      {/* JWT Authentication Test - Temporary for testing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AuthTest />
        </div>
      </section>
    </div>
  );
}
