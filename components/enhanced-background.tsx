"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

interface FloatingShape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  speedX: number
  speedY: number
  rotationSpeed: number
  type: 'triangle' | 'circle' | 'hexagon'
}

export default function EnhancedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [particles, setParticles] = useState<Particle[]>([])
  const [shapes, setShapes] = useState<FloatingShape[]>([])

  // Mouse tracking
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  // Initialize particles
  useEffect(() => {
    const newParticles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
    setParticles(newParticles)

    const newShapes: FloatingShape[] = []
    const shapeTypes: ('triangle' | 'circle' | 'hexagon')[] = ['triangle', 'circle', 'hexagon']
    for (let i = 0; i < 12; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        rotation: Math.random() * 360,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        rotationSpeed: (Math.random() - 0.5) * 2,
        type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      })
    }
    setShapes(newShapes)
  }, [])

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Animate shapes
  useEffect(() => {
    const interval = setInterval(() => {
      setShapes(prev => prev.map(shape => ({
        ...shape,
        x: (shape.x + shape.speedX + 100) % 100,
        y: (shape.y + shape.speedY + 100) % 100,
        rotation: (shape.rotation + shape.rotationSpeed + 360) % 360,
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      mouseX.set(x)
      mouseY.set(y)
    }
  }

  const renderShape = (shape: FloatingShape) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      transform: `rotate(${shape.rotation}deg)`,
      opacity: 0.1,
    }

    switch (shape.type) {
      case 'triangle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid rgba(59, 130, 246, 0.3)`,
              transform: `rotate(${shape.rotation}deg)`,
            }}
          />
        )
      case 'circle':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
            }}
          />
        )
      case 'hexagon':
        return (
          <div
            key={shape.id}
            style={{
              ...baseStyle,
              background: 'rgba(236, 72, 153, 0.3)',
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)',
            }}
          />
        )
      default:
        return null
    }
  }

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

      {/* Floating Geometric Shapes */}
      {shapes.map(renderShape)}

      {/* Particle System */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Parallax Layers */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(45deg, 
            rgba(59, 130, 246, 0.1) 0%, 
            rgba(147, 51, 234, 0.1) 50%, 
            rgba(236, 72, 153, 0.1) 100%)`,
          transform: `translate(${springX * 0.1}px, ${springY * 0.1}px)`,
        }}
      />
      
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          background: `linear-gradient(-45deg, 
            rgba(34, 197, 94, 0.1) 0%, 
            rgba(59, 130, 246, 0.1) 50%, 
            rgba(147, 51, 234, 0.1) 100%)`,
          transform: `translate(${springX * -0.05}px, ${springY * -0.05}px)`,
        }}
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  )
}
