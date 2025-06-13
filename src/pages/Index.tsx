
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { categories, featuredProducts } from '@/data/mockData';

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-accent/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Transform Your Space with{' '}
              <span className="gradient-primary bg-clip-text text-transparent">
                Premium Art
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of wall posters, custom prints, neon signs, and LED boards. 
              Create your perfect interior with our premium quality products.
            </p>
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
