
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

export default function CustomPoster() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState('');
  const [selectedSize, setSelectedSize] = useState('A4');
  const [selectedFrame, setSelectedFrame] = useState('none');
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatePrice = () => {
    let basePrice = 299;
    
    switch (selectedSize) {
      case 'A3':
        basePrice = 399;
        break;
      case 'A2':
        basePrice = 599;
        break;
      case 'A1':
        basePrice = 899;
        break;
    }

    if (selectedFrame !== 'none') {
      basePrice += 199;
    }

    return basePrice;
  };

  const handleAddToCart = () => {
    if (!uploadedImage && !customText) {
      toast({
        title: "Missing content",
        description: "Please upload an image or add custom text.",
        variant: "destructive",
      });
      return;
    }

    const customOptions = {
      image: uploadedImage,
      text: customText,
      frame: selectedFrame
    };

    addItem({
      id: `custom-${Date.now()}`,
      name: `Custom Poster (${selectedSize})`,
      price: calculatePrice(),
      image: uploadedImage || '/placeholder.svg',
      size: selectedSize,
      customOptions,
      quantity: 1,
    });

    toast({
      title: "Added to cart!",
      description: "Your custom poster has been added to cart.",
    });

    navigate('/cart');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Create Your Custom Poster</h1>
          <p className="text-muted-foreground">
            Upload your own image or add custom text to create a unique poster
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Design Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Design Your Poster</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div>
                <Label htmlFor="image-upload">Upload Image</Label>
                <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  {uploadedImage ? (
                    <div>
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded" 
                        className="max-w-full h-48 mx-auto object-contain mb-4"
                      />
                      <Button variant="outline" size="sm" onClick={() => setUploadedImage(null)}>
                        Remove Image
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Button variant="outline" asChild>
                          <span>Choose Image</span>
                        </Button>
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Text */}
              <div>
                <Label htmlFor="custom-text">Custom Text (Optional)</Label>
                <Textarea
                  id="custom-text"
                  placeholder="Add your custom text here..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Size Selection */}
              <div>
                <Label>Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4 (210 × 297 mm) - ₹299</SelectItem>
                    <SelectItem value="A3">A3 (297 × 420 mm) - ₹399</SelectItem>
                    <SelectItem value="A2">A2 (420 × 594 mm) - ₹599</SelectItem>
                    <SelectItem value="A1">A1 (594 × 841 mm) - ₹899</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Frame Options */}
              <div>
                <Label>Frame</Label>
                <Select value={selectedFrame} onValueChange={setSelectedFrame}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Frame</SelectItem>
                    <SelectItem value="black">Black Frame (+₹199)</SelectItem>
                    <SelectItem value="white">White Frame (+₹199)</SelectItem>
                    <SelectItem value="wood">Wooden Frame (+₹199)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Preview & Order */}
          <Card>
            <CardHeader>
              <CardTitle>Preview & Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preview */}
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center border relative overflow-hidden">
                {uploadedImage ? (
                  <img 
                    src={uploadedImage} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <div className="text-6xl mb-4">🖼️</div>
                    <p>Your poster preview will appear here</p>
                  </div>
                )}
                
                {customText && (
                  <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-2 rounded text-center">
                    {customText}
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span>{selectedSize}</span>
                </div>
                {selectedFrame !== 'none' && (
                  <div className="flex justify-between">
                    <span>Frame:</span>
                    <span>{selectedFrame} (+₹199)</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>₹{calculatePrice()}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button onClick={handleAddToCart} className="w-full" size="lg">
                  Add to Cart - ₹{calculatePrice()}
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Design
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="text-sm text-muted-foreground space-y-1">
                <p>✓ High-quality printing</p>
                <p>✓ Premium paper quality</p>
                <p>✓ Fast delivery</p>
                <p>✓ 100% satisfaction guarantee</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
