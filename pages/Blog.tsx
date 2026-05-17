import React from 'react';
import { BLOG_POSTS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Blog: React.FC = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {BLOG_POSTS.map((post) => (
                <article key={post.id} className="bg-white border-2 border-mascot-black rounded-[2rem] flex flex-col h-full hover:shadow-hard transition-all duration-300 overflow-hidden hover:-translate-y-2 group">
                    <div className="h-56 overflow-hidden border-b-2 border-mascot-black relative">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                        <div className="absolute top-4 left-4 bg-white px-3 py-1 font-extrabold text-xs border-2 border-mascot-black uppercase rounded-full tracking-wide">
                            {post.category}
                        </div>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h2 className="text-2xl font-extrabold font-display uppercase leading-tight mb-4 flex-grow text-mascot-black">
                            {post.title}
                        </h2>
                        <p className="text-gray-500 font-medium text-sm mb-8 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                        </p>
                        <button className="flex items-center gap-2 font-black uppercase text-sm text-mascot-black hover:text-mascot-yellow transition-colors mt-auto self-start group/btn">
                            Read Article 
                            <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </article>
            ))}
        </div>
      </div>
    </div>
  );
};