import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCard, Product } from '@/components/ProductCard';

// Categories based on the products we have
const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fitness', name: 'Fitness & Health' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'gaming', name: 'Gaming' }
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('popularity');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categoryFilter = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter from URL
    if (categoryFilter) {
      filtered = filtered.filter(product => {
        // Simple category detection based on product name/description
        const productText = `${product.name} ${product.description}`.toLowerCase();
        if (categoryFilter === 'electronics' && (productText.includes('wireless') || productText.includes('bluetooth') || productText.includes('smart') || productText.includes('charging'))) return true;
        if (categoryFilter === 'fitness' && (productText.includes('fitness') || productText.includes('yoga') || productText.includes('health'))) return true;
        if (categoryFilter === 'clothing' && (productText.includes('shirt') || productText.includes('cotton'))) return true;
        if (categoryFilter === 'home' && (productText.includes('coffee') || productText.includes('kitchen') || productText.includes('cutting'))) return true;
        if (categoryFilter === 'accessories' && (productText.includes('wallet') || productText.includes('water bottle'))) return true;
        if (categoryFilter === 'gaming' && productText.includes('gaming')) return true;
        return false;
      });
    }

    // Apply selected categories filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => {
        const productText = `${product.name} ${product.description}`.toLowerCase();
        return selectedCategories.some(category => {
          if (category === 'electronics' && (productText.includes('wireless') || productText.includes('bluetooth') || productText.includes('smart') || productText.includes('charging'))) return true;
          if (category === 'fitness' && (productText.includes('fitness') || productText.includes('yoga') || productText.includes('health'))) return true;
          if (category === 'clothing' && (productText.includes('shirt') || productText.includes('cotton'))) return true;
          if (category === 'home' && (productText.includes('coffee') || productText.includes('kitchen') || productText.includes('cutting'))) return true;
          if (category === 'accessories' && (productText.includes('wallet') || productText.includes('water bottle'))) return true;
          if (category === 'gaming' && productText.includes('gaming')) return true;
          return false;
        });
      });
    }

    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // popularity - keep original order (by creation date)
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return filtered;
  }, [products, categoryFilter, selectedCategories, searchQuery, priceRange, sortBy]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, categoryId]);
    } else {
      setSelectedCategories(prev => prev.filter(id => id !== categoryId));
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="font-semibold mb-4">Filters</h3>
            
            {/* Search */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Categories</label>
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label htmlFor={category.id} className="text-sm">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-20"
                />
                <span>-</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                  className="w-20"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="lg:w-3/4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <div>
              <h1 className="text-2xl font-bold">
                {categoryFilter 
                  ? categories.find(c => c.id === categoryFilter)?.name || 'Products'
                  : 'All Products'
                }
              </h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} products found
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="name">Name: A-Z</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategories([]);
                  setPriceRange([0, 1000]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
