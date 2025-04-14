'use client'

import supabase from './supabase'
import { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  created_at?: string
  updated_at?: string
}

export interface ShippingData {
  id?: string
  user_id: string
  tracking_number: string
  status: string
  origin: string
  destination: string
  weight?: number
  dimensions?: string
  shipping_method?: string
  estimated_delivery?: string
  actual_delivery?: string
  created_at?: string
  updated_at?: string
}

/**
 * Fetch user profile data from Supabase
 */
export async function getUserProfile(user: User | null): Promise<UserProfile | null> {
  if (!user) return null

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data as UserProfile
  } catch (error) {
    console.error('Exception fetching user profile:', error)
    return null
  }
}

/**
 * Update user profile data in Supabase
 */
export async function updateUserProfile(
  userId: string,
  profileData: Partial<UserProfile>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred updating profile'
    }
  }
}

/**
 * Get all shipments for a user
 */
export async function getUserShipments(userId: string): Promise<ShippingData[]> {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching shipments:', error)
      return []
    }

    return data as ShippingData[]
  } catch (error) {
    console.error('Exception fetching shipments:', error)
    return []
  }
}

/**
 * Get a specific shipment by tracking number
 */
export async function getShipmentByTrackingNumber(trackingNumber: string): Promise<ShippingData | null> {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_number', trackingNumber)
      .single()

    if (error) {
      console.error('Error fetching shipment:', error)
      return null
    }

    return data as ShippingData
  } catch (error) {
    console.error('Exception fetching shipment:', error)
    return null
  }
}

/**
 * Create a new shipment
 */
export async function createShipment(
  shipmentData: ShippingData
): Promise<{ success: boolean; error?: string; data?: ShippingData }> {
  try {
    const { data, error } = await supabase
      .from('shipments')
      .insert(shipmentData)
      .select()
      .single()

    if (error) {
      return {
        success: false,
        error: error.message
      }
    }

    return { 
      success: true,
      data: data as ShippingData
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An error occurred creating shipment'
    }
  }
}
