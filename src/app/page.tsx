/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Star, Wifi, Coffee, Dumbbell, Search, ChevronRight } from "lucide-react"

export default function HotelLandingPage() {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: "2",
  })

  const featuredHotels = [
    {
      id: 1,
      name: "Grand Palace Hotel",
      location: "Downtown Manhattan",
      image: "/placeholder-6d9x5.png",
      rating: 4.8,
      price: 299,
      amenities: ["WiFi", "Pool", "Spa", "Gym"],
    },
    {
      id: 2,
      name: "Seaside Resort & Spa",
      location: "Miami Beach",
      image: "/placeholder-eska4.png",
      rating: 4.9,
      price: 399,
      amenities: ["Beach", "WiFi", "Restaurant", "Spa"],
    },
    {
      id: 3,
      name: "Mountain View Lodge",
      location: "Aspen, Colorado",
      image: "/placeholder-ka332.png",
      rating: 4.7,
      price: 249,
      amenities: ["Ski Access", "Fireplace", "WiFi", "Restaurant"],
    },
  ]

  const handleSearch = () => {
    console.log("[v0] Search initiated with:", searchData)
    // Simulate search functionality
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">H</span>
              </div>
              <span className="text-xl font-bold text-foreground">HotelLux</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Hotels
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Destinations
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">Sign Up</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder-au8wr.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Discover Your Perfect
            <span className="text-accent block">Hotel Experience</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pretty opacity-90">
            Luxury accommodations, exceptional service, unforgettable memories
          </p>

          {/* Search Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Destination
                  </label>
                  <Input
                    placeholder="Where are you going?"
                    value={searchData.destination}
                    onChange={(e: { target: { value: any } }) => setSearchData({ ...searchData, destination: e.target.value })}
                    className="border-0 bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-in
                  </label>
                  <Input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e: { target: { value: any } }) => setSearchData({ ...searchData, checkIn: e.target.value })}
                    className="border-0 bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Check-out
                  </label>
                  <Input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e: { target: { value: any } }) => setSearchData({ ...searchData, checkOut: e.target.value })}
                    className="border-0 bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Guests
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="1"
                      max="10"
                      value={searchData.guests}
                      onChange={(e: { target: { value: any } }) => setSearchData({ ...searchData, guests: e.target.value })}
                      className="border-0 bg-muted/50"
                    />
                    <Button onClick={handleSearch} size="lg" className="px-8">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">Featured Hotels</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Handpicked luxury accommodations for discerning travelers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-card"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-accent text-accent-foreground font-semibold">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      {hotel.rating}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                  <p className="text-muted-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity === "WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity === "Gym" && <Dumbbell className="w-3 h-3 mr-1" />}
                        {amenity === "Restaurant" && <Coffee className="w-3 h-3 mr-1" />}
                        {amenity === "Pool" && <span className="w-3 h-3 mr-1">🏊</span>}
                        {amenity}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                      <span className="text-muted-foreground">/night</span>
                    </div>
                    <Button className="group/btn">
                      View Details
                      <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-balance">Why Choose HotelLux?</h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Experience the difference with our premium services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-muted-foreground text-pretty">
                Carefully curated hotels that meet our highest standards for luxury and comfort
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-muted-foreground text-pretty">
                Round-the-clock customer service to ensure your travel experience is seamless
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Locations</h3>
              <p className="text-muted-foreground text-pretty">
                Prime locations in the world&apos;s most desirable destinations and business districts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-sm">H</span>
                </div>
                <span className="text-xl font-bold">HotelLux</span>
              </div>
              <p className="text-primary-foreground/80 text-pretty">
                Your gateway to exceptional hotel experiences worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Hotels
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Destinations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Booking Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contact Info</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <p>1-800-HOTELLUX</p>
                <p>support@hotellux.com</p>
                <p>Available 24/7</p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 HotelLux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}