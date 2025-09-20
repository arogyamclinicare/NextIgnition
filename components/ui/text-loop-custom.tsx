import { TextLoop } from '@/components/core/text-loop';
import { motion } from 'framer-motion';

export function TextLoopCustomVariantsTransition() {
  return (
    <div className='text-center space-y-4'>
      {/* Main tagline with typing effect */}
      <motion.div
        className='inline-flex whitespace-nowrap text-lg text-gray-600 sm:text-xl md:text-2xl lg:text-3xl select-none'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The platform that connects
        </motion.span>
        <TextLoop
          className='overflow-y-clip text-purple-600 font-semibold w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px]'
          transition={{
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          variants={{
            initial: {
              y: 20,
              rotateX: 90,
              opacity: 0,
              filter: 'blur(4px)',
            },
            animate: {
              y: 0,
              rotateX: 0,
              opacity: 1,
              filter: 'blur(0px)',
            },
            exit: {
              y: -20,
              rotateX: -90,
              opacity: 0,
              filter: 'blur(4px)',
            },
          }}
        >
          <span>Investors</span>
          <span>Mentors</span>
          <span>Founders</span>
          <span>Developers</span>
          <span>Designers</span>
        </TextLoop>
      </motion.div>
    </div>
  );
}
