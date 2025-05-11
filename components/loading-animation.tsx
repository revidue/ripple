export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[500]">
      <div className="flex flex-col items-center">
        <img
          src="https://i.ibb.co/KzftD25N/download-3.png"
          alt="Ripple Logo"
          className="w-20 h-20 mb-4 animate-pulse"
        />
        <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  )
}

// Add this to globals.css
// @keyframes loading {
//   0% { width: 0%; transform: translateX(-100%); }
//   50% { width: 50%; }
//   100% { width: 0%; transform: translateX(200%); }
// }
