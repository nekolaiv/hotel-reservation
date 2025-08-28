"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Users,
  Bed,
  ArrowLeft,
  Heart,
  Calendar,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

const mockHotelData = {
  1: {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Downtown Manhattan, New York",
    images: [
      "/hotels/grand-palace/gp-1.jpg",
      "/hotels/grand-palace/gp-2.jpg",
      "/hotels/grand-palace/gp-3.jpg",
      "/hotels/grand-palace/gp-4.jpg",
    ],
    rating: 4.8,
    reviewCount: 1247,
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "Business Center", "Concierge"],
    description:
      "Experience luxury in the heart of Manhattan at the Grand Palace Hotel. Our elegant accommodations feature stunning city views, world-class amenities, and personalized service that exceeds expectations.",
    address: "123 Fifth Avenue, New York, NY 10001",
    phone: "+1 (212) 555-0123",
    email: "reservations@grandpalace.com",
    rooms: [
      {
        id: 1,
        name: "Deluxe City View",
        image: "/hotels/grand-palace/dcv.jpg",
        price: 299,
        originalPrice: 349,
        size: "350 sq ft",
        beds: "1 King Bed",
        maxGuests: 2,
        amenities: ["City View", "WiFi", "Mini Bar", "Safe", "AC"],
        description: "Elegant room with panoramic city views and modern amenities.",
        available: true,
      },
      {
        id: 2,
        name: "Executive Suite",
        image: "/hotels/grand-palace/es.jpg",
        price: 499,
        originalPrice: 599,
        size: "650 sq ft",
        beds: "1 King Bed + Sofa Bed",
        maxGuests: 4,
        amenities: ["City View", "WiFi", "Living Area", "Mini Bar", "Safe", "AC", "Balcony"],
        description: "Spacious suite with separate living area and premium amenities.",
        available: true,
      },
      {
        id: 3,
        name: "Presidential Suite",
        image: "/hotels/grand-palace/ps.jpg",
        price: 899,
        originalPrice: 1099,
        size: "1200 sq ft",
        beds: "1 King Bed + 2 Queen Beds",
        maxGuests: 6,
        amenities: ["Panoramic View", "WiFi", "Kitchen", "Dining Area", "Mini Bar", "Safe", "AC", "Terrace"],
        description: "Ultimate luxury with panoramic views and exclusive amenities.",
        available: false,
      },
      {
        id: 4,
        name: "Standard Room",
        image: "/hotels/grand-palace/sr.jpg",
        price: 199,
        originalPrice: 249,
        size: "280 sq ft",
        beds: "2 Double Beds",
        maxGuests: 4,
        amenities: ["WiFi", "Mini Bar", "Safe", "AC"],
        description: "Comfortable accommodation with essential amenities.",
        available: true,
      },
    ],
  },
}

export default function HotelDetailsPage() {
  const params = useParams()
  const hotelId = Number.parseInt(params.id as string)
  const hotel = mockHotelData[hotelId as keyof typeof mockHotelData]
  const [selectedImage, setSelectedImage] = useState(0)
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("2")

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-muted-foreground">
          <Link href="/hotels" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Hotels
          </Link>
        </div>

        {/* Hotel Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
              <p className="text-muted-foreground flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4" />
                {hotel.location}
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-semibold text-lg">{hotel.rating}</span>
                  <span className="text-muted-foreground">({hotel.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="lg">
              <Heart className="w-4 h-4 mr-2" />
              Save Hotel
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <img
              src={hotel.images[selectedImage] || "/placeholder.svg"}
              alt={hotel.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {hotel.images.slice(1, 4).map((image, index) => (
              <img
                key={index + 1}
                src={image || "/placeholder.svg"}
                alt={`${hotel.name} ${index + 2}`}
                className="w-full h-28 lg:h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImage(index + 1)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="rooms" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="rooms" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Available Rooms</h2>
                  <div className="space-y-4">
                    {hotel.rooms.map((room) => (
                      <Card key={room.id} className={`${!room.available ? "opacity-60" : ""}`}>
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3">
                              <img
                                src={room.image || "/placeholder.svg"}
                                alt={room.name}
                                className="w-full h-48 md:h-full object-cover rounded-l-lg"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h3 className="text-xl font-bold mb-1">{room.name}</h3>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
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
                                <div className="text-right">
                                  {room.originalPrice > room.price && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      ${room.originalPrice}
                                    </span>
                                  )}
                                  <div className="text-2xl font-bold text-primary">
                                    ${room.price}
                                    <span className="text-sm font-normal text-muted-foreground">/night</span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-muted-foreground mb-4">{room.description}</p>

                              <div className="flex flex-wrap gap-2 mb-4">
                                {room.amenities.map((amenity) => (
                                  <Badge key={amenity} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-sm">
                                  {room.available ? (
                                    <span className="text-green-600 font-medium">Available</span>
                                  ) : (
                                    <span className="text-red-600 font-medium">Fully Booked</span>
                                  )}
                                </div>
                                <Link href={`/hotels/${hotel.id}/rooms/${room.id}`}>
                                  <Button disabled={!room.available} className="group/btn">
                                    {room.available ? "Book Now" : "Unavailable"}
                                    {room.available && (
                                      <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    )}
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Hotel Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {hotel.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        {amenity === "WiFi" && <Wifi className="w-5 h-5 text-primary" />}
                        {amenity === "Gym" && <Dumbbell className="w-5 h-5 text-primary" />}
                        {amenity === "Restaurant" && <Coffee className="w-5 h-5 text-primary" />}
                        {amenity === "Parking" && <Car className="w-5 h-5 text-primary" />}
                        <span className="font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">About This Hotel</h3>
                  <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Location & Contact</h2>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Address</h4>
                      <p className="text-muted-foreground">{hotel.address}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Contact Information</h4>
                      <p className="text-muted-foreground">Phone: {hotel.phone}</p>
                      <p className="text-muted-foreground">Email: {hotel.email}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h4 className="font-semibold mb-2">Map Placeholder</h4>
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive map would be displayed here</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Book Your Stay</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-in</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Check-out</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background"
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
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ Guests</option>
                      </select>
                    </div>
                  </div>

                  <Button className="w-full" size="lg">
                    Check Availability
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                    <p className="text-2xl font-bold text-primary">
                      ${Math.min(...hotel.rooms.filter((r) => r.available).map((r) => r.price))}
                      <span className="text-sm font-normal text-muted-foreground">/night</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}