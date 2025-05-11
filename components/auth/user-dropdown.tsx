"use client"

import { useState, useRef, useEffect } from "react"
import { CreditCard, User } from "lucide-react"

interface UserDropdownProps {
  user: {
    name: string
    email: string
  }
  onLogout: () => void
  onOpenSettings: () => void
  onOpenSnipePlus: () => void
  onManageAccount: () => void
}

export default function UserDropdown({
  user,
  onLogout,
  onOpenSettings,
  onOpenSnipePlus,
  onManageAccount,
}: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1 rounded hover:bg-white/10 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden sm:inline">{user.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[rgba(30,30,30,0.9)] backdrop-blur-[10px] rounded-lg shadow-lg z-50 animate-fadeIn">
          <div className="p-3 border-b border-white/10">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-white/60 truncate">{user.email}</p>
          </div>

          <button
            onClick={() => {
              setIsOpen(false)
              onManageAccount()
            }}
            className="w-full flex items-center gap-2 p-2 text-white hover:bg-white/10 transition-colors text-left"
          >
            <User className="w-4 h-4" />
            <span>Manage Account</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false)
              onOpenSnipePlus()
            }}
            className="w-full flex items-center gap-2 p-2 text-white hover:bg-white/10 transition-colors text-left"
          >
            <CreditCard className="w-4 h-4" />
            <span>SnipePlus</span>
          </button>
        </div>
      )}
    </div>
  )
}
