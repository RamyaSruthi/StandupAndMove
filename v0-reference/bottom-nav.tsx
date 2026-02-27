"use client"

import { Home, BarChart3, Settings, Trophy } from "lucide-react"
import { useState } from "react"

const navItems = [
  { icon: Home, label: "Home" },
  { icon: BarChart3, label: "Stats" },
  { icon: Trophy, label: "Goals" },
  { icon: Settings, label: "Settings" },
]

export function BottomNav() {
  const [active, setActive] = useState(0)

  return (
    <nav
      className="flex items-center justify-around px-4 py-2.5 bg-card border-t border-border"
      aria-label="Main navigation"
    >
      {navItems.map((item, index) => {
        const Icon = item.icon
        const isActive = active === index
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(index)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-colors ${
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon
              className="w-5 h-5"
              strokeWidth={isActive ? 2.5 : 2}
              fill={isActive ? "currentColor" : "none"}
            />
            <span className={`text-[10px] font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
