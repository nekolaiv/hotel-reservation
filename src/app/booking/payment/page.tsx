"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, ArrowLeft, CreditCard, Shield, Lock, User } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"

const mockBookingData = {
  1: {
    1: {
      hotelName: "Grand Palace Hotel",
      hotelLocation: "Downtown Manhattan, New York",
      roomName: "Deluxe City View",
      roomImage: "/placeholder.svg?height=200&width=300&text=Deluxe+Room",
      price: 299,
      size: "350 sq ft",
      beds: "1 King Bed",
      maxGuests: 2,
    },
  },
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const hotelId = searchParams.get("hotelId")
  const roomId = searchParams.get("roomId")
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const guests = searchParams.get("guests")
  const nights = Number.parseInt(searchParams.get("nights") || "1")
  const firstName = searchParams.get("firstName")
  const lastName = searchParams.get("lastName")
  const email = searchParams.get("email")

  const bookingData =
    mockBookingData[hotelId as unknown as keyof typeof mockBookingData]?.[roomId as unknown as keyof (typeof mockBookingData)[1]]

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isProcessing, setIsProcessing] = useState(false)

  if (!bookingData || !checkIn || !checkOut || !firstName) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Payment Request</h1>
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

  const validatePayment = () => {
    const newErrors: Record<string, string> = {}

    if (paymentMethod === "card") {
      if (!paymentData.cardNumber.trim()) newErrors.cardNumber = "Card number is required"
      if (!paymentData.expiryDate.trim()) newErrors.expiryDate = "Expiry date is required"
      if (!paymentData.cvv.trim()) newErrors.cvv = "CVV is required"
      if (!paymentData.cardName.trim()) newErrors.cardName = "Cardholder name is required"
      if (!paymentData.billingAddress.trim()) newErrors.billingAddress = "Billing address is required"
      if (!paymentData.city.trim()) newErrors.city = "City is required"
      if (!paymentData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
      if (!paymentData.country.trim()) newErrors.country = "Country is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validatePayment()) {
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        const confirmationParams = new URLSearchParams({
          hotelId: hotelId!,
          roomId: roomId!,
          checkIn: checkIn!,
          checkOut: checkOut!,
          guests: guests!,
          nights: nights.toString(),
          firstName: firstName!,
          lastName: lastName!,
          email: email!,
          bookingId: `BK${Date.now()}`,
          total: finalTotal.toString(),
        })
        router.push(`/booking/confirmation?${confirmationParams.toString()}`)
      }, 2000)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))
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
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                ✓
              </div>
              <span className="ml-2 text-green-600 font-medium">Guest Details</span>
            </div>
            <div className="w-12 h-px bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
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
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Secure Payment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div>
                    <h3 className="font-semibold mb-4">Payment Method</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="w-4 h-4" />
                          Credit/Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                        <RadioGroupItem value="paypal" id="paypal" disabled />
                        <Label htmlFor="paypal" className="flex items-center gap-2 cursor-not-allowed">
                          PayPal (Coming Soon)
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <>
                      {/* Card Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Card Information</h3>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Card Number *</label>
                          <Input
                            value={paymentData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            className={errors.cardNumber ? "border-red-500" : ""}
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                          />
                          {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Expiry Date *</label>
                            <Input
                              value={paymentData.expiryDate}
                              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                              className={errors.expiryDate ? "border-red-500" : ""}
                              placeholder="MM/YY"
                              maxLength={5}
                            />
                            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">CVV *</label>
                            <Input
                              value={paymentData.cvv}
                              onChange={(e) => handleInputChange("cvv", e.target.value)}
                              className={errors.cvv ? "border-red-500" : ""}
                              placeholder="123"
                              maxLength={4}
                            />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Cardholder Name *</label>
                          <Input
                            value={paymentData.cardName}
                            onChange={(e) => handleInputChange("cardName", e.target.value)}
                            className={errors.cardName ? "border-red-500" : ""}
                            placeholder="Name as it appears on card"
                          />
                          {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                        </div>
                      </div>

                      <Separator />

                      {/* Billing Address */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Billing Address</h3>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Address *</label>
                          <Input
                            value={paymentData.billingAddress}
                            onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                            className={errors.billingAddress ? "border-red-500" : ""}
                            placeholder="Street address"
                          />
                          {errors.billingAddress && (
                            <p className="text-red-500 text-xs mt-1">{errors.billingAddress}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">City *</label>
                            <Input
                              value={paymentData.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                              className={errors.city ? "border-red-500" : ""}
                              placeholder="City"
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">ZIP Code *</label>
                            <Input
                              value={paymentData.zipCode}
                              onChange={(e) => handleInputChange("zipCode", e.target.value)}
                              className={errors.zipCode ? "border-red-500" : ""}
                              placeholder="ZIP code"
                            />
                            {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Country *</label>
                          <select
                            value={paymentData.country}
                            onChange={(e) => handleInputChange("country", e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md bg-background ${errors.country ? "border-red-500" : "border-input"}`}
                          >
                            <option value="">Select country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-4">
                    <Link
                      href={`/booking?hotelId=${hotelId}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&nights=${nights}`}
                      className="flex-1"
                    >
                      <Button type="button" variant="outline" className="w-full bg-transparent">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                    </Link>
                    <Button type="submit" className="flex-1" size="lg" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4 mr-2" />
                          Complete Booking (${finalTotal})
                        </>
                      )}
                    </Button>
                  </div>
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
                  </div>
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Guest
                    </span>
                    <span>
                      {firstName} {lastName}
                    </span>
                  </div>
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
                  <span>256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}