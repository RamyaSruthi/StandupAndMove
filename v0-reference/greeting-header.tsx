"use client"

import { Flame } from "lucide-react"

interface GreetingHeaderProps {
  name: string
  streak: number
}

export function GreetingHeader({ name, streak }: GreetingHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 pt-14 pb-2">
      <div>
        <p className="text-sm text-muted-foreground font-medium">Good morning</p>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">
          Hey, {name}!
        </h1>
      </div>
      <div className="flex items-center gap-1.5 bg-secondary rounded-full px-3.5 py-2 shadow-sm">
        <Flame className="w-4 h-4 text-[#FF6B3D]" fill="#FF6B3D" strokeWidth={2.5} />
        <span className="text-sm font-bold text-foreground">{streak} days</span>
      </div>
    </header>
  )
}
