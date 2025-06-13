
import { useState } from 'react';
import { Mail, User, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or need a custom solution? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="h-5 w-5" />,
                    title: 'Email',
                    content: 'info@interiorDecor.com',
                    action: 'mailto:info@interiorDecor.com',
                  },
                  {
                    icon: <span className="text-lg">📱</span>,
                    title: 'WhatsApp',
                    content: '+91 98765 43210',
                    action: 'https://wa.me/919876543210',
                  },
                  {
                    icon: <Clock className="h-5 w-5" />,
                    title: 'Business Hours',
                    content: 'Mon - Sat: 9:00 AM - 7:00 PM',
                  },
                  {
                    icon: <MapPin className="h-5 w-5" />,
                    title: 'Address',
                    content: '123 Design Street, Art District, Mumbai 400001',
                  },
                ].map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{info.title}</h3>
                      {info.action ? (
                        <a
                          href={info.action}
                          className="text-muted-foreground hover:text-primary transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => window.open('https://wa.me/919876543210', '_blank')}
                >
                  <span className="text-lg mr-3">📱</span>
                  <div className="text-left">
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-xs text-muted-foreground">Chat with us</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => window.location.href = 'mailto:info@interiorDecor.com'}
                >
                  <Mail className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Email</div>
                    <div className="text-xs text-muted-foreground">Send us an email</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {[
                  'How long does shipping take?',
                  'Can I customize the size of my poster?',
                  'Do you offer bulk discounts?',
                  'What payment methods do you accept?',
                ].map((question, index) => (
                  <div key={index} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    • {question}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
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
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12">
          <Card>
            <CardContent className="p-0">
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Design Street, Art District, Mumbai</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
