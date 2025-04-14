"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import supabase from "@/lib/supabase"
import { format } from "date-fns"

type Shipment = {
  id: string
  tracking_number: string
  destination: string
  status: string
  created_at: string
  cost: number
}

export function RecentShipments() {
  const { user } = useSupabaseAuth()
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentShipments() {
      if (!user) return

      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('shipments')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) {
          console.error('Error fetching recent shipments:', error)
          return
        }

        setShipments(data || [])
      } catch (error) {
        console.error('Exception fetching recent shipments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentShipments()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (shipments.length === 0) {
    return (
      <div className="py-4 text-center text-muted-foreground">
        No shipments found. Book your first shipment to get started.
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tracking ID</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Cost</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shipments.map((shipment) => (
          <TableRow key={shipment.id}>
            <TableCell className="font-medium">{shipment.tracking_number}</TableCell>
            <TableCell>{shipment.destination}</TableCell>
            <TableCell>
              <Badge 
                variant={
                  shipment.status === "Delivered" 
                    ? "outline" 
                    : shipment.status === "In Transit" 
                      ? "default" 
                      : "secondary"
                }
              >
                {shipment.status}
              </Badge>
            </TableCell>
            <TableCell>{format(new Date(shipment.created_at), 'yyyy-MM-dd')}</TableCell>
            <TableCell className="text-right">₵{shipment.cost?.toFixed(2) || '0.00'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 