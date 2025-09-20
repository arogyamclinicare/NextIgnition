'use client';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SiteHeader } from '@/components/site-header';
import CTAButton from '@/components/ui/cta-button';
import AnimatedUnderline from '@/components/ui/animated-underline';
import TextType from '@/components/ui/TextType';
import AnimatedBeamDemo from '@/components/animated-beam-demo';
import { TextLoopCustomVariantsTransition } from '@/components/ui/text-loop-custom';
import EnhancedBackground from '@/components/enhanced-background';
import { ComingSoonText } from '@/components/ui/coming-soon-text';

export default function BackgroundRippleEffectDemo() {
  return (
    <div className='relative min-h-screen w-full overflow-hidden'>
      {/* Enhanced Background with floating shapes and particles */}
      <EnhancedBackground />

      {/* Original Background Ripple Effect */}
      <BackgroundRippleEffect />

      {/* Navigation floats on top */}
      <SiteHeader />

      {/* Main content - optimized for mobile and desktop */}
      <div className='relative flex min-h-screen w-full flex-col items-center justify-center pt-16 sm:pt-20 md:pt-24 md:justify-start md:pointer-events-none'>
        <div className='relative z-[12] text-center px-4 sm:px-6 md:px-0 lg:px-0 max-w-6xl md:max-w-none lg:max-w-none mx-auto md:mx-0 lg:mx-0 md:w-full lg:w-full md:pointer-events-auto'>
          {/* Animated Text Loop */}
          <div className='mb-6 sm:mb-8 md:mb-6 h-8 flex items-center justify-center'>
            <TextLoopCustomVariantsTransition />
          </div>

          {/* Coming Soon Text */}
          <div className='mb-8 sm:mb-10 md:mb-8 flex items-center justify-center'>
            <ComingSoonText />
          </div>
        </div>

        {/* Animated Beam Diagram - OUTSIDE the constrained container */}
        <div className='relative w-full h-full md:absolute md:inset-0 md:flex md:items-center md:justify-center md:pointer-events-none'>
          <AnimatedBeamDemo />
        </div>

        {/* CTA Button - BELOW the diagram */}
        <div className='relative z-[12] flex justify-center mt-8 sm:mt-10 md:mt-48 lg:mt-64 md:pointer-events-auto'>
          <CTAButton />
        </div>
      </div>
    </div>
  );
}
