import { TextLoop } from '@/components/core/text-loop';

export function TextLoopCustomVariantsTransition() {
  return (
    <div className='inline-flex whitespace-nowrap text-lg text-gray-600 sm:text-xl md:text-2xl lg:text-3xl select-none'>
      The platform that connects
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
    </div>
  );
}
