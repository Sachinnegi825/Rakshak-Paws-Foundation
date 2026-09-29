import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { theme } from '../theme'
import { useCampaigns } from '../hooks/queries/useCampaignQueries'

export default function CampaignsList() {
  const [hoverId, setHoverId] = useState(null)
  const [page, setPage] = useState(1)

  const { data, isLoading } = useCampaigns({ page, limit: 7 })

  const campaigns = data?.data || []
  const pagination = data?.pagination || {}
  const featured = campaigns.find(c => c.isFeatured)
  const rest = campaigns.filter(c => c._id !== featured?._id)

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className="pt-40 pb-24 px-8 min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[1400px] mx-auto">
        
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b pb-8" style={{ borderColor: theme.colors.border }}>
          <div>
            <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Make an Impact</span>
            <h1 className="text-4xl md:text-7xl font-extrabold" style={{ color: theme.colors.textMain }}>
              Active Campaigns
            </h1>
          </div>
          <p className="text-lg max-w-md font-medium" style={{ color: theme.colors.textMuted }}>
            Choose a specific cause below and see exactly where your donation goes. Every dollar directly supports the animals.
          </p>
        </motion.div>

        {/* Featured Massive Campaign (Only on Page 1) */}
        {isLoading && page === 1 ? (
          <div className="flex flex-col md:flex-row rounded-[40px] overflow-hidden shadow-2xl mb-12 bg-white border border-slate-100 animate-pulse h-auto md:h-[400px]">
            <div className="md:w-3/5 h-[400px] md:h-full bg-slate-200" />
            <div className="md:w-2/5 p-12 flex flex-col justify-center">
              <div className="h-10 bg-slate-200 rounded-lg w-3/4 mb-6" />
              <div className="h-5 bg-slate-200 rounded-lg w-full mb-3" />
              <div className="h-5 bg-slate-200 rounded-lg w-full mb-3" />
              <div className="h-5 bg-slate-200 rounded-lg w-2/3 mb-10" />
              <div className="w-full h-3 rounded-full bg-slate-200 mb-4" />
              <div className="flex justify-between mb-10">
                <div className="h-5 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-1/3" />
              </div>
              <div className="h-8 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        ) : page === 1 && featured && (
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Link 
            to={`/campaigns/${featured.slug}`} 
            className="flex flex-col md:flex-row rounded-[40px] overflow-hidden shadow-2xl mb-12 group bg-white border"
            style={{ borderColor: theme.colors.border }}
          >
            <div className="md:w-3/5 h-[400px] md:h-auto relative overflow-hidden">
              <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-6 left-6 px-4 py-2 rounded-full font-bold text-sm shadow-lg" style={{ backgroundColor: theme.colors.accent, color: theme.colors.surface }}>
                Featured Urgent Cause
              </div>
            </div>
            <div className="md:w-2/5 p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: theme.colors.textMain }}>{featured.title}</h2>
              <p className="text-xl mb-10 leading-relaxed font-medium" style={{ color: theme.colors.textMuted }}>{featured.description}</p>
              
              <div className="w-full h-3 rounded-full mb-4" style={{ backgroundColor: theme.colors.surfaceAlt }}>
                <div className="h-full rounded-full relative" style={{ width: `${Math.min((featured.raisedAmount / featured.goalAmount) * 100, 100)}%`, backgroundColor: theme.colors.primary }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow"></div>
                </div>
              </div>
              <div className="flex justify-between font-bold mb-10 text-lg">
                <span style={{ color: theme.colors.textMain }}>${featured.raisedAmount.toLocaleString()} Raised</span>
                <span style={{ color: theme.colors.textMuted }}>Goal: ${featured.goalAmount.toLocaleString()}</span>
              </div>
              
              <motion.div 
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-3 font-bold text-xl group-hover:gap-5 transition-all" 
                style={{ color: theme.colors.primary }}
              >
                View Campaign Details <span className="material-symbols-outlined">arrow_forward</span>
              </motion.div>
            </div>
          </Link>
        </motion.div>
        )}

        {/* Grid Area */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-[30px] overflow-hidden border shadow-sm bg-white animate-pulse h-[500px] flex flex-col">
                <div className="h-60 bg-slate-200 w-full" />
                <div className="p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="h-8 bg-slate-200 rounded-lg w-3/4 mb-4" />
                    <div className="h-4 bg-slate-200 rounded-lg w-full mb-2" />
                    <div className="h-4 bg-slate-200 rounded-lg w-5/6 mb-8" />
                  </div>
                  <div>
                    <div className="h-2 bg-slate-200 rounded-full w-full mb-4" />
                    <div className="flex justify-between mb-6">
                      <div className="h-4 bg-slate-200 rounded-lg w-16" />
                      <div className="h-4 bg-slate-200 rounded-lg w-16" />
                    </div>
                    <div className="h-14 bg-slate-200 rounded-2xl w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rest.map((c, i) => (
              <motion.div 
                key={c._id ?? i} 
                variants={fadeUp} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true, margin: "-50px" }}
              >
                <Link 
                  to={`/campaigns/${c.slug}`} 
                  className="rounded-[30px] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full" 
                  style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.border }}
                  onMouseEnter={() => setHoverId(c._id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  <div className="h-60 overflow-hidden relative">
                    <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-3" style={{ color: theme.colors.textMain }}>{c.title}</h3>
                      <p className="mb-8 line-clamp-2 leading-relaxed" style={{ color: theme.colors.textMuted }}>{c.description}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: theme.colors.surfaceAlt }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.min((c.raisedAmount / c.goalAmount) * 100, 100)}%`, backgroundColor: theme.colors.primary }}></div>
                      </div>
                      <div className="flex justify-between text-sm font-bold mb-6">
                        <span style={{ color: theme.colors.textMain }}>${c.raisedAmount.toLocaleString()}</span>
                        <span style={{ color: theme.colors.textMuted }}>${c.goalAmount.toLocaleString()}</span>
                      </div>
                      
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-4 rounded-2xl font-bold transition-all text-center shadow-md"
                        style={{ 
                          backgroundColor: hoverId === c._id ? theme.colors.primary : theme.colors.primaryLight, 
                          color: hoverId === c._id ? theme.colors.surface : theme.colors.primary 
                        }}
                      >
                        Support Cause
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {pagination && pagination.pages > 1 && (
          <div className="mt-20 flex flex-col items-center justify-center gap-6">
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
                Previous Page
              </button>
              <button 
                disabled={page === pagination.pages} 
                onClick={() => setPage(page + 1)}
                className="px-8 py-4 rounded-full font-bold text-lg shadow-lg disabled:opacity-50 transition-transform hover:scale-105 active:scale-95"
                style={{ backgroundColor: theme.colors.primary, color: theme.colors.surface }}
              >
                Next Page
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
