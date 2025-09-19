"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedBubbleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function AnimatedBubbleButton({ 
  children, 
  onClick, 
  className,
  disabled = false 
}: AnimatedBubbleButtonProps) {
  return (
    <div className="inline-block">
      <button 
        className={cn(
          "relative px-10 py-3 text-lg font-bold text-white border-none rounded-full cursor-pointer overflow-hidden bg-transparent inline-block z-10 transition-transform duration-200 ease-in-out",
          "hover:scale-105 active:scale-95",
          "before:content-[''] before:absolute before:bg-black before:rounded-full before:h-[calc(100%-4px)] before:w-[calc(100%-4px)] before:top-0.5 before:left-0.5 before:z-20 before:opacity-0 before:scale-95 before:transition-all before:duration-500 before:ease-in-out",
          "hover:before:opacity-100 hover:before:scale-100",
          disabled && "opacity-60 cursor-not-allowed",
          className
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {/* Bubble Layers */}
        <div className="absolute w-36 h-36 rounded-full blur-lg z-0 bg-pink-500 -top-5 -left-2" 
             style={{ 
               animation: 'moveUpRight 6s ease-in-out infinite',
               animationDelay: '0s'
             }} />
        <div className="absolute w-36 h-36 rounded-full blur-lg z-0 bg-orange-500 top-0 left-2" 
             style={{ 
               animation: 'moveDownLeft 5s ease-in-out infinite',
               animationDelay: '1s'
             }} />
        <div className="absolute w-36 h-36 rounded-full blur-lg z-0 bg-yellow-400 top-5 left-1/2" 
             style={{ 
               animation: 'moveRight 4s ease-in-out infinite',
               animationDelay: '2s'
             }} />
        <div className="absolute w-36 h-36 rounded-full blur-lg z-0 bg-cyan-400 -top-5 left-3/4" 
             style={{ 
               animation: 'moveUpLeft 7s ease-in-out infinite',
               animationDelay: '3s'
             }} />
        <div className="absolute w-36 h-36 rounded-full blur-lg z-0 bg-purple-600 top-7 -left-2" 
             style={{ 
               animation: 'moveDownRight 3s ease-in-out infinite',
               animationDelay: '4s'
             }} />
        <div className="absolute w-36 h-36 rounded-full blur-lg z-0 bg-pink-500 -top-2 left-1/3" 
             style={{ 
               animation: 'moveLeft 8s ease-in-out infinite',
               animationDelay: '0.5s'
             }} />
        <div className="absolute w-36 h-36 rounded-full blur-lg z-0 bg-orange-500 top-10 left-3/5" 
             style={{ 
               animation: 'moveUp 6s ease-in-out infinite',
               animationDelay: '1.5s'
             }} />
        
        <span className="relative z-30">{children}</span>
      </button>
    </div>
  );
}