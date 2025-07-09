import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import logo from '@/images/logo4.png';

export function Header() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full sticky top-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20 py-1">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 h-12 md:h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center min-w-[120px] md:min-w-[160px]">
          <img src={logo} alt="Alankaar Logo" className="h-30 md:h-36 object-contain" />
        </Link>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden ml-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
          onClick={() => setMobileMenuOpen((v) => !v)}
          aria-label="Open navigation menu"
        >
          {mobileMenuOpen ? <X className="h-7 w-7 text-white" /> : <Menu className="h-7 w-7 text-white" />}
        </button>
        {/* Centered Navigation (desktop) */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex space-x-8 lg:space-x-12 font-bold text-sm md:text-base" style={{ fontFamily: 'Poppins, Montserrat, Quicksand, Arial, sans-serif' }}>
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`text-sm lg:text-base font-bold nav-underline transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-white underline underline-offset-8 decoration-2'
                      : 'text-white/80'
                  }`}
                  style={{ fontFamily: 'Poppins, Montserrat, Quicksand, Arial, sans-serif' }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* Right Icons */}
        <div className="flex items-center space-x-4 md:space-x-6 min-w-[80px] md:min-w-[120px] justify-end font-bold text-sm md:text-base" style={{ fontFamily: 'Poppins, Montserrat, Quicksand, Arial, sans-serif' }}>
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-white" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-sm md:text-base font-bold text-white">
                Welcome, {user.name}
              </span>
              {user.role === 'admin' && (
                <Link to="/admin" className="hidden sm:inline text-sm md:text-base font-bold text-white bg-purple-600 px-2 py-1 rounded">
                  Admin
                </Link>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-white hover:text-white/80"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center">
              <User className="h-6 w-6 text-white mr-1" />
              <span className="hidden sm:inline text-sm md:text-base font-bold text-white">Login</span>
            </Link>
          )}
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-br from-[#1a1024] to-[#3a2352] px-4 pb-4 pt-2">
          <nav>
            <ul className="flex flex-col space-y-3 font-bold text-sm md:text-base" style={{ fontFamily: 'Poppins, Montserrat, Quicksand, Arial, sans-serif' }}>
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`block text-sm font-bold py-2 px-2 rounded transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-white underline underline-offset-8 decoration-2'
                        : 'text-white/80 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontFamily: 'Poppins, Montserrat, Quicksand, Arial, sans-serif' }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
