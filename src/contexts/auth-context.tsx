"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, getUserFromStorage, saveUserToStorage, removeUserFromStorage, authenticateUser } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  isAdmin: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = getUserFromStorage()
    setUser(savedUser)
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const authenticatedUser = authenticateUser(email, password)

    if (authenticatedUser) {
      setUser(authenticatedUser)
      saveUserToStorage(authenticatedUser)
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    removeUserFromStorage()
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAdmin: user?.role === "admin",
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}