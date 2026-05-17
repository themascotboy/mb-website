import React from 'react';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-mascot-black text-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          
          {/* Brand */}
          <div className="max-w-xs">
            <h3 className="font-display font-black text-3xl uppercase tracking-tighter mb-8">MASCOT<span className="text-mascot-yellow">BOY</span></h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Crafting iconic visual systems and custom characters for brands that demand attention.
            </p>
          </div>

          {/* Social */}
          <div className="space-y-8">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.3em] text-white/30">Network</h4>
            <div className="flex gap-8">
              {[Twitter, Instagram, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-gray-400 hover:text-mascot-yellow transition-colors transform hover:-translate-y-1">
                  <Icon strokeWidth={2} size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright */}
          <div className="md:text-right flex flex-col justify-end gap-4">
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} MascotBoy Studio.<br/>
              Handcrafted in London.
            </p>
            <div>
              <a href="#/admin" className="text-[10px] uppercase font-bold text-gray-500 hover:text-white transition-colors">Admin Login</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};