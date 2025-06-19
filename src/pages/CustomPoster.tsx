
import { useState } from 'react';
import { Upload, Type, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

export default function CustomPoster() {
  const { addItem } = useCart();
  const [designType, setDesignType] = useState('text');
  const [selectedSize, setSelectedSize] = useState('A4');
  const [selectedFrame, setSelectedFrame] = useState('none');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    customText: '',
    fontStyle: 'modern',
    backgroundColor: '#ffffff',
    textColor: '#000000',
  });

  const sizes = [
    { id: 'A4', name: 'A4 (210 × 297 mm)', price: 199 },
    { id: 'A3', name: 'A3 (297 × 420 mm)', price: 299 },
    { id: 'A2', name: 'A2 (420 × 594 mm)', price: 499 },
    { id: 'custom', name: 'Custom Size', price: 599 },
  ];

  const frames = [
    { id: 'none', name: 'No Frame', price: 0 },
    { id: 'black', name: 'Black Frame', price: 99 },
    { id: 'white', name: 'White Frame', price: 99 },
    { id: 'wood', name: 'Wooden Frame', price: 149 },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePrice = () => {
    const sizePrice = sizes.find(s => s.id === selectedSize)?.price || 0;
    const framePrice = frames.find(f => f.id === selectedFrame)?.price || 0;
    return sizePrice + framePrice;
  };

  const handleAddToCart = () => {
    const sizeName = sizes.find(s => s.id === selectedSize)?.name || selectedSize;
    const frameName = frames.find(f => f.id === selectedFrame)?.name || 'No Frame';
    
    addItem({
      id: `custom-${Date.now()}`,
      name: `Custom Poster - ${designType === 'text' ? 'Text Design' : 'Image Upload'}`,
      price: calculatePrice(),
      image: uploadedImage || 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
      customOptions: {
        type: designType,
        size: sizeName,
        frame: frameName,
        ...formData,
      },
    });

    toast({
      title: "Custom poster added to cart!",
      description: "Your custom design has been added to your cart.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Create Your Custom Poster</h1>
          <p className="text-muted-foreground">
            Upload your own image or create a custom text design. Perfect for personal spaces!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Design Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Design Type</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={designType} onValueChange={setDesignType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text" className="flex items-center">
                      <Type className="h-4 w-4 mr-2" />
                      Custom Text
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image" className="flex items-center">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Upload Image
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {designType === 'text' && (
              <Card>
                <CardHeader>
                  <CardTitle>Text Customization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customText">Your Text</Label>
                    <Textarea
                      id="customText"
                      placeholder="Enter your custom text..."
                      value={formData.customText}
                      onChange={(e) => setFormData(prev => ({ ...prev, customText: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fontStyle">Font Style</Label>
                    <Select 
                      value={formData.fontStyle} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, fontStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="script">Script</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="backgroundColor">Background Color</Label>
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={formData.backgroundColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="textColor">Text Color</Label>
                      <Input
                        id="textColor"
                        type="color"
                        value={formData.textColor}
                        onChange={(e) => setFormData(prev => ({ ...prev, textColor: e.target.value }))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {designType === 'image' && (
              <Card>
                <CardHeader>
                  <CardTitle>Upload Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <div className="space-y-2">
                      <Label htmlFor="imageUpload" className="cursor-pointer">
                        <span className="text-primary hover:underline">Choose an image</span>
                        <span className="text-muted-foreground"> or drag and drop</span>
                      </Label>
                      <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Size & Frame</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Size</Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>
                          {size.name} - ₹{size.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Frame</Label>
                  <Select value={selectedFrame} onValueChange={setSelectedFrame}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {frames.map((frame) => (
                        <SelectItem key={frame.id} value={frame.id}>
                          {frame.name} {frame.price > 0 && `- ₹${frame.price}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                  {designType === 'text' && formData.customText ? (
                    <div 
                      className="w-full h-full flex items-center justify-center p-8 text-center"
                      style={{ 
                        backgroundColor: formData.backgroundColor,
                        color: formData.textColor 
                      }}
                    >
                      <span 
                        className={`text-2xl font-${formData.fontStyle === 'bold' ? 'bold' : 'normal'}`}
                      >
                        {formData.customText}
                      </span>
                    </div>
                  ) : designType === 'image' && uploadedImage ? (
                    <img 
                      src={uploadedImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="text-center text-muted-foreground">
                      {designType === 'text' ? 'Enter text to see preview' : 'Upload image to see preview'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Poster ({sizes.find(s => s.id === selectedSize)?.name})</span>
                    <span>₹{sizes.find(s => s.id === selectedSize)?.price}</span>
                  </div>
                  {selectedFrame !== 'none' && (
                    <div className="flex justify-between">
                      <span>{frames.find(f => f.id === selectedFrame)?.name}</span>
                      <span>₹{frames.find(f => f.id === selectedFrame)?.price}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{calculatePrice()}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleAddToCart} 
                  className="w-full"
                  disabled={designType === 'text' ? !formData.customText : !uploadedImage}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
