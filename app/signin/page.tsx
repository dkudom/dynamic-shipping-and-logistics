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

export default function SignInPage() {
  const [email, setEmail] = useState("test@example.com")
  const [password, setPassword] = useState("password123")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login, googleLogin } = useSupabaseAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (result.success) {
        toast.success("Signed in successfully")
        router.push("/dashboard")
      } else {
        toast.error(result.error || "Invalid email or password")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An error occurred during sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleLogin()
      toast.success("Signed in successfully")
      router.push("/dashboard")
    } catch (error) {
      console.error("Google sign in error:", error)
      toast.error("An error occurred during Google sign in")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Sign In Form */}
      <div className="flex w-full md:w-1/2 flex-col justify-center px-8 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your account to continue
            </p>
          </div>

          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Test Account:</strong> Use the pre-filled credentials to sign in with the test account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
          >
            <svg
              className="mr-2 h-4 w-4"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Continue with Google
          </Button>

          <div className="mt-6 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Hero Content */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero1.jpg"
            alt="Sign in"
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
              Dynamic Shipping and Logistics
            </h2>
            <div className="space-y-2">
              <p className="text-2xl font-medium text-primary-foreground">
                Ship smarter. Track better. Deliver faster.
              </p>
              <p className="text-lg text-primary-foreground/90">
                Manage all your shipping needs in one place with our powerful logistics platform.
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
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.82 6.73 2.2" />
                  <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                  <path d="M21.8 16.2a9 9 0 1 0-18 0" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-primary-foreground">Global Shipping</h3>
                <p className="text-primary-foreground/80">
                  Ship to over 200 countries with real-time tracking
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
                  <path d="M12 2v20" />
                  <path d="M2 12h20" />
                  <path d="M12 2a10 10 0 0 1 10 10" />
                  <path d="M12 2a10 10 0 0 0-10 10" />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-primary-foreground">Quick Access</h3>
                <p className="text-primary-foreground/80">
                  Book and manage shipments with just a few clicks
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 