import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique tracking number for shipments
 * Format: DSL-YYYYMMDD-XXXXX (where XXXXX is a random 5-digit number)
 */
export function generateTrackingNumber(): string {
  const prefix = 'DSL'
  const date = new Date()
  const dateString = date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0')
  const randomDigits = Math.floor(10000 + Math.random() * 90000).toString()
  
  return `${prefix}-${dateString}-${randomDigits}`
}
