"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface AccountModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    name: string
    email: string
  } | null
}

export default function AccountModal({ isOpen, onClose, user }: AccountModalProps) {
  const [name, setName] = useState(user?.name || "")
  const [email, setEmail] = useState(user?.email || "")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  if (!isOpen || !user) return null

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
    // In a real app, you would update the user context here
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] transition-opacity">
      <div className="w-[90%] max-w-[500px] bg-black/80 backdrop-blur-[15px] rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-medium">Manage Account</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-medium">{user.name}</h3>
              <p className="text-white/60">{user.email}</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium mb-4">Account Information</h4>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-white/60">Name</p>
                    <p>{user.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Email</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                <button
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium mb-4">Account Status</h4>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Active</span>
            </div>
            <p className="text-white/60 text-sm mt-2">Your account is in good standing.</p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium mb-4">SnipePlus Subscription</h4>
            <div className="bg-[rgba(31,41,55,0.5)] p-3 rounded-lg">
              <p className="font-medium">Free Plan</p>
              <p className="text-white/60 text-sm">Upgrade to SnipePlus for additional features</p>
              <a
                href="https://buy.stripe.com/test_00g5lL0Ht2Hl0QU000"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-3 py-1 inline-block bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white transition-colors hover:from-purple-700 hover:to-blue-700"
              >
                Upgrade Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
