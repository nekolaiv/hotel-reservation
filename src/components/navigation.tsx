"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, Calendar, User, Settings, LogOut, LogIn, Shield, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import { LoginDialog } from "@/components/login-dialog"

export function Navigation() {
  const { user, logout, isAdmin, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const guestNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/hotels", label: "Hotels", icon: Building2 },
  ]

  const userNavItems = [...guestNavItems, { href: "/dashboard", label: "My Bookings", icon: Calendar }]

  const adminNavItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/hotels", label: "Hotels", icon: Building2 },
    { href: "/admin", label: "Admin Panel", icon: Shield },
  ]

  const navItems = isAdmin ? adminNavItems : isAuthenticated ? userNavItems : guestNavItems

  const NavItems = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => mobile && setMobileMenuOpen(false)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        )
      })}
    </>
  )

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">LuxStay</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <NavItems />
            </div>

            {/* User Menu / Login */}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        {isAdmin && (
                          <span className="inline-flex items-center rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                            <Shield className="mr-1 h-3 w-3" />
                            Admin
                          </span>
                        )}
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={isAdmin ? "/admin" : "/dashboard"}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{isAdmin ? "Admin Panel" : "Dashboard"}</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setShowLoginDialog(true)} variant="default">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-4 py-4">
                    <div className="flex items-center justify-between">
                      <Link href="/" className="flex items-center gap-2">
                        <Building2 className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold text-primary">LuxStay</span>
                      </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                      <NavItems mobile />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />
    </>
  )
}