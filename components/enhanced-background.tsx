"use client"

import React, { useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Clean background - no complex interfaces needed

export default function EnhancedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Mouse tracking
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Clean background - no initialization needed

  // No animation needed for clean background

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  // No shape rendering needed for clean background

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${springX}% ${springY}%, 
              rgba(59, 130, 246, 0.1) 0%, 
              rgba(147, 51, 234, 0.1) 25%, 
              rgba(236, 72, 153, 0.1) 50%, 
              transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${100 - springX}% ${100 - springY}%, 
              rgba(34, 197, 94, 0.1) 0%, 
              rgba(59, 130, 246, 0.1) 25%, 
              rgba(147, 51, 234, 0.1) 50%, 
              transparent 70%)`,
          }}
        />
      </div>

      {/* Clean background - no extra elements */}
    </div>
  )
}
