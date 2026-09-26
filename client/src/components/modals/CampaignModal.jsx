import React from 'react';
import { X } from 'lucide-react';
import { theme } from '../../theme';

export default function CampaignModal({ 
  isOpen, onClose, onSubmit, isSubmitting, 
  formStep, setFormStep, formData, handleChange, editingId 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white rounded-t-[2rem] shrink-0">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">{editingId ? 'Edit Campaign' : 'New Campaign'}</h2>
            <p className="text-sm font-bold text-slate-400 mt-1">Step {formStep} of 3</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100 shrink-0">
          <div 
            className="h-full transition-all duration-500 ease-out" 
            style={{ width: `${(formStep / 3) * 100}%`, backgroundColor: theme.colors.primary }} 
          />
        </div>

        {/* Scrollable Body */}
        <form onSubmit={onSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-8 overflow-y-auto flex-1 space-y-6">
            
            {formStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Campaign Title</label>
                  <input required type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Save the Paws" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Goal Amount ($)</label>
                    <input required type="number" min="1" name="goalAmount" value={formData.goalAmount} onChange={handleChange} placeholder="5000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Category</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Medical" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium" />
                  </div>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Short Description</label>
                  <input required type="text" name="description" value={formData.description} onChange={handleChange} placeholder="A quick summary of the cause..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Long Description</label>
                  <textarea required name="longDescription" value={formData.longDescription} onChange={handleChange} rows="5" placeholder="Tell the full story..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium resize-none"></textarea>
                </div>
              </div>
            )}

            {formStep === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Image URL</label>
                  <input required type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all font-medium mb-4" />
                  
                  {/* Image Preview Area */}
                  <div className="w-full h-40 rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden bg-slate-50 relative">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} />
                    ) : null}
                    <span className="text-slate-400 font-bold text-sm absolute z-0" style={{ display: formData.imageUrl ? 'none' : 'block' }}>Image Preview</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="w-5 h-5 rounded text-primary focus:ring-primary/50" />
                    <div>
                      <span className="block text-sm font-bold text-slate-800">Active Status</span>
                      <span className="block text-xs font-medium text-slate-500">Make this campaign visible to the public</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 rounded text-primary focus:ring-primary/50" />
                    <div>
                      <span className="block text-sm font-bold text-slate-800">Featured Campaign</span>
                      <span className="block text-xs font-medium text-slate-500">Show this as the massive banner on the campaigns page</span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Footer */}
          <div className="px-8 py-5 border-t border-slate-100 bg-white rounded-b-[2rem] flex justify-between items-center shrink-0">
            {formStep > 1 ? (
              <button type="button" onClick={() => setFormStep(prev => prev - 1)} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                Back
              </button>
            ) : (
              <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors border border-slate-200">
                Cancel
              </button>
            )}
            
            {formStep < 3 ? (
              <button type="button" onClick={() => setFormStep(prev => prev + 1)} className="px-8 py-2.5 rounded-xl font-bold text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:-translate-y-0.5 transition-all" style={{ backgroundColor: theme.colors.primary }}>
                Next
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="px-8 py-2.5 rounded-xl font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0" style={{ backgroundColor: theme.colors.primary }}>
                {isSubmitting ? 'Saving...' : 'Save Campaign'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
