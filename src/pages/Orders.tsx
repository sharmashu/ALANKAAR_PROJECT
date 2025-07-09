import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get('/orders/my');
        setOrders(data);
      } catch (error) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (!user) {
    return <div className="container mx-auto py-16 text-center">Please log in to view your orders.</div>;
  }

  if (loading) {
    return <div className="container mx-auto py-16 text-center">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="container mx-auto py-16 text-center">No orders found.</div>;
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order._id}>
            <CardHeader>
              <CardTitle>Order #{order.orderNumber || order._id}</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Date: {new Date(order.createdAt).toLocaleString()}</div>
              <div>Total: ₹{order.total}</div>
              <div>Status: {order.status || 'Processing'}</div>
              <div>
                <strong>Items:</strong>
                <ul>
                  {order.items?.map((item, idx) => (
                    <li key={idx}>
                      {item.name} x {item.quantity} ({item.size})
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 