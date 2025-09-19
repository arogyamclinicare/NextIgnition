import type { Metadata } from 'next';
import EnhancedBackground from '@/components/enhanced-background';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SiteHeader } from '@/components/site-header';
import AboutTimeline from '@/components/ui/about-timeline';

export const metadata: Metadata = {
  title: 'About Us - Our Mission & Vision',
  description: 'Learn about NextIgnition\'s mission to connect startups with the right people, guidance, and opportunities. Discover how we\'re building a global startup ecosystem.',
  keywords: [
    'about NextIgnition',
    'startup ecosystem',
    'startup mission',
    'startup vision',
    'entrepreneurship',
    'startup platform',
    'founder network',
    'investor network',
    'mentor network'
  ],
  openGraph: {
    title: 'About Us - NextIgnition',
    description: 'Learn about NextIgnition\'s mission to connect startups with the right people, guidance, and opportunities.',
    url: 'https://nextignition.vercel.app/about',
  },
  twitter: {
    title: 'About Us - NextIgnition',
    description: 'Learn about NextIgnition\'s mission to connect startups with the right people, guidance, and opportunities.',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col select-none">
      {/* Background Layers */}
      <EnhancedBackground />
      <BackgroundRippleEffect />
      
      {/* Header */}
      <SiteHeader />
      
      {/* Main Content */}
      <div className="relative z-[12] flex-1">
        <div className="select-auto">
          <AboutTimeline />
        </div>
      </div>
    </div>
  );
}
