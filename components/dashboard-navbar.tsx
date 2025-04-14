"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Package2, Menu, X, LogOut, User, Settings, Bell } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function DashboardNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, signOut } = useSupabaseAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const userInitials = user?.user_metadata?.first_name
    ? getInitials(`${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`)
    : "U"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-lg px-4 md:px-6 lg:px-10">
      <div className="flex h-16 items-center justify-between mx-auto max-w-7xl">
        <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-foreground relative group">
          <div className="absolute -inset-2 rounded-lg bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-md"></div>
          <div className="relative flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-sm transform group-hover:scale-110 transition-transform duration-300"></div>
              <Package2 className="relative h-7 w-7 text-primary transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="hidden sm:inline-block relative">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Dynamic</span> Shipping and Logistics
            </span>
            <span className="inline-block sm:hidden relative">
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">DS</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          <Link href="/dashboard" className="relative px-3 py-2 text-sm font-medium text-foreground group">
            <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="relative z-10">Dashboard</span>
            <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link href="/book-shipment" className="relative px-3 py-2 text-sm font-medium text-foreground group">
            <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="relative z-10">Book Shipment</span>
            <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link href="/track-shipment" className="relative px-3 py-2 text-sm font-medium text-foreground group">
            <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="relative z-10">Track</span>
            <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          <Link href="/shipment-history" className="relative px-3 py-2 text-sm font-medium text-foreground group">
            <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            <span className="relative z-10">History</span>
            <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Link>
          
          <div className="ml-2 h-6 w-px bg-border/50"></div>
          
          <div className="flex items-center gap-2 ml-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">2</Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.first_name || "User"} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">2</Badge>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={user?.user_metadata?.first_name || "User"} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <ThemeToggle />
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="text-foreground relative group">
                <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <Menu className="relative h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] bg-background/95 border-border backdrop-blur-lg">
              <div className="flex justify-between items-center mb-8">
                <Link href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-foreground">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-lg bg-primary/20 blur-sm"></div>
                    <Package2 className="relative h-6 w-6 text-primary" />
                  </div>
                  <span>
                    <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Dynamic</span>
                  </span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground relative group">
                  <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                  <X className="relative h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-1">
                <Link
                  href="/dashboard"
                  className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/book-shipment"
                  className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Shipment
                </Link>
                <Link
                  href="/track-shipment"
                  className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Track Shipment
                </Link>
                <Link
                  href="/shipment-history"
                  className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shipment History
                </Link>
                <Link
                  href="/profile"
                  className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <div className="h-px bg-border/50 my-2"></div>
                <button
                  className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300 text-left"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    handleSignOut()
                  }}
                >
                  Log out
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
