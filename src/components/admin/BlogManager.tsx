import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../../services/firebase';
import { Button } from '../Button';
import { Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';

export const BlogManager = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({ title: '', content: '', imageUrl: '' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'posts'), (snap) => {
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => handleFirestoreError(error, OperationType.LIST, 'posts'));
    return () => unsub();
  }, []);

  const handleEdit = (post: any) => {
    setEditingId(post.id);
    setFormData({ title: post.title, content: post.content, imageUrl: post.imageUrl || '' });
    setIsOpen(true);
  };

  const handleNew = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', imageUrl: '' });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'posts', editingId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'posts'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsOpen(false);
    } catch (error) {
       handleFirestoreError(error, editingId ? OperationType.UPDATE : OperationType.CREATE, 'posts');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `posts/${id}`);
    }
  };

  if (isOpen) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold font-display uppercase">{editingId ? 'Edit Post' : 'New Post'}</h3>
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
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Content (Markdown supported)</label>
            <textarea required rows={10} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full bg-mascot-gray border-none px-4 py-3 rounded-xl focus:ring-2 focus:ring-mascot-yellow outline-none"></textarea>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full flex justify-center">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Save Post"}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h3 className="text-xl font-bold font-display uppercase">Blogs</h3>
          <p className="text-sm text-gray-500">Manage blog posts</p>
        </div>
        <Button onClick={handleNew} className="flex gap-2 items-center"><Plus size={18} /> New Post</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {posts.length === 0 && <div className="p-8 text-center text-gray-500">No blog posts yet.</div>}
        {posts.map(post => (
          <div key={post.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div>
              <div className="font-bold text-lg">{post.title}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(post)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18}/></button>
              <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
