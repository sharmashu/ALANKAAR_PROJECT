
import { Link } from 'react-router-dom';
import { Mail, User } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold gradient-primary bg-clip-text text-transparent">
                ALANKAAR
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Transform your space with our premium wall art, custom posters, and LED designs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/custom-poster" className="text-muted-foreground hover:text-primary transition-colors">Custom Posters</Link></li>
              {/*<li><Link to="/neon-led" className="text-muted-foreground hover:text-primary transition-colors">Neon & LED</Link></li>*/}
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Size Guide</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <a href="mailto:info@alankaar.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://wa.me/1234567890" className="text-muted-foreground hover:text-primary transition-colors">
                <span className="text-lg">📱</span>
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              WhatsApp: +1 (234) 567-8900
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 ALANKAAR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
