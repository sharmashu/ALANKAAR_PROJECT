
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';

export default function Index() {
  const { products } = useProducts();
  const { categories } = useCategories();
  
  const featuredProducts = products.slice(0, 6);

  // Sample poster images for the hero galleries
  const posterGallery1 = [
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=400&fit=crop",
  ];

  const posterGallery2 = [
    "https://images.unsplash.com/photo-1582561833949-7fffaaf8cc81?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=400&fit=crop",
    "https://images.unsplash.com/photo-1582561833949-7fffaaf8cc81?w=300&h=400&fit=crop",
  ];

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

  return (
    <div className="min-h-screen">
      {/* Moving Offers Bar */}
      <div className="bg-black text-white py-2 overflow-hidden">
        <div className="animate-scroll-left whitespace-nowrap">
          <div className="inline-flex space-x-8">
            {[...offers, ...offers].map((offer, index) => (
              <span key={index} className="text-xs md:text-sm font-medium">
                {offer}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section - Mobile Responsive */}
      <section className="relative bg-white dark:bg-background py-4 md:py-8 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Main Heading */}
          <div className="text-center mb-4 md:mb-8">
            <h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold text-black dark:text-white mb-2 md:mb-4">
              VIBE IT. PRINT IT.{' '}
              <span className="gradient-primary bg-clip-text text-transparent">
                ALANKAAR.
              </span>
            </h1>
          </div>

          {/* First Row - Sliding Right to Left */}
          <div className="mb-3 md:mb-6 overflow-hidden">
            <div className="animate-scroll-right whitespace-nowrap">
              <div className="inline-flex space-x-2 md:space-x-4">
                {[...posterGallery1, ...posterGallery1].map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={image}
                      alt={`Poster ${index + 1}`}
                      className="w-24 h-32 md:w-32 md:h-40 lg:w-40 lg:h-52 xl:w-48 xl:h-60 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Sliding Left to Right */}
          <div className="mb-4 md:mb-8 overflow-hidden">
            <div className="animate-scroll-left whitespace-nowrap">
              <div className="inline-flex space-x-2 md:space-x-4">
                {[...posterGallery2, ...posterGallery2].map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={image}
                      alt={`Poster ${index + 1}`}
                      className="w-24 h-32 md:w-32 md:h-40 lg:w-40 lg:h-52 xl:w-48 xl:h-60 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons - Mobile Responsive */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" className="gradient-primary flex-1">
                <Link to="/products" className="flex items-center justify-center">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Link to="/custom-poster" className="flex items-center justify-center">Create Custom Art</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section - Mobile Responsive */}
      <section className="py-8 md:py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            <Link to="/products?category=Posters">
              <div className="bg-white text-black p-4 md:p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-sm md:text-lg">SINGLE POSTERS</h3>
              </div>
            </Link>
            <Link to="/products?category=Frames">
              <div className="bg-white text-black p-4 md:p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-sm md:text-lg">SPLIT POSTERS</h3>
              </div>
            </Link>
            <Link to="/custom-poster">
              <div className="bg-white text-black p-4 md:p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-sm md:text-lg">CUSTOM POLAROIDS</h3>
              </div>
            </Link>
            <Link to="/products?category=Stickers">
              <div className="bg-white text-black p-4 md:p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-sm md:text-lg">STICKERS</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories - Mobile Responsive */}
      <section className="py-8 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Featured Categories</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Explore our popular categories and find the perfect pieces for your space
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image || '/placeholder.svg'}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-3 md:p-4">
                    <h3 className="font-semibold text-center text-sm md:text-base group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers - Mobile Responsive */}
      <section className="py-8 md:py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Best Sellers</h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              Our most popular products loved by customers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8 md:mt-12">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to="/products" className="flex items-center justify-center">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Mobile Responsive */}
      <section className="py-8 md:py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Why Choose Us?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: <Star className="h-6 w-6 md:h-8 md:w-8 text-primary" />,
                title: 'Premium Quality',
                description: 'High-quality materials and printing for lasting beauty',
              },
              {
                icon: <span className="text-xl md:text-2xl">🎨</span>,
                title: 'Custom Designs',
                description: 'Personalized artwork tailored to your unique style',
              },
              {
                icon: <span className="text-xl md:text-2xl">🚚</span>,
                title: 'Fast Shipping',
                description: 'Quick delivery to bring your vision to life sooner',
              },
              {
                icon: <span className="text-xl md:text-2xl">💎</span>,
                title: 'Expert Craftsmanship',
                description: 'Professionally crafted with attention to detail',
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-4 md:p-6 hover:shadow-md transition-shadow">
                <CardContent className="space-y-3 md:space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold text-base md:text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-xs md:text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Responsive */}
      <section className="py-8 md:py-16 lg:py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-4 md:space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/90 text-sm md:text-lg">
              Join thousands of satisfied customers who have transformed their homes with our premium art collection.
            </p>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
