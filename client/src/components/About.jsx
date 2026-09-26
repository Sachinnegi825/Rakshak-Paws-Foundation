import React, { useState } from 'react'
import { theme } from '../theme'

export default function About() {
  const [hoverLink, setHoverLink] = useState(false)

  const bullets = [
    "Emergency Medical Care & Surgeries",
    "Safe Shelters & Rehabilitation",
    "Foster & Adoption Programs"
  ]

  return (
    <section className="py-24 px-8 mt-10" id="about" style={{ backgroundColor: theme.colors.surface }}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-[40px] transform -rotate-3 scale-105 opacity-20"
            style={{ backgroundColor: theme.colors.primary }}
          ></div>
          <img 
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000&auto=format&fit=crop" 
            alt="Veterinarian with dog" 
            className="rounded-[40px] object-cover w-full h-[500px] shadow-xl relative z-10"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold tracking-wider uppercase text-sm mb-3" style={{ color: theme.colors.accent }}>About Us</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight" style={{ color: theme.colors.textMain }}>
            Giving Second Chances to Innocent Lives
          </h2>
          <p className="text-lg mb-6 leading-relaxed" style={{ color: theme.colors.textMuted }}>
            Since our founding, Rakshak Paws Foundation has worked tirelessly on the ground to rescue animals from high-kill shelters, hoarding situations, and the streets. Our mission is rooted in the belief that every animal deserves love, medical care, and a warm place to call home.
          </p>
          <ul className="space-y-4 mb-8">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex items-center gap-3 font-semibold text-lg" style={{ color: theme.colors.textMain }}>
                <span className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primaryHover }}>✓</span>
                {bullet}
              </li>
            ))}
          </ul>
          <a 
            href="#history" 
            className="self-start font-bold border-b-2 pb-1 transition-colors"
            style={{ 
              color: hoverLink ? theme.colors.accentHover : theme.colors.accent,
              borderColor: hoverLink ? theme.colors.accentHover : theme.colors.accent 
            }}
            onMouseEnter={() => setHoverLink(true)}
            onMouseLeave={() => setHoverLink(false)}
          >
            Read Our Rescue Stories
          </a>
        </div>
      </div>
    </section>
  )
}
