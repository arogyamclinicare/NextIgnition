"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, Mail, Linkedin, Instagram, Twitter } from "lucide-react";
import { TimelineContent } from "./timeline-animation";

interface WaitlistSuccessProps {
  onClose: () => void;
}

export function WaitlistSuccess({ onClose }: WaitlistSuccessProps) {
  const successRef = useRef<HTMLDivElement>(null);

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
      y: 20,
      opacity: 0,
    },
  };

  const handleWhatsAppClick = () => {
    window.open("https://chat.whatsapp.com/FqTkzzorqpNHavQLCKlj0c?mode=ems_wa_t", "_blank");
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "nextignition01@gmail.com",
      href: "mailto:nextignition01@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "NextIgnition Official",
      href: "https://www.linkedin.com/company/nextignition-official/"
    },
    {
      icon: Instagram,
      label: "Instagram",
      value: "@next__ignition",
      href: "https://www.instagram.com/next__ignition?igsh=ZnZ4N2ZmdHJvMHpo&utm_source=qr"
    },
    {
      icon: Twitter,
      label: "Twitter/X",
      value: "@next_ignition",
      href: "https://x.com/next_ignition?s=21"
    }
  ];

  return (
    <div ref={successRef} className="p-6 text-center">
      {/* Success Icon */}
      <TimelineContent
        as="div"
        animationNum={0}
        timelineRef={successRef}
        customVariants={revealVariants}
        className="mb-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>
      </TimelineContent>

      {/* Success Message */}
      <TimelineContent
        as="div"
        animationNum={1}
        timelineRef={successRef}
        customVariants={revealVariants}
        className="mb-8"
      >
        <h2 className="text-3xl font-bold text-black mb-4">
          Welcome to NextIgnition! 🎉
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Thank you for joining our waitlist! You're now part of the NextIgnition community.
        </p>
      </TimelineContent>

      {/* WhatsApp Community */}
      <TimelineContent
        as="div"
        animationNum={2}
        timelineRef={successRef}
        customVariants={revealVariants}
        className="mb-8"
      >
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-xl font-semibold text-black">Join Our Founders Community</h3>
          </div>
          <p className="text-gray-700 mb-4">
            Connect with fellow entrepreneurs, get early access to features, and be part of our growing startup ecosystem.
          </p>
          <motion.button
            onClick={handleWhatsAppClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <MessageCircle className="w-5 h-5" />
            Join WhatsApp Community
          </motion.button>
        </div>
      </TimelineContent>

      {/* Contact Information */}
      <TimelineContent
        as="div"
        animationNum={3}
        timelineRef={successRef}
        customVariants={revealVariants}
        className="mb-6"
      >
        <h3 className="text-xl font-semibold text-black mb-4">Stay Connected</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactInfo.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300"
            >
              <contact.icon className="w-5 h-5 text-gray-600 mr-3" />
              <div className="text-left">
                <p className="text-sm font-medium text-gray-600">{contact.label}</p>
                <p className="text-sm text-black">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </TimelineContent>

      {/* Close Button */}
      <TimelineContent
        as="div"
        animationNum={4}
        timelineRef={successRef}
        customVariants={revealVariants}
      >
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-medium transition-all duration-300"
        >
          Close
        </motion.button>
      </TimelineContent>
    </div>
  );
}
