import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { theme } from '../../theme';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import GalleryModal from '../../components/modals/GalleryModal';
import { apiClient } from '../../lib/api';
import { queryKeys } from '../../lib/queryKeys';

export default function AdminGalleryList() {
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Admin list uses its own query key (limit=12) separate from public gallery ──
  const { data, isLoading: loading } = useQuery({
    queryKey: ['admin', 'gallery', page],
    queryFn: async () => {
      const { data } = await apiClient.get(`/gallery?page=${page}&limit=12`);
      return data;
    },
    placeholderData: (prev) => prev,
  });

  const items = data?.data ?? [];
  const pagination = data?.pagination ?? {};

  /** Bust ALL gallery cache keys so public pages AND this admin list re-fetch */
  const invalidateGalleryCache = () => {
    qc.invalidateQueries({ queryKey: queryKeys.gallery.all() });
    qc.invalidateQueries({ queryKey: ['admin', 'gallery'] });
  };

  const handleOpenModal = () => setShowModal(true);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo?')) return;
    try {
      await apiClient.delete(`/gallery/${id}`);
      toast.success('Photo deleted successfully');
      invalidateGalleryCache(); // triggers auto-refetch via useQuery
    } catch {
      toast.error('Failed to delete photo');
    }
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await apiClient.post('/gallery', formData);
      toast.success('Photo added successfully');
      setShowModal(false);
      invalidateGalleryCache(); // triggers auto-refetch via useQuery
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save photo');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">Gallery Management</h1>
          <p className="text-slate-500">Manage photos for the public editorial gallery.</p>
        </div>
        
        <button 
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-105"
          style={{ backgroundColor: theme.colors.primary }}
        >
          <Plus size={20} />
          Add Photo
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse bg-slate-200 rounded-2xl h-64 w-full"></div>
            ))
          ) : items.length === 0 ? (
            <div className="col-span-4 text-center py-20 text-slate-500 font-bold">No photos found.</div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-64">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: theme.colors.accent }}>{item.category}</span>
                  <h3 className="text-white font-bold text-lg leading-tight mb-2">{item.title}</h3>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        
        {pagination && pagination.pages > 1 && (
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">
              Showing page {pagination.page} of {pagination.pages} ({pagination.total} photos)
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

      <GalleryModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}
