
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { neonLedProducts } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

export default function NeonLed() {
  const [quoteData, setQuoteData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: '',
    budget: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuoteData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote request submitted!",
      description: "We'll get back to you within 24 hours with a custom quote.",
    });
    setQuoteData({
      name: '',
      email: '',
      phone: '',
      projectDetails: '',
      budget: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Neon & LED Boards</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Illuminate your space with our custom neon signs and LED boards. Perfect for businesses, 
          gaming setups, and personal spaces.
        </p>
      </div>

      {/* Ready-made Products */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Ready-Made Designs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {neonLedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                <div className="mb-3">
                  <span className="text-lg font-bold text-primary">₹{product.price}</span>
                </div>
                <ul className="text-xs text-muted-foreground mb-4">
                  {product.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
                <Button className="w-full">
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Our Work Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1509803874385-db7c23652552?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1514036783265-fba9d2b1e4b0?w=300&h=300&fit=crop',
            'https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=300&h=300&fit=crop',
          ].map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-lg">
              <img
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Custom Quote Form */}
      <section>
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Request Custom Quote</CardTitle>
              <p className="text-center text-muted-foreground">
                Tell us about your project and we'll create a custom solution for you
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={quoteData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={quoteData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={quoteData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="projectDetails">Project Details</Label>
                  <Textarea
                    id="projectDetails"
                    name="projectDetails"
                    placeholder="Describe your neon/LED sign requirements, size, colors, text, etc."
                    value={quoteData.projectDetails}
                    onChange={handleInputChange}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="budget">Budget Range (Optional)</Label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="e.g., ₹5,000 - ₹10,000"
                    value={quoteData.budget}
                    onChange={handleInputChange}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Submit Quote Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
