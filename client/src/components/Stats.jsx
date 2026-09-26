import React from 'react'
import { theme } from '../theme'

export default function Stats() {
  const stats = [
    { icon: 'pets', number: '10k+', label: 'Animals Rescued', color: theme.colors.accent, bg: theme.colors.accentLight },
    { icon: 'home', number: '38+', label: 'Partner Shelters', color: theme.colors.primaryHover, bg: theme.colors.primaryLight },
    { icon: 'favorite', number: '1,200+', label: 'Adoptions This Year', color: '#E57373', bg: '#ffebee' }, // Custom heart color
    { icon: 'verified', number: '38+', label: 'Years of Service', color: theme.colors.primary, bg: theme.colors.primaryLight },
  ]

  return (
    <div className="relative z-20 max-w-[1200px] mx-auto -mt-16 px-4">
      <div 
        className="backdrop-blur-md rounded-[30px] md:rounded-full shadow-xl border p-8 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-nowrap items-center justify-between gap-8 md:gap-6 md:divide-x"
        style={{ 
          backgroundColor: theme.colors.surface + 'f2', 
          borderColor: theme.colors.border,
          divideColor: theme.colors.border 
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} className={`flex items-center gap-4 flex-1 ${i !== 0 ? 'md:pl-8' : 'md:pl-4'}`}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center relative" style={{ backgroundColor: stat.bg, color: stat.color }}>
              <div 
                className={`absolute inset-0 border-2 border-dashed rounded-full ${i % 2 === 0 ? 'animate-[spin_10s_linear_infinite]' : 'animate-[spin_10s_linear_infinite_reverse]'}`}
                style={{ borderColor: stat.color }}
              ></div>
              <span className="material-symbols-outlined text-[28px] fill-icon">{stat.icon}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl" style={{ color: theme.colors.textMain }}>{stat.number}</span>
              <span className="text-sm font-medium" style={{ color: theme.colors.textMuted }}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
