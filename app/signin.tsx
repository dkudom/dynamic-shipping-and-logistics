"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth"
import { toast } from "sonner"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await signIn(email, password)
      toast.success("Signed in successfully")
      router.push("/dashboard")
    } catch (error) {
      toast.error("Invalid email or password")
    } finally {
      setIsLoading(false)
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
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/get-started" className="text-primary hover:underline">
              Get started
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Hero Content */}
      <div className="hidden md:flex md:w-1/2 flex-col justify-center bg-primary p-12 text-primary-foreground">
        <div className="relative h-full w-full">
          <Image
            src="/hero1.jpg"
            alt="Shipping Hero"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="relative z-10 space-y-8">
            <div>
              <h2 className="text-4xl font-bold">Dynamic Shipping</h2>
              <p className="mt-4 text-xl">
                Ship smarter. Track better. Deliver faster.
              </p>
              <p className="mt-2 text-lg">
                Manage all your shipping needs in one place with our powerful logistics platform.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary-foreground p-2">
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
                    className="text-primary"
                  >
                    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.82 6.73 2.2" />
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                    <path d="M21.8 16.2a9 9 0 1 0-18 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Global Shipping</h3>
                  <p className="mt-1">
                    Ship to over 200 countries with real-time tracking
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary-foreground p-2">
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
                    className="text-primary"
                  >
                    <path d="M12 2v20" />
                    <path d="M2 12h20" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                    <path d="M12 2a10 10 0 0 0-10 10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Quick Access</h3>
                  <p className="mt-1">
                    Book and manage shipments with just a few clicks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

