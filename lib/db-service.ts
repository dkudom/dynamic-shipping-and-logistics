import supabase from './supabase'

// Types
export interface Shipment {
  id?: string
  user_id: string
  tracking_number: string
  status: 'pending' | 'in_transit' | 'delivered' | 'cancelled'
  origin_address: string
  destination_address: string
  package_weight: number
  package_dimensions: string
  shipping_method: string
  estimated_delivery: string
  created_at?: string
}

export interface Profile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  company?: string
  preferred_shipping_method?: string
  avatar_url?: string
}

// Shipment Service
export const ShipmentService = {
  // Create a new shipment
  async create(shipment: Omit<Shipment, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('shipments')
      .insert(shipment)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get a shipment by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get shipments by user ID
  async getByUserId(userId: string) {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get shipment by tracking number
  async getByTrackingNumber(trackingNumber: string) {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single()
    
    if (error) throw error
    return data
  },

  // Update a shipment
  async update(id: string, updates: Partial<Shipment>) {
    const { data, error } = await supabase
      .from('shipments')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete a shipment
  async delete(id: string) {
    const { error } = await supabase
      .from('shipments')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Profile Service
export const ProfileService = {
  // Get user profile
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  // Update user profile
  async updateProfile(userId: string, updates: Partial<Profile>) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Create a new profile (typically after registration)
  async createProfile(profile: Profile) {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
} 