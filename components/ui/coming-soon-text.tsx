'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ComingSoonText() {
  const [displayedText1, setDisplayedText1] = useState('');
  const [displayedText2, setDisplayedText2] = useState('');
  const [showCursor1, setShowCursor1] = useState(true);
  const [showCursor2, setShowCursor2] = useState(false);
  const [isTyping1, setIsTyping1] = useState(true);
  const [isTyping2, setIsTyping2] = useState(false);

  const text1 = 'Coming Soon';
  const text2 = 'Get Early Access';

  useEffect(() => {
    // Typewriter effect for first text
    let index1 = 0;
    const timer1 = setTimeout(() => {
      const interval1 = setInterval(() => {
        if (index1 <= text1.length) {
          setDisplayedText1(text1.slice(0, index1));
          index1++;
        } else {
          clearInterval(interval1);
          setIsTyping1(false);
          setShowCursor1(false);

          // Start second text after a delay
          setTimeout(() => {
            setIsTyping2(true);
            setShowCursor2(true);
            let index2 = 0;
            const interval2 = setInterval(() => {
              if (index2 <= text2.length) {
                setDisplayedText2(text2.slice(0, index2));
                index2++;
              } else {
                clearInterval(interval2);
                setIsTyping2(false);
                setShowCursor2(false);
              }
            }, 100);
          }, 500);
        }
      }, 150);
    }, 1000);

    // Cursor blinking effect for first text
    const cursorInterval1 = setInterval(() => {
      if (isTyping1) {
        setShowCursor1(prev => !prev);
      }
    }, 500);

    // Cursor blinking effect for second text
    const cursorInterval2 = setInterval(() => {
      if (isTyping2) {
        setShowCursor2(prev => !prev);
      }
    }, 500);

    return () => {
      clearTimeout(timer1);
      clearInterval(cursorInterval1);
      clearInterval(cursorInterval2);
    };
  }, []); // Empty dependency array - only run once

  return (
    <div className='flex flex-col space-y-6 text-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-wider'>
          {displayedText1}
          {isTyping1 && (
            <motion.span
              className='text-blue-500 ml-1'
              animate={{ opacity: showCursor1 ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            >
              |
            </motion.span>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className='text-sm sm:text-base md:text-lg lg:text-xl font-light text-gray-500 tracking-widest uppercase'>
          {displayedText2}
          {isTyping2 && (
            <motion.span
              className='text-green-500 ml-1'
              animate={{ opacity: showCursor2 ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            >
              |
            </motion.span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
