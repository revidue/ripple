"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, Code, Github, Search, Settings, User, Wand2, X } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"
import { useUser } from "@/contexts/user-context"
import SettingsMenu from "@/components/settings-menu"
import LoadingAnimation from "@/components/loading-animation"
import AboutBlankShield from "@/components/about-blank-shield"
import UserDropdown from "@/components/auth/user-dropdown"
import AccountModal from "@/components/auth/account-modal"
import CreditsModal from "@/components/credits-modal"
import SnipeAd from "@/components/snipe-ad"
import SnipeAuth from "@/components/auth/snipe-auth"

export default function RipplePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [featuresVisible, setFeaturesVisible] = useState(false)
  const [highlightVisible, setHighlightVisible] = useState(false)
  const [settingsVisible, setSettingsVisible] = useState(false)
  const [loginVisible, setLoginVisible] = useState(false)
  const [signupVisible, setSignupVisible] = useState(false)
  const [accountVisible, setAccountVisible] = useState(false)
  const [creditsVisible, setCreditsVisible] = useState(false)
  const [consoleVisible, setConsoleVisible] = useState(false)
  const [devMenuVisible, setDevMenuVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [randomText, setRandomText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [apps, setApps] = useState<App[]>([])
  const [recentApps, setRecentApps] = useState<App[]>([])
  const [recommendedApps, setRecentRecommended] = useState<App[]>([])
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    "Welcome to Developer Console. Type 'help' for available commands.",
  ])
  const [consolePosition, setConsolePosition] = useState({ x: 100, y: 100 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [inspectEnabled, setInspectEnabled] = useState(false)
  const [customRightClickVisible, setCustomRightClickVisible] = useState(false)
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 })
  const [rightClickItem, setRightClickItem] = useState<App | null>(null)
  const [rightClickType, setRightClickType] = useState<string>("default")
  const [adminMode, setAdminMode] = useState(false)
  const [adminPrompt, setAdminPrompt] = useState(false)
  const [adminKey, setAdminKey] = useState("")
  const [adminLoading, setAdminLoading] = useState(false)
  const [adminIframe, setAdminIframe] = useState("")
  const [activeTab, setActiveTab] = useState<string>("general")
  const [snipeAuthVisible, setSnipeAuthVisible] = useState(false)
  const [isSignupMode, setIsSignupMode] = useState(false)

  const { theme, showDevFunc, setShowDevFunc: updateShowDevFunc } = useSettings()
  const { user, login, signup, logout } = useUser()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const consoleRef = useRef<HTMLDivElement>(null)
  const consoleInputRef = useRef<HTMLInputElement>(null)
  const highlightInputRef = useRef<HTMLInputElement>(null)

  // Type definitions
  interface App {
    name: string
    url: string
    imageUrl: string
    isOriginal: boolean
    iframeVar: number
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Add favicon
  useEffect(() => {
    const link = document.createElement("link")
    link.rel = "icon"
    link.href = "https://i.ibb.co/KzftD25N/download-3.png"
    document.head.appendChild(link)

    return () => {
      document.head.removeChild(link)
    }
  }, [])

  // Network visualization
  useEffect(() => {
    if (theme === "Low Profile") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Particles setup
    const particlesArray: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      update: () => void
      draw: () => void
    }[] = []
    const numberOfParticles = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)"
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }

    const connect = () => {
      if (!ctx) return
      const maxDistance = 100
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance / maxDistance)})`
            ctx.lineWidth = 1
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
      connect()
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [theme])

  // Fetch apps data
  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/WFIS01/SnipeHub-UK/refs/heads/main/connect_file.txt",
        )
        const data = await response.text()

        // Process the data row by row
        const rows = data.split("\n").filter((row) => row.trim() !== "")
        const parsedApps: App[] = []

        rows.forEach((row) => {
          const parts = row.split("|")
          if (parts.length >= 5) {
            // Changed to 5 parts now
            const name = parts[0]
            const url = parts[1]
            const imageUrl = parts[2]
            const originalVar = Number.parseInt(parts[3])
            const iframeVar = Number.parseInt(parts[4])

            parsedApps.push({
              name,
              url,
              imageUrl,
              isOriginal: originalVar === 2,
              iframeVar: iframeVar, // Add new property
            })
          }
        })

        setApps(parsedApps)

        // Set some apps as recent and recommended for demo
        if (parsedApps.length > 0) {
          setRecentApps(parsedApps.slice(0, 3))
          setRecentRecommended(parsedApps.slice(3, 6))
        }
      } catch (error) {
        console.error("Error fetching apps:", error)
        // Use some dummy data for demonstration
        const dummyApps = [
          {
            name: "Interstellar",
            url: "#",
            imageUrl: "/placeholder.svg?height=50&width=50",
            isOriginal: false,
            iframeVar: 1,
          },
          {
            name: "Eaglercraft",
            url: "#",
            imageUrl: "/placeholder.svg?height=50&width=50",
            isOriginal: true,
            iframeVar: 1,
          },
          {
            name: "Verified Key",
            url: "#",
            imageUrl: "/placeholder.svg?height=50&width=50",
            isOriginal: false,
            iframeVar: 1,
          },
          { name: "Keys", url: "#", imageUrl: "/placeholder.svg?height=50&width=50", isOriginal: false, iframeVar: 1 },
          { name: "Ideas", url: "#", imageUrl: "/placeholder.svg?height=50&width=50", isOriginal: true, iframeVar: 1 },
        ]
        setApps(dummyApps)
        setRecentApps(dummyApps.slice(0, 2))
        setRecentRecommended(dummyApps.slice(2, 4))
      }
    }

    fetchApps()
  }, [])

  // Fetch random text
  useEffect(() => {
    const fetchRandomText = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/WFIS01/SnipeHub-UK/refs/heads/main/rand_text.txt",
        )
        const data = await response.text()
        const lines = data.split("\n").filter((line) => line.trim() !== "")

        if (lines.length > 0) {
          const randomLine = lines[Math.floor(Math.random() * lines.length)]
          setRandomText(randomLine)
          setTypingIndex(0)
          setIsTyping(true)
        }
      } catch (error) {
        console.error("Error fetching random text:", error)
        setRandomText("Welcome to RPL v0.1.1")
        setTypingIndex(0)
        setIsTyping(true)
      }
    }

    fetchRandomText()
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!isTyping || theme === "Low Profile") return

    if (typingIndex < randomText.length) {
      const timer = setTimeout(() => {
        setTypingIndex(typingIndex + 1)
      }, 50)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [typingIndex, randomText, isTyping, theme])

  // Anti-inspector
  useEffect(() => {
    const disableInspect = (e: MouseEvent) => {
      if (!inspectEnabled && e.button === 2) {
        e.preventDefault()
        setCustomRightClickVisible(true)
        setRightClickPosition({ x: e.clientX, y: e.clientY })
        return false
      }
      return true
    }

    const disableKeys = (e: KeyboardEvent) => {
      if (!inspectEnabled && (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I"))) {
        e.preventDefault()
        return false
      }
      return true
    }

    document.addEventListener("contextmenu", disableInspect)
    document.addEventListener("keydown", disableKeys)

    return () => {
      document.removeEventListener("contextmenu", disableInspect)
      document.removeEventListener("keydown", disableKeys)
    }
  }, [inspectEnabled])

  // Close highlight when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Close dev menu when clicking outside
      if (devMenuVisible && !target.closest(".dev-dropdown")) {
        setDevMenuVisible(false)
      }

      // Close highlight when clicking outside
      if (highlightVisible && target.classList.contains("highlight-overlay")) {
        setHighlightVisible(false)
      }

      // Close custom right click menu when clicking outside
      if (customRightClickVisible && !target.closest(".custom-right-click")) {
        setCustomRightClickVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [devMenuVisible, highlightVisible, customRightClickVisible])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Space to open highlight
      if ((e.ctrlKey || e.metaKey) && e.code === "Space") {
        e.preventDefault()
        setHighlightVisible(true)
        setTimeout(() => {
          highlightInputRef.current?.focus()
        }, 100)
      }

      // Escape to close highlight
      if (e.code === "Escape") {
        if (highlightVisible) {
          setHighlightVisible(false)
        }
        if (customRightClickVisible) {
          setCustomRightClickVisible(false)
        }
        if (settingsVisible) {
          setSettingsVisible(false)
        }
        if (loginVisible) {
          setLoginVisible(false)
        }
        if (signupVisible) {
          setSignupVisible(false)
        }
        if (accountVisible) {
          setAccountVisible(false)
        }
        if (creditsVisible) {
          setCreditsVisible(false)
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [
    highlightVisible,
    customRightClickVisible,
    settingsVisible,
    loginVisible,
    signupVisible,
    accountVisible,
    creditsVisible,
  ])

  // Console dragging
  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      setConsolePosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  // Handle console commands
  const handleConsoleCommand = (cmd: string) => {
    const newOutput = [...consoleOutput, `> ${cmd}`]

    const command = cmd.toLowerCase()

    if (command === "clear") {
      setConsoleOutput([])
    } else if (command === "help") {
      setConsoleOutput([
        ...newOutput,
        "Available commands:",
        "- clear: Clear the console",
        "- help: Show available commands",
        "- exit: Close the console",
        "- fork: Open GitHub repository",
        "- run: Run a .yue file",
        "- tgl --inspect: Toggle inspector",
        "- tgl --devfunc: Toggle developer function button",
        "- echo [message]: Display a message",
      ])
    } else if (command === "exit") {
      setConsoleOutput([...newOutput, "Closing console..."])
      setTimeout(() => {
        setConsoleVisible(false)
      }, 500)
    } else if (command === "fork") {
      setConsoleOutput([...newOutput, "Opening GitHub repository..."])
      window.open("https://github.com/WFIS01/SnipeHub-UK", "_blank")
    } else if (command === "run") {
      setConsoleOutput([...newOutput, "Please select a .yue file to run..."])

      // Simulate file manager opening
      const fileInput = document.createElement("input")
      fileInput.type = "file"
      fileInput.accept = ".yue"
      fileInput.click()

      fileInput.onchange = (e) => {
        const target = e.target as HTMLInputElement
        const file = target.files?.[0]

        if (file) {
          setConsoleOutput((prev) => [...prev, `Running ${file.name}...`])
        } else {
          setConsoleOutput((prev) => [...prev, "No file selected."])
        }
      }
    } else if (command === "tgl --inspect") {
      setInspectEnabled(!inspectEnabled)
      setConsoleOutput([
        ...newOutput,
        `Inspector ${inspectEnabled ? "disabled" : "enabled"}. Right-click will now ${
          inspectEnabled ? "show custom menu" : "work normally"
        }.`,
      ])
    } else if (command === "tgl --devfunc") {
      updateShowDevFunc(!showDevFunc)
      setConsoleOutput([...newOutput, `Developer Function button ${showDevFunc ? "enabled" : "disabled"}.`])
    } else if (command.startsWith("echo ")) {
      const message = cmd.substring(5) // Remove "echo " from the command
      setConsoleOutput([...newOutput, message])
    } else {
      setConsoleOutput([...newOutput, `Unknown command: ${cmd}. Type 'help' for available commands.`])
    }
  }

  // Handle app click
  const handleAppClick = (app: App) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("drl", app.url)
      localStorage.setItem("iframeVar", app.iframeVar.toString())
    }
    // Redirect to /pages/app instead of opening in a new tab
    window.location.href = "/pages/app"

    // Update recent apps
    setRecentApps([app, ...recentApps.filter((a) => a.name !== app.name)].slice(0, 3))
  }

  // Handle app right click
  const handleAppRightClick = (e: React.MouseEvent, app: App) => {
    e.preventDefault()
    setRightClickItem(app)
    setRightClickType("app")
    setRightClickPosition({ x: e.clientX, y: e.clientY })
    setCustomRightClickVisible(true)
  }

  // Handle general right click
  const handleGeneralRightClick = (e: React.MouseEvent) => {
    if (!inspectEnabled) {
      e.preventDefault()
      setRightClickType("default")
      setRightClickItem(null)
      setRightClickPosition({ x: e.clientX, y: e.clientY })
      setCustomRightClickVisible(true)
    }
  }

  // Copy app URL to clipboard
  const copyAppUrl = () => {
    if (rightClickItem) {
      navigator.clipboard.writeText(rightClickItem.url)
      setCustomRightClickVisible(false)
    }
  }

  // Open app with admin
  const openWithAdmin = () => {
    if (rightClickItem) {
      setAdminPrompt(true)
      setCustomRightClickVisible(false)
    }
  }

  // Handle admin key submission
  const handleAdminKeySubmit = () => {
    if (adminKey === "1282") {
      setAdminLoading(true)
      setTimeout(() => {
        setAdminLoading(false)
        setAdminPrompt(false)
        setAdminMode(true)
        setConsoleVisible(true)
        if (rightClickItem) {
          setAdminIframe(rightClickItem.url)
        }
      }, 1500)
    } else {
      setConsoleOutput((prev) => [...prev, "Invalid admin key."])
      setAdminPrompt(false)
    }
  }

  // Open normal right-click interface
  const openNormalRightClick = () => {
    setCustomRightClickVisible(false)
    setInspectEnabled(true)

    // Simulate a right-click
    setTimeout(() => {
      setInspectEnabled(false)
    }, 1000)
  }

  // Handle login/signup
  const handleLogin = (email: string, password: string) => {
    login(email, password)
    setLoginVisible(false)
  }

  const handleSignup = (name: string, email: string, password: string) => {
    signup(name, email, password)
    setSignupVisible(false)
  }

  const handleLogout = () => {
    logout()
  }

  // Handle Snipe Auth
  const handleSnipeLogin = (snipeId: string, pin: string) => {
    // For demo purposes, create a user with the provided credentials
    const newUser = {
      name: `User_${snipeId}`,
      email: `${snipeId}@snipe.id`,
    }
    login(newUser.email, pin)
  }

  const handleSnipeSignup = (snipeId: string, pin: string) => {
    // For demo purposes, create a user with the provided credentials
    const newUser = {
      name: `User_${snipeId}`,
      email: `${snipeId}@snipe.id`,
    }
    signup(newUser.name, newUser.email, pin)
  }

  return (
    <>
      {/* Loading Animation */}
      {isLoading && (
        <>
          <LoadingAnimation />
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[501] w-[90%] max-w-[400px]">
            <div className="text-xs text-white/60 mb-1">SnipeAd</div>
            <SnipeAd variant="small" showFullscreen />
          </div>
        </>
      )}

      {/* About:blank Shield */}
      <AboutBlankShield />

      {/* Network Background */}
      {theme !== "Low Profile" && (
        <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-30 blur-sm" />
      )}

      {/* Content Container */}
      <div className="relative z-10 flex flex-col min-h-screen" onContextMenu={handleGeneralRightClick}>
        {/* Navigation Bar */}
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1200px] bg-[rgba(30,30,30,0.7)] backdrop-blur-[10px] p-4 rounded-xl z-50">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <a
                href="#"
                className="text-white flex items-center gap-2 px-3 py-1 relative hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  setHighlightVisible(true)
                  setTimeout(() => {
                    highlightInputRef.current?.focus()
                  }, 100)
                }}
              >
                <Wand2 className="w-[18px] h-[18px]" />
                <span>Highlight</span>
              </a>
              <a
                href="#"
                className="text-white flex items-center gap-2 px-3 py-1 relative hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  setSettingsVisible(true)
                }}
              >
                <Settings className="w-[18px] h-[18px]" />
                <span>Settings</span>
              </a>
            </div>

            <div className="hidden md:block w-[200px]">
              <div className="text-xs text-white/60 mb-1">SnipeAd</div>
              <SnipeAd variant="small" showFullscreen />
            </div>

            {/* Right side - Login or User dropdown */}
            {user ? (
              <UserDropdown
                user={user}
                onLogout={handleLogout}
                onOpenSettings={() => setSettingsVisible(true)}
                onOpenSnipePlus={() => {
                  setSettingsVisible(true)
                  setActiveTab("snipeplus")
                }}
                onManageAccount={() => setAccountVisible(true)}
              />
            ) : (
              <a
                href="#"
                className="text-white flex items-center gap-2 px-3 py-1 relative hover:text-gray-300 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  setIsSignupMode(false)
                  setSnipeAuthVisible(true)
                }}
              >
                <User className="w-[18px] h-[18px]" />
                <span>Login</span>
              </a>
            )}

            {/* Dev Func button - only shown if enabled */}
            {showDevFunc && (
              <div className="relative dev-dropdown">
                <a
                  href="#"
                  className="text-white flex items-center gap-2 px-3 py-1 relative hover:text-gray-300 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    setDevMenuVisible(!devMenuVisible)
                  }}
                >
                  <Code className="w-[18px] h-[18px]" />
                  <span>Dev Func</span>
                </a>
                {devMenuVisible && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[rgba(30,30,30,0.9)] backdrop-blur-[10px] rounded-lg shadow-lg z-50 animate-fadeIn">
                    <a
                      href="https://github.com/WFIS01/SnipeHub-UK"
                      target="_blank"
                      className="flex items-center gap-2 p-2 text-white hover:bg-white/10 transition-colors"
                      rel="noreferrer"
                    >
                      <Github className="w-4 h-4" />
                      <span>Github</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 p-2 text-white hover:bg-white/10 transition-colors"
                      onClick={(e) => {
                        e.preventDefault()
                        setConsoleVisible(true)
                        setDevMenuVisible(false)
                        setTimeout(() => {
                          consoleInputRef.current?.focus()
                        }, 100)
                      }}
                    >
                      <Code className="w-4 h-4" />
                      <span>Console</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex-1">
          {/* Logo Section */}
          <section className="container mx-auto w-[90%] max-w-[1200px] pt-32 pb-8 flex flex-col items-center justify-center">
            {theme !== "Low Profile" && (
              <img src="https://i.ibb.co/KzftD25N/download-3.png" alt="Ripple Logo" className="w-80 h-auto mb-4" />
            )}
            <h2 className="text-4xl font-bold mb-8">Ripple</h2>

            {/* Random text with typing animation */}
            <p className="text-lg text-center mb-8 h-6">{randomText.substring(0, typingIndex)}</p>

            {/* Down arrow moved to bottom */}
            <div className="flex-1 flex flex-col justify-end items-center mb-8">
              <div
                className={`text-gray-500 cursor-pointer hover:text-white transition-colors ${
                  featuresVisible ? "transform rotate-180" : ""
                }`}
                onClick={() => setFeaturesVisible(!featuresVisible)}
              >
                <ChevronDown className="w-8 h-8" />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section
            className={`container mx-auto w-[90%] max-w-[1200px] py-8 ${
              featuresVisible ? "block animate-fadeIn" : "hidden"
            }`}
          >
            <h1 className="text-2xl text-center mb-12">Why Ripple Dominates?</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-[rgba(30,30,30,0.4)] backdrop-blur-[10px] rounded-lg overflow-hidden relative p-6">
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-white text-[#121212] rounded flex items-center justify-center font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl mb-3">Ripple Originals</h3>
                  <p className="mb-3">Ripple Originals are only on Ripple.</p>
                  <p>
                    Our exclusive content is designed to provide the best experience for our users. With unique
                    features, innovative design, and cutting-edge technology, Ripple Originals stand out from the
                    competition and deliver exceptional value that you won&apos;t find anywhere else.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-[rgba(30,30,30,0.4)] backdrop-blur-[10px] rounded-lg overflow-hidden relative p-6">
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-white text-[#121212] rounded flex items-center justify-center font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl mb-3">Easy Access</h3>
                  <p>
                    The platform has only one way to search for games and that&apos;s with the new feature Highlight.
                    Highlight is a mechanic that allows you to search for apps and games easily without having to scroll
                    and use up endless amounts of resources.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-[rgba(30,30,30,0.4)] backdrop-blur-[10px] rounded-lg overflow-hidden relative p-6">
                <div className="relative z-10">
                  <div className="w-8 h-8 bg-white text-[#121212] rounded flex items-center justify-center font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl mb-3">Easy Developer Tools</h3>
                  <p>
                    Copying Ripple and making it your own is easier than ever. Thanks to the SnipeHub Engine, Ripple
                    doesn&apos;t require building or alternative mechanics and runs completely on single HTML files.
                    This not only makes it easier to edit but also easier to just fork and host yourself. You can follow
                    the Ripple Host guide to unblock the platform for yourself.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="bg-[rgba(30,30,30,0.7)] backdrop-blur-[10px] py-6 text-center mt-auto text-gray-400">
          <div className="container mx-auto w-[90%] max-w-[1200px]">
            <p>2025 SnipeCo.™ all rights reserved</p>
            <p className="mt-2 text-sm">Press Ctrl+Space to open the Highlight Menu</p>
            <button className="text-xs text-gray-500 hover:text-gray-300 mt-2" onClick={() => setCreditsVisible(true)}>
              RPL v0.1.1
            </button>
          </div>
        </footer>
      </div>

      {/* Highlight Search */}
      <div
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-[150] transition-opacity highlight-overlay ${
          highlightVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setHighlightVisible(false)
          }
        }}
      >
        <div className="w-[90%] max-w-[600px] bg-black/80 backdrop-blur-[15px] rounded-xl overflow-hidden shadow-lg">
          {/* Search bar */}
          <div className="flex items-center gap-2 p-4 border-b border-white/10">
            <Search className="w-5 h-5 text-white/60" />
            <input
              type="text"
              ref={highlightInputRef}
              placeholder="Highlight Search"
              className="w-full bg-transparent border-none outline-none text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>

          {/* Search results */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {/* Search Results */}
            {searchTerm && (
              <div className="mb-6 border-b border-white/10 pb-4">
                <p className="text-xs text-white/60 mb-2">Search Results for &quot;{searchTerm}&quot;</p>
                <div>
                  {apps
                    .filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((app, index) => (
                      <div
                        key={`search-${index}`}
                        className="flex items-center gap-3 mb-3 cursor-pointer p-2 rounded hover:bg-white/10 transition-colors"
                        onClick={() => handleAppClick(app)}
                        onContextMenu={(e) => handleAppRightClick(e, app)}
                      >
                        <div className="relative w-8 h-8 rounded-md overflow-hidden flex items-center justify-center">
                          <img
                            src={app.imageUrl || "/placeholder.svg?height=32&width=32"}
                            alt={app.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=32&width=32"
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium flex items-center gap-2">
                            {app.name}
                            {app.isOriginal && (
                              <span className="text-yellow-400">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.7 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.7a2 2 0 0 0-1.3-1.3L3 12l5.7-1.9a2 2 0 0 0 1.3-1.3L12 3z"></path>
                                </svg>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  {apps.filter((app) => app.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                    <p className="text-white/60">No results found</p>
                  )}
                </div>
              </div>
            )}

            {/* Recent */}
            {!searchTerm && (
              <div className="mb-6 border-b border-white/10 pb-4">
                <p className="text-xs text-white/60 mb-2">Recent</p>
                <div>
                  {recentApps.map((app, index) => (
                    <div
                      key={`recent-${index}`}
                      className="flex items-center gap-3 mb-3 cursor-pointer p-2 rounded hover:bg-white/10 transition-colors"
                      onClick={() => handleAppClick(app)}
                      onContextMenu={(e) => handleAppRightClick(e, app)}
                    >
                      <div className="relative w-8 h-8 rounded-md overflow-hidden flex items-center justify-center">
                        <img
                          src={app.imageUrl || "/placeholder.svg?height=32&width=32"}
                          alt={app.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=32&width=32"
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {app.name}
                          {app.isOriginal && (
                            <span className="text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.7 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.7a2 2 0 0 0-1.3-1.3L3 12l5.7-1.9a2 2 0 0 0 1.3-1.3L12 3z"></path>
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended */}
            {!searchTerm && (
              <div className="mb-6 border-b border-white/10 pb-4">
                <p className="text-xs text-white/60 mb-2">Recommended</p>
                <div>
                  {recommendedApps.map((app, index) => (
                    <div
                      key={`recommended-${index}`}
                      className="flex items-center gap-3 mb-3 cursor-pointer p-2 rounded hover:bg-white/10 transition-colors"
                      onClick={() => handleAppClick(app)}
                      onContextMenu={(e) => handleAppRightClick(e, app)}
                    >
                      <div className="relative w-8 h-8 rounded-md overflow-hidden flex items-center justify-center">
                        <img
                          src={app.imageUrl || "/placeholder.svg?height=32&width=32"}
                          alt={app.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=32&width=32"
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium flex items-center gap-2">
                          {app.name}
                          {app.isOriginal && (
                            <span className="text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M12 3l1.9 5.7a2 2 0 0 0 1.3 1.3L21 12l-5.7 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.7a2 2 0 0 0-1.3-1.3L3 12l5.7-1.9a2 2 0 0 0 1.3-1.3L12 3z"></path>
                              </svg>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SnipeAd Section */}
            <div>
              <p className="text-xs text-white/60 mb-2">SnipeAd</p>
              <SnipeAd variant="medium" showFullscreen />
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white/5 px-4 py-2 flex justify-between text-xs text-white/60">
            <p>Press ESC to close</p>
            <button
              className="hover:text-white"
              onClick={() => {
                setHighlightVisible(false)
                setCreditsVisible(true)
              }}
            >
              RPL v0.1.1
            </button>
          </div>
        </div>
      </div>

      {/* Settings Menu */}
      <SettingsMenu
        isOpen={settingsVisible}
        onClose={() => setSettingsVisible(false)}
        openConsole={() => {
          setConsoleVisible(true)
          setTimeout(() => {
            consoleInputRef.current?.focus()
          }, 100)
        }}
      />

      {/* Snipe Auth */}
      <SnipeAuth
        isOpen={snipeAuthVisible}
        onClose={() => setSnipeAuthVisible(false)}
        onLogin={handleSnipeLogin}
        onSignup={handleSnipeSignup}
        isSignup={isSignupMode}
      />

      {/* Account Modal */}
      <AccountModal isOpen={accountVisible} onClose={() => setAccountVisible(false)} user={user} />

      {/* Credits Modal */}
      <CreditsModal isOpen={creditsVisible} onClose={() => setCreditsVisible(false)} />

      {/* Developer Console */}
      <div
        ref={consoleRef}
        className={`fixed z-[200] bg-[rgba(17,24,39,0.95)] backdrop-blur-[10px] border border-[rgba(75,85,99,0.7)] rounded-lg shadow-2xl w-[500px] max-w-[90vw] ${
          consoleVisible ? "block" : "hidden"
        }`}
        style={{ left: `${consolePosition.x}px`, top: `${consolePosition.y}px` }}
      >
        <div
          className="bg-[rgba(31,41,55,0.9)] p-2 flex justify-between items-center rounded-t-lg cursor-move"
          onMouseDown={(e) => {
            setIsDragging(true)
            const rect = consoleRef.current?.getBoundingClientRect()
            if (rect) {
              setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              })
            }
          }}
        >
          <div className="flex items-center gap-2 font-medium">
            <Code className="w-4 h-4" />
            <span>Developer Console</span>
          </div>
          <button
            className="bg-transparent border-none text-gray-400 cursor-pointer hover:text-white transition-colors"
            onClick={() => setConsoleVisible(false)}
          >
            <X className="w-[18px] h-[18px]" />
          </button>
        </div>
        <div className="h-[300px] overflow-y-auto p-3 font-mono text-sm">
          {consoleOutput.map((line, index) => (
            <div key={index} className="mb-1">
              {line}
            </div>
          ))}
          {adminMode && adminIframe && (
            <div className="mt-4 border border-gray-700 rounded">
              <div className="bg-gray-800 p-1 text-xs">Application Preview</div>
              <iframe src={adminIframe} className="w-full h-[200px]" title="Admin Preview"></iframe>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 p-2 border-t border-[rgba(75,85,99,0.7)]">
          <span className="text-green-400">&gt;</span>
          <input
            type="text"
            ref={consoleInputRef}
            className="bg-transparent border-none outline-none text-white font-mono flex-grow"
            placeholder="Type a command..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.currentTarget.value.trim()) {
                handleConsoleCommand(e.currentTarget.value.trim())
                e.currentTarget.value = ""
              }
            }}
          />
        </div>
      </div>

      {/* Custom Right Click Menu */}
      {customRightClickVisible && (
        <div
          className="fixed z-[300] bg-[rgba(17,24,39,0.95)] backdrop-blur-[10px] border border-[rgba(75,85,99,0.7)] rounded-lg shadow-2xl w-[200px] custom-right-click"
          style={{ left: `${rightClickPosition.x}px`, top: `${rightClickPosition.y}px` }}
        >
          <div className="p-2">
            <button
              className="w-full text-left p-2 hover:bg-white/10 rounded transition-colors text-white"
              onClick={() => {
                setCustomRightClickVisible(false)
                setConsoleVisible(true)
              }}
            >
              Console
            </button>
            {rightClickType === "app" && (
              <button
                className="w-full text-left p-2 hover:bg-white/10 rounded transition-colors text-white"
                onClick={() => {
                  if (rightClickItem) {
                    if (typeof window !== "undefined") {
                      localStorage.setItem("drl", rightClickItem.url)
                      localStorage.setItem("iframeVar", rightClickItem.iframeVar.toString())
                    }
                    // Redirect to /pages/app
                    window.location.href = "/pages/app"
                    setCustomRightClickVisible(false)
                  }
                }}
              >
                Open as Site
              </button>
            )}
          </div>
        </div>
      )}

      {/* Admin Key Prompt */}
      {adminPrompt && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[400]">
          <div className="bg-[rgba(17,24,39,0.95)] backdrop-blur-[10px] border border-[rgba(75,85,99,0.7)] rounded-lg shadow-2xl w-[300px] p-4">
            <h3 className="text-lg font-medium mb-4">Enter Admin Key</h3>
            <input
              type="password"
              className="w-full bg-[rgba(31,41,55,0.9)] border border-[rgba(75,85,99,0.7)] rounded p-2 mb-4 text-white"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter key..."
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white transition-colors"
                onClick={() => setAdminPrompt(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 rounded text-white transition-colors"
                onClick={handleAdminKeySubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Loading */}
      {adminLoading && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[400]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-white mb-2"></div>
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
    </>
  )
}
