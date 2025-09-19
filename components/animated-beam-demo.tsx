"use client"

import type React from "react"
import { forwardRef, useRef, useState, useCallback, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/magicui/animated-beam"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { 
  Users, 
  Briefcase, 
  Globe, 
  Bot, 
  GraduationCap, 
  TrendingUp,
  Sparkles,
  Zap
} from "lucide-react"

const RoundedRect = forwardRef<
  HTMLDivElement,
  {
    className?: string
    children?: React.ReactNode
    title: string
    description: string
    icon?: React.ReactNode
    gradient?: string
    onHover?: (show: boolean, description: string, event?: React.MouseEvent) => void
    onClick?: () => void
  }
>(({ className, children, title, description, icon, gradient, onHover, onClick }, ref) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]))

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(event.clientX - centerX)
    mouseY.set(event.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    onHover?.(false, description, undefined)
  }

  return (
    <motion.div
      ref={ref}
      className={cn(
        "z-10 flex w-28 h-14 sm:w-32 sm:h-16 md:w-40 md:h-16 lg:w-44 lg:h-18 items-center justify-center rounded-xl cursor-pointer pointer-events-auto relative overflow-hidden group",
        className,
      )}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(e) => onHover?.(true, description, e)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ 
        scale: 1.05,
        z: 50,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Gradient Background */}
      <div 
        className={cn(
          "absolute inset-0 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300",
          gradient || "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"
        )}
      />
      
      {/* Glass Effect */}
      <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 group-hover:border-white/30 transition-all duration-300" />
      
      {/* 3D Shadow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-black/5 to-transparent group-hover:from-black/10 transition-all duration-300" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-2 sm:p-3 md:p-3 lg:p-3.5 text-center">
        {/* Icon */}
        {icon && (
          <motion.div
            className="mb-1 sm:mb-2"
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>
        )}
        
        {/* Title */}
        <span className="text-[10px] sm:text-[11px] md:text-xs lg:text-sm font-sans font-medium text-center leading-tight text-gray-800 group-hover:text-gray-900 px-1 sm:px-2 break-words hyphens-auto tracking-wide select-none transition-colors duration-300">
          {title}
        </span>
      </div>
      
      {/* Sparkle Effect */}
      <motion.div
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-3 h-3 text-yellow-400" />
      </motion.div>
    </motion.div>
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
    { 
      title: "Find Co-Founder & Mentors", 
      description: "Connect with the right people to scale faster",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />,
      gradient: "bg-white/80 backdrop-blur-md border border-purple-200/50 shadow-lg"
    },
    { 
      title: "Hire Trusted Experts", 
      description: "Get guidance & execution from industry leaders",
      icon: <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />,
      gradient: "bg-white/80 backdrop-blur-md border border-emerald-200/50 shadow-lg"
    },
    { 
      title: "Access Global Investors", 
      description: "Pitch directly to VCs & Angels worldwide",
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />,
      gradient: "bg-white/80 backdrop-blur-md border border-blue-200/50 shadow-lg"
    },
    {
      title: "Ignisha AI – Startup Assistant",
      description: "Idea validation, growth benchmarking, docs generation & instant insights",
      icon: <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />,
      gradient: "bg-white/80 backdrop-blur-md border border-pink-200/50 shadow-lg"
    },
    { 
      title: "Learn & Grow Webinars/Events", 
      description: "Stay ahead with expert-led sessions",
      icon: <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />,
      gradient: "bg-white/80 backdrop-blur-md border border-amber-200/50 shadow-lg"
    },
    { 
      title: "Boost Startup Visibility",
      description: "Smart profile ranking to get noticed by the right investors",
      icon: <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />,
      gradient: "bg-white/80 backdrop-blur-md border border-cyan-200/50 shadow-lg"
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
      className="relative flex h-[240px] sm:h-[260px] md:h-[280px] lg:h-[300px] w-full items-center justify-center overflow-visible p-1 sm:p-2 md:p-0 lg:p-0 z-[25] select-none"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-[320px] sm:max-w-2xl md:max-w-none lg:max-w-none max-h-[220px] sm:max-h-[240px] md:max-h-[260px] lg:max-h-[280px] items-stretch justify-between gap-3 sm:gap-4 md:gap-5 lg:gap-6 md:relative lg:relative md:w-full lg:w-full md:h-full lg:h-full">
        <div className="flex flex-row items-center justify-between md:relative lg:relative md:h-full lg:h-full">
          <RoundedRect
            ref={div1Ref}
            title={features[0].title}
            description={features[0].description}
            icon={features[0].icon}
            gradient={features[0].gradient}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[0].description)}
            className="md:absolute md:left-40 lg:absolute lg:left-48"
          />
          <RoundedRect
            ref={div5Ref}
            title={features[1].title}
            description={features[1].description}
            icon={features[1].icon}
            gradient={features[1].gradient}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[1].description)}
            className="md:absolute md:right-40 lg:absolute lg:right-48"
          />
        </div>
        <div className="flex flex-row items-center justify-between md:relative lg:relative md:h-full lg:h-full">
          <RoundedRect
            ref={div2Ref}
            title={features[2].title}
            description={features[2].description}
            icon={features[2].icon}
            gradient={features[2].gradient}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[2].description)}
            className="md:absolute md:left-40 lg:absolute lg:left-48"
          />
            <motion.div
              ref={div4Ref}
              className="z-10 flex size-12 sm:size-16 md:size-14 lg:size-16 items-center justify-center rounded-full border-2 border-white/30 bg-white backdrop-blur-md p-2 sm:p-3 md:p-3 lg:p-3.5 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] cursor-pointer pointer-events-auto relative overflow-hidden group md:absolute md:left-1/2 md:top-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2"
              onClick={() => console.log('NextIgnition logo clicked!')}
              whileHover={{ 
                scale: 1.1,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* White background */}
              <div className="absolute inset-0 rounded-full bg-white" />
              <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/30 transition-all duration-300" />
              
              <Image
                src="/WhatsApp Image 2025-09-16 at 11.07.23 AM.jpeg"
                alt="NextIgnition"
                width={32}
                height={32}
                className="relative z-10 object-contain w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
              
              {/* Rotating sparkle effect */}
              <motion.div
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-2 h-2 text-yellow-400" />
              </motion.div>
            </motion.div>
          <RoundedRect
            ref={div6Ref}
            title={features[3].title}
            description={features[3].description}
            icon={features[3].icon}
            gradient={features[3].gradient}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[3].description)}
            className="md:absolute md:right-40 lg:absolute lg:right-48"
          />
        </div>
        <div className="flex flex-row items-center justify-between md:relative lg:relative md:h-full lg:h-full">
          <RoundedRect
            ref={div3Ref}
            title={features[4].title}
            description={features[4].description}
            icon={features[4].icon}
            gradient={features[4].gradient}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[4].description)}
            className="md:absolute md:left-40 lg:absolute lg:left-48"
          />
          <RoundedRect
            ref={div7Ref}
            title={features[5].title}
            description={features[5].description}
            icon={features[5].icon}
            gradient={features[5].gradient}
            onHover={(show, description, event) => handleHover(show, description, event)}
            onClick={() => handleClick(features[5].description)}
            className="md:absolute md:right-40 lg:absolute lg:right-48"
          />
        </div>
      </div>

      {/* Animated Beams - Following the exact pattern from raw code */}
      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div4Ref} curvature={-30} endYOffset={-3} pathWidth={1} pathOpacity={0.1} />
      <AnimatedBeam containerRef={containerRef} fromRef={div2Ref} toRef={div4Ref} pathWidth={1} pathOpacity={0.1} />
      <AnimatedBeam containerRef={containerRef} fromRef={div3Ref} toRef={div4Ref} curvature={30} endYOffset={3} pathWidth={1} pathOpacity={0.1} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-30}
        endYOffset={-3}
        reverse
        pathWidth={1}
        pathOpacity={0.1}
      />
      <AnimatedBeam containerRef={containerRef} fromRef={div6Ref} toRef={div4Ref} reverse pathWidth={1} pathOpacity={0.1} />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={30}
        endYOffset={3}
        reverse
        pathWidth={1}
        pathOpacity={0.1}
      />

      <Tooltip show={tooltipData.show} description={tooltipData.description} position={tooltipData.position} />
    </div>
  )
}
