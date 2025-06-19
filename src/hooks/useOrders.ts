
import { useState, useEffect } from 'react'
import { supabase, Order } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchOrders = async () => {
    try {
      let query = supabase.from('orders').select('*')
      
      // If not admin, only fetch user's orders
      if (user && user.user_metadata?.role !== 'admin') {
        query = query.eq('user_id', user.id)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      toast({
        title: "Error",
        description: "Failed to fetch orders",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const createOrder = async (orderData: Omit<Order, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single()

      if (error) throw error

      setOrders(prev => [data, ...prev])
      toast({
        title: "Success",
        description: "Order placed successfully"
      })
      return data
    } catch (error) {
      console.error('Error creating order:', error)
      toast({
        title: "Error",
        description: "Failed to place order",
        variant: "destructive"
      })
      throw error
    }
  }

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setOrders(prev => prev.map(o => o.id === id ? data : o))
      toast({
        title: "Success",
        description: "Order status updated"
      })
      return data
    } catch (error) {
      console.error('Error updating order:', error)
      toast({
        title: "Error",
        description: "Failed to update order",
        variant: "destructive"
      })
      throw error
    }
  }

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  return {
    orders,
    loading,
    createOrder,
    updateOrderStatus,
    refetch: fetchOrders
  }
}
