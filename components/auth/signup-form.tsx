"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface SignupFormProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
  onSignup: (name: string, email: string, snipeId: string, pin: string) => void
}

export default function SignupForm({ isOpen, onClose, onSwitchToLogin, onSignup }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [snipeId, setSnipeId] = useState("")
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !snipeId || !pin || !confirmPin) {
      setError("Please fill in all fields")
      return
    }

    if (snipeId.length !== 6) {
      setError("Snipe ID must be 6 characters")
      return
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError("PIN must be 4 digits")
      return
    }

    if (pin !== confirmPin) {
      setError("PINs do not match")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would make an API call to create an account
      // For now, we'll simulate a server request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any valid input
      onSignup(name, email, snipeId, pin)
    } catch (err) {
      setError("An error occurred during signup")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] transition-opacity">
      <div className="w-[90%] max-w-[400px] bg-black/80 backdrop-blur-[15px] rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-medium">Sign Up</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="bg-red-900/50 border border-red-500 p-2 rounded text-sm">{error}</div>}

          <div>
            <label htmlFor="name" className="block text-sm mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="snipeId" className="block text-sm mb-1">
              Create Snipe ID (6 characters)
            </label>
            <input
              type="text"
              id="snipeId"
              className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
              value={snipeId}
              onChange={(e) => setSnipeId(e.target.value)}
              placeholder="Create a unique ID"
              maxLength={6}
            />
          </div>

          <div>
            <label htmlFor="pin" className="block text-sm mb-1">
              Create ID PIN (4 digits)
            </label>
            <input
              type="password"
              id="pin"
              className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••"
              maxLength={4}
              inputMode="numeric"
            />
          </div>

          <div>
            <label htmlFor="confirmPin" className="block text-sm mb-1">
              Confirm ID PIN
            </label>
            <input
              type="password"
              id="confirmPin"
              className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
              value={confirmPin}
              onChange={(e) => setConfirmPin(e.target.value)}
              placeholder="••••"
              maxLength={4}
              inputMode="numeric"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded text-white transition-colors"
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </button>

          <div className="text-center text-sm">
            <p className="text-white/60">
              Already have an account?{" "}
              <button type="button" onClick={onSwitchToLogin} className="text-blue-400 hover:text-blue-300">
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
