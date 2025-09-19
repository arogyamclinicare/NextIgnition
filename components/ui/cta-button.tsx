"use client"

import React from 'react';
import { motion } from 'framer-motion';

const CTAButton = () => {
  return (
    <div className="cta-button-wrapper">
      <motion.button 
        className="cta-button select-none relative overflow-hidden group"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: '-100%' }}
          whileHover={{ x: '0%' }}
          transition={{ duration: 0.3 }}
        />
        
        
        <span className="select-none relative z-10">
          Get Early Access
        </span>
        
        <div className="top" />
        <div className="left" />
        <div className="bottom" />
        <div className="right" />
      </motion.button>
    </div>
  );
}

export default CTAButton;
