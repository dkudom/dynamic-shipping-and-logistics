'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export interface AuthResult {
  success: boolean
  error?: string
}

export function useAuth() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === "authenticated"
  const isLoading = status === "loading"

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (!result?.ok) {
        return {
          success: false,
          error: "Invalid email or password"
        }
      }

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: "An error occurred during sign in"
      }
    }
  }

  const googleLogin = async (): Promise<void> => {
    await signIn("google", { callbackUrl: "/" })
  }

  const logout = async (): Promise<void> => {
    await signOut({ callbackUrl: "/" })
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AuthResult> => {
    // In a real app, you would make an API call to register the user
    // This is a mock implementation
    try {
      // After registration, log the user in
      return login(email, password)
    } catch (error) {
      return {
        success: false,
        error: "An error occurred during registration"
      }
    }
  }

  return {
    session,
    isAuthenticated,
    isLoading,
    login,
    googleLogin,
    logout,
    register
  }
} 