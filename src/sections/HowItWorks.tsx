import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, GraduationCap, Trophy } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Assessment',
    description:
      'We begin with a comprehensive evaluation of your current English level, learning goals, and preferred learning style.',
    icon: ClipboardCheck,
  },
  {
    number: '02',
    title: 'Learning',
    description:
      'Custom lessons tailored specifically to your needs. Interactive sessions with real-time feedback and progress tracking.',
    icon: GraduationCap,
  },
  {
    number: '03',
    title: 'Mastery',
    description:
      'Practice through real-world scenarios and achieve fluency. Regular assessments ensure you reach your goals.',
    icon: Trophy,
  },
];

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Steps animation
      const stepElements = stepsRef.current?.querySelectorAll('.step-item');
      if (stepElements) {
        stepElements.forEach((step, index) => {
          gsap.fromTo(
            step,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }

      // Connector lines animation
      const lines = linesRef.current?.querySelectorAll('.connector-line');
      if (lines) {
        lines.forEach((line, index) => {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              delay: 0.3 + index * 0.3,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: stepsRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-20">
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-white/70 mb-4">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A simple, proven three-step process to take you from where you are to where
            you want to be in your English journey.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="relative">
          {/* Connector lines - desktop only */}
          <div
            ref={linesRef}
            className="hidden md:block absolute top-24 left-0 right-0 px-24"
          >
            <div className="flex justify-between">
              <div className="connector-line w-1/3 h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 origin-left" />
              <div className="connector-line w-1/3 h-0.5 bg-gradient-to-r from-primary/20 to-primary/50 origin-left" />
            </div>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="step-item relative">
                  {/* Step card */}
                  <div className="text-center">
                    {/* Number circle */}
                    <div className="relative inline-flex items-center justify-center mb-8">
                      <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center relative z-10">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {/* Glow effect */}
                      <div className="absolute inset-0 w-20 h-20 rounded-full gradient-bg blur-xl opacity-50" />
                      {/* Step number */}
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border border-white/20 flex items-center justify-center text-sm font-bold text-white/60">
                        {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed max-w-sm mx-auto">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '45', unit: 'min', label: 'Per Session' },
            { value: '1-on-1', unit: '', label: 'Personal Attention' },
            { value: '24/7', unit: '', label: 'Support Available' },
            { value: '100%', unit: '', label: 'Satisfaction' },
          ].map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-xl glass">
              <div className="text-2xl md:text-3xl font-bold gradient-text">
                {feature.value}
                <span className="text-lg">{feature.unit}</span>
              </div>
              <div className="text-sm text-white/60 mt-1">{feature.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
