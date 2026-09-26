import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { theme } from '../../theme';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import CampaignModal from '../../components/modals/CampaignModal';

export default function AdminCampaignsList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState(1);
  
  const initialForm = {
    title: '', description: '', longDescription: '', 
    imageUrl: '', goalAmount: '', category: '', 
    isActive: true, isFeatured: false
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchCampaigns(page);
  }, [page]);

  const fetchCampaigns = async (currentPage = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/campaigns?page=${currentPage}&limit=10`);
      setCampaigns(data.data);
      setPagination(data.pagination);
    } catch (error) {
      toast.error('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (campaign = null) => {
    setFormStep(1);
    if (campaign) {
      setEditingId(campaign._id);
      setFormData({
        title: campaign.title,
        description: campaign.description,
        longDescription: campaign.longDescription,
        imageUrl: campaign.imageUrl,
        goalAmount: campaign.goalAmount,
        category: campaign.category || '',
        isActive: campaign.isActive,
        isFeatured: campaign.isFeatured || false,
      });
    } else {
      setEditingId(null);
      setFormData(initialForm);
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await axios.delete(`/campaigns/${id}`);
      toast.success('Campaign deleted successfully');
      fetchCampaigns();
    } catch (error) {
      toast.error('Failed to delete campaign');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        goalAmount: Number(formData.goalAmount)
      };

      if (editingId) {
        await axios.put(`/campaigns/${editingId}`, payload);
        toast.success('Campaign updated successfully');
      } else {
        await axios.post('/campaigns', payload);
        toast.success('Campaign created successfully');
      }
      setShowModal(false);
      fetchCampaigns();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const StatusBadge = ({ active }) => (
    <span className={`px-3 py-1 text-xs font-bold rounded-full ${active ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-600'}`}>
      {active ? 'Active' : 'Draft'}
    </span>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Campaigns</h1>
          <p className="text-slate-500">Manage all your fundraising and rescue campaigns.</p>
        </div>
        
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Plus size={20} />
          New Campaign
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Goal / Raised</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-slate-200" />
                        <div>
                          <div className="h-5 bg-slate-200 rounded w-32 mb-2" />
                          <div className="h-4 bg-slate-200 rounded w-48" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="h-5 bg-slate-200 rounded w-16" />
                        <div className="h-3 bg-slate-200 rounded w-24" />
                        <div className="w-24 h-1.5 bg-slate-200 rounded-full mt-1" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-16 h-6 bg-slate-200 rounded-full" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <div className="w-9 h-9 bg-slate-200 rounded-lg" />
                        <div className="w-9 h-9 bg-slate-200 rounded-lg" />
                      </div>
                    </td>
                  </tr>
                ))
              ) : campaigns.length === 0 ? (
                <tr><td colSpan="4" className="text-center py-10">No campaigns found.</td></tr>
              ) : (
                campaigns.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={c.imageUrl} alt={c.title} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-slate-800">{c.title}</p>
                          <p className="text-sm text-slate-500 truncate max-w-xs">{c.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-slate-800">${c.raisedAmount.toLocaleString()}</span>
                        <span className="text-xs text-slate-500">of ${c.goalAmount.toLocaleString()}</span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${Math.min((c.raisedAmount / c.goalAmount) * 100, 100)}%`,
                              backgroundColor: theme.colors.accent
                            }} 
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge active={c.isActive} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={() => handleOpenModal(c)} className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(c._id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
            <span className="text-sm text-slate-500 font-medium">
              Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
            </span>
            <div className="flex gap-2">
              <button 
                disabled={page === 1} 
                onClick={() => setPage(page - 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-slate-50 transition-colors"
              >
                Previous
              </button>
              <button 
                disabled={page === pagination.pages} 
                onClick={() => setPage(page + 1)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold disabled:opacity-50 hover:bg-slate-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modular Modal */}
      <CampaignModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
        formStep={formStep} 
        setFormStep={setFormStep} 
        formData={formData} 
        handleChange={handleChange} 
        editingId={editingId} 
      />
    </div>
  );
}
