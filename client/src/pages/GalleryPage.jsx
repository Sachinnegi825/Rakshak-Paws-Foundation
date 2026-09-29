import { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '../theme'
import { useGallery } from '../hooks/queries/useGalleryQueries'

export default function GalleryPage() {
  const [hoverImg, setHoverImg] = useState(null)
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGallery({ page, limit: 20 })

  const galleryItems = data?.data || []
  const pagination = data?.pagination || {}

  // Dynamic grouping by category
  const arrivals = galleryItems.filter(item => item.category === 'Arrival & Intake')
  const rehab = galleryItems.filter(item => item.category === 'Rehabilitation & Foster')
  const adoptions = galleryItems.filter(item => item.category === 'Forever Homes')

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const renderGrid = (items, sectionPrefix) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] mb-32">
      {items.map((item, i) => (
        <motion.div 
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          key={`${sectionPrefix}-${i}`} 
          className={`rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 group relative bg-white md:col-span-1 md:row-span-1`}
          onMouseEnter={() => setHoverImg(`${sectionPrefix}-${i}`)}
          onMouseLeave={() => setHoverImg(null)}
        >
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          
          <div 
            className="absolute inset-0 flex flex-col justify-end p-8 transition-opacity duration-500"
            style={{ 
              background: hoverImg === `${sectionPrefix}-${i}` ? `linear-gradient(to top, ${theme.colors.primary}f2, transparent)` : `linear-gradient(to top, ${theme.colors.textMain}cc, transparent)`,
            }}
          >
            <span 
              className={`font-bold uppercase tracking-widest text-xs mb-2 transition-all duration-300 ${hoverImg === `${sectionPrefix}-${i}` ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} 
              style={{ color: theme.colors.accent }}
            >
              {item.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0 mb-2">
              {item.title}
            </h3>
            <p 
              className={`text-white/80 text-sm leading-relaxed transition-all duration-300 delay-100 ${hoverImg === `${sectionPrefix}-${i}` ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 h-0 overflow-hidden'}`}
            >
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="pt-40 pb-24 px-8 min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[1400px] mx-auto">
        
        {/* Massive Page Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6 border-b pb-12" style={{ borderColor: theme.colors.border }}>
          <div>
            <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Through The Lens</span>
            <h1 className="text-4xl md:text-[80px] font-extrabold leading-none mb-6" style={{ color: theme.colors.textMain }}>
              Editorial Gallery
            </h1>
          </div>
          <p className="text-xl max-w-md font-medium leading-relaxed" style={{ color: theme.colors.textMuted }}>
            A curated, chronological look into the lives we've saved. From the scared moments of intake, to rehabilitation, and finally to the beautiful moments of adoption.
          </p>
        </motion.div>

        {/* Gallery Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px] mb-32">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="rounded-3xl bg-slate-200 animate-pulse md:col-span-1 md:row-span-1" />
            ))}
          </div>
        ) : (
          <>
            {/* Section 1 */}
            {arrivals.length > 0 && (
              <>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: theme.colors.primary }}>1</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: theme.colors.textMain }}>Arrival & Intake</h2>
                  </div>
                  <p className="text-lg max-w-2xl mb-12" style={{ color: theme.colors.textMuted }}>The most critical hours. This is when animals arrive scared, hungry, or injured, and our medical team immediately steps in.</p>
                </motion.div>
                {renderGrid(arrivals, 'arr')}
              </>
            )}

            {/* Section 2 */}
            {rehab.length > 0 && (
              <>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 mt-12 border-t pt-24" style={{ borderColor: theme.colors.border }}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: theme.colors.accent }}>2</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: theme.colors.textMain }}>Rehabilitation & Foster</h2>
                  </div>
                  <p className="text-lg max-w-2xl mb-12" style={{ color: theme.colors.textMuted }}>Healing takes time. Whether in our sanctuary or with dedicated foster parents, this is where animals learn to trust humans again.</p>
                </motion.div>
                {renderGrid(rehab, 'reh')}
              </>
            )}

            {/* Section 3 */}
            {adoptions.length > 0 && (
              <>
                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10 mt-12 border-t pt-24" style={{ borderColor: theme.colors.border }}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: theme.colors.primary }}>3</span>
                    <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: theme.colors.textMain }}>Forever Homes</h2>
                  </div>
                  <p className="text-lg max-w-2xl mb-12" style={{ color: theme.colors.textMuted }}>The goal of everything we do. Pure joy as our rescues leave the shelter in the arms of their new loving families.</p>
                </motion.div>
                {renderGrid(adoptions, 'ado')}
              </>
            )}
          </>
        )}

        {/* Pagination Controls */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-12 mb-20 flex flex-col items-center justify-center gap-6">
            <span className="font-bold text-lg" style={{ color: theme.colors.textMuted }}>
              Page {pagination.page} of {pagination.pages}
            </span>
            <div className="flex gap-4">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme.colors.surfaceAlt, color: theme.colors.textMain }}
              >
                Previous Photos
              </button>
              <button 
                disabled={page === pagination.pages} 
                onClick={() => setPage(page + 1)}
                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.surface }}
              >
                More Photos
              </button>
            </div>
          </div>
        )}

        {/* Huge CTA Banner */}
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-32 rounded-[40px] p-16 text-center text-white shadow-2xl relative overflow-hidden"
          style={{ backgroundColor: theme.colors.textMain }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.colors.primary }}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: theme.colors.accent }}></div>
          
          <span className="material-symbols-outlined text-[60px] mb-6" style={{ color: theme.colors.accent }}>photo_camera</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 relative z-10">Want to see daily updates?</h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 relative z-10">
            We post new rescues, success stories, and live video updates from the shelter every single day on our Instagram.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-5 rounded-2xl font-bold text-xl shadow-lg relative z-10"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.surface }}
          >
            Follow @RakshakPaws
          </motion.button>
        </motion.div>
        
      </div>
    </div>
  )
}
