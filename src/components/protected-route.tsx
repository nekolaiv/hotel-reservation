"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, LogIn } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, requireAdmin = false, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="container mx-auto px-4 py-8">
          <Alert>
            <LogIn className="h-4 w-4" />
            <AlertDescription>You need to be signed in to access this page.</AlertDescription>
          </Alert>
        </div>
      )
    )
  }

  if (requireAdmin && !isAdmin) {
    return (
      fallback || (
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <Shield className="h-4 w-4" />
            <AlertDescription>You don&apos;t have permission to access this page. Admin access required.</AlertDescription>
          </Alert>
        </div>
      )
    )
  }

  return <>{children}</>
}