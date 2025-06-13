
import { Link } from 'react-router-dom';
import { CheckCircle, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderSuccess() {
  // Mock order data
  const orderData = {
    orderNumber: 'ID' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    total: 598,
    estimatedDelivery: '3-5 business days',
    email: 'customer@example.com',
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {/* Order Details */}
        <Card className="mb-8">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Order Number:</span>
                <div className="font-semibold">{orderData.orderNumber}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Total Amount:</span>
                <div className="font-semibold">₹{orderData.total}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Estimated Delivery:</span>
                <div className="font-semibold">{orderData.estimatedDelivery}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Confirmation sent to:</span>
                <div className="font-semibold">{orderData.email}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* What's Next */}
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What happens next?</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">1</span>
              <span>We'll prepare your order within 24 hours</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">2</span>
              <span>You'll receive tracking information via email</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs">3</span>
              <span>Your order will be delivered in {orderData.estimatedDelivery}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline">
              Track Order
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/products">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>

        {/* Support */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            Need help with your order?
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="link" size="sm" asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button 
              variant="link" 
              size="sm"
              onClick={() => window.open('https://wa.me/919876543210', '_blank')}
            >
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
