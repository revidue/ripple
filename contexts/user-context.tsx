"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  name: string
  email: string
  snipeId: string
  isSnipePlus: boolean
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  login: (snipeId: string, pin: string) => void
  signup: (name: string, email: string, snipeId: string, pin: string) => void
  logout: () => void
  upgradeToSnipePlus: () => void
}

// This would be replaced with a real database in production
const MOCK_USER_DB = [
  {
    snipeId: "admin1",
    pin: "1234",
    name: "Admin User",
    email: "admin@ripple.com",
    isSnipePlus: true,
  },
  {
    snipeId: "test01",
    pin: "0000",
    name: "Test User",
    email: "test@example.com",
    isSnipePlus: false,
  },
]

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("ripple-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setIsLoading(false)
    }
  }, [])

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("ripple-user", JSON.stringify(user))
      } else {
        localStorage.removeItem("ripple-user")
      }
    }
  }, [user])

  const login = (snipeId: string, pin: string) => {
    // In a real app, you would verify credentials against a database
    // For demo purposes, we'll check against our mock database
    const foundUser = MOCK_USER_DB.find((u) => u.snipeId === snipeId && u.pin === pin)

    if (foundUser) {
      const { pin, ...userWithoutPin } = foundUser
      setUser(userWithoutPin)
    } else {
      // For demo, create a user with the provided snipeId
      setUser({
        name: `User ${snipeId}`,
        email: `${snipeId}@example.com`,
        snipeId,
        isSnipePlus: false,
      })
    }
  }

  const signup = (name: string, email: string, snipeId: string, pin: string) => {
    // In a real app, you would create a new user in the database
    // For demo purposes, we'll just create a user object
    setUser({
      name,
      email,
      snipeId,
      isSnipePlus: false,
    })
  }

  const logout = () => {
    setUser(null)
  }

  const upgradeToSnipePlus = () => {
    if (user) {
      setUser({
        ...user,
        isSnipePlus: true,
      })
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        upgradeToSnipePlus,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
