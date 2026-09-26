import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { AdminContext } from '../../context/AdminContext';
import { theme } from '../../theme';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { admin, login } = useContext(AdminContext);
  const navigate = useNavigate();

  if (admin) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const result = await login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error || 'Login failed');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10" style={{ backgroundColor: theme.colors.primary }}></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10" style={{ backgroundColor: theme.colors.accent }}></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <span className="material-symbols-outlined text-5xl mb-2" style={{ color: theme.colors.primary }}>pets</span>
          <h1 className="text-3xl font-extrabold text-slate-800">Admin Portal</h1>
          <p className="text-slate-500 mt-2">Secure access for Rakshak Foundation</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 bg-slate-50"
              style={{ focusRing: theme.colors.primary }}
              placeholder="Enter admin username"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 bg-slate-50"
              style={{ focusRing: theme.colors.primary }}
              placeholder="••••••••"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-white shadow-lg disabled:opacity-70"
            style={{ backgroundColor: theme.colors.primary }}
          >
            {isSubmitting ? 'Authenticating...' : 'Secure Login'}
          </motion.button>
        </form>
        <div className="mt-8 text-center">
          <button 
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Public Homepage
          </button>
        </div>
      </motion.div>
    </div>
  );
}
