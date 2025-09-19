"use client"

import type React from "react"
import { forwardRef, useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"

const RoundedRect = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    title: string
    description: string
    onHover?: (show: boolean, description: string, event?: React.MouseEvent) => void
    onClick?: () => void
  }
>(({ className, children, title, description, onHover, onClick }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-16 lg:w-44 lg:h-18 items-center justify-center rounded-xl border border-gray-300 bg-white/20 backdrop-blur-md p-2.5 sm:p-3 md:p-3 lg:p-3.5 cursor-pointer transition-all duration-300 hover:bg-white/30 hover:scale-105 hover:border-gray-400 pointer-events-auto",
        className,
      )}
      onMouseEnter={(e) => onHover?.(true, description, e)}
      onMouseLeave={() => onHover?.(false, description, undefined)}
      onClick={onClick}
    >
      <span className="text-[11px] sm:text-[12px] md:text-lg font-sans font-normal text-center leading-[1.0] sm:leading-tight text-gray-600 px-2 sm:px-2.5 break-words hyphens-auto tracking-wide select-none">
        {title}
      </span>
    </div>
  )
})
RoundedRect.displayName = "RoundedRect"

const Tooltip = ({
  show,
  description,
  position,
}: {
  show: boolean
  description: string
  position: { x: number; y: number }
}) => {
  if (!show) return null

  return (
    <div
      className="fixed z-50 bg-black text-white px-4 py-3 rounded-lg text-sm max-w-xs shadow-2xl pointer-events-none border border-gray-600"
      style={{
        left: position.x,
        top: position.y - 80,
        transform: "translateX(-50%)",
      }}
    >
      {description}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
    </div>
  )
}

export default function AnimatedBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)
  

  const [tooltipData, updateTooltip] = useState<{ show: boolean; description: string; position: { x: number; y: number } }>({
    show: false,
    description: "",
    position: { x: 0, y: 0 },
  });

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if ((window as any).tooltipTimeout) {
        clearTimeout((window as any).tooltipTimeout)
      }
    }
  }, [])

  const features = [
    { title: "Find Co-Founder & Mentors", description: "Connect with the right people to scale faster" },
    { title: "Hire Trusted Experts", description: "Get guidance & execution from industry leaders" },
    { title: "Access Global Investors", description: "Pitch directly to VCs & Angels worldwide" },
    {
      title: "Ignisha AI – Startup Assistant",
      description: "Idea validation, growth benchmarking, docs generation & instant insights",
    },
    { title: "Learn & Grow Webinars/Events", description: "Stay ahead with expert-led sessions" },
    {
      title: "Boost Startup Visibility",
      description: "Smart profile ranking to get noticed by the right investors",
    },
  ]

  const handleHover = (show: boolean, description: string, event?: React.MouseEvent) => {
    try {
      // Only handle hover on desktop (non-touch devices)
      if (show && event && window.innerWidth >= 768) {
        updateTooltip({
          show: true,
          description,
          position: { x: event.clientX, y: event.clientY },
        });
      } else if (!show) {
        updateTooltip((prev) => ({ ...prev, show: false }));
      }
    } catch (error) {
      console.error('Error in handleHover:', error);
      updateTooltip((prev) => ({ ...prev, show: false }));
    }
  };

  const handleClick = (description: string) => {
    try {
      // Clear any existing timeout
      if ((window as any).tooltipTimeout) {
        clearTimeout((window as any).tooltipTimeout);
      }
      
      updateTooltip({
        show: true,
        description,
        position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      });
      
      // Hide tooltip after 5 seconds
      (window as any).tooltipTimeout = setTimeout(() => {
        updateTooltip((prev) => ({ ...prev, show: false }));
      }, 5000);
    } catch (error) {
      console.error('Error in handleClick:', error);
    }
  };

  return (
    <div
      className="relative flex h-[280px] sm:h-[300px] md:h-[320px] lg:h-[340px] w-full items-center justify-center overflow-hidden p-1 sm:p-2 md:p-3 lg:p-4 z-[25] select-none"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-[320px] sm:max-w-2xl md:max-w-7xl lg:max-w-[90rem] max-h-[260px] sm:max-h-[280px] md:max-h-[300px] lg:max-h-[320px] items-stretch justify-between gap-4 sm:gap-5 md:gap-6 lg:gap-7">
        <div className="flex flex-row items-center justify-between">
          <RoundedRect
            ref={div1Ref}
            title={features[0].title}
            description={features[0].description}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[0].description)}
          />
          <RoundedRect
            ref={div5Ref}
            title={features[1].title}
            description={features[1].description}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[1].description)}
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <RoundedRect
            ref={div2Ref}
            title={features[2].title}
            description={features[2].description}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[2].description)}
          />
            <div
              ref={div4Ref}
              className="z-10 flex size-12 sm:size-16 md:size-14 lg:size-16 items-center justify-center rounded-full border-2 border-border bg-white p-2 sm:p-3 md:p-3 lg:p-3.5 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-300 hover:bg-white/25 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] hover:scale-110 hover:border-white/40 pointer-events-auto"
              onClick={() => console.log('NextIgnition logo clicked!')}
            >
              <Image
                src="/WhatsApp Image 2025-09-16 at 11.07.23 AM.jpeg"
                alt="NextIgnition"
                width={32}
                height={32}
                className="object-contain w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
            </div>
          <RoundedRect
            ref={div6Ref}
            title={features[3].title}
            description={features[3].description}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[3].description)}
          />
        </div>
        <div className="flex flex-row items-center justify-between">
          <RoundedRect
            ref={div3Ref}
            title={features[4].title}
            description={features[4].description}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[4].description)}
          />
          <RoundedRect
            ref={div7Ref}
            title={features[5].title}
            description={features[5].description}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[5].description)}
          />
        </div>
      </div>

      {/* Animated Beams - All 6 boxes connected to center logo */}
      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div5Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} />
      <AnimatedBeam containerRef={containerRef} fromRef={div7Ref} toRef={div4Ref} />

      <Tooltip show={tooltipData.show} description={tooltipData.description} position={tooltipData.position} />
    </div>
  )
}
