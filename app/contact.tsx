import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Mail, MapPin, Package2, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6 text-[#003087]" />,
      title: "Phone Support",
      description: "24/7 customer service",
      contact: "+1 (800) 123-4567",
      action: "Call now",
    },
    {
      icon: <Mail className="h-6 w-6 text-[#003087]" />,
      title: "Email Support",
      description: "Get a response within 24 hours",
      contact: "support@dynamicshipping.com",
      action: "Send email",
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#003087]" />,
      title: "Office Location",
      description: "Visit our headquarters",
      contact: "123 Shipping Lane, New York, NY 10001",
      action: "Get directions",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-md px-4 md:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Package2 className="h-6 w-6 text-[#003087]" />
          <span className="hidden sm:inline-block">Dynamic Shipping and Logistics</span>
          <span className="inline-block sm:hidden">Dynamic</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            Home
          </Link>
          <Link href="/features" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            Features
          </Link>
          <Link href="/faq" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            FAQ
          </Link>
          <Link href="/contact" className="border-b-2 border-[#003087] font-medium text-white">
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
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black to-[#001a4d] py-20">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1600')] opacity-10 mix-blend-overlay"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <Link href="/" className="mb-8 inline-flex items-center text-sm text-white/60 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">Contact Us</h1>
              <p className="mb-8 max-w-2xl text-lg text-white/70">
                Have questions or need assistance? Our team is here to help you with all your shipping needs.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#003087]/10">
                      {method.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">{method.title}</h3>
                    <p className="mb-4 text-white/60">{method.description}</p>
                    <p className="mb-6 text-lg font-medium text-white">{method.contact}</p>
                    <Button className="w-full bg-[#003087] text-white hover:bg-[#003087]/90">
                      {method.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gradient-to-b from-black to-[#001a4d]/90">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div>
                <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                  <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                  Get in Touch
                </div>
                <h2 className="text-3xl font-bold text-white mb-6">Send Us a Message</h2>
                <p className="text-white/70 mb-6">
                  Fill out the form and our team will get back to you within 24 hours. We're here to answer any
                  questions you may have about our shipping services.
                </p>

                <div className="relative rounded-2xl bg-gradient-to-br from-black/80 to-[#001a4d]/80 p-1 shadow-2xl mb-8">
                  <div className="overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=300&width=500"
                      alt="Customer support team"
                      width={500}
                      height={300}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003087]/10">
                      <Phone className="h-5 w-5 text-[#003087]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Call us directly</p>
                      <p className="text-white">+1 (800) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003087]/10">
                      <Mail className="h-5 w-5 text-[#003087]" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Email us</p>
                      <p className="text-white">support@dynamicshipping.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl bg-gradient-to-br from-black/80 to-[#001a4d]/80 p-1 shadow-2xl">
                <div className="rounded-2xl bg-black/40 backdrop-blur-sm p-8">
                  <form className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium text-white">
                          First Name
                        </label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium text-white">
                          Last Name
                        </label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-white">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        className="border-white/10 bg-white/5 text-white placeholder:text-white/40"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-white">
                        Subject
                      </label>
                      <Select>
                        <SelectTrigger className="border-white/10 bg-white/5 text-white">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="shipping">Shipping Question</SelectItem>
                          <SelectItem value="tracking">Tracking Issue</SelectItem>
                          <SelectItem value="billing">Billing Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-white">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        className="min-h-[120px] border-white/10 bg-white/5 text-white placeholder:text-white/40"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#003087] text-white hover:bg-[#003087]/90">
                      Send Message
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Locations</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Visit one of our offices or distribution centers around the world.
              </p>
            </div>

            <div className="relative rounded-2xl bg-gradient-to-br from-black/80 to-[#001a4d]/80 p-1 shadow-2xl">
              <div className="overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=500&width=1200"
                  alt="Office locations map"
                  width={1200}
                  height={500}
                  className="w-full"
                />
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

