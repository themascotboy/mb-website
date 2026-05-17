import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'global'), (snap) => {
      if(snap.exists()) setSiteSettings(snap.data());
    });
    return () => unsub();
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8 py-4 ${scrolled ? 'translate-y-0' : 'translate-y-0'}`}>
      <div className={`max-w-7xl mx-auto transition-all duration-300 rounded-2xl md:rounded-full border border-gray-100 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-subtle py-2 px-6' : 'bg-transparent py-4 px-2'}`}>
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            {siteSettings?.logoUrl ? (
               <img src={siteSettings.logoUrl} alt={siteSettings?.siteTitle || 'Logo'} className="h-8 max-w-40 object-contain mr-3" />
            ) : (
              <div className="w-8 h-8 bg-mascot-yellow rounded-lg flex items-center justify-center mr-3 group-hover:rotate-6 transition-transform">
                <Zap className="w-4 h-4 text-mascot-black" fill="currentColor" />
              </div>
            )}
            <span className="font-display font-black text-xl tracking-tight uppercase">{siteSettings?.siteTitle || <>MASCOT<span className="text-mascot-yellow">BOY</span></>}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-semibold text-[11px] uppercase tracking-widest px-6 py-2 rounded-full transition-all duration-200 ${
                    isActive 
                      ? 'bg-mascot-black text-white' 
                      : 'text-gray-500 hover:text-mascot-black hover:bg-mascot-gray'
                  }`
                }
              >
                 {item.label}
              </NavLink>
            ))}
            <Link to="/contact" className="ml-4">
                <div className="bg-mascot-yellow text-mascot-black px-6 py-2.5 font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-mascot-black hover:text-white transition-all cursor-pointer">
                    Contact
                </div>
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-mascot-black focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-elevated z-50">
          <div className="p-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block py-3 font-bold text-sm uppercase tracking-widest ${isActive ? 'text-mascot-yellow' : 'text-mascot-black'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
             <Link to="/contact" onClick={() => setIsOpen(false)} className="block py-4 font-bold text-sm uppercase tracking-widest text-center bg-mascot-black text-white rounded-2xl mt-4">
                Let's Talk
             </Link>
          </div>
        </div>
      )}
    </nav>
  );
};