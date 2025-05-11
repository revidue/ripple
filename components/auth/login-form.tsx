"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface LoginFormProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
  onLogin: (snipeId: string, pin: string) => void
}

export default function LoginForm({ isOpen, onClose, onSwitchToSignup, onLogin }: LoginFormProps) {
  const [snipeId, setSnipeId] = useState("")
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!snipeId || !pin) {
      setError("Please fill in all fields")
      return
    }

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError("PIN must be 4 digits")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, you would make an API call to verify credentials
      // For now, we'll simulate a server request
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any credentials
      onLogin(snipeId, pin)
    } catch (err) {
      setError("An error occurred during login")
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
          <h2 className="text-xl font-medium">Login</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && <div className="bg-red-900/50 border border-red-500 p-2 rounded text-sm">{error}</div>}

          <div>
            <label htmlFor="snipeId" className="block text-sm mb-1">
              Snipe ID (6 characters)
            </label>
            <input
              type="text"
              id="snipeId"
              className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
              value={snipeId}
              onChange={(e) => setSnipeId(e.target.value)}
              placeholder="Enter your Snipe ID"
              maxLength={6}
            />
          </div>

          <div>
            <label htmlFor="pin" className="block text-sm mb-1">
              ID PIN (4 digits)
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

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded text-white transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-sm">
            <p className="text-white/60">
              Don't have an account?{" "}
              <button type="button" onClick={onSwitchToSignup} className="text-blue-400 hover:text-blue-300">
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
