'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const tabs = [
  {
    title: 'What is NextIgnition?',
    description:
      'NextIgnition is a global startup ecosystem where founders, experts, co-founders, and investors connect, collaborate, and grow together—with the support of our AI assistant, Ignisha.',
  },
  {
    title: 'Who can join the platform?',
    description:
      '• Founders & Co-founders – Build your team, validate ideas, and raise funding.\n• Experts – Offer mentorship, consultation, or services to startups.\n• Investors (VCs/Angels) – Discover high-potential startups and connect privately.',
  },
  {
    title: 'What makes NextIgnition different from LinkedIn or other platforms?',
    description:
      'Unlike general networking sites, NextIgnition is startup-focused—from co-founder matching, MVP development, and verified experts, to investor connections and AI-powered business tools.',
  },
  {
    title: 'What is Ignisha AI?',
    description:
      'Ignisha AI is your personal startup assistant. It helps with idea validation, benchmarking, generating business documents, summarizing profiles, and keeping you updated with startup news & insights.',
  },
  {
    title: 'How does the subscription model work?',
    description:
      'We offer Free, Pro, and Elite plans for founders, experts, and investors. Each tier unlocks additional features like visibility boosts, advanced AI tools, and premium investor access.',
  },
  {
    title: 'How do consultations and collaborations work?',
    description:
      'Experts can list consultation services, and founders can book sessions directly. Payments are handled securely through the platform, with a small commission going to NextIgnition.',
  },
  {
    title: 'Can I find a co-founder here?',
    description:
      'Yes! Our co-founder matching system helps you find the right partner based on your skills, goals, and startup stage.',
  },
  {
    title: 'Is investor access really private?',
    description:
      'Yes. Investor profiles remain stealth-mode to protect privacy. However, verified founders with strong profiles and traction can get discovered by investors.',
  },
  {
    title: 'How does MVP development work?',
    description:
      'Founders can raise an MVP request, and our internal/partner expert team helps build the product based on your budget & needs.',
  },
  {
    title: 'What does profile boosting mean?',
    description:
      'Similar to ad-boosting, founders can pay a small fee to increase visibility of their profile to top experts and investors for a set duration.',
  },
  {
    title: 'Is NextIgnition global?',
    description:
      'Yes 🌍 — with timezone detection, events, webinars, and notifications automatically tailored to your location.',
  },
  {
    title: 'How do I get started?',
    description:
      'Simply register, select your role (Founder, Expert, Investor, Co-founder), complete your profile, and start connecting 🚀.',
  },
];

function AnimatedFAQs() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [activeItem, setActiveItem] = useState<
    | {
        title: string;
        description: string;
      }
    | undefined
  >(tabs[0]);

  const handleClick = async (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    const newActiveItem = tabs.find((_, i) => i === index);
    setActiveItem(newActiveItem);
  };

  return (
    <>
      <div className='container mx-auto pb-10 pt-6'>
        <h1 className='uppercase text-center text-4xl font-bold pt-2 pb-4'>
          FAQ
        </h1>
        <div className='h-fit border rounded-lg p-2 dark:bg-[#111111] bg-[#F2F2F2]'>
          {tabs.map((tab, index) => (
            <motion.div
              key={index}
              className={`overflow-hidden ${index !== tabs.length - 1 ? 'border-b' : ''
                }`}
              onClick={() => handleClick(index)}
            >
              <button
                className={`p-3 px-2 w-full cursor-pointer sm:text-base text-xs items-start transition-all font-semibold dark:text-white text-black text-left flex gap-2 
               `}
              >
                <Plus
                  className={`${activeIndex === index ? 'rotate-45' : 'rotate-0 '
                    } transition-transform ease-in-out w-5 h-5 flex-shrink-0 mt-0.5 dark:text-gray-200 text-gray-600`}
                />
                {tab.title}
              </button>
              <AnimatePresence mode='sync'>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut',
                      delay: 0.14,
                    }}
                  >
                    <div
                      className={`dark:text-white text-black p-3 xl:text-base sm:text-sm text-xs pt-0 w-[90%]`}
                    >
                      {tab.description.split('\n').map((line, lineIndex) => (
                        <div key={lineIndex} className={line.startsWith('•') ? 'ml-4' : ''}>
                          {line}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AnimatedFAQs;