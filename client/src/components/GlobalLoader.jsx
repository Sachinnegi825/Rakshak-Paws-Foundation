import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { theme } from '../theme';

export default function GlobalLoader() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Only show if landing specifically on the homepage
    if (location.pathname === '/') {
      const hasSeenLoader = sessionStorage.getItem('hasSeenSplash');
      
      if (!hasSeenLoader) {
        setShow(true);
        sessionStorage.setItem('hasSeenSplash', 'true');
        
        // Hide loader after 2.5 seconds
        const timer = setTimeout(() => {
          setShow(false);
        }, 2500);
        
        return () => clearTimeout(timer);
      }
    }
  }, []); // Only run once on mount

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: theme.colors.textMain }}
        >
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            
            {/* Background ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] opacity-20 pointer-events-none" style={{ backgroundColor: theme.colors.primary }}></div>

            {/* Pulsing ring */}
            <motion.div 
              animate={{ scale: [1, 1.8, 2.5], opacity: [0.5, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full pointer-events-none"
              style={{ backgroundColor: theme.colors.primary }}
            />
            
            {/* Main Icon */}
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl mb-8"
              style={{ backgroundColor: theme.colors.primary }}
            >
              <span className="material-symbols-outlined text-[48px] text-white">pets</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="overflow-hidden"
            >
              <h1 className="text-5xl font-extrabold text-white tracking-widest uppercase">
                Rakshak
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <p className="font-medium tracking-[0.3em] mt-3 text-sm uppercase" style={{ color: theme.colors.accent }}>
                Paws Foundation
              </p>
            </motion.div>

            {/* Progress Bar line */}
            <motion.div 
              className="w-48 h-1 bg-white/10 rounded-full mt-10 overflow-hidden relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div 
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />
            </motion.div>
            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
