'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from './supabase'
import { Session, User } from '@supabase/supabase-js'

export interface AuthResult {
  success: boolean
  error?: string
}

// Mock users for testing when Supabase is not available
const MOCK_USERS = [
  {
    id: '12345',
    email: 'test@example.com',
    password: 'password123',
    user_metadata: {
      first_name: 'Test',
      last_name: 'User',
    }
  },
  {
    id: '67890',
    email: 'demo@example.com',
    password: 'demo123',
    user_metadata: {
      first_name: 'Demo',
      last_name: 'User',
    }
  }
];

// Flag to use mock auth instead of Supabase (for testing)
const USE_MOCK_AUTH = false; // Temporarily enabled for testing

// Keys for localStorage
const MOCK_AUTH_USER_KEY = 'mock_auth_user';
const MOCK_AUTH_SESSION_KEY = 'mock_auth_session';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (USE_MOCK_AUTH) {
      // Check for existing mock session in localStorage
      const storedUser = localStorage.getItem(MOCK_AUTH_USER_KEY);
      const storedSession = localStorage.getItem(MOCK_AUTH_SESSION_KEY);
      
      if (storedUser && storedSession) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const parsedSession = JSON.parse(storedSession);
          setUser(parsedUser);
          setSession(parsedSession);
          console.log("Mock session restored from localStorage", parsedUser);
        } catch (error) {
          console.error("Error parsing stored mock session:", error);
          localStorage.removeItem(MOCK_AUTH_USER_KEY);
          localStorage.removeItem(MOCK_AUTH_SESSION_KEY);
        }
      }
      
      setLoading(false);
      return;
    }
    
    // Get session data
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Session fetch error:", error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Save mock session to localStorage
  const saveMockSession = (mockUser: any, mockSession: any) => {
    try {
      localStorage.setItem(MOCK_AUTH_USER_KEY, JSON.stringify(mockUser));
      localStorage.setItem(MOCK_AUTH_SESSION_KEY, JSON.stringify(mockSession));
    } catch (error) {
      console.error("Error saving mock session to localStorage:", error);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      // Use mock auth for testing
      if (USE_MOCK_AUTH) {
        console.log("Using mock authentication");
        const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
        
        if (mockUser) {
          // Create a mock session
          const mockSession = {
            user: {
              id: mockUser.id,
              email: mockUser.email,
              user_metadata: mockUser.user_metadata
            }
          };
          
          // Set the mock session and user
          setSession(mockSession as any);
          setUser(mockSession.user as any);
          
          // Save to localStorage
          saveMockSession(mockSession.user, mockSession);
          
          console.log("Mock login successful:", mockUser);
          return { success: true };
        }
        
        return {
          success: false,
          error: "Invalid email or password"
        };
      }
      
      // Use Supabase auth
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      router.refresh()
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred during sign in"
      }
    }
  }

  const googleLogin = async (): Promise<void> => {
    if (USE_MOCK_AUTH) {
      console.log("Mock Google login - setting demo user");
      const mockUser = MOCK_USERS[1]; // Use the demo user for mock Google login
      
      // Create a mock session
      const mockSession = {
        user: {
          id: mockUser.id,
          email: mockUser.email,
          user_metadata: mockUser.user_metadata
        }
      };
      
      // Set the mock session and user
      setSession(mockSession as any);
      setUser(mockSession.user as any);
      
      // Save to localStorage
      saveMockSession(mockSession.user, mockSession);
      
      return;
    }
    
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error("Google login error:", error)
      throw error
    }
  }

  const logout = async (): Promise<void> => {
    if (USE_MOCK_AUTH) {
      console.log("Mock logout");
      setSession(null);
      setUser(null);
      
      // Clear from localStorage
      localStorage.removeItem(MOCK_AUTH_USER_KEY);
      localStorage.removeItem(MOCK_AUTH_SESSION_KEY);
      
      router.refresh();
      return;
    }
    
    try {
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      throw error
    }
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<AuthResult> => {
    if (USE_MOCK_AUTH) {
      console.log("Mock registration");
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        return {
          success: false,
          error: "This email is already registered. Please check your email for confirmation instructions."
        };
      }
      
      // Create new mock user (but don't actually store it anywhere)
      const newUser = {
        id: Math.random().toString(36).substring(2, 15),
        email,
        password,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
        }
      };
      
      console.log("Mock user registered:", newUser);
      
      // Auto-login after registration for testing
      const mockSession = {
        user: {
          id: newUser.id,
          email: newUser.email,
          user_metadata: newUser.user_metadata
        }
      };
      
      // Set the session and user
      setSession(mockSession as any);
      setUser(mockSession.user as any);
      
      // Save to localStorage
      saveMockSession(mockSession.user, mockSession);
      
      return { success: true };
    }
    
    try {
      console.log("Starting registration process...");
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })

      console.log("Registration response:", { data, error });

      if (error) {
        return {
          success: false,
          error: error.message
        }
      }

      // Check if user is in confirmation state
      if (data?.user?.identities?.length === 0) {
        return {
          success: false,
          error: "This email is already registered. Please check your email for confirmation instructions."
        }
      }

      router.refresh()
      return { success: true }
    } catch (error) {
      console.error("Registration error:", error)
      
      // Check for network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          error: "Cannot connect to authentication service. Please check your internet connection and try again."
        }
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred during registration"
      }
    }
  }

  return {
    session,
    user,
    isAuthenticated: !!user,
    isLoading: loading,
    login,
    googleLogin,
    logout,
    register
  }
} 