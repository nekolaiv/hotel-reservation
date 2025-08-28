"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Users, Bed, Calendar, ArrowLeft, User, Mail, Phone, Shield } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

const mockBookingData = {
  1: {
    1: {
      hotelName: "Grand Palace Hotel",
      hotelLocation: "Downtown Manhattan, New York",
      roomName: "Deluxe City View",
      roomImage: "/hotels/grand-palace/dcv.jpg",
      price: 299,
      size: "350 sq ft",
      beds: "1 King Bed",
      maxGuests: 2,
    },
  },
}

export default function BookingPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const hotelId = searchParams.get("hotelId")
  const roomId = searchParams.get("roomId")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = searchParams.get("guests")
  const nights = Number.parseInt(searchParams.get("nights") || "1")

  const bookingData =
    mockBookingData[hotelId as unknown as keyof typeof mockBookingData]?.[roomId as unknown as keyof (typeof mockBookingData)[1]]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeToTerms: false,
    marketingEmails: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!bookingData || !checkIn || !checkOut) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Booking Request</h1>
          <Link href="/hotels">
            <Button>Back to Hotels</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = bookingData.price * nights
  const taxes = Math.round(totalPrice * 0.12)
  const finalTotal = totalPrice + taxes

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const bookingParams = new URLSearchParams({
        hotelId: hotelId!,
        roomId: roomId!,
        checkIn: checkIn!,
        checkOut: checkOut!,
        guests: guests!,
        nights: nights.toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
      })
      router.push(`/booking/payment?${bookingParams.toString()}`)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">HotelLux</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link href="/hotels" className="hover:text-foreground">
            Hotels
          </Link>
          <span>/</span>
          <Link href={`/hotels/${hotelId}`} className="hover:text-foreground">
            {bookingData.hotelName}
          </Link>
          <span>/</span>
          <Link href={`/hotels/${hotelId}/rooms/${roomId}`} className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            {bookingData.roomName}
          </Link>
          <span>/</span>
          <span className="text-foreground">Booking</span>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="ml-2 font-medium">Guest Details</span>
            </div>
            <div className="w-12 h-px bg-muted"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm">
                2
              </div>
              <span className="ml-2 text-muted-foreground">Payment</span>
            </div>
            <div className="w-12 h-px bg-muted"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center text-sm">
                3
              </div>
              <span className="ml-2 text-muted-foreground">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Guest Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">First Name *</label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className={errors.firstName ? "border-red-500" : ""}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Last Name *</label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className={errors.lastName ? "border-red-500" : ""}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                        placeholder="Enter your email address"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Special Requests (Optional)</label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      className="w-full px-3 py-2 border border-input rounded-md bg-background resize-none"
                      rows={3}
                      placeholder="Any special requests or preferences..."
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked: boolean) => handleInputChange("agreeToTerms", checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the terms and conditions *
                        </label>
                        <p className="text-xs text-muted-foreground">
                          By booking, you agree to our{" "}
                          <Link href="#" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link href="#" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </p>
                      </div>
                    </div>
                    {errors.agreeToTerms && <p className="text-red-500 text-xs">{errors.agreeToTerms}</p>}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.marketingEmails}
                        onCheckedChange={(checked: boolean) => handleInputChange("marketingEmails", checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="marketing"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Send me promotional emails
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Receive exclusive offers and updates about your bookings
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Continue to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={bookingData.roomImage || "/placeholder.svg"}
                    alt={bookingData.roomName}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{bookingData.roomName}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {bookingData.hotelName}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {guests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-3 h-3" />
                        {bookingData.beds}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Check-in
                    </span>
                    <span>{new Date(checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Check-out
                    </span>
                    <span>{new Date(checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>{nights} nights</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>
                      ${bookingData.price} × {nights} nights
                    </span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & fees</span>
                    <span>${taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${finalTotal}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
                  <Shield className="w-4 h-4" />
                  <span>Secure booking • No hidden fees</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}