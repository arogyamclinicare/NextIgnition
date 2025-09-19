"use client"
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect"
import { SiteHeader } from "@/components/site-header"
import CTAButton from "@/components/ui/cta-button"
import AnimatedUnderline from "@/components/ui/animated-underline"
import TextType from "@/components/ui/TextType"
import AnimatedBeamDemo from "@/components/animated-beam-demo"
import { TextLoopCustomVariantsTransition } from "@/components/ui/text-loop-custom"

export default function BackgroundRippleEffectDemo() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background extends everywhere */}
      <BackgroundRippleEffect />
      
      {/* Navigation floats on top */}
      <SiteHeader />
      
      {/* Main content - optimized for mobile and desktop */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-start pt-30 sm:pt-24 md:pt-32">
        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8">
          {/* Animated Text Loop */}
          <div className="mb-8 h-8 flex items-center justify-center">
            <TextLoopCustomVariantsTransition />
          </div>
          
          {/* Animated Beam Diagram */}
          <div className="mb-12 md:mb-16">
            <AnimatedBeamDemo />
          </div>
          
          {/* CTA Button */}
          <div className="flex justify-center mt-8 md:mt-12">
            <CTAButton />
          </div>
        </div>
      </div>
    </div>
  )
}
