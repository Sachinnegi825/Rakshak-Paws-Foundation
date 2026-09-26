import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../theme'

export default function Navbar() {
  const [hoveredBtn, setHoveredBtn] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const location = useLocation();

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'About Us', to: '/about' },
    { name: 'Campaigns', to: '/campaigns' },
    { name: 'Gallery', to: '/gallery' },
  ]

  return (
    <div className={`fixed w-full z-50 flex justify-center transition-all duration-500 ease-out ${isScrolled ? 'top-4 px-4' : 'top-0 px-0'}`}>
      <header 
        className={`backdrop-blur-md transition-all duration-500 ease-out flex justify-between items-center w-full mx-auto overflow-hidden
          ${isScrolled 
            ? 'max-w-[1100px] rounded-full shadow-xl border px-6 py-2' 
            : 'max-w-full shadow-sm border-b px-8 py-4'
          }`} 
        style={{ 
          backgroundColor: theme.colors.surface + (isScrolled ? 'f2' : 'e6'), 
          borderColor: theme.colors.border 
        }}
      >
        <div className={`flex justify-between items-center w-full mx-auto ${isScrolled ? 'max-w-full' : 'max-w-[1400px]'}`}>
          
          {/* Logo */}
          <Link to="/" className="font-display font-bold tracking-tight flex items-center gap-3 group">
            <span 
              className={`flex items-center justify-center overflow-hidden p-1 shadow-sm transition-all duration-500 ${isScrolled ? 'w-10 h-10 rounded-full' : 'w-12 h-12 rounded-full'}`} 
              style={{ backgroundColor: theme.colors.surface, border: `2px solid ${theme.colors.primary}` }}
            >
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full opacity-100" />
            </span>
            <div className={`flex flex-col transition-all duration-500 ${isScrolled ? 'scale-90 origin-left' : 'scale-100'}`}>
              <span className="font-extrabold text-xl leading-none" style={{ color: theme.colors.textMain }}>Rakshak Paws</span>
              <span className="text-[10px] font-medium uppercase tracking-widest mt-1" style={{ color: theme.colors.textMuted }}>Foundation</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 font-label text-[14px]">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link 
                  key={i}
                  to={link.to}
                  className={`font-medium transition-colors pb-1 ${isActive ? 'border-b-2 font-semibold' : ''}`}
                  style={{ 
                    color: hoveredLink === i ? theme.colors.primary : (isActive ? theme.colors.textMain : theme.colors.textMuted),
                    borderColor: isActive ? theme.colors.primary : 'transparent'
                  }}
                  onMouseEnter={() => setHoveredLink(i)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 rounded-full font-headline font-semibold shadow-md transition-colors duration-300 ${isScrolled ? 'px-5 py-2 text-[14px]' : 'px-6 py-2.5 text-[15px]'}`} 
              href="#donate"
              style={{ 
                backgroundColor: hoveredBtn ? theme.colors.accentHover : theme.colors.accent, 
                color: theme.colors.surface 
              }}
              onMouseEnter={() => setHoveredBtn(true)}
              onMouseLeave={() => setHoveredBtn(false)}
            >
              <span>Donate</span>
              <span className={`material-symbols-outlined transition-all ${isScrolled ? 'text-[16px]' : 'text-[18px]'}`}>favorite</span>
            </motion.a>
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden flex items-center justify-center p-2 rounded-full transition-colors"
              style={{ color: theme.colors.textMain, backgroundColor: theme.colors.surfaceAlt }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
          
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <motion.nav 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="lg:hidden w-full px-6 pb-6 pt-4 flex flex-col gap-4 border-t mt-4"
            style={{ borderColor: theme.colors.border }}
          >
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.to || (link.to !== '/' && location.pathname.startsWith(link.to));
              return (
                <Link 
                  key={i}
                  to={link.to}
                  className={`font-semibold text-lg py-2 transition-colors ${isActive ? 'pl-2 border-l-4' : ''}`}
                  style={{ 
                    color: isActive ? theme.colors.primary : theme.colors.textMain,
                    borderColor: isActive ? theme.colors.primary : 'transparent'
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            })}
          </motion.nav>
        )}
      </header>
    </div>
  )
}
