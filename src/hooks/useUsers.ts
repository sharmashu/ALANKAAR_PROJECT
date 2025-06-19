
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

interface UserProfile {
  id: string
  email: string
  name: string
  role: string
  phone?: string
  orders: number
  totalSpent: number
  joinDate: string
  status: string
}

export function useUsers() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const fetchUsers = async () => {
    try {
      // Fetch users from auth.users (admin only)
      const { data: authUsers, error } = await supabase.auth.admin.listUsers()
      
      if (error) throw error

      // Transform auth users to user profiles
      const userProfiles: UserProfile[] = authUsers.users.map(authUser => ({
        id: authUser.id,
        email: authUser.email || '',
        name: authUser.user_metadata?.name || 'Unknown',
        role: authUser.user_metadata?.role || 'Customer',
        phone: authUser.user_metadata?.phone || '',
        orders: 0, // Will be calculated from orders table
        totalSpent: 0, // Will be calculated from orders table
        joinDate: new Date(authUser.created_at).toLocaleDateString(),
        status: 'Active'
      }))

      setUsers(userProfiles)
    } catch (error) {
      console.error('Error fetching users:', error)
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && user.user_metadata?.role === 'admin') {
      fetchUsers()
    }
  }, [user])

  return {
    users,
    loading,
    refetch: fetchUsers
  }
}
