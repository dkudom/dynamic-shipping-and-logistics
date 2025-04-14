'use client'

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-900"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    redirect("/signin")
  }

  return <>{children}</>
} 