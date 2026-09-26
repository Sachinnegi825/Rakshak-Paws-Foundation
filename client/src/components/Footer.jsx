import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { theme } from '../theme'

export default function Footer() {
  const [hoverLinks, setHoverLinks] = useState({})

  const handleHover = (id, isHovering) => {
    setHoverLinks(prev => ({ ...prev, [id]: isHovering }))
  }

  return (
    <footer className="pt-20 pb-10 px-8" style={{ backgroundColor: theme.colors.textMain, color: theme.colors.surface }}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="font-display text-2xl font-bold flex items-center gap-2 mb-6">
            <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: theme.colors.surfaceAlt + '20', color: theme.colors.primaryLight }}>
              <span className="material-symbols-outlined text-[26px]">pets</span>
            </span>
            <span>Rakshak Paws Foundation</span>
          </div>
          <p className="text-sm leading-relaxed mb-6" style={{ color: theme.colors.border }}>
            Dedicated to rescuing abandoned, abused, and neglected animals. We provide medical care, safe shelter, and loving forever homes.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: hoverLinks['social1'] ? theme.colors.accent : theme.colors.surfaceAlt + '20' }} onMouseEnter={() => handleHover('social1', true)} onMouseLeave={() => handleHover('social1', false)}><span className="material-symbols-outlined text-sm">share</span></a>
            <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors" style={{ backgroundColor: hoverLinks['social2'] ? theme.colors.accent : theme.colors.surfaceAlt + '20' }} onMouseEnter={() => handleHover('social2', true)} onMouseLeave={() => handleHover('social2', false)}><span className="material-symbols-outlined text-sm">link</span></a>
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4" style={{ color: theme.colors.border }}>
            <li><Link to="/about" className="transition-colors" style={{ color: hoverLinks['link1'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link1', true)} onMouseLeave={() => handleHover('link1', false)}>About Us</Link></li>
            <li><Link to="/campaigns" className="transition-colors" style={{ color: hoverLinks['link2'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link2', true)} onMouseLeave={() => handleHover('link2', false)}>Our Campaigns</Link></li>
            <li><Link to="/gallery" className="transition-colors" style={{ color: hoverLinks['link3'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link3', true)} onMouseLeave={() => handleHover('link3', false)}>Happy Tails Gallery</Link></li>
            <li><Link to="/" className="transition-colors" style={{ color: hoverLinks['link4'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link4', true)} onMouseLeave={() => handleHover('link4', false)}>Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-bold mb-6">Support Us</h4>
          <ul className="space-y-4" style={{ color: theme.colors.border }}>
            <li><a href="#donate" className="transition-colors" style={{ color: hoverLinks['link5'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link5', true)} onMouseLeave={() => handleHover('link5', false)}>Donate Online</a></li>
            <li><a href="#adopt" className="transition-colors" style={{ color: hoverLinks['link6'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link6', true)} onMouseLeave={() => handleHover('link6', false)}>Adopt a Pet</a></li>
            <li><a href="#foster" className="transition-colors" style={{ color: hoverLinks['link7'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link7', true)} onMouseLeave={() => handleHover('link7', false)}>Become a Foster</a></li>
            <li><a href="#volunteer" className="transition-colors" style={{ color: hoverLinks['link8'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link8', true)} onMouseLeave={() => handleHover('link8', false)}>Volunteer at Shelter</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4" style={{ color: theme.colors.border }}>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined mt-1" style={{ color: theme.colors.accent }}>location_on</span>
              <span>Portland, Oregon, USA - 97204</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ color: theme.colors.accent }}>phone</span>
              <span>+1 (503) 555-0199</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ color: theme.colors.accent }}>mail</span>
              <span>hello@rakshakpaws.org</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm" style={{ borderColor: theme.colors.surfaceAlt + '40', color: theme.colors.border }}>
        <p>© 2026 Rakshak Paws Foundation. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/admin/login" className="transition-colors font-bold" style={{ color: hoverLinks['link11'] ? theme.colors.accent : theme.colors.border }} onMouseEnter={() => handleHover('link11', true)} onMouseLeave={() => handleHover('link11', false)}>Admin Portal</Link>
          <a href="#" className="transition-colors" style={{ color: hoverLinks['link9'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link9', true)} onMouseLeave={() => handleHover('link9', false)}>Privacy Policy</a>
          <a href="#" className="transition-colors" style={{ color: hoverLinks['link10'] ? theme.colors.surface : theme.colors.border }} onMouseEnter={() => handleHover('link10', true)} onMouseLeave={() => handleHover('link10', false)}>Adoption Policies</a>
        </div>
      </div>
    </footer>
  )
}
