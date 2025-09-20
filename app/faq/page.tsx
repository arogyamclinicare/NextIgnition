import type { Metadata } from 'next';
import EnhancedBackground from '@/components/enhanced-background';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SiteHeader } from '@/components/site-header';
import FaqsTimeline from '@/components/ui/faqs-timeline';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions',
  description:
    'Find answers to common questions about NextIgnition. Learn about our startup ecosystem, how to connect with founders, investors, and mentors, and get help with our platform.',
  keywords: [
    'FAQ',
    'frequently asked questions',
    'startup help',
    'NextIgnition support',
    'startup platform questions',
    'founder questions',
    'investor questions',
    'mentor questions',
  ],
  openGraph: {
    title: 'FAQ - NextIgnition',
    description:
      'Find answers to common questions about NextIgnition startup ecosystem platform.',
    url: 'https://nextignition.vercel.app/faq',
  },
  twitter: {
    title: 'FAQ - NextIgnition',
    description:
      'Find answers to common questions about NextIgnition startup ecosystem platform.',
  },
  alternates: {
    canonical: '/faq',
  },
};

export default function FAQPage() {
  return (
    <div className='relative flex min-h-screen flex-col select-none'>
      {/* Background Layers */}
      <EnhancedBackground />
      <BackgroundRippleEffect />

      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <div className='relative z-[12] flex-1'>
        <div className='select-auto'>
          <FaqsTimeline />
        </div>
      </div>
    </div>
  );
}
