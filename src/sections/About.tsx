import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Globe, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const credentials = [
  { icon: Award, label: 'TEFL Certified' },
  { icon: Globe, label: '10+ Years Experience' },
  { icon: Heart, label: 'Passionate Educator' },
  { icon: Star, label: '5-Star Rated' },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image slide in from left
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content slide in from right
      gsap.fromTo(
        contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0">
              {/* Main image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <img
                  src="/tutor-photo.jpg"
                  alt="English Tutor"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl gradient-bg opacity-80" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full gradient-bg opacity-60 blur-xl" />

              {/* Experience badge */}
              <div className="absolute bottom-8 right-8 glass rounded-2xl p-4">
                <div className="text-3xl font-bold gradient-text">10+</div>
                <div className="text-sm text-white/70">Years Teaching</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <span className="inline-block px-4 py-1 rounded-full glass text-sm text-white/70 mb-4">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Your <span className="gradient-text">Tutor</span>
            </h2>

            <div className="space-y-4 text-white/70 leading-relaxed mb-8">
              <p>
                Hello! I&apos;m Sarah, a dedicated English language educator with over a decade
                of experience helping students from around the world achieve their language
                goals.
              </p>
              <p>
                My teaching philosophy centers on creating a supportive, engaging environment
                where students feel comfortable taking risks and making mistakes—because
                that&apos;s where real learning happens.
              </p>
              <p>
                Whether you&apos;re preparing for an exam, advancing your career, or helping
                your child build confidence, I&apos;m here to guide you every step of the way
                with personalized lessons tailored to your unique needs.
              </p>
            </div>

            {/* Credentials */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {credentials.map((cred, index) => {
                const Icon = cred.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl glass"
                  >
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-white/80">{cred.label}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <Button
              size="lg"
              onClick={scrollToContact}
              className="gradient-bg text-white border-0 hover:opacity-90"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
