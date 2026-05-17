import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../services/firebase';
import { Button } from '../Button';
import { Loader2, Globe } from 'lucide-react';

export const SiteSettings = () => {
  const [formData, setFormData] = useState({ 
    siteTitle: '', 
    logoUrl: '',
    metaDescription: '',
    metaKeywords: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const snap = await getDoc(doc(db, 'settings', 'global'));
        if (snap.exists()) {
          const data = snap.data();
          setFormData({ 
            siteTitle: data.siteTitle || '', 
            logoUrl: data.logoUrl || '',
            metaDescription: data.metaDescription || '',
            metaKeywords: data.metaKeywords || ''
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'settings/global');
      }
    };
    loadSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        ...formData,
        updatedAt: serverTimestamp()
      }, { merge: true });
      setMessage('Settings saved successfully.');
    } catch (error) {
       handleFirestoreError(error, OperationType.UPDATE, 'settings/global');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold font-display uppercase mb-2">Global Settings</h3>
        <p className="text-sm text-gray-500 mb-6">Manage global website settings (Logo, Title, etc).</p>
        
        {message && <div className="mb-4 p-4 bg-green-50 text-green-700 font-bold rounded-xl">{message}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-mascot-black border-b border-gray-100 pb-2 flex items-center gap-2">
              <Globe size={16} /> Basic Info
            </h4>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Site Title</label>
              <input type="text" value={formData.siteTitle} onChange={e => setFormData({...formData, siteTitle: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"/>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Logo URL (from Media Library)</label>
              <input type="text" value={formData.logoUrl} onChange={e => setFormData({...formData, logoUrl: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"/>
              {formData.logoUrl && (
                <div className="mt-4 p-4 border rounded-xl inline-block bg-gray-50">
                  <p className="text-xs text-gray-500 mb-2 font-bold uppercase">Preview:</p>
                  <img src={formData.logoUrl} alt="Logo" className="h-12 object-contain" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-mascot-black border-b border-gray-100 pb-2 flex items-center gap-2">
              <Globe size={16} /> SEO / Meta Data
            </h4>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Meta Description</label>
              <textarea rows={3} value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none" placeholder="A short description of your site for search engines."></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Meta Keywords (comma-separated)</label>
              <input type="text" value={formData.metaKeywords} onChange={e => setFormData({...formData, metaKeywords: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none" placeholder="e.g. Graphic Design, Mascots, Branding"/>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="flex justify-center">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Settings"}
          </Button>
        </form>
      </div>
    </div>
  );
};
