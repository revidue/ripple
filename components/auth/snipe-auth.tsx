"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface SnipeAuthProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (snipeId: string, pin: string) => void
  onSignup: (snipeId: string, pin: string) => void
  isSignup?: boolean
}

export default function SnipeAuth({ isOpen, onClose, onLogin, onSignup, isSignup = false }: SnipeAuthProps) {
  const [step, setStep] = useState(1)
  const [snipeId, setSnipeId] = useState("")
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmitId = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!snipeId || snipeId.length !== 6) {
      setError("Snipe ID must be 6 characters")
      return
    }

    setStep(2)
  }

  const handleSubmitPin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!pin || pin.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isSignup) {
        onSignup(snipeId, pin)
      } else {
        onLogin(snipeId, pin)
      }

      // Reset form
      setStep(1)
      setSnipeId("")
      setPin("")
      onClose()
    } catch (err) {
      setError("Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setSnipeId("")
    setPin("")
    setError("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] transition-opacity">
      <div className="w-[90%] max-w-[400px] bg-black/80 backdrop-blur-[15px] rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-medium">{isSignup ? "Create Account" : "Login"}</h2>
          <button
            onClick={() => {
              resetForm()
              onClose()
            }}
            className="text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        {step === 1 ? (
          <form onSubmit={handleSubmitId} className="p-4 space-y-4">
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
                onChange={(e) => setSnipeId(e.target.value.slice(0, 6))}
                placeholder="Enter your 6-character Snipe ID"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
            >
              Continue
            </button>

            <div className="text-center text-sm">
              <p className="text-white/60">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    // Toggle between signup and login
                  }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  {isSignup ? "Login" : "Sign up"}
                </button>
              </p>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmitPin} className="p-4 space-y-4">
            {error && <div className="bg-red-900/50 border border-red-500 p-2 rounded text-sm">{error}</div>}

            <div>
              <label htmlFor="pin" className="block text-sm mb-1">
                PIN (4 digits)
              </label>
              <input
                type="password"
                id="pin"
                className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
                value={pin}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "")
                  setPin(value.slice(0, 4))
                }}
                placeholder="Enter your 4-digit PIN"
                maxLength={4}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 p-2 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-2/3 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed rounded text-white transition-colors"
              >
                {isLoading ? "Processing..." : isSignup ? "Create Account" : "Login"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
