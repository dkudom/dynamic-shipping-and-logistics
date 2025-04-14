"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, Clock, Download, Filter, MapPin, Package, Search, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import { ShipmentService } from "@/lib/db-service"
import { Shipment } from "@/lib/db-service"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { DashboardNavbar } from "@/components/dashboard-navbar"

export default function ShipmentHistoryPage() {
  const { user } = useSupabaseAuth()
  const { toast } = useToast()
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateSort, setDateSort] = useState("newest")
  
  // Fetch shipments from Supabase
  useEffect(() => {
    async function fetchShipments() {
      if (!user) return
      
      try {
        const data = await ShipmentService.getByUserId(user.id)
        setShipments(data)
      } catch (error) {
        console.error("Error fetching shipments:", error)
        toast({
          title: "Error",
          description: "Failed to load shipment history",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchShipments()
  }, [user, toast])
  
  // Filter and sort shipments
  const filteredShipments = shipments
    .filter(shipment => {
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          shipment.tracking_number.toLowerCase().includes(query) ||
          shipment.origin_address.toLowerCase().includes(query) ||
          shipment.destination_address.toLowerCase().includes(query)
        )
      }
      return true
    })
    .filter(shipment => {
      // Apply status filter
      if (statusFilter !== "all") {
        return shipment.status === statusFilter
      }
      return true
    })
    .sort((a, b) => {
      // Apply date sorting
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      
      if (dateSort === "newest") {
        return dateB - dateA
      } else {
        return dateA - dateB
      }
    })
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "in_transit":
        return "bg-amber-500";
      case "pending":
        return "bg-blue-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  }
  
  const getStatusLabel = (status: string) => {
    return status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <div className="container max-w-7xl py-8 mx-auto px-4">
        <div className="mb-8">
          <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-primary">
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Shipment History</h1>
          <p className="mt-2 text-muted-foreground">
            View and track all your past and current shipments.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Shipment Records
            </CardTitle>
            <CardDescription>
              A comprehensive view of all your shipments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search shipments..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col gap-2 sm:flex-row">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in_transit">In Transit</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={dateSort} onValueChange={setDateSort}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {loading ? (
              <div className="mt-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col space-y-2">
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
              </div>
            ) : filteredShipments.length === 0 ? (
              <div className="mt-10 flex flex-col items-center justify-center text-center">
                <Package className="h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No shipments found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {searchQuery || statusFilter !== "all" ? 
                    "Try adjusting your filters" : 
                    "You haven't created any shipments yet"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Button asChild className="mt-4">
                    <Link href="/book-shipment">Book Your First Shipment</Link>
                  </Button>
                )}
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredShipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-medium">{shipment.tracking_number}</TableCell>
                        <TableCell>{formatDate(shipment.created_at)}</TableCell>
                        <TableCell className="max-w-[150px] truncate" title={shipment.origin_address}>
                          {shipment.origin_address.split(',')[0]}
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate" title={shipment.destination_address}>
                          {shipment.destination_address.split(',')[0]}
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(shipment.status)} text-white border-0`}
                          >
                            {getStatusLabel(shipment.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>{shipment.shipping_method}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              asChild
                            >
                              <Link href={`/track-shipment?tracking=${shipment.tracking_number}`}>
                                <Truck className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {filteredShipments.length > 0 && (
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 