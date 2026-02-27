"use client"

import { useState } from "react"
import { Activity } from "lucide-react"

export function MovingButton() {
  const [isPressed, setIsPressed] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleClick = () => {
    setIsPressed(true)
    setShowConfetti(true)
    setTimeout(() => setIsPressed(false), 200)
    setTimeout(() => setShowConfetti(false), 1500)
  }

  return (
    <div className="px-6 pb-10 pt-2 relative">
      {/* Confetti particles */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-ping"
              style={{
                backgroundColor: ["#6C63FF", "#43C6AC", "#FFB347", "#FF6B6B", "#A78BFA"][i % 5],
                left: `${20 + Math.random() * 60}%`,
                top: `${10 + Math.random() * 40}%`,
                animationDelay: `${i * 80}ms`,
                animationDuration: "800ms",
              }}
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleClick}
        className={`w-full py-4 rounded-2xl font-extrabold text-lg text-primary-foreground bg-primary shadow-lg flex items-center justify-center gap-2.5 transition-all duration-150 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
          isPressed ? "scale-95 shadow-md" : "hover:shadow-xl hover:brightness-110"
        }`}
        style={{
          boxShadow: isPressed
            ? "0 4px 14px rgba(108, 99, 255, 0.3)"
            : "0 8px 24px rgba(108, 99, 255, 0.35)",
        }}
      >
        <Activity className="w-5 h-5" strokeWidth={2.5} />
        {"I'm Moving!"}
      </button>
    </div>
  )
}
