
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import logo from '@/images/logo3.1.png';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'NEW IN', href: '/products?filter=new' },
    { name: 'POSTERS & ART', href: '/products' },
    { name: 'CUSTOM DESIGNS', href: '/custom-poster' },
    { name: 'NEON & LED', href: '/neon-led' },
    { name: 'ABOUT', href: '/about' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={logo} alt="Alankaar Logo" className="h-12 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-orange-500 ${
                  isActive(item.href) ? 'text-orange-500' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:flex items-center">
              <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <ThemeToggle />
            
            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hi, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600 dark:text-gray-400">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative text-gray-600 dark:text-gray-400">
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-600 dark:text-gray-400"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-4 border-t border-gray-200 dark:border-gray-800">
            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
              />
            </div>
            
            {/* Mobile Navigation */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium tracking-wide transition-colors hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-md ${
                    isActive(item.href) ? 'text-orange-500 bg-orange-50 dark:bg-orange-950/20' : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile User Menu */}
            {user ? (
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">Hi, {user.name}</span>
                <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600 dark:text-gray-400">
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 dark:text-gray-400">
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
