"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Facebook,
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

export default function LandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const testimonials = [
    {
      quote:
        "Dynamic Shipping and Logistics made my business deliveries seamless! Their tracking system gives me peace of mind knowing exactly where my packages are.",
      name: "John Doe",
      title: "Business Owner",
      image: "/placeholder.svg?height=64&width=64",
      rating: 5,
    },
    {
      quote:
        "I love the real-time tracking feature! It's incredibly accurate and the interface is so easy to use. Best shipping service I've tried.",
      name: "Sarah Lee",
      title: "Individual Customer",
      image: "/placeholder.svg?height=64&width=64",
      rating: 5,
    },
    {
      quote:
        "Fast and reliable service every time. Their customer support team is responsive and always goes above and beyond to help.",
      name: "Mike Brown",
      title: "Business Owner",
      image: "/placeholder.svg?height=64&width=64",
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
    { value: "10K+", label: "Customers", icon: <Globe className="h-5 w-5" /> },
    { value: "150+", label: "Countries", icon: <Globe className="h-5 w-5" /> },
    { value: "99.8%", label: "On-time Delivery", icon: <Clock className="h-5 w-5" /> },
    { value: "24/7", label: "Support", icon: <CheckCircle2 className="h-5 w-5" /> },
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
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-md px-4 md:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Package2 className="h-6 w-6 text-[#003087]" />
          <span className="hidden sm:inline-block">Dynamic Shipping and Logistics</span>
          <span className="inline-block sm:hidden">Dynamic Shipping and Logistics</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="border-b-2 border-[#003087] font-medium text-white">
            Home
          </Link>
          <Link href="/features" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            Features
          </Link>
          <Link href="/faq" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            FAQ
          </Link>
          <Link href="/contact" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            Contact Us
          </Link>
          <Link href="/signin">
            <Button className="ml-4 bg-[#003087] text-white hover:bg-[#003087]/90">Sign In</Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-black/95 border-white/10">
              <div className="flex justify-between items-center mb-8">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
                  <Package2 className="h-6 w-6 text-[#003087]" />
                  <span>Dynamic</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)} className="text-white">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/"
                  className="border-b border-[#003087] font-medium text-white pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/features"
                  className="font-medium text-white hover:border-b hover:border-[#003087] pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/faq"
                  className="font-medium text-white hover:border-b hover:border-[#003087] pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
                <Link
                  href="/contact"
                  className="font-medium text-white hover:border-b hover:border-[#003087] pb-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="mt-4 w-full bg-[#003087] text-white hover:bg-[#003087]/90">Sign In</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          className="relative bg-gradient-to-br from-black to-[#001a4d] overflow-hidden"
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Abstract shapes */}
            <div className="absolute -right-20 top-20 h-64 w-64 rounded-full bg-[#003087]/20 blur-3xl"></div>
            <div className="absolute -left-20 bottom-20 h-64 w-64 rounded-full bg-black/30 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="relative z-10 grid gap-8 md:grid-cols-2 items-center">
              <div className="flex flex-col space-y-6">
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm">
                  <span className="mr-2 flex h-2 w-2 rounded-full bg-[#2ECC71]"></span>
                  Trusted by 10,000+ Customers Worldwide
                </div>

                <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  Reliable Shipping,{" "}
                  <span className="text-[#003087] bg-clip-text text-transparent bg-gradient-to-r from-white to-[#4d88ff]">
                    Worldwide
                  </span>
                </h1>

                <p className="max-w-md text-lg text-white/80">
                  Book, track, and manage your shipments with ease. Experience logistics reimagined for the modern
                  business.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/signin">
                    <Button className="group relative overflow-hidden rounded-lg bg-white px-6 py-6 text-[#003087] shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white">
                      <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
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
                      className="group relative overflow-hidden rounded-lg border-white/20 bg-white/5 px-6 py-6 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                    >
                      <div className="relative flex items-center justify-center gap-2">
                        <span className="font-medium">Learn More</span>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
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
                <div className="relative z-10 rounded-2xl bg-gradient-to-br from-black/80 to-[#001a4d]/80 p-1 shadow-2xl backdrop-blur-sm">
                  <div className="overflow-hidden rounded-xl bg-gradient-to-br from-black to-[#001a4d]">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src="/hero1.jpg" 
                        alt="Shipping logistics visualization"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      {/* Floating elements */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between rounded-lg bg-white/10 p-3 backdrop-blur-md">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003087]">
                              <Package2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="text-xs text-white/70">Tracking Number</div>
                              <div className="text-sm font-medium text-white">ESS-12345-890</div>
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
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-black blur-2xl"></div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#003087] blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-12 bg-black">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=1600')] opacity-5"></div>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-[#003087]/20">
                    <div className="text-[#003087]">{stat.icon}</div>
                  </div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-gradient-to-b from-black to-[#001a4d]/90">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                Premium Services
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose Us?</h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">
                We offer comprehensive shipping solutions tailored to your needs, with cutting-edge technology and
                exceptional customer service.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br p-[1px] transition-all duration-300 hover:shadow-lg hover:shadow-[#003087]/20"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50`}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80"></div>

                  <div className="relative h-full rounded-2xl bg-black/50 backdrop-blur-sm p-8 flex flex-col">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#003087] to-[#0055d4]">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-white/70">{feature.description}</p>
                    <Link
                      href="/features"
                      className="mt-6 inline-flex items-center text-sm font-medium text-[#003087] group-hover:text-white transition-colors"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link href="/features">
                <Button className="bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm border border-white/10">
                  View All Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gradient-to-b from-[#001a4d]/90 to-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                Customer Stories
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Customers Say</h2>
              <p className="mt-4 text-white/60 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our customers have to say about their experience with
                Dynamic Shipping and Logistics Services.
              </p>
            </div>

            <div className="relative mx-auto max-w-4xl">
              {/* Desktop Testimonials */}
              <div className="hidden md:block">
                <div className="flex gap-6 overflow-hidden">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={index}
                      className={`flex-shrink-0 transition-all duration-500 ${
                        index === activeTestimonial ? "opacity-100 translate-x-0" : "opacity-0 translate-x-20 absolute"
                      } w-full`}
                    >
                      <div className="relative rounded-2xl bg-gradient-to-br from-black to-[#001a4d]/50 p-[1px]">
                        <div className="rounded-2xl bg-black/40 backdrop-blur-sm p-8">
                          <div className="flex items-center mb-6">
                            <div className="mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-[#003087]">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={`${testimonial.name} profile picture`}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-lg font-bold text-white">{testimonial.name}</div>
                              <div className="text-sm text-white/60">{testimonial.title}</div>
                              <div className="mt-1 flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < testimonial.rating ? "fill-[#003087] text-[#003087]" : "text-white/20"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-lg text-white/80 italic">"{testimonial.quote}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -left-4 top-1/2 -translate-y-1/2 text-white border border-white/10 bg-black/50 backdrop-blur-sm hover:bg-white/10 rounded-full h-10 w-10"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -right-4 top-1/2 -translate-y-1/2 text-white border border-white/10 bg-black/50 backdrop-blur-sm hover:bg-white/10 rounded-full h-10 w-10"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile Testimonials */}
              <div className="md:hidden">
                <div className="relative rounded-2xl bg-gradient-to-br from-black to-[#001a4d]/50 p-[1px]">
                  <div className="rounded-2xl bg-black/40 backdrop-blur-sm p-6">
                    <div className="flex items-center mb-6">
                      <div className="mr-4 h-14 w-14 overflow-hidden rounded-full border-2 border-[#003087]">
                        <Image
                          src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                          alt={`${testimonials[activeTestimonial].name} profile picture`}
                          width={56}
                          height={56}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">{testimonials[activeTestimonial].name}</div>
                        <div className="text-xs text-white/60">{testimonials[activeTestimonial].title}</div>
                        <div className="mt-1 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < testimonials[activeTestimonial].rating
                                  ? "fill-[#003087] text-[#003087]"
                                  : "text-white/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-base text-white/80 italic">"{testimonials[activeTestimonial].quote}"</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-white border border-white/10 bg-black/50 backdrop-blur-sm hover:bg-white/10 rounded-full h-8 w-8"
                    onClick={prevTestimonial}
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-white border border-white/10 bg-black/50 backdrop-blur-sm hover:bg-white/10 rounded-full h-8 w-8"
                    onClick={nextTestimonial}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Testimonial Navigation Dots */}
              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? "bg-[#003087] w-6" : "bg-white/20 hover:bg-white/40"
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black to-[#001a4d]"></div>
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1600')] opacity-10 mix-blend-overlay"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#003087]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-black/40 rounded-full blur-3xl"></div>

          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Ship with Us?</h2>
              <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto">
                Join thousands of satisfied customers who trust Dynamic Shipping and Logistics for their logistics needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started">
                  <Button className="bg-[#003087] text-white hover:bg-[#003087]/90 px-8 py-6 text-lg rounded-lg shadow-lg shadow-[#003087]/20 hover:shadow-xl hover:shadow-[#003087]/30 transition-all duration-300">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-lg backdrop-blur-sm"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2ECC71]" />
                  <span className="text-sm text-white/70">No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2ECC71]" />
                  <span className="text-sm text-white/70">Cancel anytime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#2ECC71]" />
                  <span className="text-sm text-white/70">24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4">
                <Package2 className="h-6 w-6 text-[#003087]" />
                <span>Dynamic Shipping and Logistics</span>
              </Link>
              <p className="text-white/60 mb-6">
                Delivering Excellence Worldwide. Fast, reliable shipping solutions for businesses and individuals.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-[#003087] transition-colors duration-200"
                >
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-[#003087] transition-colors duration-200"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-[#003087] transition-colors duration-200"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-white/60 hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-white/60 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/press" className="text-white/60 hover:text-white transition-colors">
                    Press
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/features" className="text-white/60 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-white/60 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-white/60 hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="/api" className="text-white/60 hover:text-white transition-colors">
                    API Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-6">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-white/60 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="/compliance" className="text-white/60 hover:text-white transition-colors">
                    Compliance
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Dynamic Shipping and Logistics. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex gap-6">
              <Link href="/sitemap" className="text-sm text-white/40 hover:text-white/60">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-sm text-white/40 hover:text-white/60">
                Accessibility
              </Link>
              <Link href="/security" className="text-sm text-white/40 hover:text-white/60">
                Security
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

