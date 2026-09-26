import React, { useState } from 'react'
import { theme } from '../theme'

export default function Gallery() {
  const [hoverBtn, setHoverBtn] = useState(false)

  return (
    <section className="py-24 px-8" id="gallery" style={{ backgroundColor: theme.colors.surface }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Gallery</span>
          <h2 className="text-3xl md:text-5xl font-extrabold" style={{ color: theme.colors.textMain }}>
            Moments of Hope
          </h2>
          <p className="mt-4 max-w-2xl mx-auto" style={{ color: theme.colors.textMuted }}>
            A glimpse into the lives we've saved and the happy forever homes we've found for them.
          </p>
        </div>

        {/* Unique Asymmetrical Layout */}
        <div className="flex flex-col md:flex-row gap-6 md:h-[600px]">
          
          {/* Left Column (Tall) */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="rounded-[40px] overflow-hidden group relative flex-1">
              <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1000&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ backgroundColor: theme.colors.accent + 'cc' }}>
                <span className="font-bold text-2xl rotate-[-5deg]" style={{ color: theme.colors.surface }}>Luna's Got a Home!</span>
              </div>
            </div>
          </div>

          {/* Middle Column (Two stacked) */}
          <div className="flex-1 flex flex-col gap-6 md:-mt-12 md:mb-12">
            <div className="rounded-[40px] overflow-hidden group relative flex-[3]">
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=600&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div 
              className="rounded-[40px] overflow-hidden group relative flex-[2] flex items-center justify-center p-8 text-center border-4 shadow-xl"
              style={{ backgroundColor: theme.colors.primaryLight, borderColor: theme.colors.surface }}
            >
              <div>
                <span className="material-symbols-outlined text-[40px] mb-2" style={{ color: theme.colors.primary }}>favorite</span>
                <h3 className="font-bold text-xl" style={{ color: theme.colors.textMain }}>Join the Family</h3>
                <a href="#adopt" className="font-bold text-sm hover:underline mt-2 inline-block" style={{ color: theme.colors.accent }}>See adoptable pets →</a>
              </div>
            </div>
          </div>

          {/* Right Column (Two staggered) */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="rounded-[40px] overflow-hidden group relative flex-[2]">
              <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="rounded-[40px] overflow-hidden group relative flex-[3]">
              <img src="https://images.unsplash.com/photo-1525253086316-d0c936c814f8?q=80&w=600&auto=format&fit=crop" alt="Gallery" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
          
        </div>
        
        <div className="text-center mt-12">
          <button 
            className="px-8 py-3 rounded-full border-2 font-bold transition-colors"
            style={{ 
              borderColor: theme.colors.primary, 
              color: hoverBtn ? theme.colors.surface : theme.colors.primary,
              backgroundColor: hoverBtn ? theme.colors.primary : 'transparent'
            }}
            onMouseEnter={() => setHoverBtn(true)}
            onMouseLeave={() => setHoverBtn(false)}
          >
            View Full Gallery
          </button>
        </div>
      </div>
    </section>
  )
}
