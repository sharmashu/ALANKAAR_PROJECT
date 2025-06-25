
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { categories, featuredProducts } from '@/data/mockData';

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Inspired by coffee website */}
      <section className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left order-2 lg:order-1 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 dark:text-gray-100 leading-tight">
                  Enrich the
                  <br />
                  <span className="font-semibold bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    everyday
                  </span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
                  Transform your space with premium wall art, custom posters, and unique designs that inspire.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link to="/products" className="flex items-center">
                    Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
                  <Link to="/custom-poster">Custom Design</Link>
                </Button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop"
                  alt="Premium Wall Art"
                  className="rounded-2xl shadow-2xl w-full max-w-md lg:max-w-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
                    <span className="text-sm font-semibold">Premium Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Bestsellers Section */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm text-orange-500 font-medium tracking-wider uppercase mb-2">Our Bestsellers</p>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-800 dark:text-gray-100 mb-4">
              Let your day be filled with what inspires you
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-orange-500 text-orange-500 hover:bg-orange-50">
              <Link to="/products" className="flex items-center">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-800 dark:text-gray-100 mb-4">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our curated collections designed to transform any space
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-0 shadow-md">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-orange-500 transition-colors">
                      {category.name}
                    </h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-800 dark:text-gray-100 mb-4">Why Choose ALANKAAR?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8 text-orange-500" />,
                title: 'Premium Quality',
                description: 'High-quality materials and printing for lasting beauty',
              },
              {
                icon: <span className="text-3xl">🎨</span>,
                title: 'Custom Designs',
                description: 'Personalized artwork tailored to your unique style',
              },
              {
                icon: <span className="text-3xl">🚚</span>,
                title: 'Fast Shipping',
                description: 'Quick delivery to bring your vision to life sooner',
              },
              {
                icon: <span className="text-3xl">💎</span>,
                title: 'Expert Craftsmanship',
                description: 'Professionally crafted with attention to detail',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="flex justify-center">{feature.icon}</div>
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-light text-white">
              Ready to Transform Your Space?
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Join thousands of satisfied customers who have transformed their homes with our premium art collection.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-50">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
