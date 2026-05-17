import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../services/firebase';
import { Button } from '../Button';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';

export const ProjectManager = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', description: '', imageUrl: '', status: 'Active', category: '', client: '' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'projects'), (snap) => {
      setItems(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.LIST, 'projects'));
    return () => unsub();
  }, []);

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setFormData({ 
       title: item.title, 
       description: item.description, 
       imageUrl: item.imageUrl || '', 
       status: item.status || 'Active',
       category: item.category || '',
       client: item.client || ''
    });
    setIsOpen(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', imageUrl: '', status: 'Active', category: '', client: '' });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'projects', editingId), {
          ...formData
        });
      } else {
        await addDoc(collection(db, 'projects'), {
          ...formData,
          createdAt: serverTimestamp()
        });
      }
      setIsOpen(false);
    } catch (error) {
       handleFirestoreError(error, editingId ? OperationType.UPDATE : OperationType.CREATE, 'projects');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  if (isOpen) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold font-display uppercase">{editingId ? 'Edit Project' : 'New Project'}</h3>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Title</label>
            <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Image URL</label>
            <input type="text" value={formData.imageUrl} placeholder="Optional image url" onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Status</label>
            <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none">
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Planned">Planned</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
            <input type="text" value={formData.category} placeholder="e.g. Logo Design" onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Client</label>
            <input type="text" value={formData.client} placeholder="e.g. Thunder Strike" onChange={e => setFormData({...formData, client: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"/>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Description</label>
            <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"></textarea>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full flex justify-center">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Project"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h3 className="text-xl font-bold font-display uppercase">Projects</h3>
          <p className="text-sm text-gray-500">Manage projects</p>
        </div>
        <Button onClick={handleNew} className="flex gap-2 items-center"><Plus size={18} /> New Project</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {items.length === 0 && <div className="p-8 text-center text-gray-500">No projects yet.</div>}
        {items.map(item => (
          <div key={item.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="font-bold text-lg">{item.title}</div>
              <span className={`text-xs px-2 py-1 rounded-full font-bold ${item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{item.status}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(item)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18}/></button>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
