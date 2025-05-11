"use client"

import { X } from "lucide-react"

interface CreditsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreditsModal({ isOpen, onClose }: CreditsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] transition-opacity">
      <div className="w-[90%] max-w-[400px] bg-black/80 backdrop-blur-[15px] rounded-xl overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-medium">Credits</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Ripple v0.1.1</h3>
            <p className="text-white/70">Developed by: WFIS01</p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium mb-2">Special Thanks</h4>
            <ul className="text-white/70 space-y-1">
              <li>SnipeHub Community</li>
              <li>All Ripple Users</li>
              <li>Contributors & Testers</li>
            </ul>
          </div>

          <div className="border-t border-white/10 pt-4">
            <h4 className="font-medium mb-2">Contact</h4>
            <p className="text-white/70">
              For support or inquiries, visit our GitHub repository or contact us through the SnipeHub community.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white/5 p-4 flex justify-center">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
