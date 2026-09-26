import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { theme } from '../../theme';

export default function DonationModal({ isOpen, onClose, campaign, onDonationSuccess }) {
  const [donationAmount, setDonationAmount] = useState(50);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [processing, setProcessing] = useState(false);

  if (!isOpen) return null;

  const handleDonate = async () => {
    if (!donorName || !donorEmail) {
      return toast.error('Please enter your name and email to receive a receipt.');
    }

    setProcessing(true);
    try {
      // 1. Create order on backend
      const { data: orderData } = await axios.post('/donations/create-order', {
        amount: donationAmount,
        campaignId: campaign._id,
        donorName,
        donorEmail
      });

      // 2. Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TgldZp7gYfSz66',
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'Rakshak Paws Foundation',
        description: `Donation for ${campaign.title}`,
        image: '/favicon.jpg',
        order_id: orderData.data.orderId,
        handler: async function (response) {
          try {
            // 3. Verify payment on backend
            await axios.post('/donations/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: donationAmount,
              campaignId: campaign._id,
              donorName,
              donorEmail
            });
            
            toast.success('Thank you! Your donation was successful and a receipt has been emailed.');
            onDonationSuccess(donationAmount);
            onClose();
            
          } catch (err) {
            console.error(err);
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        theme: {
          color: theme.colors.primary
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        toast.error('Payment failed or cancelled.');
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      toast.error('Failed to initiate payment.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-[30px] shadow-2xl w-full max-w-lg relative flex flex-col max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b flex justify-between items-center bg-slate-50" style={{ borderColor: theme.colors.border }}>
          <h2 className="text-2xl font-bold" style={{ color: theme.colors.textMain }}>Complete Your Donation</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto">
          <h4 className="text-sm uppercase tracking-wider font-bold mb-4" style={{ color: theme.colors.textMuted }}>Select Amount</h4>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            {[25, 50, 100].map(amt => (
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                key={amt} 
                onClick={() => setDonationAmount(amt)}
                className="py-3 rounded-xl border-2 font-bold transition-colors" 
                style={{ 
                  borderColor: donationAmount === amt ? theme.colors.primary : theme.colors.border, 
                  backgroundColor: donationAmount === amt ? theme.colors.primaryLight : theme.colors.surface,
                  color: donationAmount === amt ? theme.colors.primary : theme.colors.textMain 
                }}
              >
                ${amt}
              </motion.button>
            ))}
          </div>

          <div className="mb-10">
            <div className="flex justify-between mb-4 font-bold">
              <span style={{ color: theme.colors.textMuted }}>Custom Amount</span>
              <span className="text-2xl" style={{ color: theme.colors.primary }}>${donationAmount}</span>
            </div>
            <input 
              type="range" 
              min="5" 
              max="500" 
              value={donationAmount} 
              onChange={(e) => setDonationAmount(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: theme.colors.surfaceAlt, accentColor: theme.colors.primary }}
            />
          </div>

          <h4 className="text-sm uppercase tracking-wider font-bold mb-4" style={{ color: theme.colors.textMuted }}>Your Details</h4>
          <div className="space-y-4 mb-8">
            <input 
              type="text" 
              placeholder="Full Name" 
              value={donorName}
              onChange={e => setDonorName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: theme.colors.border, focusBorderColor: theme.colors.primary }}
            />
            <input 
              type="email" 
              placeholder="Email Address (for receipt)" 
              value={donorEmail}
              onChange={e => setDonorEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
              style={{ borderColor: theme.colors.border, focusBorderColor: theme.colors.primary }}
            />
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDonate}
            disabled={processing}
            className="w-full py-5 rounded-2xl font-bold text-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ backgroundColor: theme.colors.primary, color: theme.colors.surface }}
          >
            {processing ? 'Processing...' : `Confirm $${donationAmount} Donation`}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
