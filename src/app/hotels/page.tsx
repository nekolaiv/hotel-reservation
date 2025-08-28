"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, Star, Wifi, Car, Coffee, Dumbbell, Search, Filter, Heart, ChevronRight } from "lucide-react"
import Link from "next/link"

const mockHotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Downtown Manhattan, New York",
    image: "/hotels/grand-palace.jpg",
    rating: 4.8,
    reviewCount: 1247,
    priceFrom: 299,
    amenities: ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking"],
    description: "Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.",
  },
  {
    id: 2,
    name: "Seaside Resort & Spa",
    location: "Miami Beach, Florida",
    image: "/hotels/miami-beach.jpg",
    rating: 4.9,
    reviewCount: 892,
    priceFrom: 399,
    amenities: ["Beach", "WiFi", "Restaurant", "Spa", "Pool", "Bar"],
    description: "Beachfront resort with pristine white sand beaches and crystal-clear waters.",
  },
  {
    id: 3,
    name: "Mountain View Lodge",
    location: "Aspen, Colorado",
    image: "/hotels/mountain-lodge.jpg",
    rating: 4.7,
    reviewCount: 634,
    priceFrom: 249,
    amenities: ["Ski Access", "Fireplace", "WiFi", "Restaurant", "Spa"],
    description: "Cozy mountain lodge with direct ski access and breathtaking alpine views.",
  },
  {
    id: 4,
    name: "Urban Boutique Hotel",
    location: "SoHo, New York",
    image: "/hotels/urban-boutique.jpg",
    rating: 4.6,
    reviewCount: 456,
    priceFrom: 189,
    amenities: ["WiFi", "Restaurant", "Bar", "Gym", "Business Center"],
    description: "Stylish boutique hotel in trendy SoHo with contemporary design and personalized service.",
  },
  {
    id: 5,
    name: "Desert Oasis Resort",
    location: "Scottsdale, Arizona",
    image: "/hotels/desert-oasis.jpg",
    rating: 4.8,
    reviewCount: 723,
    priceFrom: 329,
    amenities: ["Pool", "Spa", "Golf", "WiFi", "Restaurant", "Tennis"],
    description: "Luxurious desert resort with championship golf course and award-winning spa.",
  },
  {
    id: 6,
    name: "Historic Downtown Inn",
    location: "Charleston, South Carolina",
    image: "/hotels/historic-downtown.jpg",
    rating: 4.5,
    reviewCount: 389,
    priceFrom: 159,
    amenities: ["WiFi", "Restaurant", "Historic", "Garden", "Bar"],
    description: "Charming historic inn in the heart of Charleston's historic district.",
  },
]

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const allAmenities = ["WiFi", "Pool", "Spa", "Gym", "Restaurant", "Parking", "Beach", "Bar", "Golf", "Tennis"]

  const filteredHotels = mockHotels
    .filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((hotel) => hotel.priceFrom >= priceRange[0] && hotel.priceFrom <= priceRange[1])
    .filter(
      (hotel) =>
        selectedAmenities.length === 0 || selectedAmenities.every((amenity) => hotel.amenities.includes(amenity)),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.priceFrom - b.priceFrom
        case "price-high":
          return b.priceFrom - a.priceFrom
        case "rating":
          return b.rating - a.rating
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
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
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/hotels" className="text-primary font-medium">
                Hotels
              </Link>
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

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search hotels or destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full md:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <h3 className="font-semibold mb-3">Price Range</h3>
                    <div className="space-y-3">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={500}
                        min={0}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="md:col-span-2">
                    <h3 className="font-semibold mb-3">Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {allAmenities.map((amenity) => (
                        <Badge
                          key={amenity}
                          variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/10"
                          onClick={() => toggleAmenity(amenity)}
                        >
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{filteredHotels.length} Hotels Found</h1>
          <p className="text-muted-foreground">Showing results for your search</p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <Card key={hotel.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="relative md:w-1/3">
                  <img
                    src={hotel.image || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button size="sm" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <CardContent className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{hotel.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{hotel.rating}</span>
                      <span className="text-sm text-muted-foreground">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {hotel.location}
                  </p>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity === "WiFi" && <Wifi className="w-3 h-3 mr-1" />}
                        {amenity === "Gym" && <Dumbbell className="w-3 h-3 mr-1" />}
                        {amenity === "Restaurant" && <Coffee className="w-3 h-3 mr-1" />}
                        {amenity === "Parking" && <Car className="w-3 h-3 mr-1" />}
                        {amenity}
                      </Badge>
                    ))}
                    {hotel.amenities.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{hotel.amenities.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">From </span>
                      <span className="text-2xl font-bold text-primary">${hotel.priceFrom}</span>
                      <span className="text-sm text-muted-foreground">/night</span>
                    </div>
                    <Link href={`/hotels/${hotel.id}`}>
                      <Button className="group/btn">
                        View Rooms
                        <ChevronRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No hotels found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setPriceRange([0, 500])
                setSelectedAmenities([])
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}