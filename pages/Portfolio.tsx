import React, { useState, useMemo, useEffect } from 'react';
import { ExternalLink, X, ArrowRight, User, Tag, Calendar, Loader2 } from 'lucide-react';
import { Project } from '../types';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';

const CATEGORIES = ['All', 'Logo Design', 'Truck Wraps', 'Game Art/UI', 'Mascots'];

export const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch portfolio projects from Firestore
  useEffect(() => {
    const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }, error => {
      handleFirestoreError(error, OperationType.LIST, 'portfolio');
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProject]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter(project => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="pt-12 pb-16 px-6">
        <div className="max-w-[1440px] mx-auto border-b border-gray-100 pb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="max-w-xl">
              <h1 className="text-6xl md:text-8xl font-black font-display uppercase tracking-tighter leading-none mb-4">
                PORTFOLIO
              </h1>
              <p className="text-gray-400 font-medium text-lg leading-relaxed">
                Selected brand identities, characters, and design systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1440px] mx-auto px-6 pb-40">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Category Filter */}
          <aside className="lg:w-48 shrink-0">
            <div className="sticky top-32 flex flex-row lg:flex-col flex-wrap gap-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-left rounded-lg font-bold uppercase text-[10px] tracking-widest transition-all duration-200 border border-transparent whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-mascot-black text-white'
                      : 'text-gray-400 hover:text-mascot-black hover:bg-mascot-gray'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Grid Gallery */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-1 md:gap-2">
              {filteredProjects.map((project, idx) => (
                <div 
                  key={project.id}
                  className="group animate-enter-up cursor-pointer"
                  style={{ animationDelay: `${(idx % 4) * 50}ms` }}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[2/3] bg-gray-100 rounded-lg overflow-hidden transition-all duration-300">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-mascot-yellow font-black uppercase text-[9px] tracking-[0.2em] mb-2 block">
                          {project.category}
                        </span>
                        <h3 className="text-xl font-display font-black text-white uppercase italic leading-tight mb-3">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/50 font-bold uppercase text-[9px] tracking-widest">
                          View Case Study <ArrowRight size={10} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-40 border border-dashed border-gray-100 rounded-2xl">
                <h3 className="text-xl font-display font-black text-gray-300 uppercase italic">Empty result</h3>
                <button 
                  onClick={() => setActiveCategory('All')}
                  className="mt-4 text-mascot-black font-bold uppercase text-xs tracking-widest hover:text-mascot-yellow transition-colors underline underline-offset-8"
                >
                  Show all
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Modal (Popup) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-enter-up"
          style={{ animationDuration: '0.4s' }}
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-mascot-black/95 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 hover:bg-white text-white hover:text-mascot-black rounded-full flex items-center justify-center transition-all backdrop-blur-md"
            >
              <X size={24} />
            </button>

            {/* Image Side */}
            <div className="w-full lg:w-3/5 h-[40vh] lg:h-full bg-mascot-gray relative">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details Side */}
            <div className="w-full lg:w-2/5 overflow-y-auto p-8 md:p-12 flex flex-col">
              <div className="mb-10">
                <span className="text-mascot-yellow font-black uppercase text-[10px] tracking-[0.3em] mb-4 block">
                  {selectedProject.category}
                </span>
                <h2 className="text-4xl md:text-6xl font-display font-black text-mascot-black uppercase italic tracking-tighter leading-none mb-6">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-6 border-y border-gray-100 py-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mascot-gray flex items-center justify-center text-gray-400">
                      <User size={14} />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Client</div>
                      <div className="text-xs font-bold text-mascot-black">{selectedProject.client}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-mascot-gray flex items-center justify-center text-gray-400">
                      <Tag size={14} />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Industry</div>
                      <div className="text-xs font-bold text-mascot-black">Entertainment</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8 flex-grow">
                <div>
                  <h4 className="font-display font-bold text-sm uppercase tracking-widest text-mascot-black mb-4">The Challenge</h4>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm uppercase tracking-widest text-mascot-black mb-4">Our Approach</h4>
                  <p className="text-gray-500 font-medium leading-relaxed text-sm">
                    We focused on high-contrast visual hierarchies and silhouette clarity. The objective was to create a character that remains recognizable even at small scales—essential for social media avatars and merchandise tags.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-mascot-gray rounded-2xl">
                    <div className="text-mascot-black font-display font-black text-2xl mb-1">2.4k</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global Reach</div>
                  </div>
                  <div className="p-4 bg-mascot-gray rounded-2xl">
                    <div className="text-mascot-black font-display font-black text-2xl mb-1">100%</div>
                    <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Vector Ready</div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <button className="w-full bg-mascot-black text-white py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-mascot-yellow hover:text-mascot-black transition-all flex items-center justify-center gap-3">
                  Start Similar Project <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Simplified Bottom Strip */}
      <section className="bg-mascot-black py-20 rounded-t-4xl">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
                { label: 'DELIVERED', val: '240+' },
                { label: 'TEAMS', val: '64' },
                { label: 'BRANDS', val: '12' },
                { label: 'ACTIVE', val: 'NOW' }
            ].map((stat, i) => (
                <div key={i}>
                    <div className="text-4xl md:text-5xl font-display font-black text-white mb-1">{stat.val}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">{stat.label}</div>
                </div>
            ))}
        </div>
      </section>
    </div>
  );
};