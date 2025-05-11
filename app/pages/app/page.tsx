"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Shield } from "lucide-react"
import LoadingAnimation from "@/components/loading-animation"
import { useSettings } from "@/contexts/settings-context"
import SnipeAd from "@/components/snipe-ad"

interface AppData {
  url: string
  iframeVar: number
}

export default function AppPage() {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [loading, setLoading] = useState(true)
  const [appContent, setAppContent] = useState<string>("")
  const { displaySnipeShield } = useSettings()

  useEffect(() => {
    // Get the URL and iframeVar from localStorage
    const url = localStorage.getItem("drl")
    const iframeVar = localStorage.getItem("iframeVar")

    if (url) {
      setAppData({
        url,
        iframeVar: iframeVar ? Number.parseInt(iframeVar) : 1,
      })

      // If iframeVar is 2, fetch the content
      if (iframeVar === "2") {
        fetchAppContent(url)
      } else {
        // Add a small delay to show loading animation
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    } else {
      // Redirect back to home if no URL is found
      window.location.href = "/"
    }
  }, [])

  const fetchAppContent = async (url: string) => {
    try {
      const response = await fetch(url)
      const html = await response.text()
      setAppContent(html)
    } catch (error) {
      console.error("Error fetching app content:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenFullscreen = () => {
    if (typeof window !== "undefined" && appData) {
      // Open in about:blank
      const newWindow = window.open("about:blank", "_blank")
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Ripple</title>
              <link rel="icon" href="https://i.ibb.co/KzftD25N/download-3.png">
            </head>
            <body style="margin:0;padding:0;height:100vh;overflow:hidden;">
              <iframe src="${appData.url}" style="border:none;width:100%;height:100vh;"></iframe>
            </body>
          </html>
        `)
        newWindow.document.close()
      }
    }
  }

  return (
    <>
      {/* Loading Animation */}
      {loading && (
        <>
          <LoadingAnimation />
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[501] w-[90%] max-w-[400px]">
            <SnipeAd variant="small" />
          </div>
        </>
      )}

      <div className="flex flex-col h-screen">
        {/* Header */}
        <header className="bg-[rgba(30,30,30,0.7)] backdrop-blur-[10px] p-4 flex items-center justify-between">
          <button
            onClick={() => (window.location.href = "/")}
            className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Ripple</span>
          </button>

          <div className="w-[200px]">
            <SnipeAd variant="small" />
          </div>
        </header>

        {/* App Content */}
        <div className="flex-1 bg-black">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-white mb-2"></div>
            </div>
          ) : appData?.iframeVar === 2 && appContent ? (
            <iframe
              srcDoc={appContent}
              className="w-full h-full border-none"
              title="App Content"
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
            />
          ) : (
            <iframe
              src={appData?.url}
              className="w-full h-full border-none"
              title="App Content"
              sandbox="allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"
            />
          )}
        </div>
      </div>

      {/* About:blank Shield */}
      {displaySnipeShield && (
        <div className="fixed bottom-4 right-4 z-[100]">
          <button
            onClick={handleOpenFullscreen}
            className="bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-500 transition-colors"
            title="Open in about:blank mode"
          >
            <Shield className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </>
  )
}
