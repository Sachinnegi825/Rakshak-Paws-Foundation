import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'
import DonationModal from '../components/modals/DonationModal'
import { theme } from '../theme'

export default function CampaignDetail() {
  const { id } = useParams()
  const [scrolled, setScrolled] = useState(false)
  const [donationAmount, setDonationAmount] = useState(50)

  const [campaign, setCampaign] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await axios.get(`/campaigns/${id}`)
        setCampaign(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchCampaign()

    // Load Razorpay Script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, [id])

  // Update SEO Meta Tags dynamically
  useEffect(() => {
    if (campaign) {
      document.title = `${campaign.title} | Rakshak Paws Foundation`;
      
      const setMetaTag = (property, content) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (tag) {
          tag.setAttribute('content', content);
        }
      };

      setMetaTag('og:title', `${campaign.title} | Rakshak Paws Foundation`);
      setMetaTag('og:description', campaign.description);
      setMetaTag('og:image', campaign.imageUrl);
      
      setMetaTag('twitter:title', `${campaign.title} | Rakshak Paws Foundation`);
      setMetaTag('twitter:description', campaign.description);
      setMetaTag('twitter:image', campaign.imageUrl);
    }
  }, [campaign]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!campaign) return <div className="min-h-screen flex items-center justify-center">Campaign not found.</div>

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const handleDonationSuccess = (amount) => {
    setCampaign(prev => ({
      ...prev,
      raisedAmount: prev.raisedAmount + amount
    }))
  }

  return (
    <div className="pb-24 min-h-screen" style={{ backgroundColor: theme.colors.background }}>
      
      {/* Immersive Full Width Header */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] mb-12"
      >
        <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(to top, ${theme.colors.textMain}, transparent)` }}></div>
        <div className="absolute bottom-10 left-0 w-full px-8">
          <div className="max-w-[1400px] mx-auto">
            <Link to="/campaigns" className="inline-flex items-center gap-2 font-bold mb-6 hover:underline text-white/80 transition-colors hover:text-white">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Campaigns
            </Link>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="font-bold tracking-wider uppercase text-sm mb-3 block" 
              style={{ color: theme.colors.accent }}
            >
              Urgent Appeal
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-7xl font-extrabold text-white mb-4"
            >
              {campaign.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed"
            >
              {campaign.description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-8 relative">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            <motion.h3 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl font-bold mb-8" style={{ color: theme.colors.textMain }}>The Story</motion.h3>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-xl leading-relaxed whitespace-pre-line font-medium space-y-6 mb-16" style={{ color: theme.colors.textMuted }}>
              {campaign.longDescription || campaign.description}
            </motion.div>

            <motion.h3 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-3xl font-bold mb-8" style={{ color: theme.colors.textMain }}>Recovery Timeline</motion.h3>
            <div className="border-l-4 ml-4 space-y-12" style={{ borderColor: theme.colors.primaryLight }}>
              {[
                { day: "Day 1", title: "Emergency Rescue", desc: "Found critically injured and rushed to the ICU." },
                { day: "Day 3", title: "First Surgery", desc: "Successfully underwent a 4-hour operation to repair broken bones." },
                { day: "Day 14", title: "Physical Therapy", desc: "Began walking on a water treadmill to rebuild muscle." },
                { day: "Day 30", title: "Ready for Adoption", desc: "Fully healed and waiting for a forever family." }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative pl-8"
                >
                  <div className="absolute -left-[14px] top-1 w-6 h-6 rounded-full border-4" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }}></div>
                  <span className="font-bold tracking-wider uppercase text-sm mb-1 block" style={{ color: theme.colors.accent }}>{step.day}</span>
                  <h4 className="text-2xl font-bold mb-2" style={{ color: theme.colors.textMain }}>{step.title}</h4>
                  <p className="text-lg" style={{ color: theme.colors.textMuted }}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
              <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop" className="rounded-[40px] w-full h-80 object-cover shadow-lg" alt="Detail 1" />
              <img src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=800&auto=format&fit=crop" className="rounded-[40px] w-full h-80 object-cover shadow-lg" alt="Detail 2" />
            </motion.div>
          </div>
          
          {/* Sticky Donation Sidebar */}
          <div className="lg:w-1/3 relative">
            <div className={`p-10 rounded-[40px] shadow-2xl border transition-all duration-500 bg-white ${scrolled ? 'sticky top-32' : ''}`} style={{ borderColor: theme.colors.border }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm" style={{ backgroundColor: theme.colors.primaryLight, color: theme.colors.primary }}>
                <span className="material-symbols-outlined text-3xl">favorite</span>
              </div>
              
              <h4 className="text-2xl font-bold mb-6" style={{ color: theme.colors.textMain }}>Fund Progress</h4>
              
              <div className="w-full h-4 rounded-full mb-4" style={{ backgroundColor: theme.colors.surfaceAlt }}>
                <div className="h-full rounded-full relative" style={{ width: `${Math.min((campaign.raisedAmount / campaign.goalAmount) * 100, 100)}%`, backgroundColor: theme.colors.primary }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 rounded-full border-4 shadow-md" style={{ backgroundColor: theme.colors.surface, borderColor: theme.colors.primary }}></div>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-bold mb-10">
                <span style={{ color: theme.colors.textMain }}>${campaign.raisedAmount.toLocaleString()} Raised</span>
                <span style={{ color: theme.colors.textMuted }}>Goal: ${campaign.goalAmount.toLocaleString()}</span>
              </div>

              <hr className="my-8" style={{ borderColor: theme.colors.border }} />
              
              <h4 className="text-lg font-bold mb-6 text-center" style={{ color: theme.colors.textMain }}>Every dollar helps save a life.</h4>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full py-5 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: theme.colors.accent, color: theme.colors.surface }}
              >
                Donate Now
              </motion.button>
            </div>
          </div>
          
        </div>
      </div>

      {/* Modular Donation Modal */}
      <DonationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        campaign={campaign} 
        onDonationSuccess={handleDonationSuccess} 
      />
    </div>
  )
}
