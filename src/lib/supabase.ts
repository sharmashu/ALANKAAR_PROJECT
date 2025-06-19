
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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
