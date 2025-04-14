import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, CheckCircle2, Package2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GetStartedPage() {
  const pricingPlans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small businesses just getting started with shipping.",
      price: "₵9.99",
      period: "per month",
      features: [
        "Up to 20 shipments per month",
        "Standard tracking",
        "Email support",
        "Basic analytics",
        "Single user account",
      ],
      popular: false,
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with regular shipping needs.",
      price: "₵29.99",
      period: "per month",
      features: [
        "Up to 100 shipments per month",
        "Real-time tracking",
        "Priority email & chat support",
        "Advanced analytics",
        "5 user accounts",
        "API access",
      ],
      popular: true,
      buttonText: "Get Started",
    },
    {
      name: "Enterprise",
      description: "For large businesses with high-volume shipping requirements.",
      price: "₵99.99",
      period: "per month",
      features: [
        "Unlimited shipments",
        "Premium tracking with notifications",
        "24/7 dedicated support",
        "Custom analytics & reporting",
        "Unlimited user accounts",
        "Full API access",
        "Custom integrations",
      ],
      popular: false,
      buttonText: "Contact Sales",
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
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">Get Started with Dynamic Shipping and Logistics</h1>
              <p className="mb-8 max-w-2xl text-lg text-white/70">
                Choose the perfect plan for your shipping needs and start delivering with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                Flexible Pricing
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Choose Your Plan</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                We offer a range of plans to suit businesses of all sizes. All plans include our core features with
                different limits and capabilities.
              </p>

              <div className="mt-8">
                <Tabs defaultValue="monthly" className="w-full max-w-xs mx-auto">
                  <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm">
                    <TabsTrigger value="monthly" className="text-white data-[state=active]:bg-[#003087]">
                      Monthly
                    </TabsTrigger>
                    <TabsTrigger value="yearly" className="text-white data-[state=active]:bg-[#003087]">
                      Yearly (Save 20%)
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative border-white/10 ${
                    plan.popular
                      ? "bg-gradient-to-br from-[#001a4d]/80 to-black/80 backdrop-blur-sm"
                      : "bg-white/5 backdrop-blur-sm"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-[#003087] px-3 py-1 text-xs font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <div className="mt-4">
                      <span className="text-3xl font-bold text-white">{plan.price}</span>
                      <span className="text-sm text-white/60"> {plan.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-white/70">{plan.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <CheckCircle2 className="mr-2 h-5 w-5 text-[#2ECC71] mt-0.5" />
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-white text-[#003087] hover:bg-white/90"
                          : "bg-[#003087] text-white hover:bg-[#003087]/90"
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-white/60 mb-4">Need a custom plan for your enterprise?</p>
              <Link href="/contact">
                <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                  Contact Our Sales Team
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-gradient-to-b from-black to-[#001a4d]/90">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                Simple Process
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Getting started with Dynamic Shipping and Logistics is easy. Follow these simple steps to begin shipping with us.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-4">
              {[
                {
                  step: "01",
                  title: "Create an Account",
                  description: "Sign up for an account and choose your preferred plan.",
                },
                {
                  step: "02",
                  title: "Book a Shipment",
                  description: "Enter your shipment details and get an instant quote.",
                },
                {
                  step: "03",
                  title: "Schedule Pickup",
                  description: "Schedule a pickup or drop off your package at a nearby location.",
                },
                {
                  step: "04",
                  title: "Track & Deliver",
                  description: "Track your shipment in real-time until it reaches its destination.",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="mb-4 text-4xl font-bold text-[#003087]/20">{item.step}</div>
                  <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-white/70">{item.description}</p>

                  {index < 3 && (
                    <div className="absolute right-0 top-8 hidden md:block">
                      <ArrowRight className="h-6 w-6 text-[#003087]/40" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                Customer Stories
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">What Our Customers Say</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Join thousands of satisfied customers who trust Dynamic Shipping and Logistics for their logistics needs.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  quote:
                    "Switching to Dynamic Shipping and Logistics has saved our business thousands in shipping costs while improving delivery times.",
                  name: "Sarah Johnson",
                  title: "E-commerce Manager",
                  image: "/placeholder.svg?height=64&width=64",
                },
                {
                  quote:
                    "The tracking system is incredible. My customers love being able to see exactly where their packages are at all times.",
                  name: "Michael Chen",
                  title: "Online Retailer",
                  image: "/placeholder.svg?height=64&width=64",
                },
                {
                  quote:
                    "Their customer service is outstanding. Any time we've had an issue, they've resolved it immediately.",
                  name: "Jessica Williams",
                  title: "Operations Director",
                  image: "/placeholder.svg?height=64&width=64",
                },
              ].map((testimonial, index) => (
                <div key={index} className="relative rounded-2xl bg-gradient-to-br from-black to-[#001a4d]/50 p-[1px]">
                  <div className="rounded-2xl bg-black/40 backdrop-blur-sm p-8">
                    <p className="mb-6 text-lg text-white/80 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border border-[#003087]">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={`${testimonial.name} profile picture`}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white">{testimonial.name}</div>
                        <div className="text-sm text-white/60">{testimonial.title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 bg-gradient-to-b from-black to-[#001a4d]/90">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white backdrop-blur-sm mb-4">
                <span className="mr-2 flex h-2 w-2 rounded-full bg-[#003087]"></span>
                Common Questions
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                Find answers to common questions about getting started with Dynamic Shipping and Logistics.
              </p>
            </div>

            <div className="mx-auto max-w-3xl">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/5 backdrop-blur-sm mb-8">
                  <TabsTrigger value="general" className="text-white data-[state=active]:bg-[#003087]">
                    General
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="text-white data-[state=active]:bg-[#003087]">
                    Pricing
                  </TabsTrigger>
                  <TabsTrigger value="support" className="text-white data-[state=active]:bg-[#003087]">
                    Support
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  {[
                    {
                      question: "How do I create an account?",
                      answer:
                        "Creating an account is simple. Click on the 'Sign Up' button, fill in your details, and choose your preferred plan. Once you've completed the registration process, you'll have immediate access to your dashboard.",
                    },
                    {
                      question: "What shipping services do you offer?",
                      answer:
                        "We offer a range of shipping services including express delivery, standard shipping, and economy options. Our services cover both domestic and international destinations with various transit times to suit your needs.",
                    },
                    {
                      question: "How long does shipping take?",
                      answer:
                        "Shipping times vary based on the service selected and destination. Express shipping typically takes 1-3 business days, standard shipping 3-7 business days, and economy shipping 7-14 business days. International shipping times may vary.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <h3 className="mb-3 text-lg font-medium text-white">{faq.question}</h3>
                      <p className="text-white/70">{faq.answer}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4">
                  {[
                    {
                      question: "How is shipping cost calculated?",
                      answer:
                        "Shipping costs are calculated based on package dimensions, weight, destination, and service level. You can get an instant quote using our shipping calculator on the website or mobile app.",
                    },
                    {
                      question: "Do you offer discounts for high volume?",
                      answer:
                        "Yes, we offer volume discounts for businesses that ship frequently. Our Professional and Enterprise plans include discounted rates, and we can create custom pricing for high-volume shippers.",
                    },
                    {
                      question: "Can I change my plan later?",
                      answer:
                        "You can upgrade or downgrade your plan at any time through your account dashboard. Changes to your plan will take effect at the start of your next billing cycle.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <h3 className="mb-3 text-lg font-medium text-white">{faq.question}</h3>
                      <p className="text-white/70">{faq.answer}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="support" className="space-y-4">
                  {[
                    {
                      question: "How can I contact customer support?",
                      answer:
                        "You can contact our customer support team via email, phone, or live chat. Basic plan users have access to email support, while Professional and Enterprise users get priority support with faster response times.",
                    },
                    {
                      question: "What happens if a package is lost or damaged?",
                      answer:
                        "We offer shipping protection for all packages. If a package is lost or damaged, you can file a claim through your dashboard. Our team will investigate and process your claim within 5-7 business days.",
                    },
                    {
                      question: "Do you offer training for new users?",
                      answer:
                        "Yes, we provide comprehensive onboarding for all new users. This includes video tutorials, documentation, and live webinars. Enterprise customers also receive personalized training sessions.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                      <h3 className="mb-3 text-lg font-medium text-white">{faq.question}</h3>
                      <p className="text-white/70">{faq.answer}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>

              <div className="mt-8 text-center">
                <Link href="/faq">
                  <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                    View All FAQs
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#001a4d] to-black p-10 md:p-16">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Shipping Experience?</h2>
                <p className="text-white/70 mb-8">
                  Join thousands of businesses that trust Dynamic Shipping and Logistics for their logistics needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/signin">
                    <Button className="bg-white text-[#003087] hover:bg-white/90">
                      Create Your Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10">
                      Talk to Sales
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

