import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { theme } from '../theme'

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hoverAll, setHoverAll] = useState(false)
  const [hoverCards, setHoverCards] = useState([false, false, false])
  
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await axios.get('/campaigns')
        // Only show top 3 featured or active campaigns
        setCampaigns(data.data.slice(0, 3))
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  const handleCardHover = (index, isHovering) => {
    const newHovers = [...hoverCards]
    newHovers[index] = isHovering
    setHoverCards(newHovers)
  }

  return (
    <section className="py-24 px-8" id="campaigns" style={{ backgroundColor: theme.colors.background }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="font-bold tracking-wider uppercase text-sm mb-3 block" style={{ color: theme.colors.accent }}>Our Campaigns</span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight" style={{ color: theme.colors.textMain }}>
              Urgent Relief Campaigns
            </h2>
          </div>
          <Link 
            to="/campaigns" 
            className="px-6 py-3 rounded-full border-2 font-bold transition-all whitespace-nowrap"
            style={{ 
              borderColor: theme.colors.textMain, 
              color: hoverAll ? theme.colors.surface : theme.colors.textMain,
              backgroundColor: hoverAll ? theme.colors.textMain : 'transparent'
            }}
            onMouseEnter={() => setHoverAll(true)}
            onMouseLeave={() => setHoverAll(false)}
          >
            View All Campaigns
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="rounded-[30px] overflow-hidden shadow-lg animate-pulse" style={{ backgroundColor: theme.colors.surface }}>
                <div className="h-64 bg-slate-200"></div>
                <div className="p-8">
                  <div className="h-8 bg-slate-200 rounded-lg w-3/4 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded-lg w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded-lg w-5/6 mb-8"></div>
                  <div className="h-2 bg-slate-200 rounded-full w-full mb-4"></div>
                  <div className="flex justify-between mb-8">
                    <div className="h-4 bg-slate-200 rounded-lg w-1/3"></div>
                    <div className="h-4 bg-slate-200 rounded-lg w-1/3"></div>
                  </div>
                  <div className="h-12 bg-slate-200 rounded-xl w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error || campaigns.length === 0 ? (
          <div className="w-full py-16 text-center rounded-[30px] border-2 border-dashed border-slate-200" style={{ backgroundColor: theme.colors.surface }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textMain }}>No active campaigns found</h3>
            <p style={{ color: theme.colors.textMuted }}>Check back later or contact support if this is an error.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {campaigns.map((c, i) => (
              <Link 
                to={`/campaigns/${c.slug}`} 
                key={i} 
                className="rounded-[30px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow group block" 
                style={{ backgroundColor: theme.colors.surface }}
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  {c.isFeatured && <div className="absolute top-4 left-4 backdrop-blur px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: theme.colors.surface + 'e6', color: theme.colors.accent }}>Urgent</div>}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3" style={{ color: theme.colors.textMain }}>{c.title}</h3>
                  <p className="mb-6 line-clamp-2" style={{ color: theme.colors.textMuted }}>{c.description}</p>
                  
                  <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: theme.colors.border }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min((c.raisedAmount / c.goalAmount) * 100, 100)}%`, backgroundColor: theme.colors.primary }}></div>
                  </div>
                  <div className="flex justify-between text-sm font-bold mb-6">
                    <span style={{ color: theme.colors.textMain }}>${c.raisedAmount.toLocaleString()} Raised</span>
                    <span style={{ color: theme.colors.textMuted }}>Goal: ${c.goalAmount.toLocaleString()}</span>
                  </div>
                  
                  <div 
                    className="w-full py-3 rounded-xl font-bold transition-colors text-center"
                    style={{ 
                      backgroundColor: hoverCards[i] ? theme.colors.primaryHover : theme.colors.primaryLight,
                      color: hoverCards[i] ? theme.colors.surface : theme.colors.primaryHover
                    }}
                    onMouseEnter={() => handleCardHover(i, true)}
                    onMouseLeave={() => handleCardHover(i, false)}
                  >
                    Support Campaign
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
