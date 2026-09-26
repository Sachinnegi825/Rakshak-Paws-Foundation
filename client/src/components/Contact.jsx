import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../theme'

export default function Contact() {
  const [hoverBtn, setHoverBtn] = useState(false)

  return (
    <section className="py-24 px-8" id="contact" style={{ backgroundColor: theme.colors.surface }}>
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Contact Us</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6" style={{ color: theme.colors.textMain }}>
            Get In Touch
          </h2>
          <p className="mb-10 text-lg" style={{ color: theme.colors.textMuted }}>
            Whether you want to volunteer, adopt, foster, or donate, we'd love to hear from you. The animals are waiting!
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.colors.accentLight, color: theme.colors.accent }}>
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <h4 className="font-bold text-lg" style={{ color: theme.colors.textMain }}>Main Shelter</h4>
                <p style={{ color: theme.colors.textMuted }}>Rakshak Paws Foundation<br/>Portland, Oregon, USA - 97204</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primary }}>
                <span className="material-symbols-outlined">phone</span>
              </div>
              <div>
                <h4 className="font-bold text-lg" style={{ color: theme.colors.textMain }}>Phone Number</h4>
                <p style={{ color: theme.colors.textMuted }}>+1 (503) 555-0199 <br/> Emergency Rescue: +1 (503) 555-9111</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primaryHover }}>
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <h4 className="font-bold text-lg" style={{ color: theme.colors.textMain }}>Email Address</h4>
                <p style={{ color: theme.colors.textMuted }}>hello@rakshakpaws.org <br/> adopt@rakshakpaws.org</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[30px] shadow-xl p-8 border" style={{ backgroundColor: theme.colors.surfaceAlt, borderColor: theme.colors.border }}>
          <h3 className="text-2xl font-bold mb-6" style={{ color: theme.colors.textMain }}>Send us a message</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: theme.colors.textMuted }}>First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all" 
                  style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.textMain, '--tw-ring-color': theme.colors.accent }}
                  placeholder="John" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1" style={{ color: theme.colors.textMuted }}>Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all" 
                  style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.textMain, '--tw-ring-color': theme.colors.accent }}
                  placeholder="Doe" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: theme.colors.textMuted }}>Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all" 
                style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.textMain, '--tw-ring-color': theme.colors.accent }}
                placeholder="john@example.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1" style={{ color: theme.colors.textMuted }}>Message</label>
              <textarea 
                rows="4" 
                className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none" 
                style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border, color: theme.colors.textMain, '--tw-ring-color': theme.colors.accent }}
                placeholder="How can we help you or an animal in need?"
              ></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-bold text-lg transition-colors mt-2"
              style={{ 
                backgroundColor: hoverBtn ? theme.colors.accentHover : theme.colors.accent, 
                color: theme.colors.surface 
              }}
              onMouseEnter={() => setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  )
}
