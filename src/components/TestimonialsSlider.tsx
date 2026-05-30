import { useState } from 'react';
import { Star, MessageSquare, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section id="reviews" className="py-16 px-4 bg-zinc-950 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center md:max-w-2xl md:mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-500 text-xs font-mono mb-3 uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Real Local motorist Feedback</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Highly Reviewed by Manila Car Owners
          </h2>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
            See what car owners, daily drivers, and fleet operators in Metro Manila say about our honest mechanics, upfront transparent quoting, and reliable diagnostics scans.
          </p>
        </div>

        {/* Localized Testimonials Layout */}
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-850 rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 p-8 text-zinc-800 pointer-events-none opacity-20">
            <Quote className="w-24 h-24 stroke-[1.5]" />
          </div>

          <div className="min-h-[220px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Visual Stars */}
                <div className="flex gap-1 text-yellow-500 mb-5">
                  {Array.from({ length: activeReview.rating }).map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-current" />
                  ))}
                </div>

                {/* Main Content Quote text */}
                <p className="text-base sm:text-lg lg:text-xl text-zinc-100 italic leading-relaxed mb-6 font-sans">
                  "{activeReview.content}"
                </p>

                {/* Author Credentials */}
                <div className="flex items-center gap-3.5 font-sans">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-500 text-lg uppercase shadow-inner">
                    {activeReview.avatarSeed.slice(0, 2)}
                  </div>
                  <div>
                    <strong className="text-white text-base block font-bold">
                      {activeReview.author}
                    </strong>
                    <span className="text-zinc-500 text-xs font-mono uppercase tracking-wide block mt-1">
                      {activeReview.role} • Verified Buyer ({activeReview.date})
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-zinc-800/80">
              <span className="text-xs font-mono text-zinc-500">
                Review {currentIndex + 1} of {TESTIMONIALS.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="p-3.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-colors text-zinc-300 hover:text-white cursor-pointer"
                  title="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="p-3.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-colors text-zinc-300 hover:text-white cursor-pointer"
                  title="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Localized stats trust counter layout */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 bg-zinc-900/40 border border-zinc-800/60 rounded-2xl p-6 text-center">
          <div>
            <span className="text-3xl font-extrabold text-white block">15+</span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1 block">Years Serving Manila</span>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-yellow-500 block">TESDA</span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1 block">Certified Mechanics</span>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white block">4.9★</span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1 block">Google Rating</span>
          </div>
          <div>
            <span className="text-3xl font-extrabold text-yellow-500 block">12k+</span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest mt-1 block">Cars Repaired</span>
          </div>
        </div>

      </div>
    </section>
  );
}
