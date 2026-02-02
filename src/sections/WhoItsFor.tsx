import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, BookOpen, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ageGroups = [
  {
    id: 'kids',
    title: 'Kids',
    ageRange: 'Ages 7-12',
    description:
      'Fun, interactive lessons that build a strong foundation in English. Games, songs, and stories make learning enjoyable and effective.',
    icon: Users,
    gradient: 'from-emerald-400 to-teal-500',
    features: ['Phonics & Reading', 'Basic Vocabulary', 'Speaking Practice'],
  },
  {
    id: 'teens',
    title: 'Teens',
    ageRange: 'Ages 13-17',
    description:
      'Exam preparation and advanced skills for academic success. Build confidence for school presentations and standardized tests.',
    icon: BookOpen,
    gradient: 'from-blue-400 to-indigo-500',
    features: ['Exam Prep (IELTS/TOEFL)', 'Essay Writing', 'Academic English'],
  },
  {
    id: 'adults',
    title: 'Adults',
    ageRange: 'Ages 18+',
    description:
      'Business English and conversational fluency for professionals. Advance your career with polished communication skills.',
    icon: Briefcase,
    gradient: 'from-violet-400 to-purple-500',
    features: ['Business English', 'Presentation Skills', 'Interview Prep'],
  },
];

const WhoItsFor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

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

      // Cards stagger animation
      const cards = cardsRef.current?.querySelectorAll('.age-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-its-for"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-white/70 mb-4">
            Our Programs
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Who It&apos;s <span className="gradient-text">For</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Tailored English lessons designed for every age group and learning goal.
            Find the perfect program for you or your child.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {ageGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.id}
                className="age-card group relative rounded-2xl overflow-hidden card-lift"
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02]" />
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${group.gradient}`}
                />

                {/* Border glow */}
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300" />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Title & Age */}
                  <h3 className="text-2xl font-bold text-white mb-1">{group.title}</h3>
                  <span className="text-sm text-white/50 mb-4 block">{group.ageRange}</span>

                  {/* Description */}
                  <p className="text-white/70 mb-6 leading-relaxed">{group.description}</p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {group.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${group.gradient}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/60 mb-4">Not sure which program is right for you?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors"
          >
            Schedule a free consultation
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
