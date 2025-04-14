"use client"

import { ReactNode, useState } from "react"
import Link from "next/link"
import {
  Bell,
  ChevronDown,
  Clock,
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

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useAuth } from "@/lib/auth"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { session, logout } = useAuth()
  const userName = session?.user?.name || "User"

  const handleLogout = async () => {
    await logout()
  }

  return (
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
                onClick={() => setIsSidebarOpen(false)}
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/book-shipment"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Package className="h-5 w-5" />
                Book Shipment
              </Link>
              <Link
                href="/track-shipment"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                <MapPin className="h-5 w-5" />
                Track Shipment
              </Link>
              <Link
                href="/shipment-history"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Clock className="h-5 w-5" />
                Shipment History
              </Link>
              <Link
                href="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                <User className="h-5 w-5" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Settings
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
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:text-primary transition-all hover:underline"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 bg-background overflow-auto">
          {children}
        </main>
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
    </div>
  )
} 