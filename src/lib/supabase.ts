
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xevkafxqayoxkakzhjev.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhldmthZnhxYXlveGtha3poamV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMjIyOTcsImV4cCI6MjA2NTg5ODI5N30.GO3lYAUKb2LLf1N-Yo2NpVD7qLaWj9bRgCbKBkAmGQE"

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
