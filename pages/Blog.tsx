import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, error => {
      handleFirestoreError(error, OperationType.LIST, 'posts');
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-mascot-gray pt-24">
      <div className="bg-mascot-black text-white py-20 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-extrabold font-display uppercase italic tracking-tighter">
                Insights
            </h1>
            <p className="text-xl font-bold mt-6 max-w-2xl text-gray-400">
                Breakdowns of branding logic, process tutorials, and the business of mascot design.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
           <div className="flex justify-center p-20"><Loader2 className="animate-spin text-mascot-black" size={48} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                  <article key={post.id} className="bg-white border-2 border-mascot-black rounded-[2rem] flex flex-col h-full hover:shadow-hard transition-all duration-300 overflow-hidden hover:-translate-y-2 group">
                      <div className="h-56 overflow-hidden border-b-2 border-mascot-black relative">
                          <img src={post.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image'} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                      </div>
                      <div className="p-8 flex flex-col flex-grow">
                          <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                              <span>{post.createdAt ? new Date(post.createdAt.toDate()).toLocaleDateString() : 'New'}</span>
                          </div>
                          <h2 className="text-2xl font-extrabold font-display uppercase leading-tight mb-4 flex-grow text-mascot-black">
                              {post.title}
                          </h2>
                          <p className="text-gray-500 font-medium text-sm mb-8 line-clamp-3 leading-relaxed">
                              {post.content}
                          </p>
                          <button className="flex items-center gap-2 font-black uppercase text-sm text-mascot-black hover:text-mascot-yellow transition-colors mt-auto self-start group/btn">
                              Read Article 
                              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                          </button>
                      </div>
                  </article>
              ))}
              {posts.length === 0 && <div className="col-span-full text-center text-gray-500 font-bold p-12">No posts available.</div>}
          </div>
        )}
      </div>
    </div>
  );
};