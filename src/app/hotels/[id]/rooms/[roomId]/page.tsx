"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MapPin, Users, Bed, ArrowLeft, Calendar, CreditCard, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockRoomData = {
  1: {
    1: {
      id: 1,
      name: "Deluxe City View",
      hotelName: "Grand Palace Hotel",
      hotelLocation: "Downtown Manhattan, New York",
      images: [
        "/hotels/grand-palace/dcv1.jpg",
        "/hotels/grand-palace/dcv2.jpg",
        "/hotels/grand-palace/dcv3.jpg",
        "/hotels/grand-palace/dcv4.jpg",
      ],
      price: 299,
      originalPrice: 349,
      size: "350 sq ft",
      beds: "1 King Bed",
      maxGuests: 2,
      amenities: ["City View", "WiFi", "Mini Bar", "Safe", "AC", "Room Service", "Flat Screen TV", "Work Desk"],
      description:
        "Experience luxury and comfort in our Deluxe City View room, featuring panoramic views of Manhattan's skyline. This elegantly appointed room offers modern amenities and sophisticated design elements that create the perfect urban retreat.",
      features: [
        "Floor-to-ceiling windows with city views",
        "Marble bathroom with rainfall shower",
        "Premium bedding and linens",
        "Complimentary high-speed WiFi",
        "24/7 room service available",
        "Climate control system",
        "In-room safe for valuables",
        "Work desk with ergonomic chair",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        smoking: "Non-smoking room",
        pets: "Pets not allowed",
      },
    },
  },
}

export default function RoomDetailsPage() {
  const params = useParams()
  const hotelId = Number.parseInt(params.id as string)
  const roomId = Number.parseInt(params.roomId as string)
  const room = mockRoomData[hotelId as keyof typeof mockRoomData]?.[roomId as keyof (typeof mockRoomData)[1]]

  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")
  const [nights, setNights] = useState(1)

  if (!room) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Room Not Found</h1>
          <Link href="/hotels">
            <Button>Back to Hotels</Button>
          </Link>
        </div>
      </div>
    )
  }

  const totalPrice = room.price * nights
  const taxes = Math.round(totalPrice * 0.12)
  const finalTotal = totalPrice + taxes

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link href="/hotels" className="hover:text-foreground">
            Hotels
          </Link>
          <span>/</span>
          <Link href={`/hotels/${hotelId}`} className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            {room.hotelName}
          </Link>
          <span>/</span>
          <span className="text-foreground">{room.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Room Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4" />
                {room.hotelName} • {room.hotelLocation}
              </p>
              <div className="flex items-center gap-6 text-sm">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Up to {room.maxGuests} guests
                </span>
                <span className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  {room.beds}
                </span>
                <span>{room.size}</span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
              <div className="lg:col-span-2">
                <img
                  src={room.images[selectedImage] || "/placeholder.svg"}
                  alt={room.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
                {room.images.slice(1, 4).map((image, index) => (
                  <img
                    key={index + 1}
                    src={image || "/placeholder.svg"}
                    alt={`${room.name} ${index + 2}`}
                    className="w-full h-28 lg:h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setSelectedImage(index + 1)}
                  />
                ))}
              </div>
            </div>

            {/* Room Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About This Room</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{room.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Room Features</h3>
                  <ul className="space-y-2">
                    {room.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Policies */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Hotel Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Check-in:</span>
                    <span className="ml-2 text-muted-foreground">{room.policies.checkIn}</span>
                  </div>
                  <div>
                    <span className="font-medium">Check-out:</span>
                    <span className="ml-2 text-muted-foreground">{room.policies.checkOut}</span>
                  </div>
                  <div>
                    <span className="font-medium">Smoking:</span>
                    <span className="ml-2 text-muted-foreground">{room.policies.smoking}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Cancellation:</span>
                    <span className="ml-2 text-muted-foreground">{room.policies.cancellation}</span>
                  </div>
                  <div>
                    <span className="font-medium">Pets:</span>
                    <span className="ml-2 text-muted-foreground">{room.policies.pets}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-primary">${room.price}</span>
                    {room.originalPrice > room.price && (
                      <span className="text-lg text-muted-foreground line-through">${room.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground">per night</span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Number of Nights</label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={nights}
                      onChange={(e) => setNights(Number.parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>
                        ${room.price} × {nights} nights
                      </span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes & fees</span>
                      <span>${taxes}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>${finalTotal}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/booking?hotelId=${hotelId}&roomId=${roomId}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&nights=${nights}`}
                >
                  <Button className="w-full mb-4" size="lg" disabled={!checkIn || !checkOut}>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
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
