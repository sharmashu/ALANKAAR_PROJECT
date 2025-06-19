import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { categories, featuredProducts } from '@/data/mockData';

export default function Index() {
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
              <span key={index} className="text-sm font-medium">
                {offer}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-white dark:bg-background py-8 lg:py-16 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Main Heading */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white mb-4">
              VIBE IT. PRINT IT.{' '}
              <span className="gradient-primary bg-clip-text text-transparent">
                ALANKAAR.
              </span>
            </h1>
          </div>

          {/* First Row - Sliding Right to Left */}
          <div className="mb-6 overflow-hidden">
            <div className="animate-scroll-right whitespace-nowrap">
              <div className="inline-flex space-x-4">
                {[...posterGallery1, ...posterGallery1].map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={image}
                      alt={`Poster ${index + 1}`}
                      className="w-32 h-40 md:w-40 md:h-52 lg:w-48 lg:h-60 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Row - Sliding Left to Right */}
          <div className="mb-8 overflow-hidden">
            <div className="animate-scroll-left whitespace-nowrap">
              <div className="inline-flex space-x-4">
                {[...posterGallery2, ...posterGallery2].map((image, index) => (
                  <div key={index} className="relative flex-shrink-0">
                    <img
                      src={image}
                      alt={`Poster ${index + 1}`}
                      className="w-32 h-40 md:w-40 md:h-52 lg:w-48 lg:h-60 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gradient-primary">
                <Link to="/products" className="flex items-center">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/custom-poster">Create Custom Art</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Link to="/products?category=single-posters">
              <div className="bg-white text-black p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-lg">SINGLE POSTERS</h3>
              </div>
            </Link>
            <Link to="/products?category=split-posters">
              <div className="bg-white text-black p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-lg">SPLIT POSTERS</h3>
              </div>
            </Link>
            <Link to="/custom-poster">
              <div className="bg-white text-black p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-lg">CUSTOM POLAROIDS</h3>
              </div>
            </Link>
            <Link to="/products?category=stickers">
              <div className="bg-white text-black p-6 rounded-lg text-center hover:bg-gray-100 transition-colors">
                <h3 className="font-bold text-lg">STICKERS</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our popular categories and find the perfect pieces for your space
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-center group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Best Sellers</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our most popular products loved by customers worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              <Link to="/products" className="flex items-center">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-primary" />,
                title: 'Premium Quality',
                description: 'High-quality materials and printing for lasting beauty',
              },
              {
                icon: <span className="text-2xl">🎨</span>,
                title: 'Custom Designs',
                description: 'Personalized artwork tailored to your unique style',
              },
              {
                icon: <span className="text-2xl">🚚</span>,
                title: 'Fast Shipping',
                description: 'Quick delivery to bring your vision to life sooner',
              },
              {
                icon: <span className="text-2xl">💎</span>,
                title: 'Expert Craftsmanship',
                description: 'Professionally crafted with attention to detail',
              },
            ].map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-md transition-shadow">
                <CardContent className="space-y-4">
                  <div className="flex justify-center">{feature.icon}</div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-white">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/90 text-lg">
              Join thousands of satisfied customers who have transformed their homes with our premium art collection.
            </p>
            <Button size="lg" variant="secondary">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
