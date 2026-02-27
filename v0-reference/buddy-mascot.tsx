"use client"

import { useState } from "react"
import Image from "next/image"

export function BuddyMascot() {
  const [isBouncing, setIsBouncing] = useState(false)

  const handleTap = () => {
    setIsBouncing(true)
    setTimeout(() => setIsBouncing(false), 600)
  }

  return (
    <div className="flex flex-col items-center gap-3 py-2">
      {/* Speech bubble */}
      <div className="relative bg-card rounded-2xl px-5 py-2.5 shadow-sm border border-border">
        <p className="text-sm font-semibold text-foreground text-center">
          {"Let's get moving!"}
        </p>
        {/* Bubble tail */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-card border-b border-r border-border rotate-45"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        />
      </div>

      {/* Dog character */}
      <button
        type="button"
        onClick={handleTap}
        className={`relative w-56 h-56 rounded-full overflow-hidden cursor-pointer transition-transform duration-300 focus:outline-none ${
          isBouncing ? "animate-bounce" : "hover:scale-105"
        }`}
        aria-label="Tap Buddy the dog"
      >
        <Image
          src="/images/buddy-dog.jpg"
          alt="Buddy, a happy cartoon dog with floppy ears and a pink bandana"
          fill
          className="object-cover"
          priority
        />
      </button>

      {/* Name tag */}
      <div className="flex items-center gap-2">
        <span className="text-lg font-extrabold text-foreground tracking-wide">Buddy</span>
        <span className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">
          Happy
        </span>
      </div>
    </div>
  )
}
