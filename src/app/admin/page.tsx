"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Bed,
  Users,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  LogOut,
  Building,
  UserCheck,
  BarChart3,
  Edit,
  Eye,
} from "lucide-react"
import Link from "next/link"

const mockAdmin = {
  name: "Sarah Johnson",
  role: "Hotel Manager",
  avatar: "/placeholder.svg?height=100&width=100&text=SJ",
}

const mockStats = {
  totalBookings: 1247,
  todayCheckIns: 23,
  todayCheckOuts: 18,
  occupancyRate: 87,
  revenue: 45680,
  avgRating: 4.8,
}

const mockBookings = [
  {
    id: "BK1703123456",
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    hotelName: "Grand Palace Hotel",
    roomName: "Deluxe City View",
    roomNumber: "1205",
    checkIn: "2024-03-15",
    checkOut: "2024-03-18",
    status: "confirmed",
    guests: 2,
    total: 897,
    bookingDate: "2024-02-10",
  },
  {
    id: "BK1703123457",
    guestName: "Jane Smith",
    guestEmail: "jane.smith@example.com",
    hotelName: "Grand Palace Hotel",
    roomName: "Executive Suite",
    roomNumber: "2010",
    checkIn: "2024-03-15",
    checkOut: "2024-03-17",
    status: "checked-in",
    guests: 1,
    total: 998,
    bookingDate: "2024-02-12",
  },
  {
    id: "BK1703123458",
    guestName: "Mike Wilson",
    guestEmail: "mike.wilson@example.com",
    hotelName: "Grand Palace Hotel",
    roomName: "Standard Room",
    roomNumber: "0815",
    checkIn: "2024-03-14",
    checkOut: "2024-03-15",
    status: "checked-out",
    guests: 2,
    total: 199,
    bookingDate: "2024-02-08",
  },
]

const mockRooms = [
  {
    id: 1,
    number: "1205",
    type: "Deluxe City View",
    status: "occupied",
    guest: "John Doe",
    checkOut: "2024-03-18",
    price: 299,
    floor: 12,
  },
  {
    id: 2,
    number: "2010",
    type: "Executive Suite",
    status: "occupied",
    guest: "Jane Smith",
    checkOut: "2024-03-17",
    price: 499,
    floor: 20,
  },
  {
    id: 3,
    number: "0815",
    type: "Standard Room",
    status: "cleaning",
    guest: null,
    checkOut: null,
    price: 199,
    floor: 8,
  },
  {
    id: 4,
    number: "1506",
    type: "Deluxe City View",
    status: "available",
    guest: null,
    checkOut: null,
    price: 299,
    floor: 15,
  },
]

const mockGuests = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    totalBookings: 5,
    totalSpent: 2450,
    lastStay: "2024-03-15",
    loyaltyStatus: "Gold",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    totalBookings: 3,
    totalSpent: 1680,
    lastStay: "2024-03-15",
    loyaltyStatus: "Silver",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    phone: "+1 (555) 345-6789",
    totalBookings: 1,
    totalSpent: 199,
    lastStay: "2024-03-14",
    loyaltyStatus: "Bronze",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-blue-100 text-blue-800"
    case "checked-in":
      return "bg-green-100 text-green-800"
    case "checked-out":
      return "bg-gray-100 text-gray-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    default:
      return "bg-yellow-100 text-yellow-800"
  }
}

const getRoomStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800"
    case "occupied":
      return "bg-blue-100 text-blue-800"
    case "cleaning":
      return "bg-yellow-100 text-yellow-800"
    case "maintenance":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")

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
              <span className="text-xl font-bold text-foreground">HotelLux Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  View Site
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={mockAdmin.avatar || "/placeholder.svg"} alt={mockAdmin.name} />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{mockAdmin.name}</div>
                  <div className="text-muted-foreground">{mockAdmin.role}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={mockAdmin.avatar || "/placeholder.svg"} alt={mockAdmin.name} />
                    <AvatarFallback className="text-lg">SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{mockAdmin.name}</h3>
                    <p className="text-sm text-muted-foreground">{mockAdmin.role}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Today&apos;s Check-ins</span>
                    <Badge variant="secondary">{mockStats.todayCheckIns}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Today&apos;s Check-outs</span>
                    <Badge variant="secondary">{mockStats.todayCheckOuts}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Occupancy Rate</span>
                    <Badge variant="secondary">{mockStats.occupancyRate}%</Badge>
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
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </Button>
              <Button
                variant={activeTab === "bookings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("bookings")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Bookings
              </Button>
              <Button
                variant={activeTab === "rooms" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("rooms")}
              >
                <Bed className="w-4 h-4 mr-2" />
                Rooms
              </Button>
              <Button
                variant={activeTab === "guests" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("guests")}
              >
                <Users className="w-4 h-4 mr-2" />
                Guests
              </Button>
              <Button
                variant={activeTab === "reports" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("reports")}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Reports
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("settings")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Settings
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
                  <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                  <p className="text-muted-foreground">
                    Welcome back, {mockAdmin.name}. Here&apos;s what&apos;s happening today.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Bookings</p>
                          <p className="text-2xl font-bold">{mockStats.totalBookings.toLocaleString()}</p>
                        </div>
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Today&apos;s Revenue</p>
                          <p className="text-2xl font-bold">${mockStats.revenue.toLocaleString()}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                          <p className="text-2xl font-bold">{mockStats.occupancyRate}%</p>
                        </div>
                        <Building className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Avg Rating</p>
                          <p className="text-2xl font-bold">{mockStats.avgRating}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-accent" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Today's Activities */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5" />
                        Today&apos;s Check-ins ({mockStats.todayCheckIns})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockBookings
                          .filter((b) => b.status === "confirmed" && b.checkIn === "2024-03-15")
                          .map((booking) => (
                            <div
                              key={booking.id}
                              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{booking.guestName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.roomName} - Room {booking.roomNumber}
                                </p>
                              </div>
                              <Button size="sm">Check In</Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Today&apos;s Check-outs ({mockStats.todayCheckOuts})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockBookings
                          .filter((b) => b.status === "checked-in")
                          .map((booking) => (
                            <div
                              key={booking.id}
                              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                            >
                              <div>
                                <p className="font-medium">{booking.guestName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.roomName} - Room {booking.roomNumber}
                                </p>
                              </div>
                              <Button size="sm" variant="outline">
                                Check Out
                              </Button>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockBookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-medium">{booking.guestName}</p>
                                <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{booking.roomName}</p>
                            <p className="text-sm text-muted-foreground">Room {booking.roomNumber}</p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                            <p className="text-sm font-medium mt-1">${booking.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Booking Management</h1>
                    <p className="text-muted-foreground">Manage all hotel reservations and guest check-ins.</p>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Booking
                  </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search bookings by guest name, email, or booking ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Bookings</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="checked-in">Checked In</SelectItem>
                      <SelectItem value="checked-out">Checked Out</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>

                {/* Bookings Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b">
                          <tr className="text-left">
                            <th className="p-4 font-medium">Booking ID</th>
                            <th className="p-4 font-medium">Guest</th>
                            <th className="p-4 font-medium">Room</th>
                            <th className="p-4 font-medium">Dates</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Total</th>
                            <th className="p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockBookings.map((booking) => (
                            <tr key={booking.id} className="border-b hover:bg-muted/50">
                              <td className="p-4">
                                <div className="font-mono text-sm">{booking.id}</div>
                              </td>
                              <td className="p-4">
                                <div>
                                  <div className="font-medium">{booking.guestName}</div>
                                  <div className="text-sm text-muted-foreground">{booking.guestEmail}</div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div>
                                  <div className="font-medium">{booking.roomName}</div>
                                  <div className="text-sm text-muted-foreground">Room {booking.roomNumber}</div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="text-sm">
                                  <div>{new Date(booking.checkIn).toLocaleDateString()}</div>
                                  <div className="text-muted-foreground">
                                    to {new Date(booking.checkOut).toLocaleDateString()}
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                              </td>
                              <td className="p-4">
                                <div className="font-medium">${booking.total}</div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  {booking.status === "confirmed" && <Button size="sm">Check In</Button>}
                                  {booking.status === "checked-in" && (
                                    <Button size="sm" variant="outline">
                                      Check Out
                                    </Button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "rooms" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Room Management</h1>
                    <p className="text-muted-foreground">Monitor room status and manage availability.</p>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Room
                  </Button>
                </div>

                {/* Room Status Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Available</p>
                          <p className="text-2xl font-bold text-green-600">
                            {mockRooms.filter((r) => r.status === "available").length}
                          </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Occupied</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {mockRooms.filter((r) => r.status === "occupied").length}
                          </p>
                        </div>
                        <Users className="w-8 h-8 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Cleaning</p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {mockRooms.filter((r) => r.status === "cleaning").length}
                          </p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Maintenance</p>
                          <p className="text-2xl font-bold text-red-600">
                            {mockRooms.filter((r) => r.status === "maintenance").length}
                          </p>
                        </div>
                        <AlertCircle className="w-8 h-8 text-red-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Rooms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {mockRooms.map((room) => (
                    <Card key={room.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-bold">Room {room.number}</h3>
                          <Badge className={getRoomStatusColor(room.status)}>{room.status}</Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Type:</span>
                            <span>{room.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Floor:</span>
                            <span>{room.floor}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Price:</span>
                            <span className="font-medium">${room.price}/night</span>
                          </div>
                          {room.guest && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Guest:</span>
                                <span>{room.guest}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Check-out:</span>
                                <span>{room.checkOut && new Date(room.checkOut).toLocaleDateString()}</span>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "guests" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">Guest Management</h1>
                    <p className="text-muted-foreground">View and manage guest profiles and history.</p>
                  </div>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Guest
                  </Button>
                </div>

                {/* Search */}
                <div className="flex gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Search guests by name, email, or phone..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                {/* Guests Table */}
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b">
                          <tr className="text-left">
                            <th className="p-4 font-medium">Guest</th>
                            <th className="p-4 font-medium">Contact</th>
                            <th className="p-4 font-medium">Bookings</th>
                            <th className="p-4 font-medium">Total Spent</th>
                            <th className="p-4 font-medium">Last Stay</th>
                            <th className="p-4 font-medium">Status</th>
                            <th className="p-4 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockGuests.map((guest) => (
                            <tr key={guest.id} className="border-b hover:bg-muted/50">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarFallback>
                                      {guest.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{guest.name}</div>
                                    <div className="text-sm text-muted-foreground">ID: {guest.id}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="text-sm">
                                  <div>{guest.email}</div>
                                  <div className="text-muted-foreground">{guest.phone}</div>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="font-medium">{guest.totalBookings}</div>
                              </td>
                              <td className="p-4">
                                <div className="font-medium">${guest.totalSpent.toLocaleString()}</div>
                              </td>
                              <td className="p-4">
                                <div className="text-sm">{new Date(guest.lastStay).toLocaleDateString()}</div>
                              </td>
                              <td className="p-4">
                                <Badge
                                  className={
                                    guest.loyaltyStatus === "Gold"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : guest.loyaltyStatus === "Silver"
                                        ? "bg-gray-100 text-gray-800"
                                        : "bg-orange-100 text-orange-800"
                                  }
                                >
                                  {guest.loyaltyStatus}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <Button size="sm" variant="ghost">
                                    <Eye className="w-4 h-4" />
                                  </Button>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "reports" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
                  <p className="text-muted-foreground">View detailed reports and business insights.</p>
                </div>

                {/* Report Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Revenue Report</h3>
                          <p className="text-sm text-muted-foreground">Monthly and yearly revenue analysis</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Occupancy Report</h3>
                          <p className="text-sm text-muted-foreground">Room occupancy trends and forecasts</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Guest Analytics</h3>
                          <p className="text-sm text-muted-foreground">Guest demographics and behavior</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Booking Patterns</h3>
                          <p className="text-sm text-muted-foreground">Seasonal trends and booking analysis</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Performance Metrics</h3>
                          <p className="text-sm text-muted-foreground">KPIs and operational efficiency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Financial Summary</h3>
                          <p className="text-sm text-muted-foreground">Comprehensive financial overview</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          ${mockStats.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Today&apos;s Revenue</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">{mockStats.occupancyRate}%</div>
                        <div className="text-sm text-muted-foreground">Occupancy Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{mockStats.avgRating}</div>
                        <div className="text-sm text-muted-foreground">Average Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {mockStats.totalBookings.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Bookings</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">Settings</h1>
                  <p className="text-muted-foreground">Manage hotel settings and configurations.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hotel Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Hotel Name</label>
                        <Input defaultValue="Grand Palace Hotel" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Address</label>
                        <Input defaultValue="123 Fifth Avenue, New York, NY 10001" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Phone</label>
                          <Input defaultValue="+1 (212) 555-0123" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input defaultValue="info@grandpalace.com" />
                        </div>
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Check-in Time</label>
                        <Input defaultValue="3:00 PM" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Check-out Time</label>
                        <Input defaultValue="12:00 PM" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Cancellation Policy</label>
                        <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                          <option>Free cancellation up to 24 hours</option>
                          <option>Free cancellation up to 48 hours</option>
                          <option>Free cancellation up to 72 hours</option>
                          <option>No free cancellation</option>
                        </select>
                      </div>
                      <Button>Save Settings</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Staff Management</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>SJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Sarah Johnson</div>
                              <div className="text-sm text-muted-foreground">Hotel Manager</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>MR</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">Mike Rodriguez</div>
                              <div className="text-sm text-muted-foreground">Front Desk</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <Button className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Staff Member
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Default Currency</label>
                        <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Time Zone</label>
                        <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
                          <option>Eastern Time (ET)</option>
                          <option>Central Time (CT)</option>
                          <option>Mountain Time (MT)</option>
                          <option>Pacific Time (PT)</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium">Notifications</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">Email notifications for new bookings</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm">SMS alerts for check-ins</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Daily revenue reports</span>
                          </label>
                        </div>
                      </div>
                      <Button>Save Preferences</Button>
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