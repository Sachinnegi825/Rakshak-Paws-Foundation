import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { theme } from '../../theme';

export default function GalleryModal({ isOpen, onClose, onSubmit, isSubmitting }) {
  const initialForm = {
    title: '', description: '', 
    imageUrl: '', category: 'Arrival & Intake'
  };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl relative flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white rounded-t-3xl z-10 shrink-0">
          <h2 className="text-2xl font-bold text-slate-800">Add New Photo</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
            <input required type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
            <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-bold text-slate-700">
              <option value="Arrival & Intake">Arrival & Intake</option>
              <option value="Rehabilitation & Foster">Rehabilitation & Foster</option>
              <option value="Forever Homes">Forever Homes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Image URL</label>
            <input required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 mb-3" />
            
            <div className="w-full h-48 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50 relative">
              {formData.imageUrl ? (
                <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
              ) : null}
              <span className="text-slate-400 font-bold text-sm absolute z-0" style={{ display: formData.imageUrl ? 'none' : 'block' }}>Image Preview</span>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 pb-2 border-t border-slate-100 mt-4">
            <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 rounded-xl font-bold text-white transition-colors" style={{ backgroundColor: theme.colors.primary }}>
              {isSubmitting ? 'Uploading...' : 'Save Photo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
