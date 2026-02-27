"use client"

import { Heart, Zap, Star } from "lucide-react"

interface MoodBarProps {
  progress: number // 0-100
}

export function MoodBar({ progress }: MoodBarProps) {
  return (
    <div className="px-6">
      <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
        {/* Stats row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 text-primary" fill="currentColor" />
            </div>
            <span className="text-sm font-bold text-foreground">Mood Level</span>
          </div>
          <span className="text-sm font-extrabold text-primary">{progress}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-4 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full opacity-30 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-pulse" />
          </div>
        </div>

        {/* Quick stats */}
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-accent" fill="currentColor" />
            <span className="text-xs font-semibold text-muted-foreground">3 walks today</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[#FFB347]" fill="currentColor" />
            <span className="text-xs font-semibold text-muted-foreground">120 XP earned</span>
          </div>
        </div>
      </div>
    </div>
  )
}
