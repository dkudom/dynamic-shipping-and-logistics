"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSupabaseAuth } from "@/lib/supabase-auth"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { register } = useSupabaseAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Starting registration with:", { email });
      
      const result = await register(firstName, lastName, email, password)
      
      if (result.success) {
        toast.success("Account created successfully! Please check your email for verification.")
        router.push("/signin")
      } else {
        console.error("Registration failed:", result.error);
        
        // Handle specific error cases
        if (result.error?.toLowerCase().includes("email")) {
          toast.error("Please enter a valid email address")
        } else if (result.error?.toLowerCase().includes("password")) {
          toast.error("Password must be at least 6 characters long")
        } else if (result.error?.toLowerCase().includes("already registered")) {
          toast.error("This email is already registered. Please sign in instead.")
        } else {
          toast.error(result.error || "Failed to create account. Please try again.")
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      // Handle network errors specifically
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
          toast.error("Unable to connect to the server. Please check your internet connection.")
        } else {
          toast.error("An unexpected error occurred. Please try again later.")
        }
      } else {
        toast.error("An error occurred during registration")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Sign Up Form */}
      <div className="flex w-full md:w-1/2 flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create an Account</h1>
            <p className="text-muted-foreground mt-2">
              Sign up to start shipping with us
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.doe@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Hero Content */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero1.jpg"
            alt="Sign up"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary-foreground/95" />
        </div>
        
        <div className="relative z-10 space-y-12 p-12">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-foreground to-primary-foreground/80">
              Start Shipping Today
            </h2>
            <div className="space-y-2">
              <p className="text-2xl font-medium text-primary-foreground">
                Join thousands of satisfied customers
              </p>
              <p className="text-lg text-primary-foreground/90">
                Experience seamless shipping solutions tailored to your needs
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4 group">
              <div className="rounded-full bg-primary-foreground/10 p-3 group-hover:bg-primary-foreground/20 transition-all duration-300 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-primary-foreground">Easy Registration</h3>
                <p className="text-primary-foreground/80">
                  Create your account in minutes and start shipping right away
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="rounded-full bg-primary-foreground/10 p-3 group-hover:bg-primary-foreground/20 transition-all duration-300 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-primary-foreground">Secure Platform</h3>
                <p className="text-primary-foreground/80">
                  Your data and shipments are protected with enterprise-grade security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 