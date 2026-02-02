import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    role: 'Parent',
    avatar: '/avatar-1.jpg',
    quote:
      "My son went from a C to an A in just 3 months! The personalized attention and engaging lessons made all the difference. He actually looks forward to his tutoring sessions now.",
    rating: 5,
  },
  {
    id: 2,
    name: 'John D.',
    role: 'High School Student',
    avatar: '/avatar-2.jpg',
    quote:
      "The best tutor I've ever had! I was struggling with IELTS prep, but with these lessons, I achieved a band score of 8. The strategies and practice tests were incredibly helpful.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Elena R.',
    role: 'Business Professional',
    avatar: '/avatar-3.jpg',
    quote:
      "Finally, I can speak confidently at work! The business English lessons helped me ace my presentations and communicate effectively with international clients.",
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
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
      id="testimonials"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full glass text-sm text-white/70 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            What Students <span className="gradient-text">Say</span>
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Real stories from real students who have transformed their English skills
            through our tutoring sessions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card group relative rounded-2xl overflow-hidden card-lift"
            >
              {/* Glassmorphism background */}
              <div className="absolute inset-0 glass" />

              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300" />

              {/* Content */}
              <div className="relative p-8">
                {/* Quote icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary/50" />
                </div>

                {/* Quote text */}
                <p className="text-white/80 leading-relaxed mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/50">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 items-center">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">500+</div>
            <div className="text-sm text-white/60">Happy Students</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">4.9/5</div>
            <div className="text-sm text-white/60">Average Rating</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text">15+</div>
            <div className="text-sm text-white/60">Countries</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
