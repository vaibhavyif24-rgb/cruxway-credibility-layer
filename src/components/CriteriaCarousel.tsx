import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

interface CriteriaItem {
  title: string;
  desc: string;
}

interface CriteriaCarouselProps {
  items: CriteriaItem[];
}

const CriteriaCarousel: React.FC<CriteriaCarouselProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 320;
    const gap = 16;
    const idx = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(idx, items.length - 1));
  }, [items.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollTo = (direction: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 320;
    const gap = 16;
    const offset = direction === 'next' ? cardWidth + gap : -(cardWidth + gap);
    el.scrollBy({ left: offset, behavior: 'smooth' });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 320;
    const gap = 16;
    el.scrollTo({ left: i * (cardWidth + gap), behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Carousel track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`
          .criteria-carousel::-webkit-scrollbar { display: none; }
        `}</style>
        {items.map((item, i) => (
          <div
            key={item.title}
            className="criteria-carousel shrink-0 w-[280px] md:w-[320px] lg:w-[340px]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <GlassCard index={i} className="p-6 md:p-7 h-full min-h-[200px]">
              <div className="flex flex-col h-full">
                <span className="font-serif text-[1.4rem] md:text-[1.6rem] text-gold/20 group-hover:text-gold/40 transition-colors duration-500 tabular-nums leading-none mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="font-serif text-[1rem] md:text-[1.1rem] text-foreground leading-[1.25] mb-2.5">
                  {item.title}
                </h4>
                <div className="w-5 h-px bg-gold/20 group-hover:bg-gold/40 group-hover:w-8 transition-all duration-500 mb-2.5" />
                <p className="font-sans text-[12px] md:text-[13px] text-muted-foreground leading-[1.7] group-hover:text-foreground/75 transition-colors duration-300 flex-1">
                  {item.desc}
                </p>
              </div>
            </GlassCard>
          </div>
        ))}
        {/* Spacer for last card snap */}
        <div className="shrink-0 w-1" aria-hidden="true" />
      </div>

      {/* Edge fade gradients */}
      <div className="absolute left-0 top-0 bottom-4 w-6 pointer-events-none bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-4 w-6 pointer-events-none bg-gradient-to-l from-background to-transparent z-10" />

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === activeIndex ? '20px' : '6px',
                height: '6px',
                backgroundColor: i === activeIndex
                  ? 'hsl(43 78% 50%)'
                  : 'hsl(var(--muted-foreground) / 0.2)',
                borderRadius: '3px',
              }}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo('prev')}
            className="w-9 h-9 rounded-full border border-foreground/[0.08] hover:border-gold/30 flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-foreground"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo('next')}
            className="w-9 h-9 rounded-full border border-foreground/[0.08] hover:border-gold/30 flex items-center justify-center transition-all duration-300 text-muted-foreground hover:text-foreground"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriteriaCarousel;
