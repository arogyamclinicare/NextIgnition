"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";

export default function AboutTimeline() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      className="pt-24 pb-10 px-10 mx-auto bg-[#fdf9f6] min-h-screen w-full shadow-sm grid md:grid-cols-12 gap-5"
      ref={aboutRef}
    >
      <div className="md:col-span-8 md:pr-16">
        <TimelineContent
          as="h1"
          animationNum={0}
          timelineRef={aboutRef}
          customVariants={revealVariants}
          className="text-4xl font-bold text-black mb-8"
        >
          About Us – NextIgnition
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={1}
          timelineRef={aboutRef}
          customVariants={revealVariants}
          className="text-lg leading-relaxed text-black mb-8"
        >
          At <span className="font-bold">NextIgnition</span>, we believe every great startup begins with a <span className="font-bold">spark</span> — an idea, a dream, or a vision. But turning that spark into reality requires the right people, guidance, and opportunities.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={aboutRef}
          customVariants={revealVariants}
          className="text-lg leading-relaxed text-black mb-6"
        >
          We are building a <span className="font-bold">global startup ecosystem</span> where:
        </TimelineContent>

        <TimelineContent
          as="ul"
          animationNum={3}
          timelineRef={aboutRef}
          customVariants={revealVariants}
          className="space-y-4 text-lg leading-relaxed text-black ml-6 mb-8"
        >
          <li className="flex items-start">
            <span className="font-bold mr-4 text-black">•</span>
            <span><span className="font-bold">Founders & Co-founders</span> connect, collaborate, and validate their ideas.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-4 text-black">•</span>
            <span><span className="font-bold">Experts & Mentors</span> guide and support with real-world experience.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-4 text-black">•</span>
            <span><span className="font-bold">Investors</span> discover promising ventures with ease and privacy.</span>
          </li>
          <li className="flex items-start">
            <span className="font-bold mr-4 text-black">•</span>
            <span><span className="font-bold">Ignisha AI</span> empowers everyone with intelligent insights, document generation, and personalized startup assistance.</span>
          </li>
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={4}
          timelineRef={aboutRef}
          customVariants={revealVariants}
          className="text-lg leading-relaxed text-black mb-8"
        >
          Our mission is simple: <span className="font-bold">Help entrepreneurs build, fund, and grow faster</span> — with the right network and tools at their fingertips.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={5}
          timelineRef={aboutRef}
          customVariants={revealVariants}
          className="text-lg leading-relaxed text-black mb-8"
        >
          With <span className="font-bold">NextIgnition</span>, startups no longer have to struggle alone. We provide the connections, knowledge, and AI-powered support needed to turn ambitious ideas into thriving businesses.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={6}
          timelineRef={aboutRef}
          customVariants={revealVariants}
          className="text-2xl font-bold leading-tight text-center text-black"
        >
          NextIgnition: Where startups find their spark, and the world fuels their growth.
        </TimelineContent>
      </div>

      <div className="md:col-span-4 w-full">
        <div className="flex flex-col space-y-4 md:w-80 ml-auto">
          <TimelineContent
            as="div"
            animationNum={7}
            timelineRef={aboutRef}
            customVariants={revealVariants}
            className="space-y-2"
          >
            <span className="text-sm font-semibold text-black/60">
              OUR VISION
            </span>
            <p className="text-sm sm:text-base text-black/90">
              To become the world's leading startup ecosystem platform, connecting entrepreneurs, 
              investors, and experts in a seamless, AI-powered environment that accelerates 
              innovation and business growth globally.
            </p>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={8}
            timelineRef={aboutRef}
            customVariants={revealVariants}
            className="space-y-2 pt-10"
          >
            <span className="text-sm font-semibold text-black/60">
              OUR VALUES
            </span>
            <p className="text-sm sm:text-base text-black/90">
              We believe in transparency, collaboration, and innovation. Every startup deserves 
              access to the right resources, connections, and AI-powered tools to succeed, 
              regardless of their size or location.
            </p>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={9}
            timelineRef={aboutRef}
            customVariants={revealVariants}
            className="space-y-2 pt-10"
          >
            <span className="text-sm font-semibold text-black/60">
              OUR IMPACT
            </span>
            <p className="text-sm sm:text-base text-black/90">
              Through our platform, we're building bridges between ideas and execution, 
              connecting the next generation of entrepreneurs with the resources they need 
              to turn their visions into reality.
            </p>
          </TimelineContent>
        </div>
      </div>
    </div>
  );
}
