import React from 'react';
import { PenTool, Layers, Zap, Globe, Cpu, Heart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="mb-32">
          <h1 className="text-7xl md:text-9xl font-black font-display uppercase tracking-tighter text-mascot-black mb-12 animate-enter-up leading-[0.8]">
            THE MINDSET <br/>BEHIND THE <span className="text-mascot-yellow">MARK</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-gray-400 max-w-4xl leading-relaxed animate-enter-up [animation-delay:100ms]">
            I don't just draw cartoons. I build scalable identity systems that turn brands into household names through character-driven storytelling.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40">
            <div className="lg:col-span-7 space-y-12 animate-enter-up [animation-delay:200ms]">
                <div className="space-y-8 text-xl font-medium text-gray-500 leading-relaxed">
                    <p>
                        Most designers treat mascots as an afterthought—a cute illustration slapped next to a wordmark. I treat them as the primary vehicle for your brand's voice.
                    </p>
                    <p>
                        With a decade of experience in vector illustration and brand strategy, I bridge the gap between "cool art" and "functional branding." Every curve is intentional; every color is tested for high-contrast visibility.
                    </p>
                    <p>
                        I work exclusively with clients who want to own their category. Whether it's a high-stakes esports team or a disruptor startup, we build assets that live rent-free in your audience's heads.
                    </p>
                </div>
                
                <div className="grid grid-cols-2 gap-10 py-10 border-t border-gray-100">
                    {[
                      { icon: <Globe />, title: "Global Reach", val: "12+ Countries" },
                      { icon: <Cpu />, title: "Digital First", val: "100% Vector" },
                    ].map((item, i) => (
                      <div key={i} className="space-y-4">
                        <div className="w-12 h-12 bg-mascot-gray rounded-2xl flex items-center justify-center text-mascot-black">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-1">{item.title}</h4>
                          <div className="text-2xl font-display font-black text-mascot-black uppercase">{item.val}</div>
                        </div>
                      </div>
                    ))}
                </div>
            </div>

            <div className="lg:col-span-5 animate-enter-up [animation-delay:300ms]">
                <div className="bg-mascot-black text-white p-12 rounded-[3.5rem] shadow-elevated">
                    <h3 className="font-display font-black text-4xl uppercase mb-10 text-mascot-yellow leading-tight">THE STUDIO PRINCIPLES</h3>
                    <ul className="space-y-12">
                        {[
                          { title: "Vector Precision", desc: "Infinite scalability from favicons to billboards.", icon: <Layers /> },
                          { title: "Archetype Focused", desc: "We design for personality, not just aesthetics.", icon: <Heart /> },
                          { title: "Esports DNA", desc: "Aggressive, high-contrast, energetic visual systems.", icon: <Zap /> }
                        ].map((item, i) => (
                          <li key={i} className="flex gap-6">
                            <div className="text-mascot-yellow mt-1">{item.icon}</div>
                            <div>
                                <h4 className="font-display font-bold text-xl uppercase mb-2">{item.title}</h4>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                          </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

        {/* Minimal Process Section */}
        <div className="pb-40">
            <h2 className="text-5xl font-black font-display uppercase tracking-tighter text-center mb-24">MODERN WORKFLOW</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                {[
                    { title: "PHASE 01: ARCHETYPE", desc: "We define the character's role in your brand's ecosystem." },
                    { title: "PHASE 02: ITERATION", desc: "Rapid sketching focused on silhouette and gesture." },
                    { title: "PHASE 03: REFINEMENT", desc: "Digital vectoring and comprehensive asset delivery." }
                ].map((step, idx) => (
                    <div key={idx} className="space-y-6">
                        <div className="text-xs font-bold text-mascot-yellow tracking-[0.5em] mb-4">STEP 0{idx+1}</div>
                        <h3 className="font-display font-black text-2xl uppercase tracking-tight">{step.title}</h3>
                        <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};