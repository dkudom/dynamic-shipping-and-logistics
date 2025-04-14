"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ChevronLeft, MapPin, Package, Search, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DashboardNavbar } from "@/components/dashboard-navbar"

const trackingFormSchema = z.object({
  trackingNumber: z.string().min(5, "Tracking number must be at least 5 characters"),
})

export default function TrackShipmentPage() {
  const [trackingResult, setTrackingResult] = useState<null | {
    id: string;
    status: "delivered" | "in_transit" | "processing" | "delayed";
    currentLocation: string;
    estimatedDelivery: string;
    lastUpdated: string;
    history: Array<{
      status: string;
      location: string;
      timestamp: string;
      details?: string;
    }>;
  }>(null)
  
  const form = useForm<z.infer<typeof trackingFormSchema>>({
    resolver: zodResolver(trackingFormSchema),
    defaultValues: {
      trackingNumber: "",
    },
  })
  
  function onSubmit(values: z.infer<typeof trackingFormSchema>) {
    // This would normally call an API with the tracking number
    // Mock data for demonstration
    setTrackingResult({
      id: values.trackingNumber,
      status: "in_transit",
      currentLocation: "Memphis, TN Distribution Center",
      estimatedDelivery: "June 15, 2023",
      lastUpdated: "June 10, 2023 at 9:42 AM",
      history: [
        {
          status: "Processing",
          location: "New York, NY",
          timestamp: "June 8, 2023 at 10:15 AM",
          details: "Shipment information received",
        },
        {
          status: "Picked Up",
          location: "New York, NY",
          timestamp: "June 8, 2023 at 2:30 PM",
          details: "Package picked up by carrier",
        },
        {
          status: "In Transit",
          location: "Newark, NJ",
          timestamp: "June 9, 2023 at 6:45 AM",
          details: "Package arrived at sorting facility",
        },
        {
          status: "In Transit",
          location: "Memphis, TN",
          timestamp: "June 10, 2023 at 9:42 AM",
          details: "Package in transit to destination",
        },
      ],
    })
  }
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-500";
      case "in_transit":
        return "bg-amber-500";
      case "processing":
        return "bg-blue-500";
      case "delayed":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <div className="container max-w-5xl py-8 mx-auto px-4">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Track Shipment</h1>
          <p className="mt-2 text-muted-foreground">
            Enter your tracking number to see the current status and location of your shipment.
          </p>
        </div>
        
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Track Your Shipment
              </CardTitle>
              <CardDescription>
                Enter your tracking number to get real-time updates on your shipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="trackingNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tracking Number</FormLabel>
                        <div className="flex space-x-2">
                          <FormControl>
                            <Input placeholder="e.g. DSL-123456" {...field} />
                          </FormControl>
                          <Button type="submit">Track</Button>
                        </div>
                        <FormDescription>
                          Enter the tracking number provided in your shipping confirmation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        {trackingResult && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tracking Details</CardTitle>
                  <Badge className={`${getStatusColor(trackingResult.status)} text-white px-3 py-1 text-sm capitalize`}>
                    {trackingResult.status.replace("_", " ")}
                  </Badge>
                </div>
                <CardDescription>
                  Tracking Number: {trackingResult.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Current Location</div>
                    <div className="font-medium">{trackingResult.currentLocation}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Estimated Delivery</div>
                    <div className="font-medium">{trackingResult.estimatedDelivery}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Last Updated</div>
                    <div className="font-medium">{trackingResult.lastUpdated}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 h-5 w-5" />
                  Shipment Progress
                </CardTitle>
                <CardDescription>
                  Track the journey of your package
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-0">
                  {trackingResult.history.map((event, i) => (
                    <div key={i} className="flex pb-8 last:pb-0">
                      <div className="relative mr-4 flex items-start">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          {event.status.includes("Transit") ? (
                            <Truck className="h-5 w-5" />
                          ) : event.status.includes("Picked") ? (
                            <Package className="h-5 w-5" />
                          ) : (
                            <MapPin className="h-5 w-5" />
                          )}
                        </div>
                        {i < trackingResult.history.length - 1 && (
                          <div className="absolute left-4 top-[18px] bottom-0 w-[1px] bg-border" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <div className="font-medium">{event.status}</div>
                          <div className="text-sm text-muted-foreground">{event.timestamp}</div>
                        </div>
                        <div className="text-sm">{event.location}</div>
                        {event.details && <div className="mt-1 text-sm text-muted-foreground">{event.details}</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center space-x-4">
                <Truck className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-medium">Need assistance with your shipment?</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact our customer support at support@dynamicshipping.com or call us at (800) 123-4567.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 