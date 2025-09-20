'use client';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
} from '@/components/ui/accordion';
import { TimelineContent } from '@/components/ui/timeline-animation';
import { Plus } from 'lucide-react';
import { useRef } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'What is NextIgnition?',
    answer:
      'NextIgnition is a global startup ecosystem where founders, experts, co-founders, and investors connect, collaborate, and grow together—with the support of our AI assistant, Ignisha.',
  },
  {
    question: 'Who can join the platform?',
    answer:
      '• Founders & Co-founders – Build your team, validate ideas, and raise funding.\n• Experts – Offer mentorship, consultation, or services to startups.\n• Investors (VCs/Angels) – Discover high-potential startups and connect privately.',
  },
  {
    question:
      'What makes NextIgnition different from LinkedIn or other platforms?',
    answer:
      'Unlike general networking sites, NextIgnition is startup-focused—from co-founder matching, MVP development, and verified experts, to investor connections and AI-powered business tools.',
  },
  {
    question: 'What is Ignisha AI?',
    answer:
      'Ignisha AI is your personal startup assistant. It helps with idea validation, benchmarking, generating business documents, summarizing profiles, and keeping you updated with startup news & insights.',
  },
  {
    question: 'How does the subscription model work?',
    answer:
      'We offer Free, Pro, and Elite plans for founders, experts, and investors. Each tier unlocks additional features like visibility boosts, advanced AI tools, and premium investor access.',
  },
  {
    question: 'How do consultations and collaborations work?',
    answer:
      'Experts can list consultation services, and founders can book sessions directly. Payments are handled securely through the platform, with a small commission going to NextIgnition.',
  },
  {
    question: 'Can I find a co-founder here?',
    answer:
      'Yes! Our co-founder matching system helps you find the right partner based on your skills, goals, and startup stage.',
  },
  {
    question: 'Is investor access really private?',
    answer:
      'Yes. Investor profiles remain stealth-mode to protect privacy. However, verified founders with strong profiles and traction can get discovered by investors.',
  },
  {
    question: 'How does MVP development work?',
    answer:
      'Founders can raise an MVP request, and our internal/partner expert team helps build the product based on your budget & needs.',
  },
  {
    question: 'What does profile boosting mean?',
    answer:
      'Similar to ad-boosting, founders can pay a small fee to increase visibility of their profile to top experts and investors for a set duration.',
  },
  {
    question: 'Is NextIgnition global?',
    answer:
      'Yes 🌍 — with timezone detection, events, webinars, and notifications automatically tailored to your location.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Simply register, select your role (Founder, Expert, Investor, Co-founder), complete your profile, and start connecting 🚀.',
  },
];

export default function FaqsTimeline() {
  const faqsRef = useRef<HTMLDivElement>(null);
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.2,
        duration: 0.6,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      className='pt-24 pb-10 px-10 mx-auto bg-[#fdf9f6] min-h-screen w-full shadow-sm grid md:grid-cols-12 gap-5'
      ref={faqsRef}
    >
      <div className='md:col-span-8 md:pr-16'>
        <TimelineContent
          as='span'
          animationNum={0}
          timelineRef={faqsRef}
          customVariants={revealVariants}
          className='text-sm font-semibold text-black/60'
        >
          FREQUENTLY ASKED QUESTIONS
        </TimelineContent>

        <div className='mt-3'>
          <Accordion defaultValue='item-0'>
            {faqData.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className='mb-0 rounded-none bg-transparent w-full'
              >
                <TimelineContent
                  as='div'
                  animationNum={1 + index}
                  timelineRef={faqsRef}
                  customVariants={revealVariants}
                >
                  <AccordionHeader
                    customIcon
                    className='hover:no-underline p-0 border-t border-neutral-300 py-2 relative data-[active]:bg-transparent hover:bg-transparent text-neutral-600 data-[active]:text-black sm:text-base text-sm'
                  >
                    <span className='font-medium lg:text-xl md:text-lg sm:text-base'>
                      {item.question}
                    </span>
                    <span className='relative group-data-[active]:rotate-90 border border-neutral-500 text-neutral-600 sm:p-2 p-1.5 -translate-x-1 rounded-xl'>
                      <Plus className='group-data-[active]:rotate-90 transition-all duration-300' />
                    </span>
                  </AccordionHeader>
                </TimelineContent>
                <TimelineContent
                  as='div'
                  animationNum={1 + index}
                  timelineRef={faqsRef}
                  customVariants={revealVariants}
                >
                  <AccordionPanel
                    className='space-y-4 w-full mx-auto bg-[#fdf9f6] px-0'
                    articleClassName='pt-2 px-0 bg-[#fdf9f6]'
                  >
                    <p className='text-sm sm:text-base whitespace-pre-line'>
                      {item.answer}
                    </p>
                  </AccordionPanel>
                </TimelineContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <div className='md:col-span-4 w-full'>
        <div className='flex flex-col space-y-4 md:w-80 ml-auto'>
          <TimelineContent
            as='div'
            animationNum={13}
            timelineRef={faqsRef}
            customVariants={revealVariants}
            className='space-y-2'
          >
            <span className='text-sm font-semibold text-black/60'>
              OUR PURPOSE
            </span>
            <p className='text-sm sm:text-base text-black/90'>
              Our purpose is to make startup success accessible and affordable
              for everyone, empowering entrepreneurs of all sizes to leverage
              the power of AI and networking to drive innovation, automate
              processes, and unlock new opportunities.
            </p>
          </TimelineContent>

          <TimelineContent
            as='div'
            animationNum={14}
            timelineRef={faqsRef}
            customVariants={revealVariants}
            className='space-y-2 pt-10'
          >
            <span className='text-sm font-semibold text-black/60'>
              OUR MISSION
            </span>
            <p className='text-sm sm:text-base text-black/90'>
              Our mission is to connect the global startup ecosystem, making it
              easier for founders to find co-founders, mentors, investors, and
              AI-powered tools to turn their ideas into thriving businesses.
            </p>
          </TimelineContent>
        </div>
      </div>
    </div>
  );
}
