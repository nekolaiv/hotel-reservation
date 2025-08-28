"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  MapPin,
  Bed,
  Star,
  Settings,
  LogOut,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Gift,
} from "lucide-react"
import Link from "next/link"

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  memberSince: "2023",
  loyaltyPoints: 2450,
  avatar: "/placeholder.svg?height=100&width=100&text=JD",
}

const mockBookings = [
  {
    id: "BK1703123456",
    status: "confirmed",
    hotelName: "Grand Palace Hotel",
    hotelLocation: "Downtown Manhattan, New York",
    roomName: "Deluxe City View",
    roomImage: "/hotels/grand-palace.jpg",
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
    nights: 3,
    guests: 2,
    total: 897,
    bookingDate: "2024-02-10",
  },
  {
    id: "BK1702987654",
    status: "completed",
    hotelName: "Seaside Resort & Spa",
    hotelLocation: "Miami Beach, Florida",
    roomName: "Ocean View Suite",
    roomImage: "/hotels/miami-beach.jpg",
    checkIn: "2024-01-20",
    checkOut: "2024-01-25",
    nights: 5,
    guests: 2,
    total: 1995,
    bookingDate: "2023-12-15",
  },
  {
    id: "BK1701234567",
    status: "cancelled",
    hotelName: "Mountain View Lodge",
    hotelLocation: "Aspen, Colorado",
    roomName: "Alpine Suite",
    roomImage: "/hotels/mountain-lodge.jpg",
    checkIn: "2024-02-01",
    checkOut: "2024-02-05",
    nights: 4,
    guests: 4,
    total: 996,
    bookingDate: "2023-11-20",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="w-4 h-4 text-green-600" />
    case "completed":
      return <CheckCircle className="w-4 h-4 text-blue-600" />
    case "cancelled":
      return <XCircle className="w-4 h-4 text-red-600" />
    default:
      return <Clock className="w-4 h-4 text-yellow-600" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-yellow-100 text-yellow-800"
  }
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const upcomingBookings = mockBookings.filter((b) => b.status === "confirmed")
  const pastBookings = mockBookings.filter((b) => b.status === "completed")
  const totalSpent = mockBookings.filter((b) => b.status !== "cancelled").reduce((sum, b) => sum + b.total, 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                    <AvatarFallback className="text-lg">JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{mockUser.name}</h3>
                    <p className="text-sm text-muted-foreground">Member since {mockUser.memberSince}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Loyalty Points</span>
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Gift className="w-3 h-3" />
                      {mockUser.loyaltyPoints.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Total Spent</span>
                    <span className="font-semibold">${totalSpent.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <nav className="space-y-2">
              <Button
                variant={activeTab === "overview" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("overview")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "bookings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("bookings")}
              >
                <Bed className="w-4 h-4 mr-2" />
                My Bookings
              </Button>
              <Button
                variant={activeTab === "profile" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("profile")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Profile Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Welcome back, {mockUser.name.split(" ")[0]}!</h1>
                  <p className="text-muted-foreground">Manage your bookings and explore new destinations.</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Upcoming Trips</p>
                          <p className="text-2xl font-bold">{upcomingBookings.length}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Completed Stays</p>
                          <p className="text-2xl font-bold">{pastBookings.length}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Loyalty Points</p>
                          <p className="text-2xl font-bold">{mockUser.loyaltyPoints.toLocaleString()}</p>
                        </div>
                        <Gift className="w-8 h-8 text-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Bookings */}
                {upcomingBookings.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Trips</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <img
                              src={booking.roomImage || "/placeholder.svg"}
                              alt={booking.roomName}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold">{booking.hotelName}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {booking.hotelLocation}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                                {new Date(booking.checkOut).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <Badge className={getStatusColor(booking.status)}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1 capitalize">{booking.status}</span>
                              </Badge>
                              <p className="text-sm font-semibold mt-1">${booking.total}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Link href="/hotels">
                        <Button className="w-full h-16 text-left justify-start">
                          <div>
                            <div className="font-semibold">Book New Stay</div>
                            <div className="text-sm opacity-80">Explore hotels and destinations</div>
                          </div>
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full h-16 text-left justify-start bg-transparent">
                        <div>
                          <div className="font-semibold">Redeem Points</div>
                          <div className="text-sm opacity-80">
                            Use your {mockUser.loyaltyPoints.toLocaleString()} points
                          </div>
                        </div>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
                  <p className="text-muted-foreground">View and manage all your hotel reservations.</p>
                </div>

                <Tabs defaultValue="all" className="w-full">
                  <TabsList>
                    <TabsTrigger value="all">All Bookings</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    {mockBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <img
                              src={booking.roomImage || "/placeholder.svg"}
                              alt={booking.roomName}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold">{booking.hotelName}</h3>
                                  <p className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {booking.hotelLocation}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                <div>
                                  <p className="text-muted-foreground">Room</p>
                                  <p className="font-medium">{booking.roomName}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Check-in</p>
                                  <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Check-out</p>
                                  <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total</p>
                                  <p className="font-medium">${booking.total}</p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm">View Details</Button>
                                {booking.status === "confirmed" && (
                                  <>
                                    <Button size="sm" variant="outline">
                                      Modify
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      Cancel
                                    </Button>
                                  </>
                                )}
                                {booking.status === "completed" && (
                                  <Button size="sm" variant="outline">
                                    <Star className="w-4 h-4 mr-1" />
                                    Review
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <img
                              src={booking.roomImage || "/placeholder.svg"}
                              alt={booking.roomName}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold">{booking.hotelName}</h3>
                                  <p className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {booking.hotelLocation}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                <div>
                                  <p className="text-muted-foreground">Room</p>
                                  <p className="font-medium">{booking.roomName}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Check-in</p>
                                  <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Check-out</p>
                                  <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total</p>
                                  <p className="font-medium">${booking.total}</p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm">View Details</Button>
                                <Button size="sm" variant="outline">
                                  Modify
                                </Button>
                                <Button size="sm" variant="outline">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="past" className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <img
                              src={booking.roomImage || "/placeholder.svg"}
                              alt={booking.roomName}
                              className="w-full md:w-48 h-32 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold">{booking.hotelName}</h3>
                                  <p className="text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {booking.hotelLocation}
                                  </p>
                                </div>
                                <Badge className={getStatusColor(booking.status)}>
                                  {getStatusIcon(booking.status)}
                                  <span className="ml-1 capitalize">{booking.status}</span>
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                <div>
                                  <p className="text-muted-foreground">Room</p>
                                  <p className="font-medium">{booking.roomName}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Check-in</p>
                                  <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Check-out</p>
                                  <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">Total</p>
                                  <p className="font-medium">${booking.total}</p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button size="sm">View Details</Button>
                                <Button size="sm" variant="outline">
                                  <Star className="w-4 h-4 mr-1" />
                                  Review
                                </Button>
                                <Button size="sm" variant="outline">
                                  Book Again
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
                  <p className="text-muted-foreground">Manage your account information and preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4 mb-6">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                          <AvatarFallback className="text-xl">JD</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          Change Photo
                        </Button>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">First Name</label>
                          <input
                            type="text"
                            defaultValue="John"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Last Name</label>
                          <input
                            type="text"
                            defaultValue="Doe"
                            className="w-full px-3 py-2 border border-input rounded-md bg-background"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <input
                          type="email"
                          defaultValue={mockUser.email}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone</label>
                        <input
                          type="tel"
                          defaultValue={mockUser.phone}
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                      </div>

                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Preferred Currency</label>
                        <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Language</label>
                        <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium">Email Notifications</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Booking confirmations</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Special offers and promotions</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Travel tips and recommendations</span>
                          </label>
                        </div>
                      </div>

                      <Button>Save Preferences</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Current Password</label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">New Password</label>
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                        <input
                          type="password"
                          placeholder="Confirm new password"
                          className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        />
                      </div>

                      <Button>Update Password</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Loyalty Program</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Gift className="w-8 h-8 text-accent" />
                        </div>
                        <h3 className="font-bold text-lg">Gold Member</h3>
                        <p className="text-muted-foreground">
                          You have {mockUser.loyaltyPoints.toLocaleString()} points
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Platinum</span>
                          <span>2,450 / 5,000 points</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-accent h-2 rounded-full" style={{ width: "49%" }}></div>
                        </div>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        <p>Benefits:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          <li>10% discount on all bookings</li>
                          <li>Free room upgrades (subject to availability)</li>
                          <li>Priority customer support</li>
                          <li>Late checkout until 2 PM</li>
                        </ul>
                      </div>

                      <Button variant="outline" className="w-full bg-transparent">
                        View Rewards Catalog
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}