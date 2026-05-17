import React from 'react';
import { Zap, Star, PenTool, Hexagon, Circle, Triangle, Crosshair, MousePointer2 } from 'lucide-react';

export const BackgroundDoodles: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
      {/* Top Left Cluster */}
      <div className="absolute top-[10%] left-[5%] text-mascot-yellow animate-float blur-[2px]">
        <Zap size={64} strokeWidth={3} fill="currentColor" className="opacity-20" />
      </div>
      <div className="absolute top-[15%] left-[8%] text-accent-brown animate-float-delayed blur-[1px]">
        <Crosshair size={32} strokeWidth={4} className="opacity-30" />
      </div>

      {/* Top Right Cluster */}
      <div className="absolute top-[5%] right-[10%] text-mascot-black animate-spin-slow opacity-5">
        <Hexagon size={120} strokeWidth={1} />
      </div>
      <div className="absolute top-[20%] right-[5%] text-accent-blue animate-float blur-[3px]">
        <Star size={48} strokeWidth={3} fill="currentColor" className="opacity-20" />
      </div>

      {/* Middle Left */}
      <div className="absolute top-[45%] left-[-2%] text-mascot-black animate-spin-slow opacity-5">
         <Circle size={200} strokeWidth={4} strokeDasharray="10 10" />
      </div>
      <div className="absolute top-[50%] left-[5%] text-accent-brown animate-float-fast blur-[1px]">
         <PenTool size={56} strokeWidth={2} className="opacity-20 transform -rotate-45" />
      </div>

      {/* Middle Right */}
      <div className="absolute top-[60%] right-[10%] text-mascot-yellow animate-float-delayed">
        <Triangle size={64} strokeWidth={4} className="opacity-30 transform rotate-12" />
      </div>

      {/* Bottom Area */}
      <div className="absolute bottom-[10%] left-[20%] text-gray-300 animate-float blur-[4px]">
        <MousePointer2 size={80} strokeWidth={1} className="opacity-40" />
      </div>
      <div className="absolute bottom-[15%] right-[20%] text-mascot-yellow animate-pulse-slow blur-[5px]">
         <div className="w-32 h-32 rounded-full bg-mascot-yellow opacity-20"></div>
      </div>

      {/* Random Dots/Speckles */}
      <div className="absolute top-[30%] left-[40%] w-4 h-4 bg-black rounded-full opacity-10 animate-float"></div>
      <div className="absolute top-[70%] right-[40%] w-6 h-6 bg-accent-blue rounded-full opacity-10 animate-float-delayed"></div>
      <div className="absolute bottom-[5%] left-[50%] w-3 h-3 bg-accent-red rounded-full opacity-20 animate-float-fast"></div>
    </div>
  );
};