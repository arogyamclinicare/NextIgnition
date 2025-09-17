"use client"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"

export default function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <BackgroundRippleEffect />
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-neutral-800 md:text-8xl lg:text-9xl dark:text-neutral-100">
          Coming Soon
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-600 md:text-xl dark:text-neutral-400">
          Something amazing is on the way. Stay tuned for updates.
        </p>
      </div>
    </div>
  )
}
