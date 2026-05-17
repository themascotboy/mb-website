import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, PenTool, Layers, Box, Quote, Trophy } from 'lucide-react';
import { Button } from '../components/Button';
import { EditableText } from '../components/EditableText';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';

export const Home: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'), limit(2));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, error => {
      handleFirestoreError(error, OperationType.LIST, 'projects');
    });
    return () => unsub();
  }, []);
  return (
    <div className="flex flex-col pt-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            
            <div className="lg:w-7/12">
              <div className="inline-flex items-center gap-2 bg-mascot-gray text-gray-400 px-4 py-1.5 mb-10 font-semibold text-[10px] uppercase tracking-[0.2em] rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                <EditableText contentId="home-hero-badge" defaultText="Creative Studio based in London" />
              </div>
              
              <h1 className="text-6xl md:text-9xl font-black mb-8 leading-[0.9] tracking-tighter text-mascot-black animate-enter-up font-display">
                <EditableText contentId="home-hero-title1" defaultText="BRANDS WITH" /><br/>
                <span className="text-mascot-yellow"><EditableText contentId="home-hero-title2" defaultText="CHARACTER." /></span>
              </h1>
              
              <div className="text-xl md:text-2xl font-medium text-gray-500 mb-12 max-w-xl leading-relaxed animate-enter-up [animation-delay:100ms]">
                <EditableText multiline contentId="home-hero-subtitle" defaultText="Custom mascots and identity systems designed for startups and esports teams that demand world-class recognition." />
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-enter-up [animation-delay:200ms]">
                <Link to="/portfolio">
                  <Button variant="secondary">View Work</Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline">Learn Process</Button>
                </Link>
              </div>
            </div>

            <div className="lg:w-5/12 relative animate-enter-up [animation-delay:300ms]">
               <div className="relative group">
                  <div className="absolute inset-0 bg-mascot-yellow rounded-[4rem] translate-x-4 translate-y-4 blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative aspect-square bg-gray-100 rounded-[4rem] overflow-hidden">
                     <img 
                        src="https://picsum.photos/id/1003/1000/1000" 
                        alt="Mascot Art" 
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                     />
                  </div>
                  {/* Subtle Floating Tag */}
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-elevated border border-gray-50 animate-float">
                     <div className="font-display font-black text-3xl leading-none">100%</div>
                     <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Unique Assets</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Marquee */}
      <div className="bg-mascot-black py-12 overflow-hidden border-y border-white/5">
        <div className="flex items-center space-x-16 animate-marquee whitespace-nowrap">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-10">
                    <span className="text-white/20 font-display font-black text-6xl uppercase italic">Mascot Specialist</span>
                    <Star className="text-mascot-yellow w-6 h-6 fill-mascot-yellow" />
                    <span className="text-white font-display font-black text-6xl uppercase italic">Visual Identity</span>
                    <Zap className="text-white/20 w-8 h-8" />
                </div>
            ))}
        </div>
      </div>

      {/* Featured Projects - Fixed Layout */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter mb-4">SELECTED PROJECTS</h2>
                    <p className="text-gray-400 font-medium text-lg">Proof that a good character is your best marketing tool.</p>
                </div>
                <Link to="/portfolio">
                  <Button variant="outline" className="hidden md:flex">See All Work <ArrowRight size={16} /></Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {projects.map((project) => (
                    <Link key={project.id} to="/portfolio" className="group block relative">
                         <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-subtle group-hover:shadow-elevated transition-all duration-500">
                             <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end">
                                <span className="text-mascot-yellow font-bold uppercase text-xs tracking-widest mb-2">{project.category}</span>
                                <h3 className="text-white font-display font-black text-3xl uppercase italic">{project.title}</h3>
                             </div>
                         </div>
                         <div className="mt-6 flex justify-between items-center px-2">
                            <div>
                                <h3 className="font-display font-extrabold text-2xl uppercase tracking-tight leading-none">{project.title}</h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">{project.client}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-mascot-black group-hover:text-white transition-colors">
                                <ArrowRight size={18} />
                            </div>
                         </div>
                    </Link>
                ))}
            </div>
            
            <div className="mt-12 md:hidden flex justify-center">
                 <Link to="/portfolio">
                  <Button variant="outline">See All Work <ArrowRight size={16} /></Button>
                </Link>
            </div>
        </div>
      </section>

      {/* Services / Expertise Section */}
      <section className="py-32 bg-mascot-gray relative overflow-hidden">
         {/* Decorative BG */}
         <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
             <Star size={400} />
         </div>

         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                <span className="text-accent-blue font-bold text-xs uppercase tracking-widest mb-4 block">What We Do Best</span>
                <h2 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter mb-6 leading-none">
                    CORE <span className="text-stroke-subtle text-mascot-black">CAPABILITIES</span>
                </h2>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">
                    Specialized services tailored for brands that need to stand out in crowded digital spaces.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        icon: <PenTool size={32} />,
                        title: "Character Design",
                        desc: "From rough sketches to polished vector art. We create mascots with personality, history, and purpose.",
                        color: "bg-mascot-yellow text-mascot-black"
                    },
                    {
                        icon: <Layers size={32} />,
                        title: "Visual Identity",
                        desc: "A mascot needs a home. We build the logos, typography, and color systems that support your character.",
                        color: "bg-mascot-black text-white"
                    },
                    {
                        icon: <Box size={32} />,
                        title: "Merch Ready",
                        desc: "Files delivered ready for print. T-shirts, stickers, plushies—we optimize assets for physical production.",
                        color: "bg-white text-mascot-black border border-gray-200"
                    }
                ].map((service, i) => (
                    <div key={i} className={`p-10 rounded-[2.5rem] shadow-subtle hover:shadow-elevated transition-all duration-500 hover:-translate-y-2 ${service.color === 'bg-white text-mascot-black border border-gray-200' ? 'bg-white' : service.color}`}>
                        <div className="mb-8">{service.icon}</div>
                        <h3 className={`text-2xl font-display font-black uppercase mb-4 ${service.color.includes('text-white') ? 'text-white' : 'text-mascot-black'}`}>{service.title}</h3>
                        <p className={`font-medium leading-relaxed ${service.color.includes('text-white') ? 'text-gray-400' : 'text-gray-500'}`}>
                            {service.desc}
                        </p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="relative">
                      <div className="absolute -top-10 -left-10 text-mascot-gray">
                          <Quote size={120} fill="currentColor" />
                      </div>
                      <blockquote className="relative z-10">
                          <p className="text-3xl md:text-5xl font-black font-display uppercase italic leading-tight text-mascot-black mb-8">
                              "We didn't just get a logo. We got a team member. The fan response was instant."
                          </p>
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                  <img src="https://picsum.photos/id/1005/200/200" alt="Client" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                  <div className="font-bold text-mascot-black uppercase tracking-wide">Alex V.</div>
                                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">CEO, Thunder Strike</div>
                              </div>
                          </div>
                      </blockquote>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                      <div className="bg-mascot-black text-white p-8 rounded-[2rem] text-center">
                          <Trophy size={32} className="mx-auto mb-4 text-mascot-yellow" />
                          <div className="text-4xl font-black font-display mb-1">#1</div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Trending on Dribbble</div>
                      </div>
                      <div className="bg-mascot-gray text-mascot-black p-8 rounded-[2rem] text-center">
                          <Zap size={32} className="mx-auto mb-4 text-mascot-black" />
                          <div className="text-4xl font-black font-display mb-1">5yr</div>
                          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Industry Veteran</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Modern Contact CTA */}
      <section className="py-40 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-6xl md:text-9xl font-black font-display uppercase tracking-tighter mb-10 leading-[0.85]">
                LET'S MAKE IT <br/><span className="stroke-text-subtle text-mascot-black">ICONIC.</span>
              </h2>
              <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">
                  Now booking for new identities and mascot projects. Limited availability for Q4.
              </p>
              <a href="mailto:hello@mascotboy.com" className="inline-block group">
                  <Button variant="secondary" className="px-16 py-6 text-lg">Start Project</Button>
              </a>
          </div>
      </section>
    </div>
  );
};