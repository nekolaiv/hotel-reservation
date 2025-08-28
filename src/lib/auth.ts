// Mock user accounts for testing
export interface User {
  id: string
  email: string
  password: string
  role: "admin" | "user"
  name: string
  avatar?: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@hotel.com",
    password: "admin123",
    role: "admin",
    name: "Hotel Admin",
    avatar: "/admin-avatar.png",
  },
  {
    id: "2",
    email: "guest@example.com",
    password: "guest123",
    role: "user",
    name: "John Guest",
    avatar: "/generic-guest-avatar.png",
  },
  {
    id: "3",
    email: "manager@hotel.com",
    password: "manager123",
    role: "admin",
    name: "Hotel Manager",
    avatar: "/manager-avatar.png",
  },
  {
    id: "4",
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "Jane User",
    avatar: "/diverse-user-avatars.png",
  },
]

export function authenticateUser(email: string, password: string): User | null {
  const user = mockUsers.find((u) => u.email === email && u.password === password)
  return user || null
}

export function getUserFromStorage(): User | null {
  if (typeof window === "undefined") return null

  const userData = localStorage.getItem("hotel_user")
  if (!userData) return null

  try {
    return JSON.parse(userData)
  } catch {
    return null
  }
}

export function saveUserToStorage(user: User): void {
  localStorage.setItem("hotel_user", JSON.stringify(user))
}

export function removeUserFromStorage(): void {
  localStorage.removeItem("hotel_user")
}