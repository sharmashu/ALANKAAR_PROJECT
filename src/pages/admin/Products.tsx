import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/lib/api';

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    images: [''],
    features: [''],
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [viewProduct, setViewProduct] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleArrayChange = (idx, field, value) => {
    setForm(f => ({ ...f, [field]: f[field].map((item, i) => i === idx ? value : item) }));
  };
  const addField = (field) => {
    setForm(f => ({ ...f, [field]: [...f[field], ''] }));
  };
  const removeField = (field, idx) => {
    setForm(f => ({ ...f, [field]: f[field].filter((_, i) => i !== idx) }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    try {
      if (editMode) {
        // Update product
        await api.put(`/products/${form._id || form.id}`, {
          ...form,
          price: Number(form.price),
        });
      } else {
        // Add new product
        await api.post('/products', {
          ...form,
          price: Number(form.price),
        });
      }
      setShowModal(false);
      setEditMode(false);
      setForm({ _id: '', id: '', name: '', price: '', description: '', images: [''], features: [''] });
      fetchProducts();
    } catch (err) {
      setFormError('Failed to add product');
    } finally {
      setFormLoading(false);
    }
  };

  const handleView = (product) => setViewProduct(product);
  const handleEdit = (product) => {
    setForm({
      _id: product._id || '',
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      images: product.images || [''],
      features: product.features || [''],
    });
    setEditMode(true);
    setShowModal(true);
  };
  const handleDelete = async (_id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${_id}`);
      fetchProducts();
    } catch (err) {
      alert('Failed to delete product');
    }
  };
  const handleToggleStock = async (product) => {
    try {
      await api.put(`/products/${product._id}`, { ...product, stock: product.stock > 0 ? 0 : 10 });
      fetchProducts();
    } catch (err) {
      alert('Failed to update stock');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-black rounded-xl shadow-2xl p-6 w-full max-w-md relative border border-gray-700 max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-2xl text-white hover:text-red-500 transition-colors"
              onClick={() => { setShowModal(false); setEditMode(false); }}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-white">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <label className="block font-medium mb-1 text-gray-300">Product ID</label>
              <Input name="id" placeholder="Unique ID" value={form.id} onChange={handleFormChange} required className="bg-[#181218] text-white" />
              <label className="block font-medium mb-1 text-gray-300">Name</label>
              <Input name="name" placeholder="Product Name" value={form.name} onChange={handleFormChange} required className="bg-[#181218] text-white" />
              <label className="block font-medium mb-1 text-gray-300">Price</label>
              <Input name="price" type="number" placeholder="Price" value={form.price} onChange={handleFormChange} required className="bg-[#181218] text-white" />
              <label className="block font-medium mb-1 text-gray-300">Description</label>
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleFormChange} required className="w-full p-2 border rounded bg-[#181218] text-white" />
              <div>
                <label className="block font-medium mb-1 text-gray-300">Images</label>
                {form.images.map((img, idx) => (
                  <div key={idx} className="flex space-x-2 mb-2">
                    <Input value={img} onChange={e => handleArrayChange(idx, 'images', e.target.value)} placeholder="Image URL" required className="bg-[#181218] text-white" />
                    {form.images.length > 1 && (
                      <Button type="button" variant="outline" onClick={() => removeField('images', idx)}>-</Button>
                    )}
                    {idx === form.images.length - 1 && (
                      <Button type="button" variant="outline" onClick={() => addField('images')}>+</Button>
                    )}
                  </div>
                ))}
              </div>
              <div>
                <label className="block font-medium mb-1 text-gray-300">Features</label>
                {form.features.map((ft, idx) => (
                  <div key={idx} className="flex space-x-2 mb-2">
                    <Input value={ft} onChange={e => handleArrayChange(idx, 'features', e.target.value)} placeholder="Feature" required className="bg-[#181218] text-white" />
                    {form.features.length > 1 && (
                      <Button type="button" variant="outline" onClick={() => removeField('features', idx)}>-</Button>
                    )}
                    {idx === form.features.length - 1 && (
                      <Button type="button" variant="outline" onClick={() => addField('features')}>+</Button>
                    )}
                  </div>
                ))}
              </div>
              {formError && <div className="text-red-500 text-sm">{formError}</div>}
              <Button type="submit" disabled={formLoading} className="w-full">{formLoading ? (editMode ? 'Saving...' : 'Adding...') : (editMode ? 'Save Changes' : 'Add Product')}</Button>
            </form>
          </div>
        </div>
      )}

      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setViewProduct(null)}>&times;</button>
            <h2 className="text-2xl font-bold mb-4">Product Details</h2>
            <div className="space-y-2">
              <img src={viewProduct.image} alt={viewProduct.name} className="h-32 w-32 object-cover rounded mx-auto" />
              <div><b>Name:</b> {viewProduct.name}</div>
              <div><b>Price:</b> ₹{viewProduct.price}</div>
              <div><b>Description:</b> {viewProduct.description}</div>
              <div><b>Stock:</b> {viewProduct.stock}</div>
              <div><b>Status:</b> {viewProduct.status}</div>
              <div><b>Category:</b> {viewProduct.category}</div>
              <div><b>Features:</b> <ul className="list-disc ml-6">{(viewProduct.features||[]).map((f,i)=>(<li key={i}>{f}</li>))}</ul></div>
              <div><b>Images:</b> <ul className="list-disc ml-6">{(viewProduct.images||[]).map((img,i)=>(<li key={i}><a href={img} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{img}</a></li>))}</ul></div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Filter by Category</Button>
            <Button variant="outline">Filter by Status</Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleToggleStock(product)}
                      className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${product.stock > 0 ? 'bg-pink-100 border-pink-300' : 'bg-gray-700 border-gray-500'}`}
                      title={product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    >
                      {product.stock > 0 ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                    </button>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleView(product)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDelete(product._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
