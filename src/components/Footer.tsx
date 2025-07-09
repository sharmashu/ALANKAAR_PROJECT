import { Link } from 'react-router-dom';
import { Mail, User } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full" style={{ background: 'linear-gradient(120deg, #2d1836 0%, #3a2352 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white font-serif">
          {/* About */}
          <div>
            <h2 className="text-3xl font-bold mb-4">ALANKAAR</h2>
            <p className="text-base">
              Transform your space with our premium wall art,custom posters, and LED designs.
            </p>
          </div>
          {/* Quick Link */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2 text-base">
              <li><Link to="/products" className="hover:underline">Products</Link></li>
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            </ul>
          </div>
          {/* Connect */}
          <div className="text-right">
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <p className="mb-2">WhatsApp: +91 9311260427</p>
            <p>Email: infoalankaarco@gmai.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 text-center text-base text-white/80 font-serif border-t border-white/20">
          <p>&copy; 2024 ALANKAAR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
