"use client"

import { Shield } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"

export default function AboutBlankShield() {
  const { displaySnipeShield } = useSettings()

  // Don't show if display is disabled or we're already in about:blank mode
  if (!displaySnipeShield || (typeof window !== "undefined" && window.location.href.includes("about:blank"))) {
    return null
  }

  const handleClick = () => {
    if (typeof window !== "undefined") {
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
              <iframe src="${window.location.href}" style="border:none;width:100%;height:100vh;"></iframe>
            </body>
          </html>
        `)
        newWindow.document.close()
      }
    }
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-[100] bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-500 transition-colors"
      title="Open in about:blank mode"
    >
      <Shield className="w-6 h-6 text-white" />
    </button>
  )
}
