"use client"

import type { ReactNode } from "react"

export function IPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto" style={{ width: 393, height: 852 }}>
      {/* Outer phone body */}
      <div
        className="absolute inset-0 rounded-[54px] border-[12px] border-[#1a1a2e] shadow-2xl overflow-hidden"
        style={{
          background: "#1a1a2e",
          boxShadow:
            "0 0 0 2px #2d2b3d, 0 25px 60px -12px rgba(108, 99, 255, 0.25), 0 12px 30px -8px rgba(0,0,0,0.3)",
        }}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div
            className="w-[126px] h-[34px] bg-[#1a1a2e] rounded-b-[20px]"
            style={{ marginTop: 0 }}
          />
        </div>

        {/* Screen content */}
        <div className="relative w-full h-full rounded-[42px] overflow-hidden bg-background">
          {children}
        </div>
      </div>
    </div>
  )
}
