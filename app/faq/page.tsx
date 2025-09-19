import EnhancedBackground from '@/components/enhanced-background';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SiteHeader } from '@/components/site-header';
import AnimatedFAQs from '@/components/ui/animated-faqs';

export default function FAQPage() {
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
            <AnimatedFAQs />
          </div>
        </div>
      </div>
    </div>
  );
}