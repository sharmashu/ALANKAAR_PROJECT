
import { Star, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About Interior Decor</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We are passionate about transforming spaces with premium quality wall art, custom posters, 
          and innovative LED solutions. Our mission is to help you create beautiful, personalized 
          environments that reflect your unique style and personality.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          { icon: <Users className="h-8 w-8" />, number: '10,000+', label: 'Happy Customers' },
          { icon: <Star className="h-8 w-8" />, number: '4.9', label: 'Average Rating' },
          { icon: <Award className="h-8 w-8" />, number: '5+', label: 'Years Experience' },
          { icon: <Clock className="h-8 w-8" />, number: '24/7', label: 'Customer Support' },
        ].map((stat, index) => (
          <Card key={index} className="text-center p-6">
            <CardContent className="space-y-2">
              <div className="flex justify-center text-primary">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Our Story */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2019, Interior Decor started with a simple vision: to make high-quality 
                wall art and custom decorative solutions accessible to everyone. What began as a 
                small team of design enthusiasts has grown into a trusted brand serving customers 
                across the country.
              </p>
              <p>
                We believe that every space has the potential to inspire and energize. Whether you're 
                decorating a cozy bedroom, a professional office, or a vibrant gaming setup, we have 
                the perfect pieces to bring your vision to life.
              </p>
              <p>
                Our commitment to quality, innovation, and customer satisfaction has made us a 
                preferred choice for interior decoration needs.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <img
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
              alt="Our workshop"
              className="w-full h-64 object-cover rounded-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop"
              alt="Design process"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Quality First',
              description: 'We use only premium materials and state-of-the-art printing technology to ensure every product meets our high standards.',
              icon: '⭐',
            },
            {
              title: 'Customer-Centric',
              description: 'Your satisfaction is our priority. We listen to your needs and work closely with you to create the perfect solutions.',
              icon: '❤️',
            },
            {
              title: 'Innovation',
              description: 'We continuously explore new technologies and design trends to offer you the latest in interior decoration.',
              icon: '💡',
            },
          ].map((value, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="text-4xl">{value.icon}</div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: 'Krishna Aashutosh Sharma',
              role: 'Founder & CEO',
              image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
            },
            {
              name: 'Bethel Mathew',
              role: 'COO',
              image: 'https://images.unsplash.com/photo-1494790108755-2616b612b17c?w=300&h=300&fit=crop',
            },
          ].map((member, index) => (
            <Card key={index} className="text-center overflow-hidden">
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
