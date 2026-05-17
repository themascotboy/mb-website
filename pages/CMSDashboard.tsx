import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useCMS } from '../contexts/CMSContext';
import { LayoutDashboard, FileText, Image as ImageIcon, Settings, LogOut, Briefcase } from 'lucide-react';

import { BlogManager } from '../components/admin/BlogManager';
import { PortfolioManager } from '../components/admin/PortfolioManager';
import { ProjectManager } from '../components/admin/ProjectManager';
import { MediaLibrary } from '../components/admin/MediaLibrary';
import { SiteSettings } from '../components/admin/SiteSettings';

type Tab = 'overview' | 'blogs' | 'portfolio' | 'projects' | 'media' | 'settings';

export const CMSDashboard = () => {
  const { user } = useCMS();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: LayoutDashboard }, // using LayoutDashboard for projects? Let's assume
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex-shrink-0 flex flex-col h-[calc(100vh-6rem)] rounded-3xl shadow-sm overflow-hidden sticky top-24">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black font-display uppercase tracking-tighter">Admin Panel</h2>
          <p className="text-xs text-gray-500 font-medium truncate mt-1">{user?.email}</p>
        </div>
        <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-left ${
                activeTab === item.id 
                  ? 'bg-mascot-black text-mascot-yellow' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-mascot-black'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => signOut(auth)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-500 hover:bg-red-50 transition-all text-left"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow pl-8">
        {activeTab === 'overview' && (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-display font-black uppercase mb-4">Welcome to the Dashboard</h2>
            <p className="text-gray-600 font-medium mb-6 leading-relaxed">
              From this admin panel, you can manage your blogs, portfolio, projects, and media. 
              You can also customize site-wide settings like your logo.
            </p>
            <div className="p-4 bg-mascot-yellow/20 text-mascot-black rounded-xl font-bold text-sm">
              Note: For any homepage/About inline text, you can browse to the page itself and hover over text blocks to live-edit them using the CMS content tool.
            </div>
          </div>
        )}
        {activeTab === 'blogs' && <BlogManager />}
        {activeTab === 'portfolio' && <PortfolioManager />}
        {activeTab === 'projects' && <ProjectManager />}
        {activeTab === 'media' && <MediaLibrary />}
        {activeTab === 'settings' && <SiteSettings />}
      </main>
    </div>
  );
};
