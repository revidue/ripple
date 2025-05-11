"use client"

import { useEffect, useState } from "react"
import { LogOut, Shield, User, X } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useUser } from "@/contexts/user-context"

interface SettingsMenuProps {
  isOpen: boolean
  onClose: () => void
  openConsole: () => void
}

export default function SettingsMenu({ isOpen, onClose, openConsole }: SettingsMenuProps) {
  const {
    pendingSettings,
    setPendingTheme,
    setPendingCloak,
    setPendingEscapeKeyEnabled,
    setPendingEscapeKey,
    setPendingEscapeUrl,
    setPendingDisplaySnipeShield,
    applySettings,
    resetAppearance,
    resetCloaking,
    resetSecurity,
    resetAllToDefaults,
  } = useSettings()

  const { user, logout } = useUser()

  const [activeTab, setActiveTab] = useState("appearance")
  const [hasChanges, setHasChanges] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [accentColor, setAccentColor] = useState("#3b82f6") // Default blue

  // Check for changes whenever pendingSettings changes
  const checkForChanges = () => {
    setHasChanges(true)
  }

  // Handle close with changes
  const handleClose = () => {
    if (hasChanges) {
      setIsShaking(true)
      setTimeout(() => {
        setIsShaking(false)
      }, 2000)
    } else {
      onClose()
    }
  }

  // Reset hasChanges when settings are applied
  useEffect(() => {
    if (!isOpen) {
      setHasChanges(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[150] transition-opacity highlight-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose()
        }
      }}
    >
      <div className="flex w-[90%] max-w-[900px] gap-4">
        {/* Vertical SnipeAd */}
        <div className="hidden md:block w-[200px] h-[500px] self-center">
          <div className="bg-[rgba(30,30,30,0.5)] rounded-lg p-3 h-full flex flex-col">
            <p className="text-xs text-white/60 mb-2">SnipeAd</p>
            <div className="flex-1 flex flex-col justify-center items-center text-center">
              <p className="mb-4 text-gray-400">Need a PC?</p>
              <p className="mb-4 text-gray-400">High-performance gaming PC available now on eBay.</p>
              <p className="mb-4 text-gray-400">Limited time offer!</p>
              <a
                href="https://www.ebay.co.uk/itm/167506178840?itmmeta=01JTXX3B02MB2MV1R1YVJVPDDY&hash=item2700257318:g:YbsAAOSwDntoH613"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
              >
                Open
              </a>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 bg-black/80 backdrop-blur-[15px] rounded-xl overflow-hidden shadow-lg ${isShaking ? "animate-shake" : ""}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-xl font-medium">Settings</h2>
            <button onClick={handleClose} className="text-white/60 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10 overflow-x-auto">
            <button
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "appearance" ? "text-white border-b-2 border-white" : "text-white/60"}`}
              onClick={() => setActiveTab("appearance")}
            >
              Appearance
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "security" ? "text-white border-b-2 border-white" : "text-white/60"}`}
              onClick={() => setActiveTab("security")}
            >
              Security
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "account" ? "text-white border-b-2 border-white" : "text-white/60"}`}
              onClick={() => setActiveTab("account")}
            >
              Account
            </button>
            <button
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "reset" ? "text-white border-b-2 border-white" : "text-white/60"}`}
              onClick={() => setActiveTab("reset")}
            >
              Reset
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm text-white/60">Theme</h3>
                    <button
                      className="text-xs text-blue-400 hover:text-blue-300"
                      onClick={() => {
                        resetAppearance()
                        checkForChanges()
                      }}
                    >
                      Reset
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["Ripple", "Ripple Matte", "White", "Low Profile"].map((themeName) => (
                      <button
                        key={themeName}
                        className={`p-3 rounded-lg border ${
                          pendingSettings.theme === themeName
                            ? "border-white bg-white/10"
                            : "border-white/10 hover:bg-white/5"
                        }`}
                        onClick={() => {
                          setPendingTheme(themeName as any)
                          checkForChanges()
                        }}
                      >
                        {themeName}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm text-white/60">Accent Color</h3>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6"].map((color) => (
                      <button
                        key={color}
                        className={`w-full h-10 rounded-lg border ${
                          accentColor === color ? "border-white" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          setAccentColor(color)
                          checkForChanges()
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-white/60 mt-1">Choose your accent color</p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm text-white/60">Tab Cloaking</h3>
                    <button
                      className="text-xs text-blue-400 hover:text-blue-300"
                      onClick={() => {
                        resetCloaking()
                        checkForChanges()
                      }}
                    >
                      Reset
                    </button>
                  </div>
                  <select
                    className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
                    value={pendingSettings.cloak}
                    onChange={(e) => {
                      setPendingCloak(e.target.value as any)
                      checkForChanges()
                    }}
                  >
                    <option value="Ripple">Ripple (Default)</option>
                    <option value="Google">Google</option>
                    <option value="Teams">Microsoft Teams</option>
                    <option value="Ghost">Ghost (Invisible)</option>
                  </select>
                  <p className="text-xs text-white/60 mt-1">Changes how this tab appears in your browser</p>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm text-white/60">Security Settings</h3>
                  <button
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => {
                      resetSecurity()
                      checkForChanges()
                    }}
                  >
                    Reset
                  </button>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm">Display SnipeShield</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={pendingSettings.displaySnipeShield}
                        onChange={(e) => {
                          setPendingDisplaySnipeShield(e.target.checked)
                          checkForChanges()
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-white/60 mb-4">
                    Shows the shield icon that allows opening content in about:blank
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm">Panic Key</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={pendingSettings.escapeKeyEnabled}
                        onChange={(e) => {
                          setPendingEscapeKeyEnabled(e.target.checked)
                          checkForChanges()
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {pendingSettings.escapeKeyEnabled && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm mb-1">Key</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
                          value={pendingSettings.escapeKey}
                          onChange={(e) => {
                            setPendingEscapeKey(e.target.value)
                            checkForChanges()
                          }}
                          placeholder="e.g. =, F4, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Redirect URL</label>
                        <input
                          type="text"
                          className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white"
                          value={pendingSettings.escapeUrl}
                          onChange={(e) => {
                            setPendingEscapeUrl(e.target.value)
                            checkForChanges()
                          }}
                          placeholder="https://google.com"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-[rgba(31,41,55,0.5)] p-4 rounded-lg mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <h3 className="font-medium">Secure yourself with SnipeSecure</h3>
                  </div>
                  <p className="text-sm text-white/70 mb-3">
                    Upgrade to SnipePlus to get advanced security features including SnipeSecure, which provides
                    enhanced protection and privacy.
                  </p>
                  <a
                    href="https://buy.stripe.com/test_00g5lL0Ht2Hl0QU000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded text-white transition-colors hover:from-purple-700 hover:to-blue-700"
                  >
                    Upgrade to SnipePlus
                  </a>
                </div>

                <div>
                  <button
                    className="w-full p-3 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white hover:bg-[rgba(31,41,55,0.7)] transition-colors"
                    onClick={() => {
                      window.open("https://rplz.vercel.app/", "_blank")
                    }}
                  >
                    Open Beta
                  </button>
                </div>
              </div>
            )}

            {activeTab === "account" && (
              <div className="space-y-6">
                {user ? (
                  <>
                    <div>
                      <h3 className="text-sm text-white/60 mb-4">Account Information</h3>
                      <div className="bg-[rgba(31,41,55,0.5)] p-4 rounded-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-medium">{user.name}</h4>
                            <p className="text-sm text-white/60">{user.email}</p>
                          </div>
                        </div>
                        <button
                          className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white hover:bg-[rgba(31,41,55,0.7)] transition-colors flex items-center gap-2 justify-center"
                          onClick={() => {
                            logout()
                            onClose()
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm text-white/60 mb-4">SnipePlus Subscription</h3>
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
                  </>
                ) : (
                  <div className="text-center py-8">
                    <User className="w-12 h-12 mx-auto mb-4 text-white/40" />
                    <p className="mb-4">You are not logged in</p>
                    <button
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
                      onClick={() => {
                        onClose()
                        // You would trigger login modal here
                      }}
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reset" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm text-white/60 mb-4">Reset Options</h3>
                  <div className="space-y-3">
                    <button
                      className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white hover:bg-[rgba(31,41,55,0.7)] transition-colors"
                      onClick={() => {
                        resetAppearance()
                        checkForChanges()
                      }}
                    >
                      Reset Appearance
                    </button>
                    <button
                      className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white hover:bg-[rgba(31,41,55,0.7)] transition-colors"
                      onClick={() => {
                        resetCloaking()
                        checkForChanges()
                      }}
                    >
                      Reset Tab Cloaking
                    </button>
                    <button
                      className="w-full p-2 bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded text-white hover:bg-[rgba(31,41,55,0.7)] transition-colors"
                      onClick={() => {
                        resetSecurity()
                        checkForChanges()
                      }}
                    >
                      Reset Security
                    </button>
                    <button
                      className="w-full p-3 mt-4 bg-red-900 border border-red-700 rounded text-white hover:bg-red-800 transition-colors"
                      onClick={() => {
                        resetAllToDefaults()
                        checkForChanges()
                      }}
                    >
                      Reset All to Defaults
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-white/5 p-4 flex justify-between">
            <button
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className={`px-3 py-1 ${hasChanges ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-600 cursor-not-allowed"} rounded text-white transition-colors`}
              onClick={() => {
                applySettings()
                setHasChanges(false)
              }}
              disabled={!hasChanges}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
