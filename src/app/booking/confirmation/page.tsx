"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, MapPin, Users, Bed, Calendar, Mail, Phone, Download, Share, User } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const mockBookingData = {
  1: {
    1: {
      hotelName: "Grand Palace Hotel",
      hotelLocation: "Downtown Manhattan, New York",
      hotelAddress: "123 Fifth Avenue, New York, NY 10001",
      hotelPhone: "+1 (212) 555-0123",
      roomName: "Deluxe City View",
      roomImage: "/placeholder.svg?height=200&width=300&text=Deluxe+Room",
      price: 299,
      size: "350 sq ft",
      beds: "1 King Bed",
      maxGuests: 2,
    },
  },
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const [showConfetti, setShowConfetti] = useState(false)

  const hotelId = searchParams.get("hotelId")
  const roomId = searchParams.get("roomId")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = searchParams.get("guests")
  const nights = Number.parseInt(searchParams.get("nights") || "1")
  const firstName = searchParams.get("firstName")
  const lastName = searchParams.get("lastName")
  const email = searchParams.get("email")
  const bookingId = searchParams.get("bookingId")
  const total = searchParams.get("total")

  const bookingData =
    mockBookingData[hotelId as unknown as keyof typeof mockBookingData]?.[roomId as unknown as keyof (typeof mockBookingData)[1]]

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!bookingData || !bookingId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Booking Not Found</h1>
          <Link href="/hotels">
            <Button>Back to Hotels</Button>
          </Link>
        </div>
      </div>
    )
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
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Your reservation has been successfully processed. We&apos;ve sent a confirmation email to {email}.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="ml-2 text-green-600 font-medium">Guest Details</span>
            </div>
            <div className="w-12 h-px bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="ml-2 text-green-600 font-medium">Payment</span>
            </div>
            <div className="w-12 h-px bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="ml-2 text-green-600 font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Booking Details</span>
                  <Badge variant="secondary" className="text-sm">
                    {bookingId}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={bookingData.roomImage || "/placeholder.svg"}
                    alt={bookingData.roomName}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{bookingData.roomName}</h3>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {bookingData.hotelName}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{bookingData.hotelLocation}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {guests} guests
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {bookingData.beds}
                      </span>
                      <span>{bookingData.size}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Check-in</h4>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(checkIn!).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">After 3:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Check-out</h4>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(checkOut!).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Before 12:00 PM</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2">Guest Information</h4>
                  <p className="text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {firstName} {lastName}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4" />
                    {email}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Hotel Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Hotel Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold">{bookingData.hotelName}</h4>
                  <p className="text-muted-foreground">{bookingData.hotelAddress}</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{bookingData.hotelPhone}</span>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    For any questions about your reservation, please contact the hotel directly or reach out to our
                    customer service team.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm">Cancellation Policy</h4>
                  <p className="text-sm text-muted-foreground">
                    Free cancellation up to 24 hours before check-in. After that, the first night will be charged.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Check-in Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    Please bring a valid government-issued photo ID and the credit card used for booking.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Special Requests</h4>
                  <p className="text-sm text-muted-foreground">
                    Special requests are subject to availability and may incur additional charges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Booking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">${total}</div>
                  <div className="text-sm text-muted-foreground">Total paid</div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Share className="w-4 h-4 mr-2" />
                    Share Booking
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Confirmation
                  </Button>
                </div>

                <Separator />

                <div className="space-y-3">
                  <Link href="/dashboard">
                    <Button className="w-full">View My Bookings</Button>
                  </Link>
                  <Link href="/hotels">
                    <Button className="w-full bg-transparent" variant="outline">
                      Book Another Stay
                    </Button>
                  </Link>
                </div>

                <div className="text-center pt-4">
                  <p className="text-xs text-muted-foreground">
                    Need help? Contact our 24/7 customer service at{" "}
                    <a href="tel:1-800-HOTELLUX" className="text-primary hover:underline">
                      1-800-HOTELLUX
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}