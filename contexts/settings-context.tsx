"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type ThemeType = "Ripple" | "Ripple Matte" | "White" | "Low Profile"
type CloakType = "Ripple" | "Google" | "Teams" | "Ghost"
type AccentColorType = "blue" | "purple" | "green" | "red" | "orange" | "pink"

interface SettingsContextType {
  // Current settings (applied)
  theme: ThemeType
  cloak: CloakType
  accentColor: AccentColorType
  escapeKeyEnabled: boolean
  escapeKey: string
  escapeUrl: string
  displaySnipeShield: boolean
  showDevFunc: boolean

  // Pending settings (not yet applied)
  pendingSettings: {
    theme: ThemeType
    cloak: CloakType
    accentColor: AccentColorType
    escapeKeyEnabled: boolean
    escapeKey: string
    escapeUrl: string
    displaySnipeShield: boolean
  }

  // Methods
  setPendingTheme: (theme: ThemeType) => void
  setPendingCloak: (cloak: CloakType) => void
  setPendingAccentColor: (color: AccentColorType) => void
  setPendingEscapeKeyEnabled: (enabled: boolean) => void
  setPendingEscapeKey: (key: string) => void
  setPendingEscapeUrl: (url: string) => void
  setPendingDisplaySnipeShield: (enabled: boolean) => void

  applySettings: () => void
  resetAppearance: () => void
  resetCloaking: () => void
  resetSecurity: () => void
  resetAllToDefaults: () => void

  updateShowDevFunc: (show: boolean) => void
}

const defaultSettings = {
  theme: "Ripple" as ThemeType,
  cloak: "Ripple" as CloakType,
  accentColor: "blue" as AccentColorType,
  escapeKeyEnabled: false,
  escapeKey: "=",
  escapeUrl: "https://google.com",
  displaySnipeShield: true,
  showDevFunc: false,
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  // Applied settings
  const [theme, setTheme] = useState<ThemeType>(defaultSettings.theme)
  const [cloak, setCloak] = useState<CloakType>(defaultSettings.cloak)
  const [accentColor, setAccentColor] = useState<AccentColorType>(defaultSettings.accentColor)
  const [escapeKeyEnabled, setEscapeKeyEnabled] = useState(defaultSettings.escapeKeyEnabled)
  const [escapeKey, setEscapeKey] = useState(defaultSettings.escapeKey)
  const [escapeUrl, setEscapeUrl] = useState(defaultSettings.escapeUrl)
  const [displaySnipeShield, setDisplaySnipeShield] = useState(defaultSettings.displaySnipeShield)
  const [showDevFunc, setShowDevFunc] = useState(defaultSettings.showDevFunc)

  // Pending settings (not yet applied)
  const [pendingSettings, setPendingSettings] = useState({
    theme: defaultSettings.theme,
    cloak: defaultSettings.cloak,
    accentColor: defaultSettings.accentColor,
    escapeKeyEnabled: defaultSettings.escapeKeyEnabled,
    escapeKey: defaultSettings.escapeKey,
    escapeUrl: defaultSettings.escapeUrl,
    displaySnipeShield: defaultSettings.displaySnipeShield,
  })

  // Load settings from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("ripple-settings")
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings)

        // Set applied settings
        setTheme(parsedSettings.theme || defaultSettings.theme)
        setCloak(parsedSettings.cloak || defaultSettings.cloak)
        setAccentColor(parsedSettings.accentColor || defaultSettings.accentColor)
        setEscapeKeyEnabled(parsedSettings.escapeKeyEnabled ?? defaultSettings.escapeKeyEnabled)
        setEscapeKey(parsedSettings.escapeKey || defaultSettings.escapeKey)
        setEscapeUrl(parsedSettings.escapeUrl || defaultSettings.escapeUrl)
        setDisplaySnipeShield(parsedSettings.displaySnipeShield ?? defaultSettings.displaySnipeShield)
        setShowDevFunc(parsedSettings.showDevFunc ?? defaultSettings.showDevFunc)

        // Set pending settings to match applied settings
        setPendingSettings({
          theme: parsedSettings.theme || defaultSettings.theme,
          cloak: parsedSettings.cloak || defaultSettings.cloak,
          accentColor: parsedSettings.accentColor || defaultSettings.accentColor,
          escapeKeyEnabled: parsedSettings.escapeKeyEnabled ?? defaultSettings.escapeKeyEnabled,
          escapeKey: parsedSettings.escapeKey || defaultSettings.escapeKey,
          escapeUrl: parsedSettings.escapeUrl || defaultSettings.escapeUrl,
          displaySnipeShield: parsedSettings.displaySnipeShield ?? defaultSettings.displaySnipeShield,
        })
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      const settingsToSave = {
        theme,
        cloak,
        accentColor,
        escapeKeyEnabled,
        escapeKey,
        escapeUrl,
        displaySnipeShield,
        showDevFunc,
      }
      localStorage.setItem("ripple-settings", JSON.stringify(settingsToSave))
    }
  }, [theme, cloak, accentColor, escapeKeyEnabled, escapeKey, escapeUrl, displaySnipeShield, showDevFunc])

  // Methods to update pending settings
  const setPendingTheme = (theme: ThemeType) => {
    setPendingSettings((prev) => ({ ...prev, theme }))
  }

  const setPendingCloak = (cloak: CloakType) => {
    setPendingSettings((prev) => ({ ...prev, cloak }))
  }

  const setPendingAccentColor = (color: AccentColorType) => {
    setPendingSettings((prev) => ({ ...prev, accentColor: color }))
  }

  const setPendingEscapeKeyEnabled = (enabled: boolean) => {
    setPendingSettings((prev) => ({ ...prev, escapeKeyEnabled: enabled }))
  }

  const setPendingEscapeKey = (key: string) => {
    setPendingSettings((prev) => ({ ...prev, escapeKey: key }))
  }

  const setPendingEscapeUrl = (url: string) => {
    setPendingSettings((prev) => ({ ...prev, escapeUrl: url }))
  }

  const setPendingDisplaySnipeShield = (enabled: boolean) => {
    setPendingSettings((prev) => ({ ...prev, displaySnipeShield: enabled }))
  }

  // Method to apply pending settings
  const applySettings = () => {
    setTheme(pendingSettings.theme)
    setCloak(pendingSettings.cloak)
    setAccentColor(pendingSettings.accentColor)
    setEscapeKeyEnabled(pendingSettings.escapeKeyEnabled)
    setEscapeKey(pendingSettings.escapeKey)
    setEscapeUrl(pendingSettings.escapeUrl)
    setDisplaySnipeShield(pendingSettings.displaySnipeShield)
  }

  // Reset functions
  const resetAppearance = () => {
    setPendingSettings((prev) => ({ ...prev, theme: defaultSettings.theme, accentColor: defaultSettings.accentColor }))
  }

  const resetCloaking = () => {
    setPendingSettings((prev) => ({ ...prev, cloak: defaultSettings.cloak }))
  }

  const resetSecurity = () => {
    setPendingSettings((prev) => ({
      ...prev,
      escapeKeyEnabled: defaultSettings.escapeKeyEnabled,
      escapeKey: defaultSettings.escapeKey,
      escapeUrl: defaultSettings.escapeUrl,
      displaySnipeShield: defaultSettings.displaySnipeShield,
    }))
  }

  const resetAllToDefaults = () => {
    setPendingSettings({
      theme: defaultSettings.theme,
      cloak: defaultSettings.cloak,
      accentColor: defaultSettings.accentColor,
      escapeKeyEnabled: defaultSettings.escapeKeyEnabled,
      escapeKey: defaultSettings.escapeKey,
      escapeUrl: defaultSettings.escapeUrl,
      displaySnipeShield: defaultSettings.displaySnipeShield,
    })
    setTheme(defaultSettings.theme)
    setCloak(defaultSettings.cloak)
    setAccentColor(defaultSettings.accentColor)
    setEscapeKeyEnabled(defaultSettings.escapeKeyEnabled)
    setEscapeKey(defaultSettings.escapeKey)
    setEscapeUrl(defaultSettings.escapeUrl)
    setDisplaySnipeShield(defaultSettings.displaySnipeShield)
    setShowDevFunc(defaultSettings.showDevFunc)
  }

  // Function to update showDevFunc
  const updateShowDevFunc = (show: boolean) => {
    setShowDevFunc(show)
  }

  const value: SettingsContextType = {
    theme,
    cloak,
    accentColor,
    escapeKeyEnabled,
    escapeKey,
    escapeUrl,
    displaySnipeShield,
    showDevFunc,
    pendingSettings,
    setPendingTheme,
    setPendingCloak,
    setPendingAccentColor,
    setPendingEscapeKeyEnabled,
    setPendingEscapeKey,
    setPendingEscapeUrl,
    setPendingDisplaySnipeShield,
    applySettings,
    resetAppearance,
    resetCloaking,
    resetSecurity,
    resetAllToDefaults,
    updateShowDevFunc,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
