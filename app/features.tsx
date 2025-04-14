import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Globe,
  MapPin,
  Package2,
  Shield,
  Truck,
  Menu,
} from "lucide-react"

import { Button } from "@/components/ui/button"

export default function FeaturesPage() {
  const features = [
    {
      icon: <Truck className="h-6 w-6 text-white" />,
      title: "Fast Shipping",
      description:
        "Deliver your packages quickly with our air, sea, and ground options. We offer express delivery for urgent shipments and standard options for cost-effective solutions.",
      color: "from-[#003087] to-[#0055d4]",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Real-Time Tracking",
      description:
        "Track your shipment's journey with live updates and maps. Our advanced GPS technology provides accurate location data and estimated delivery times.",
      color: "from-black to-[#333]",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Secure Payments",
      description:
        "Pay with confidence using Stripe or PayPal. All transactions are encrypted and we never store your payment information on our servers.",
      color: "from-[#003087] to-[#0055d4]",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <Globe className="h-6 w-6 text-white" />,
      title: "Global Coverage",
      description:
        "Ship to over 150 countries worldwide with our extensive network of logistics partners and distribution centers strategically located across the globe.",
      color: "from-black to-[#333]",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-white" />,
      title: "Flexible Pricing",
      description:
        "Choose from various pricing plans tailored to your shipping volume and frequency. We offer competitive rates with no hidden fees or surprise charges.",
      color: "from-[#003087] to-[#0055d4]",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: <Package2 className="h-6 w-6 text-white" />,
      title: "Package Protection",
      description:
        "Ensure your shipments are protected with our comprehensive insurance options. Get coverage for loss, damage, or theft during transit.",
      color: "from-black to-[#333]",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-md px-4 md:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Package2 className="h-6 w-6 text-[#003087]" />
          <span className="hidden sm:inline-block">Dynamic Shipping Services</span>
          <span className="inline-block sm:hidden">Dynamic</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            Home
          </Link>
          <Link href="/features" className="border-b-2 border-[#003087] font-medium text-white">
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

        <div className="flex items-center md:hidden">
          <Link href="/signin">
            <Button className="mr-2 bg-[#003087] text-white hover:bg-[#003087]/90">Sign In</Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Menu" className="text-white">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black to-[#001a4d] py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1600')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="mb-8 inline-flex items-center text-sm text-white/60 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">Our Features</h1>
              <p className="mb-8 max-w-2xl text-lg text-white/70">
                Discover the comprehensive suite of shipping and logistics services that make Dynamic Shipping and Logistics the
                preferred choice for businesses and individuals worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="group relative overflow-hidden rounded-2xl transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90`}></div>
                  <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-40"></div>

                  <div className="relative p-8 flex flex-col h-full">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      {feature.icon}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                    <p className="text-white/80 mb-6">{feature.description}</p>

                    <div className="mt-auto pt-6 border-t border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#2ECC71]" />
                          <span className="text-sm text-white/80">Available now</span>
                        </div>
                        <Button variant="ghost" className="p-0 text-white hover:bg-transparent hover:text-[#003087]">
                          <ArrowRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-20 bg-gradient-to-b from-black to-[#001a4d]/90">
          <div className="container mx-auto px-4">
            <div className="grid gap-16 md:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                  <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                  Featured Service
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">Advanced Tracking Technology</h2>
                <p className="text-white/70 mb-6">
                  Our proprietary tracking system provides real-time updates on your shipment's location, condition, and
                  estimated delivery time. With our mobile app, you can track your packages from anywhere in the world.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "GPS tracking with pinpoint accuracy",
                    "Real-time status updates",
                    "Automated delivery notifications",
                    "Package condition monitoring",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact">
                  <Button className="bg-[#003087] text-white hover:bg-[#003087]/90">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="relative rounded-2xl bg-gradient-to-br from-black/80 to-[#001a4d]/80 p-1 shadow-2xl">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=500&width=600"
                      alt="Advanced tracking dashboard"
                      width={600}
                      height={500}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-[#003087]/30 blur-2xl"></div>
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-black/50 blur-2xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#001a4d] to-black p-10 md:p-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to experience our features?</h2>
                <p className="text-white/70 mb-8">
                  Sign up today and discover why thousands of businesses trust Dynamic Shipping and Logistics for their
                  logistics needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/get-started">
                    <Button className="bg-white text-[#003087] hover:bg-white/90">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                      Contact Sales
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white mb-4 md:mb-0">
              <Package2 className="h-6 w-6 text-[#003087]" />
              <span>Dynamic Shipping and Logistics</span>
            </Link>

            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/privacy" className="text-sm text-white/60 hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-white/60 hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-white/60 hover:text-white">
                Cookie Policy
              </Link>
              <Link href="/sitemap" className="text-sm text-white/60 hover:text-white">
                Sitemap
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Dynamic Shipping and Logistics. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

