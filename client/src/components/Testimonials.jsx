import React, { useState } from 'react'
import { theme } from '../theme'

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [hoverPrev, setHoverPrev] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)

  const testimonials = [
    {
      text: "Adopting Bella from Rakshak Paws Foundation was the best decision of our lives. The volunteers were so helpful in matching us with the perfect furry companion.",
      name: "Sarah Jenkins",
      role: "Adopted Bella",
      img: "https://i.pravatar.cc/150?img=44"
    },
    {
      text: "Volunteering at the shelter every weekend fills my heart with joy. Seeing abused animals learn to trust humans again is truly a magical experience.",
      name: "David Chen",
      role: "Lead Volunteer",
      img: "https://i.pravatar.cc/150?img=11"
    },
    {
      text: "I donate monthly because I know exactly where my money goes—straight to the food bowls and medical bills of animals who desperately need it.",
      name: "Emma Watson",
      role: "Monthly Donor",
      img: "https://i.pravatar.cc/150?img=68"
    },
    {
      text: "The foster program is incredibly supportive. They provided all the supplies and medical care for the kittens while I provided the love and socialization.",
      name: "Michael Torres",
      role: "Foster Parent",
      img: "https://i.pravatar.cc/150?img=33"
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section className="py-24 border-t border-b relative overflow-hidden" id="testimonials" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}>
      {/* Decorative Blob */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-50 blur-3xl pointer-events-none"
        style={{ backgroundColor: theme.colors.accentLight }}
      ></div>

      <div className="max-w-[1000px] mx-auto px-8 relative z-10 text-center">
        <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Community Love</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mb-16" style={{ color: theme.colors.textMain }}>
          Happy Tails
        </h2>

        <div className="p-10 md:p-16 rounded-[40px] shadow-lg border relative" style={{ backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }}>
          <span className="material-symbols-outlined text-[80px] absolute top-8 left-8 opacity-40" style={{ color: theme.colors.accentLight }}>format_quote</span>
          
          <div className="relative z-10">
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, idx) => (
                <span key={idx} className="material-symbols-outlined text-2xl fill-icon" style={{ color: theme.colors.star }}>star</span>
              ))}
            </div>
            
            <p className="text-2xl md:text-3xl font-serif italic mb-12 leading-relaxed" style={{ color: theme.colors.textMain }}>
              "{testimonials[currentIndex].text}"
            </p>
            
            <div className="flex flex-col items-center gap-4">
              <img 
                src={testimonials[currentIndex].img} 
                alt={testimonials[currentIndex].name} 
                className="w-20 h-20 rounded-full object-cover border-4 shadow-md"
                style={{ borderColor: theme.colors.surface }}
              />
              <div>
                <h4 className="font-bold text-xl" style={{ color: theme.colors.textMain }}>{testimonials[currentIndex].name}</h4>
                <span className="font-medium" style={{ color: theme.colors.textMuted }}>{testimonials[currentIndex].role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            onClick={prevTestimonial}
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all shadow-sm"
            style={{ 
              borderColor: theme.colors.border, 
              backgroundColor: hoverPrev ? theme.colors.textMain : theme.colors.surface,
              color: hoverPrev ? theme.colors.surface : theme.colors.textMain
            }}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 rounded-full transition-all ${currentIndex === idx ? 'w-8' : 'w-3'}`}
                style={{ backgroundColor: currentIndex === idx ? theme.colors.accent : theme.colors.border }}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          <button 
            onClick={nextTestimonial}
            className="w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all shadow-sm"
            style={{ 
              borderColor: theme.colors.border, 
              backgroundColor: hoverNext ? theme.colors.textMain : theme.colors.surface,
              color: hoverNext ? theme.colors.surface : theme.colors.textMain
            }}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  )
}
