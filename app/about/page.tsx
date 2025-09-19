'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import EnhancedBackground from '@/components/enhanced-background';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SiteHeader } from '@/components/site-header';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col select-none">
      {/* Background Layers */}
      <EnhancedBackground />
      <BackgroundRippleEffect />
      
      {/* Header */}
      <SiteHeader />
      
      {/* Main Content */}
      <div className="relative z-[12] flex-1 px-4 sm:px-6 md:px-8 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="select-auto">
            <div className='container mx-auto pb-10 pt-6'>
              <motion.h1 
                className='uppercase text-center text-4xl font-bold pt-2 pb-8 text-black dark:text-white'
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                About Us
              </motion.h1>
              
              <motion.div 
                className='h-fit border border-gray-200 dark:border-gray-700 rounded-2xl p-8 dark:bg-black/50 bg-white/80 backdrop-blur-sm shadow-2xl'
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <div className="space-y-8 text-black dark:text-white">
                  <motion.p 
                    className="text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  >
                    At <span className="font-bold">NextIgnition</span>, we believe every great startup begins with a <span className="font-bold">spark</span> — an idea, a dream, or a vision. But turning that spark into reality requires the right people, guidance, and opportunities.
                  </motion.p>
                  
                  <motion.p 
                    className="text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  >
                    We are building a <span className="font-bold">global startup ecosystem</span> where:
                  </motion.p>
                  
                  <motion.ul 
                    className="space-y-4 text-xl leading-relaxed ml-6"
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    <li className="flex items-start">
                      <span className="font-bold mr-4 text-black dark:text-white">•</span>
                      <span><span className="font-bold">Founders & Co-founders</span> connect, collaborate, and validate their ideas.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-4 text-black dark:text-white">•</span>
                      <span><span className="font-bold">Experts & Mentors</span> guide and support with real-world experience.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-4 text-black dark:text-white">•</span>
                      <span><span className="font-bold">Investors</span> discover promising ventures with ease and privacy.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-4 text-black dark:text-white">•</span>
                      <span><span className="font-bold">Ignisha AI</span> empowers everyone with intelligent insights, document generation, and personalized startup assistance.</span>
                    </li>
                  </motion.ul>
                  
                  <motion.p 
                    className="text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  >
                    Our mission is simple: <span className="font-bold">Help entrepreneurs build, fund, and grow faster</span> — with the right network and tools at their fingertips.
                  </motion.p>
                  
                  <motion.p 
                    className="text-xl leading-relaxed"
                    initial={{ opacity: 0, y: 30, rotateX: -15 }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 30, rotateX: -15 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
                  >
                    With <span className="font-bold">NextIgnition</span>, startups no longer have to struggle alone. We provide the connections, knowledge, and AI-powered support needed to turn ambitious ideas into thriving businesses.
                  </motion.p>
                  
                  <motion.p 
                    className="text-2xl leading-relaxed text-center font-bold"
                    initial={{ opacity: 0, y: 30, rotateX: -15, scale: 0.9 }}
                    animate={isVisible ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: 30, rotateX: -15, scale: 0.9 }}
                    transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
                  >
                    🚀 NextIgnition: Where startups find their spark, and the world fuels their growth.
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
