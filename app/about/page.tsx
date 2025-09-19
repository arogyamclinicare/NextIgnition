import EnhancedBackground from '@/components/enhanced-background';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { SiteHeader } from '@/components/site-header';
import AboutTimeline from '@/components/ui/about-timeline';

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
