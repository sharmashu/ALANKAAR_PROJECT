
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing. Please set up your Supabase integration.')
  console.error('Missing:', {
    url: !supabaseUrl ? 'VITE_SUPABASE_URL' : 'OK',
    key: !supabaseAnonKey ? 'VITE_SUPABASE_ANON_KEY' : 'OK'
  })
}

// Create a mock client if credentials are missing to prevent app crashes
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
        signUp: () => Promise.reject(new Error('Supabase not configured')),
        signOut: () => Promise.reject(new Error('Supabase not configured')),
      },
      from: () => ({
        select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
        insert: () => Promise.reject(new Error('Supabase not configured')),
        update: () => Promise.reject(new Error('Supabase not configured')),
        delete: () => Promise.reject(new Error('Supabase not configured')),
      }),
      storage: {
        from: () => ({
          upload: () => Promise.reject(new Error('Supabase not configured')),
          getPublicUrl: () => ({ data: { publicUrl: '' } }),
        }),
      },
    }

// Database types
export interface Product {
  id: string
  title: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  tags: string[]
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size?: string
  quantity: number
}

export interface Order {
  id: string
  user_id: string
  items: CartItem[]
  total: number
  status: string
  payment_status: string
  shipping_address: any
  created_at: string
}

export interface Category {
  id: string
  name: string
  image: string
}
