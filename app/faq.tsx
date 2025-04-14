import Link from "next/link"
import { ArrowLeft, ArrowRight, Package2, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqCategories = [
    {
      name: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping typically take?",
          answer:
            "Shipping times vary based on destination and service level. Express shipping typically takes 1-3 business days, while standard shipping can take 3-7 business days for domestic shipments and 7-14 business days for international shipments.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "Yes, we ship to over 150 countries worldwide. International shipping times and rates vary by destination. You can get a quote for your specific destination through our shipping calculator.",
        },
        {
          question: "How can I track my shipment?",
          answer:
            "You can track your shipment by entering your tracking number on our website or mobile app. You'll receive real-time updates on your package's location and estimated delivery time.",
        },
        {
          question: "What if my package is delayed?",
          answer:
            "If your package is delayed, you'll receive a notification with the reason for the delay and a new estimated delivery time. If the delay exceeds 24 hours, you may be eligible for a partial refund depending on your service level.",
        },
      ],
    },
    {
      name: "Pricing & Payments",
      questions: [
        {
          question: "How is shipping cost calculated?",
          answer:
            "Shipping costs are calculated based on package dimensions, weight, destination, and service level. You can get an instant quote using our shipping calculator on the website or mobile app.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for business accounts. All payments are processed securely through our encrypted payment system.",
        },
        {
          question: "Do you offer shipping insurance?",
          answer:
            "Yes, we offer shipping insurance for all packages. Basic coverage is included in the shipping cost, and you can purchase additional coverage based on the declared value of your shipment.",
        },
        {
          question: "Are there any hidden fees?",
          answer:
            "No, we believe in transparent pricing. The quote you receive includes all applicable fees and taxes. There are no hidden charges or surprise fees when you ship with us.",
        },
      ],
    },
    {
      name: "Account & Services",
      questions: [
        {
          question: "How do I create a business account?",
          answer:
            "You can create a business account by clicking on the 'Sign Up' button and selecting 'Business Account'. You'll need to provide your company details and verification documents. Our team will review your application within 24-48 hours.",
        },
        {
          question: "What are the benefits of a business account?",
          answer:
            "Business accounts enjoy volume discounts, priority customer support, detailed shipping analytics, integration with e-commerce platforms, and access to our API for custom shipping solutions.",
        },
        {
          question: "Can I schedule a pickup for my packages?",
          answer:
            "Yes, you can schedule a pickup through your account dashboard or by contacting customer service. Pickups can be scheduled for same-day or future dates, depending on your location and service availability.",
        },
        {
          question: "Do you offer custom shipping solutions?",
          answer:
            "Yes, we offer custom shipping solutions for businesses with specific logistics needs. Contact our sales team to discuss your requirements and get a tailored solution for your business.",
        },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-md px-4 md:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <Package2 className="h-6 w-6 text-[#003087]" />
          <span className="hidden sm:inline-block">Dynamic Shipping and Logistics</span>
          <span className="inline-block sm:hidden">Dynamic Shipping and Logistics</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            Home
          </Link>
          <Link href="/features" className="font-medium text-white hover:border-b-2 hover:border-[#003087]">
            Features
          </Link>
          <Link href="/faq" className="border-b-2 border-[#003087] font-medium text-white">
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
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">Frequently Asked Questions</h1>
              <p className="mb-8 max-w-2xl text-lg text-white/70">
                Find answers to common questions about our shipping services, pricing, and policies.
              </p>

              <div className="relative w-full max-w-2xl">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
                <Input
                  type="search"
                  placeholder="Search for answers..."
                  className="h-12 rounded-lg border-white/10 bg-white/5 pl-10 text-white placeholder:text-white/40 focus:border-[#003087] focus:ring-[#003087]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {faqCategories.map((category, index) => (
                <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <h2 className="mb-4 text-xl font-bold text-white">{category.name}</h2>
                  <p className="mb-4 text-white/60">{category.questions.length} questions</p>
                  <Button
                    variant="outline"
                    className="w-full border-white/10 bg-transparent text-white hover:bg-white/10"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="py-16 bg-gradient-to-b from-black to-[#001a4d]/90">
          <div className="container mx-auto px-4">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-12">
                <h2 className="mb-6 text-2xl font-bold text-white">{category.name}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                      className="rounded-lg border border-white/10 bg-white/5 px-6 backdrop-blur-sm"
                    >
                      <AccordionTrigger className="text-left text-white hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/70">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#001a4d] to-black p-10 md:p-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Still Have Questions?</h2>
                <p className="text-white/70 mb-8">
                  Our customer support team is available 24/7 to assist you with any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-white text-[#003087] hover:bg-white/90">
                      Contact Support
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/live-chat">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                      Start Live Chat
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

