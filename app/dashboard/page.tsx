"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShipmentHistory } from "@/components/shipment-history"
import { RecentShipments } from "@/components/recent-shipments"
import { ShippingStats } from "@/components/shipping-stats"
import { toast } from "sonner"
import { getShipmentStats, ShipmentStats as ShipmentStatsType } from "@/lib/shipment-service"
import { DashboardNavbar } from "@/components/dashboard-navbar"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useSupabaseAuth()
  const router = useRouter()
  const [stats, setStats] = useState<ShipmentStatsType>({
    activeShipments: 0,
    deliveredShipments: 0,
    totalSpent: 0
  })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/signin")
    } else if (isAuthenticated) {
      toast.success(`Welcome back, ${user?.user_metadata?.first_name || 'User'}!`)
    }
  }, [isLoading, isAuthenticated, router, user])
  
  useEffect(() => {
    async function loadShipmentStats() {
      if (!user) return
      
      try {
        setStatsLoading(true)
        const shipmentStats = await getShipmentStats(user.id)
        setStats(shipmentStats)
      } catch (error) {
        console.error('Error loading shipment stats:', error)
        toast.error('Failed to load shipment statistics')
      } finally {
        setStatsLoading(false)
      }
    }
    
    loadShipmentStats()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.user_metadata?.first_name || 'User'}</h1>
        <p className="text-muted-foreground">
          Here's an overview of your shipping activity
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Shipments</CardTitle>
            <CardDescription>Currently in transit</CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                <span className="text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold">{stats.activeShipments}</div>
                <Button variant="link" className="p-0 h-auto font-normal text-sm" onClick={() => router.push('/active-shipments')}>
                  View active shipments
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Delivered</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                <span className="text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold">{stats.deliveredShipments}</div>
                <Button variant="link" className="p-0 h-auto font-normal text-sm" onClick={() => router.push('/shipment-history')}>
                  View delivery history
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Spent</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                <span className="text-muted-foreground">Loading...</span>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold">₵{stats.totalSpent.toFixed(2)}</div>
                <Button variant="link" className="p-0 h-auto font-normal text-sm" onClick={() => router.push('/billing')}>
                  View billing details
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Shipments</CardTitle>
              <CardDescription>Your last 5 shipments</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentShipments />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/book-shipment")}>
                  + Book New Shipment
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/track-shipment")}>
                  Track Shipment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  Calculate Shipping Cost
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => router.push("/shipment-history")}>
                  View Shipping History
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Statistics</CardTitle>
            <CardDescription>Last 30 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ShippingStats />
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Shipment History</CardTitle>
            <CardDescription>View your delivery performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ShipmentHistory />
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  )
} 