"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Bell,
  ChevronDown,
  Clock,
  FileText,
  Home,
  LogOut,
  MapPin,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  User,
  X,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/lib/auth"

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { session, logout } = useAuth()
  const userName = session?.user?.name || "User"

  const handleLogout = async () => {
    await logout()
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background px-4 md:px-6">
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
              <div className="flex h-16 items-center border-b border-border px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                <Package2 className="h-6 w-6" />
                  <span>Dynamic Shipping and Logistics</span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setIsSidebarOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="grid gap-2 p-4">
              <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-all"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                  href="/book-shipment"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
              >
                <Package className="h-5 w-5" />
                Book Shipment
              </Link>
              <Link
                  href="/track-shipment"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
              >
                <MapPin className="h-5 w-5" />
                Track Shipment
              </Link>
              <Link
                  href="/shipment-history"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
              >
                <Clock className="h-5 w-5" />
                Shipment History
              </Link>
              <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary md:ml-0">
          <Package2 className="h-6 w-6" />
            <span className="hidden md:inline-block">Dynamic Shipping and Logistics</span>
            <span className="inline-block md:hidden">Dynamic</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 text-foreground hover:text-primary">
                  <span className="hidden md:inline-block">{userName}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
                  </Link>
              </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
                  </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
          <aside className="hidden w-64 flex-col border-r border-border bg-muted/50 dark:bg-muted/20 md:flex">
          <nav className="grid gap-2 p-4">
            <Link
                href="/dashboard"
                className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-all"
            >
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
                href="/book-shipment"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
            >
              <Package className="h-5 w-5" />
              Book Shipment
            </Link>
            <Link
                href="/track-shipment"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
            >
              <MapPin className="h-5 w-5" />
              Track Shipment
            </Link>
            <Link
                href="/shipment-history"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
            >
              <Clock className="h-5 w-5" />
              Shipment History
            </Link>
            <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
            >
              <User className="h-5 w-5" />
              Profile
            </Link>
          </nav>
        </aside>
        {/* Main content */}
          <main className="flex-1 bg-background">
          {/* Welcome Banner */}
          <div className="relative h-[200px] w-full">
              <div className="absolute inset-0 bg-primary/30 z-10"></div>
            <Image
                src="/hero.jpg?height=200&width=1200"
              alt="Logistics banner"
              width={1200}
              height={200}
                className="h-full w-full object-cover dark:opacity-50"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-10">
                <h1 className="text-2xl font-bold text-background dark:text-foreground md:text-3xl">Welcome, {userName}!</h1>
                <p className="mt-2 text-base text-background dark:text-foreground md:text-lg">Manage your shipments with ease.</p>
                <Button className="mt-4 self-start bg-background text-primary hover:bg-background/90 md:self-auto md:absolute md:right-10 md:top-1/2 md:-translate-y-1/2">
                Book a Shipment
              </Button>
            </div>
          </div>

          <div className="p-6">
            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Active Shipments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 from last week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Delivered This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+5 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Shipments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">-1 from yesterday</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Shipments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-xs text-muted-foreground">Since you joined</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
                <h2 className="text-xl font-bold text-primary">Quick Actions</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <Card className="bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                      <Package className="h-10 w-10 text-primary" />
                      <h3 className="mt-4 text-lg font-medium text-primary">Book a Shipment</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">Create a new shipment request</p>
                  </CardContent>
                </Card>
                  <Card className="bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                      <MapPin className="h-10 w-10 text-primary" />
                      <h3 className="mt-4 text-lg font-medium text-primary">Track a Package</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">Check your shipment status</p>
                  </CardContent>
                </Card>
                  <Card className="bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
                  <CardContent className="flex flex-col items-center justify-center p-6">
                      <FileText className="h-10 w-10 text-primary" />
                      <h3 className="mt-4 text-lg font-medium text-primary">Generate Report</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">Create shipping reports</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent Shipments */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-primary">Recent Shipments</h2>
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search shipments..." className="pl-8" />
                </div>
              </div>
                <div className="mt-4 rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking ID</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">ESS-12345</TableCell>
                      <TableCell>New York, USA</TableCell>
                      <TableCell className="hidden md:table-cell">Mar 28, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Express</TableCell>
                      <TableCell>
                          <Badge className="bg-amber-500 text-white">In Transit</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ESS-12344</TableCell>
                      <TableCell>London, UK</TableCell>
                      <TableCell className="hidden md:table-cell">Mar 25, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Standard</TableCell>
                      <TableCell>
                          <Badge className="bg-green-500 text-white">Delivered</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ESS-12343</TableCell>
                      <TableCell>Tokyo, Japan</TableCell>
                      <TableCell className="hidden md:table-cell">Mar 22, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Express</TableCell>
                      <TableCell>
                          <Badge className="bg-green-500 text-white">Delivered</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ESS-12342</TableCell>
                      <TableCell>Sydney, Australia</TableCell>
                      <TableCell className="hidden md:table-cell">Mar 20, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Standard</TableCell>
                      <TableCell>
                          <Badge className="bg-red-500 text-white">Delayed</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">ESS-12341</TableCell>
                      <TableCell>Paris, France</TableCell>
                      <TableCell className="hidden md:table-cell">Mar 18, 2023</TableCell>
                      <TableCell className="hidden md:table-cell">Express</TableCell>
                      <TableCell>
                          <Badge className="bg-green-500 text-white">Delivered</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 flex justify-center">
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary/5">
                  View All Shipments
                </Button>
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>
      {/* Footer */}
      <footer className="flex h-12 items-center justify-center border-t border-border bg-muted px-4 text-sm">
        <div className="flex gap-6">
          <Link href="#" className="text-primary hover:underline">
            Contact Us
          </Link>
          <Link href="#" className="text-primary hover:underline">
            FAQ
          </Link>
          <Link href="#" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          <Link href="#" className="text-primary hover:underline">
            Terms of Service
          </Link>
        </div>
      </footer>
    </ProtectedRoute>
  )
}
