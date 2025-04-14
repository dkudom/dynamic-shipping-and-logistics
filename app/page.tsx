"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Menu,
  Package2,
  Truck,
  Twitter,
  ArrowRight,
  Star,
  Shield,
  Clock,
  Globe,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { AnimatedNumber } from "@/components/ui/animated-number"
import { CountUp } from "@/components/ui/count-up"

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const testimonials = [
    {
      quote:
        "Dynamic Shipping and Logistics made my business deliveries seamless! Their tracking system gives me peace of mind knowing exactly where my packages are.",
      name: "John Mintah",
      title: "Business Owner",
      image: "/man.jpg",
      rating: 5,
    },
    {
      quote:
        "I love the real-time tracking feature! It's incredibly accurate and the interface is so easy to use. Best shipping service I've tried.",
      name: "Elsie Gerado",
      title: "Individual Customer",
      image: "/woman.jpg",
      rating: 5,
    },
    {
      quote:
        "Fast and reliable service every time. Their customer support team is responsive and always goes above and beyond to help.",
      name: "Michael Effum",
      title: "Business Owner",
      image: "/Kente.jpg",
      rating: 4,
    },
  ]

  const features = [
    {
      icon: <Truck className="h-6 w-6 text-white" />,
      title: "Fast Shipping",
      description: "Deliver your packages quickly with our air, sea, and ground options.",
      color: "from-[#003087] to-[#0055d4]",
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Real-Time Tracking",
      description: "Track your shipment's journey with live updates and maps.",
      color: "from-black to-[#333]",
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Secure Payments",
      description: "Pay with confidence using Stripe or PayPal.",
      color: "from-[#003087] to-[#0055d4]",
    },
  ]

  const stats = [
    { value: 1000, label: "Customers", icon: <Globe className="h-5 w-5" /> },
    { value: 150, label: "Countries", icon: <Globe className="h-5 w-5" /> },
    { value: 99.8, label: "% On-time Delivery", icon: <Clock className="h-5 w-5" /> },
    { value: 24, label: "Hours Support", icon: <CheckCircle2 className="h-5 w-5" /> },
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/70 backdrop-blur-xl px-4 md:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between mx-auto max-w-7xl">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground relative group">
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
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Dynamic</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link href="/" className="relative px-3 py-2 text-sm font-medium text-foreground group">
              <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/features" className="relative px-3 py-2 text-sm font-medium text-foreground group">
              <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              <span className="relative z-10">Features</span>
              <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/faq" className="relative px-3 py-2 text-sm font-medium text-foreground group">
              <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              <span className="relative z-10">FAQ</span>
              <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/contact" className="relative px-3 py-2 text-sm font-medium text-foreground group">
              <span className="absolute inset-0 w-full h-full bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
              <span className="relative z-10">Contact Us</span>
              <span className="absolute bottom-1 left-1/2 w-5 h-0.5 bg-primary transform -translate-x-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <div className="ml-2 h-6 w-px bg-border/50"></div>
            <Link href="/signin" className="ml-2">
              <Button className="bg-primary/90 text-primary-foreground hover:bg-primary relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <span className="relative z-10 flex items-center">
                  Sign In
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </Link>
            <div className="ml-1">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
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
                  <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-lg bg-primary/20 blur-sm"></div>
                      <Package2 className="relative h-6 w-6 text-primary" />
                    </div>
                    <span>
                      <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Dynamic Shipping and Logistics</span> 
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground relative group">
                    <span className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    <X className="relative h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col gap-1">
                  <Link
                    href="/"
                    className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/features"
                    className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="/faq"
                    className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/contact"
                    className="relative px-3 py-2.5 text-sm font-medium text-foreground rounded-lg hover:bg-primary/10 transition-colors duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <div className="h-px bg-border/50 my-2"></div>
                  <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="mt-2 w-full bg-primary/90 text-primary-foreground hover:bg-primary relative overflow-hidden group">
                      <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                      <span className="relative z-10 flex items-center justify-center w-full">
                        Sign In
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </Button>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-br from-background to-primary/20 overflow-hidden"
          aria-label="Hero section"
        >
          {/* Background elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <Image
                src="/hero.jpg"
                alt="Cargo ship at sea"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>

            {/* Abstract shapes */}
            <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
            <div className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-background/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
              <div className="flex flex-col space-y-6">
                <div className="inline-flex items-center rounded-full border border-border bg-background/5 px-3 py-1 text-sm text-foreground backdrop-blur-sm">
                  <span className="mr-2 flex h-2 w-2 rounded-full bg-[#2ECC71]"></span>
                  Trusted by 1,000+ Customers Worldwide
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Reliable Shipping,{" "}
                  <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
                    Worldwide
                  </span>
                </h1>

                <p className="max-w-md text-lg text-foreground/80">
                  Book, track, and manage your shipments with ease. Experience logistics reimagined for the modern
                  business.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signin">
                    <Button className="group relative overflow-hidden rounded-lg bg-foreground px-6 py-6 text-primary shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-foreground/90">
                      <div className="absolute inset-0 bg-background/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                      <div className="relative flex items-center justify-center gap-2">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        <span className="font-medium">Sign In with Google</span>
                      </div>
                    </Button>
                  </Link>

                  <Link href="/learn-more">
                    <Button
                      variant="outline"
                      className="group relative overflow-hidden rounded-lg border-border bg-background/5 px-6 py-6 text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-background/10"
                    >
                      <div className="relative flex items-center justify-center gap-2">
                        <span className="font-medium">Learn More</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path
                            d="M6.5 12.5L11 8L6.5 3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden md:block relative">
                <div className="relative z-10 rounded-2xl bg-gradient-to-br from-background/80 to-primary/80 p-1 shadow-2xl backdrop-blur-sm">
                  <div className="overflow-hidden rounded-xl bg-gradient-to-br from-background to-primary">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src="/hero1.jpg"
                        alt="Shipping logistics visualization"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent"></div>

                      {/* Floating elements */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between rounded-lg bg-background/10 p-3 backdrop-blur-md">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                              <Package2 className="h-5 w-5 text-foreground" />
                            </div>
                            <div>
                              <div className="text-xs text-foreground/70">Tracking Number</div>
                              <div className="text-sm font-medium text-foreground">ESS-12345-890</div>
                            </div>
                          </div>
                          <div className="rounded-md bg-[#2ECC71]/20 px-2 py-1">
                            <span className="text-xs font-medium text-[#2ECC71]">In Transit</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-background blur-2xl"></div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-12 bg-cta-bg">
          <div className="absolute inset-0 bg-gradient-to-b from-cta-bg to-primary/5"></div>
          
          {/* Decorative elements */}
          <div className="absolute -left-20 top-1/3 h-40 w-40 rounded-full bg-primary/10 blur-2xl"></div>
          <div className="absolute -right-20 bottom-1/3 h-40 w-40 rounded-full bg-primary/10 blur-2xl"></div>
          
          <div className="container relative mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="group relative flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-primary/10 text-primary">
                    <div className="text-primary">{stat.icon}</div>
                  </div>
                  <div className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    <CountUp 
                      end={stat.value} 
                      duration={2.5}
                      decimals={stat.value % 1 === 0 ? 0 : 1}
                      suffix={stat.value === 24 ? "h" : ""}
                    />
                  </div>
                  <div className="mt-2 text-sm text-foreground/60 group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  {/* Decorative element */}
                  <div className="absolute -top-2 -left-2 h-12 w-12 rounded-full bg-primary/10 blur-3xl"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative overflow-hidden bg-cta-bg">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-cta-bg to-primary/5"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
          
          {/* Decorative elements */}
          <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute left-1/2 top-1/3 h-40 w-40 rounded-full bg-primary/5 blur-2xl transform -translate-x-1/2"></div>
          
          <div className="container relative mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 relative inline-block">
                <span className="relative z-10">Why Choose Us?</span>
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30 rounded-full transform skew-x-12"></span>
              </h2>
              <p className="mt-6 text-foreground/60 max-w-2xl mx-auto text-lg">
                We offer comprehensive shipping solutions tailored to your needs, with cutting-edge technology and
                exceptional customer service.
              </p>
            </div>

            {/* iPhone Mock with Tracking App */}
            <div className="flex justify-center mb-16">
              <div className="relative w-[280px] h-[570px] transform hover:scale-105 transition-all duration-700 hover:rotate-1">
                {/* iPhone Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-[60px] shadow-xl overflow-hidden border-8 border-gray-800">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-7 bg-gray-900 rounded-b-3xl z-10"></div>
                  
                  {/* Screen Content */}
                  <div className="absolute inset-0 overflow-hidden rounded-[52px] bg-background">
                    {/* Status Bar */}
                    <div className="h-10 bg-primary/5 flex items-center justify-between px-6">
                      <span className="text-xs font-medium text-foreground">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                              d="M12 20.9994C16.4183 20.9994 20 17.4177 20 12.9994C20 8.58114 16.4183 4.99945 12 4.99945C7.58172 4.99945 4 8.58114 4 12.9994C4 17.4177 7.58172 20.9994 12 20.9994Z"></path>
                          </svg>
                        </div>
                        <div className="w-4 h-4">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path
                              d="M1.33333 12.8333C1.33333 7.31083 5.81083 2.83333 11.3333 2.83333C16.8558 2.83333 21.3333 7.31083 21.3333 12.8333C21.3333 18.3558 16.8558 22.8333 11.3333 22.8333H1.33333V12.8333Z"></path>
                          </svg>
                        </div>
                        <div className="w-6 h-3 bg-foreground rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="px-4 py-6 bg-primary">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Package2 className="h-5 w-5 text-white" />
                          <span className="text-white font-semibold">Dynamic Tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                            >
                              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tracking Content */}
                    <div className="px-4 py-4">
                      <div className="rounded-xl bg-background shadow-lg border border-border/40 p-4 mb-4 hover:border-primary/40 transition-colors duration-300">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-medium text-foreground/70">Tracking Number</span>
                          <span className="text-xs font-medium text-primary">ESS-12345-890</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-medium text-foreground/70">Status</span>
                          <span className="text-xs font-medium text-[#2ECC71]">In Transit</span>
                        </div>
                        <div className="mt-4">
                          <div className="relative">
                            <div className="absolute top-1.5 left-2 w-[calc(100%-16px)] h-1 bg-gray-200 rounded-full"></div>
                            <div className="absolute top-1.5 left-2 w-3/4 h-1 bg-primary rounded-full animate-pulse"></div>
                            <div className="flex justify-between relative">
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-primary"></div>
                                <span className="text-[10px] mt-1 text-foreground/70">Shipped</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-primary"></div>
                                <span className="text-[10px] mt-1 text-foreground/70">In Transit</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                                <span className="text-[10px] mt-1 text-foreground/70">Delivered</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-xl bg-background shadow-lg border border-border/40 p-4 hover:border-primary/40 transition-colors duration-300">
                        <h4 className="text-sm font-semibold mb-3">Shipment Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-xs text-foreground/70">Origin</span>
                            <span className="text-xs font-medium">New York, NY</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-foreground/70">Destination</span>
                            <span className="text-xs font-medium">Accra, Ghana</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-xs text-foreground/70">Estimated Delivery</span>
                            <span className="text-xs font-medium">Mar 31, 2025</span>
                          </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-border/40">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <span className="text-xs font-medium block">Current Location</span>
                              <span className="text-[10px] text-foreground/70">Chicago, IL - Local Facility</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -right-10 -top-5 h-16 w-16 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
                <div className="absolute -left-5 bottom-20 h-12 w-12 rounded-full bg-primary/20 blur-lg animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Reflection Effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[52px] opacity-30 pointer-events-none"></div>
                
                {/* Bottom Button */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-gray-700 rounded-full"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                >
                  {/* Card background with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-3xl border border-border/40 group-hover:border-primary/30 transition-colors duration-500"></div>
                  <div className="absolute inset-[1px] rounded-[23px] bg-background/80 backdrop-blur-sm"></div>
                  
                  {/* Content container */}
                  <div className="relative h-full p-8 flex flex-col">
                    {/* Feature icon with 3D effect */}
                    <div className="relative mb-8">
                      <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                        <div className="text-primary transform group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                      </div>
                    </div>
                    
                    {/* Feature content with improved typography */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                    </div>
                    
                    {/* Feature highlight with animation */}
                    <div className="mt-auto pt-6">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Shield className="h-4 w-4 transform group-hover:scale-110 transition-transform duration-300" />
                        <span className="relative">
                          Guaranteed excellence
                          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-500"></span>
                        </span>
                      </div>
                    </div>
                    
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-primary/10 transform rotate-45 translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/20 transition-colors duration-500"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/features">
                <Button className="relative overflow-hidden bg-primary/10 text-primary hover:bg-primary/20 backdrop-blur-sm border border-primary/20 px-6 py-2.5 rounded-xl group">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative flex items-center">
                    View All Features
                    <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/10"></div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
          
          <div className="container relative mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary backdrop-blur-sm mb-4">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[#2ECC71]"></span>
                Customer Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Customers Say</h2>
              <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say about their experience with
                Dynamic Shipping and Logistics.
              </p>
            </div>

            {/* Desktop Testimonials */}
            <div className="hidden md:block relative">
              <div className="relative mx-auto max-w-4xl overflow-hidden px-12">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="relative rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-8 shadow-lg">
                        <div className="absolute -right-2 -top-2 h-20 w-20 text-primary/10">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                            <path
                              d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                        </div>
                        <div className="flex items-center mb-6">
                          <div className="mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/5">
                            <Image
                              src={testimonial.image || "/man.jpg"}
                              alt={`${testimonial.name} profile picture`}
                              width={64}
                              height={64}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-foreground">{testimonial.name}</div>
                            <div className="text-sm text-foreground/60">{testimonial.title}</div>
                            <div className="mt-1 flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < testimonial.rating ? "fill-primary text-primary" : "text-foreground/20"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-lg text-foreground/80 italic">"{testimonial.quote}"</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 text-foreground border border-border bg-background/80 backdrop-blur-sm hover:bg-background/10 rounded-full h-10 w-10 shadow-lg"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-foreground border border-border bg-background/80 backdrop-blur-sm hover:bg-background/10 rounded-full h-10 w-10 shadow-lg"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Testimonial indicators */}
              <div className="mt-8 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? "bg-primary w-8" : "bg-foreground/20 w-2 hover:bg-foreground/40"
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Testimonials */}
            <div className="md:hidden">
              <div className="relative rounded-2xl border border-border/40 bg-background/50 backdrop-blur-sm p-6 shadow-lg">
                <div className="absolute -right-2 -top-2 h-16 w-16 text-primary/10">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
                    <path
                      d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="flex items-center mb-6">
                  <div className="mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-primary/20 bg-primary/5">
                    <Image
                      src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                      alt={`${testimonials[activeTestimonial].name} profile picture`}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-base font-bold text-foreground">{testimonials[activeTestimonial].name}</div>
                    <div className="text-xs text-foreground/60">{testimonials[activeTestimonial].title}</div>
                    <div className="mt-1 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < testimonials[activeTestimonial].rating
                              ? "fill-primary text-primary"
                              : "text-foreground/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-base text-foreground/80 italic">"{testimonials[activeTestimonial].quote}"</p>
              </div>
              <div className="mt-6 flex justify-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="text-foreground border border-border bg-background/50 backdrop-blur-sm hover:bg-background/10 rounded-full h-8 w-8 shadow-md"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === activeTestimonial ? "bg-primary w-6" : "bg-foreground/20 w-2 hover:bg-foreground/40"
                      }`}
                      onClick={() => setActiveTestimonial(index)}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-foreground border border-border bg-background/50 backdrop-blur-sm hover:bg-background/10 rounded-full h-8 w-8 shadow-md"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-24 overflow-hidden bg-cta-bg">
          <div className="absolute inset-0 bg-gradient-to-br from-cta-bg/50 to-primary/20"></div>
          
          {/* Decorative elements */}
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
          
          <div className="relative container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="rounded-3xl border border-border/40 bg-background/30 backdrop-blur-md p-8 md:p-12 shadow-xl">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary backdrop-blur-sm mb-4">
                    <span className="mr-2 flex h-2 w-2 rounded-full bg-[#2ECC71]"></span>
                    Get Started Today
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-cta-text mb-6">Ready to Ship with Us?</h2>
                  <p className="text-lg text-cta-text/70 mb-10 max-w-xl mx-auto">
                    Join thousands of satisfied customers who trust Dynamic Shipping and Logistics for their logistics needs.
                  </p>

                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link href="/get-started">
                      <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                        <div className="relative flex items-center justify-center gap-2">
                          Get Started
                          <ArrowRight className="h-5 w-5" />
                        </div>
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="border-border bg-background/40 text-foreground hover:bg-background/60 px-8 py-6 text-lg rounded-xl backdrop-blur-sm"
                      >
                        <div className="relative flex items-center justify-center gap-2">
                          Contact Sales
                        </div>
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2ECC71]/20">
                      <CheckCircle2 className="h-5 w-5 text-[#2ECC71]" />
                    </div>
                    <span className="text-foreground/80">No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2ECC71]/20">
                      <CheckCircle2 className="h-5 w-5 text-[#2ECC71]" />
                    </div>
                    <span className="text-foreground/80">Cancel anytime</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2ECC71]/20">
                      <CheckCircle2 className="h-5 w-5 text-[#2ECC71]" />
                    </div>
                    <span className="text-foreground/80">24/7 support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-background border-t border-border/30 pt-16 pb-10 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none"></div>
        <div className="absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -right-32 bottom-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="md:col-span-4 space-y-6">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-all duration-300"></div>
                  <div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-full p-2">
                    <Package2 className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <div className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Dynamic Shipping and Logistics</span>
                </div>
              </Link>
              
              <p className="text-foreground/60 text-sm leading-relaxed">
                Delivering Excellence Worldwide. Fast, reliable shipping solutions for businesses and individuals with real-time tracking and exceptional service.
              </p>
              
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border/40 text-foreground/70 hover:text-primary hover:border-primary/40 hover:shadow-md transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border/40 text-foreground/70 hover:text-primary hover:border-primary/40 hover:shadow-md transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border/40 text-foreground/70 hover:text-primary hover:border-primary/40 hover:shadow-md transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background border border-border/40 text-foreground/70 hover:text-primary hover:border-primary/40 hover:shadow-md transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-2">
              <h3 className="text-foreground font-semibold mb-4 text-sm tracking-wider uppercase relative inline-block">
                Company
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/70 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>About Us</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Careers</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Blog</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Press</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Services */}
            <div className="md:col-span-2">
              <h3 className="text-foreground font-semibold mb-4 text-sm tracking-wider uppercase relative inline-block">
                Services
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/70 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/international" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>International</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/services/domestic" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Domestic</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/services/express" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Express</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/services/ecommerce" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>E-commerce</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Support */}
            <div className="md:col-span-2">
              <h3 className="text-foreground font-semibold mb-4 text-sm tracking-wider uppercase relative inline-block">
                Support
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/70 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/help" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Help Center</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Contact Us</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>FAQs</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
                <li>
                  <Link href="/tracking" className="text-foreground/60 hover:text-primary text-sm transition-colors duration-200 inline-flex items-center gap-1 group">
                    <span>Tracking</span>
                    <ArrowRight className="h-3 w-0 group-hover:w-3 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div className="md:col-span-2">
              <h3 className="text-foreground font-semibold mb-4 text-sm tracking-wider uppercase relative inline-block">
                Stay Updated
                <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary/70 rounded-full"></span>
              </h3>
              <p className="text-foreground/60 text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-border/40 focus:border-primary/50 focus:ring-1 focus:ring-primary/30 text-foreground/80 text-sm transition-all duration-200"
                />
                <button className="absolute right-1.5 top-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md px-3 py-1 text-xs font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-foreground/50 text-xs">
              &copy; {new Date().getFullYear()} Dynamic Shipping and Logistics. All rights reserved. | Developed by <a href="https://wa.me/233542855399" className="text-foreground/50 hover:text-primary text-xs transition-colors duration-200">Ecstasy Geospatial Services</a>
            </div>
            
            <div className="flex gap-6">
              <Link href="/privacy" className="text-foreground/50 hover:text-primary text-xs transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-foreground/50 hover:text-primary text-xs transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-foreground/50 hover:text-primary text-xs transition-colors duration-200">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
