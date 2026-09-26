import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../theme'

export default function Hero() {
  const [hoverBtn1, setHoverBtn1] = useState(false)
  const [hoverBtn2, setHoverBtn2] = useState(false)

  return (
    <section className="relative pt-32 pb-32 px-8 overflow-hidden min-h-[85vh] flex items-center" id="home">
      {/* Background Image / Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2000&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        maskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, white 40%, transparent 100%)'
      }}></div>

      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start text-left max-w-2xl">
          {/* Top Tags */}
          <div className="flex items-center gap-4 mb-6 text-[13px] font-label font-bold uppercase tracking-wider" style={{ color: theme.colors.textMain }}>
            <span className="flex items-center gap-1.5">
              <span style={{ color: theme.colors.accent }}>❤️</span> RESCUE • REHABILITATE • REHOME
            </span>
            <span className="w-[1px] h-4" style={{ backgroundColor: theme.colors.border }}></span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]" style={{ color: theme.colors.accent }}>location_on</span>
              Portland, Oregon <span style={{ color: theme.colors.textMuted }}>🌲</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.1] mb-6" style={{ color: theme.colors.textMain }}>
            Every Life.<br />
            Worth <span className="relative inline-block">
              Saving.
              <svg className="absolute w-full h-3 -bottom-1 left-0" style={{ color: theme.colors.primary }} viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          {/* Description */}
          <p className="font-body text-lg leading-relaxed mb-10 max-w-xl font-medium" style={{ color: theme.colors.textMuted }}>
            Rakshak Paws Foundation is a registered non-profit organization dedicated to saving abandoned, abused, and neglected animals. We provide emergency medical care, safe shelter, and find loving forever homes for every furry friend.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full font-headline text-base font-bold shadow-lg transition-colors" 
              href="#donate"
              style={{ 
                backgroundColor: hoverBtn1 ? theme.colors.accentHover : theme.colors.accent, 
                color: theme.colors.surface,
                boxShadow: `0 10px 15px -3px ${theme.colors.accent}40`
              }}
              onMouseEnter={() => setHoverBtn1(true)}
              onMouseLeave={() => setHoverBtn1(false)}
            >
              <span>Donate Now</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex justify-center items-center gap-3 px-8 py-4 rounded-full font-headline text-base font-bold shadow-md transition-colors border" 
              href="#adopt"
              style={{ 
                backgroundColor: hoverBtn2 ? theme.colors.surfaceAlt : theme.colors.surface,
                color: theme.colors.textMain,
                borderColor: theme.colors.border
              }}
              onMouseEnter={() => setHoverBtn2(true)}
              onMouseLeave={() => setHoverBtn2(false)}
            >
              <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primaryHover }}>
                <span className="material-symbols-outlined text-[18px] fill-icon">pets</span>
              </span>
              <span>Adopt a Pet</span>
            </motion.a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 object-cover" style={{ borderColor: theme.colors.surface }} src="https://i.pravatar.cc/100?img=33" alt="Supporter" />
              <img className="w-10 h-10 rounded-full border-2 object-cover" style={{ borderColor: theme.colors.surface }} src="https://i.pravatar.cc/100?img=41" alt="Supporter" />
              <img className="w-10 h-10 rounded-full border-2 object-cover" style={{ borderColor: theme.colors.surface }} src="https://i.pravatar.cc/100?img=25" alt="Supporter" />
              <img className="w-10 h-10 rounded-full border-2 object-cover" style={{ borderColor: theme.colors.surface }} src="https://i.pravatar.cc/100?img=32" alt="Supporter" />
            </div>
            <div>
              <div className="font-bold text-lg" style={{ color: theme.colors.textMain }}>2.6K+</div>
              <div className="text-xs font-medium" style={{ color: theme.colors.textMuted }}>Animals saved this year thanks to you!</div>
            </div>
          </div>
        </div>

        {/* Right Content (Image & Blobs) */}
        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center mt-8 lg:mt-0">
          {/* Blob background */}
          <div className="absolute w-[80%] h-[90%] rounded-full mix-blend-multiply filter blur-sm right-0 top-10 transform rotate-12 pointer-events-none" style={{ backgroundColor: theme.colors.accent }}></div>

          {/* Main Image */}
          <div className="relative z-10 w-[85%] h-[85%] rounded-[40px] overflow-hidden shadow-2xl border-4" style={{ borderColor: theme.colors.surface + '80' }}>
            <img
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop"
              alt="Happy dog rescued"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badges */}
          <div className="hidden md:flex absolute top-16 -left-6 px-5 py-3 rounded-xl shadow-xl z-20 items-center gap-3 transform -rotate-3" style={{ backgroundColor: theme.colors.textMain, color: theme.colors.surface }}>
            <span className="material-symbols-outlined fill-icon" style={{ color: theme.colors.accent }}>favorite</span>
            <div className="flex flex-col leading-tight">
              <span className="text-[10px] font-bold tracking-wider" style={{ color: theme.colors.primaryLight }}>HAPPIER</span>
              <span className="font-semibold text-sm">Tails Together</span>
            </div>
          </div>

          <div className="hidden md:block absolute bottom-20 left-4 z-20 transform -rotate-6">
            <span className="font-serif italic text-3xl drop-shadow-md" style={{ color: theme.colors.surface }}>
              Compassion<br />Creates<br />Change
            </span>
          </div>

          <div className="hidden lg:block absolute top-1/3 -right-8 z-20">
            <span className="font-serif italic text-2xl flex flex-col items-end" style={{ color: theme.colors.textMain }}>
              <span>Healthy Pets</span>
              <span>Stronger</span>
              <span className="relative">
                Bonds
                <svg className="absolute w-full h-2 -bottom-1 left-0" style={{ color: theme.colors.primary }} viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </div>

          <div className="hidden md:flex absolute -bottom-4 right-10 z-20 items-center gap-1 text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm" style={{ backgroundColor: theme.colors.surface + 'cc', color: theme.colors.textMuted }}>
            <span className="material-symbols-outlined text-[14px]">location_on</span>
            Portland HQ Shelter
          </div>
        </div>
      </div>
    </section>
  )
}
