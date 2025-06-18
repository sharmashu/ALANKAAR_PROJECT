
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold">Settings</h1>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Store Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input id="storeName" defaultValue="ALANKAAR" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeEmail">Store Email</Label>
              <Input id="storeEmail" defaultValue="info@alankaar.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="storePhone">Store Phone</Label>
              <Input id="storePhone" defaultValue="+91 9876543210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Input id="currency" defaultValue="INR" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="storeAddress">Store Address</Label>
            <Input id="storeAddress" defaultValue="123 Design Street, Mumbai, India" />
          </div>
          <Button>Save Store Settings</Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for new orders
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Low Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when products are running low
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive SMS for urgent updates
              </p>
            </div>
            <Switch />
          </div>
          <Button>Save Notification Settings</Button>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="razorpayKey">Razorpay Key ID</Label>
              <Input id="razorpayKey" placeholder="Enter Razorpay Key ID" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="razorpaySecret">Razorpay Secret</Label>
              <Input id="razorpaySecret" type="password" placeholder="Enter Razorpay Secret" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Cash on Delivery</Label>
              <p className="text-sm text-muted-foreground">
                Enable cash on delivery option
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button>Save Payment Settings</Button>
        </CardContent>
      </Card>

      {/* Shipping Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="shippingCost">Default Shipping Cost</Label>
              <Input id="shippingCost" defaultValue="50" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="freeShippingLimit">Free Shipping Above</Label>
              <Input id="freeShippingLimit" defaultValue="999" type="number" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Express Delivery</Label>
              <p className="text-sm text-muted-foreground">
                Offer express delivery option
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button>Save Shipping Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
