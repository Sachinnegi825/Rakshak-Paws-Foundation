import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../theme'

export default function AboutUs() {
  const [hoverBox, setHoverBox] = useState(null)

  const timeline = [
    { year: "2012", title: "The First Rescue", desc: "It started on a rainy night with a single stray dog named Barnaby. Our founders converted their garage into a makeshift medical bay, sparking a lifelong mission." },
    { year: "2015", title: "First Sanctuary Opens", desc: "After relying entirely on foster networks, we finally opened our first 5-acre no-kill sanctuary in Portland, allowing us to house up to 200 animals at once." },
    { year: "2019", title: "The Medical Wing", desc: "Thanks to a massive community fundraiser, we built an on-site, state-of-the-art veterinary clinic to perform emergency surgeries without delay." },
    { year: "2024", title: "10,000 Lives Saved", desc: "We officially crossed the milestone of 10,000 successful adoptions. Every single one represents a family made whole and a life given a second chance." }
  ]

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const slideIn = (direction) => ({
    hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, type: 'spring' } }
  })

  return (
    <div className="pt-32 pb-24 min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      
      {/* Immersive Hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] mb-24 overflow-hidden rounded-b-[80px] mx-4 shadow-2xl"
      >
        <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=2000&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Dogs running" />
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to top, ${theme.colors.textMain}f2, transparent)` }}></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 text-center px-4">
          <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-bold tracking-widest uppercase text-sm mb-4 block" style={{ color: theme.colors.accent }}>Our Story</motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6">
            A Voice For The Voiceless
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-xl max-w-2xl text-gray-300 font-medium leading-relaxed">
            From a tiny garage operation to a nationwide network. This is how we built a sanctuary where time is not a factor.
          </motion.p>
        </div>
      </motion.div>

      {/* Modern Vertical Timeline */}
      <div className="max-w-[1200px] mx-auto px-8 mb-40 relative">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: theme.colors.textMain }}>Our Journey</h2>
        </motion.div>
        
        <div className="relative">
          {/* Central Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 rounded-full" style={{ backgroundColor: theme.colors.primaryLight }}></div>
          
          {timeline.map((item, i) => (
            <div key={i} className={`flex flex-col md:flex-row items-center justify-between mb-16 relative w-full ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
              
              {/* Timeline Dot */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center font-bold shadow-lg z-10" 
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.surface }}
              >
                <span className="material-symbols-outlined text-[20px]">pets</span>
              </motion.div>

              {/* Content Box */}
              <motion.div 
                variants={slideIn(i % 2 === 0 ? 'right' : 'left')}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className={`w-full md:w-[45%] flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className="p-10 rounded-[40px] shadow-lg border"
                  style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                >
                  <span className="text-4xl md:text-5xl font-extrabold opacity-20 block mb-2" style={{ color: theme.colors.primary }}>{item.year}</span>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: theme.colors.textMain }}>{item.title}</h3>
                  <p className="text-lg leading-relaxed" style={{ color: theme.colors.textMuted }}>{item.desc}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* New Section: The Impact We Make */}
      <div className="max-w-[1400px] mx-auto px-8 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div variants={slideIn('left')} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
            <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Real Results</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight" style={{ color: theme.colors.textMain }}>
              More than just a shelter. A complete ecosystem of care.
            </h2>
            <p className="text-xl leading-relaxed mb-6" style={{ color: theme.colors.textMuted }}>
              Every animal that arrives at our facility receives a comprehensive medical evaluation, behavioral assessment, and a customized care plan. We don't just house animals; we rehabilitate them.
            </p>
            <p className="text-xl leading-relaxed mb-10" style={{ color: theme.colors.textMuted }}>
              Our adoption matching program has a 98% success rate, meaning almost every animal we place stays with their forever family permanently.
            </p>
            <div className="flex gap-6 md:gap-12">
              <div>
                <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: theme.colors.primary }}>98%</div>
                <div className="font-bold uppercase tracking-widest text-xs md:text-sm" style={{ color: theme.colors.textMuted }}>Adoption Rate</div>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-extrabold mb-2" style={{ color: theme.colors.accent }}>24/7</div>
                <div className="font-bold uppercase tracking-widest text-xs md:text-sm" style={{ color: theme.colors.textMuted }}>Medical Care</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={slideIn('right')} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-2 gap-4 md:gap-6 h-[400px] md:h-[600px]">
            <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover rounded-[40px] shadow-lg mt-12" alt="Care" />
            <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover rounded-[40px] shadow-lg -mt-12" alt="Care" />
          </motion.div>
        </div>
      </div>

      {/* Bento Box Layout for Core Work */}
      <div className="max-w-[1400px] mx-auto px-8 mb-32">
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: theme.colors.textMain }}>Our Core Work</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-auto md:auto-rows-[250px]">
          
          {/* Large Featured Block */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 md:row-span-2 rounded-[40px] p-12 relative overflow-hidden group shadow-lg" style={{ backgroundColor: theme.colors.primary }}
          >
            <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 transform translate-x-1/4 group-hover:scale-110 transition-transform duration-700">
              <span className="material-symbols-outlined text-[400px] text-white">medical_services</span>
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end max-w-md pt-32 md:pt-0">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-lg" style={{ backgroundColor: theme.colors.surface }}>
                <span className="material-symbols-outlined text-xl md:text-2xl" style={{ color: theme.colors.primary }}>healing</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Emergency Medical Care</h3>
              <p className="text-white/80 text-lg leading-relaxed">Our in-house veterinary clinic runs 24/7, providing life-saving surgeries, vaccinations, and long-term physical rehabilitation.</p>
            </div>
          </motion.div>

          {/* Small Block 1 */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="rounded-[40px] p-10 flex flex-col justify-between border shadow-sm transition-colors cursor-pointer"
            style={{ backgroundColor: hoverBox === 1 ? theme.colors.accentHover : theme.colors.surfaceAlt, borderColor: theme.colors.border, color: hoverBox === 1 ? theme.colors.surface : theme.colors.textMain }}
            onMouseEnter={() => setHoverBox(1)}
            onMouseLeave={() => setHoverBox(null)}
          >
            <span className="material-symbols-outlined text-[40px]" style={{ color: hoverBox === 1 ? theme.colors.surface : theme.colors.accent }}>home</span>
            <div>
              <h3 className="text-2xl font-bold mb-2">Sanctuary</h3>
              <p className="opacity-80 text-sm leading-relaxed">Three massive no-kill sanctuaries featuring open spaces.</p>
            </div>
          </motion.div>

          {/* Small Block 2 */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            className="rounded-[40px] p-10 flex flex-col justify-between border shadow-sm transition-colors cursor-pointer"
            style={{ backgroundColor: hoverBox === 2 ? theme.colors.textMain : theme.colors.surface, borderColor: theme.colors.border, color: hoverBox === 2 ? theme.colors.surface : theme.colors.textMain }}
            onMouseEnter={() => setHoverBox(2)}
            onMouseLeave={() => setHoverBox(null)}
          >
            <span className="material-symbols-outlined text-[40px]" style={{ color: hoverBox === 2 ? theme.colors.surface : theme.colors.primary }}>school</span>
            <div>
              <h3 className="text-2xl font-bold mb-2">Education</h3>
              <p className="opacity-80 text-sm leading-relaxed">Working with local schools to spread awareness.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
