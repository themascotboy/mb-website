import React, { useState } from 'react';
import { Sparkles, Loader2, Copy } from 'lucide-react';
import { Button } from './Button';
import { generateMascotConcept } from '../services/geminiService';

export const MascotGenerator: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [industry, setIndustry] = useState('');
  const [vibe, setVibe] = useState('Energetic');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !industry) return;

    setLoading(true);
    setError('');
    setResult('');

    try {
      const concept = await generateMascotConcept(brandName, industry, vibe);
      setResult(concept);
    } catch (err) {
      setError('System overload. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-[2.5rem]">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 bg-mascot-yellow rounded-2xl flex items-center justify-center">
           <Sparkles className="text-mascot-black w-6 h-6" />
        </div>
        <h3 className="text-3xl font-display font-black uppercase tracking-tighter italic">Generator</h3>
      </div>
      
      <p className="mb-10 font-medium text-gray-500 leading-relaxed text-sm">
        Stuck on a mascot idea? Provide your brand details and our AI will iterate a concept based on my design principles.
      </p>

      <form onSubmit={handleGenerate} className="space-y-6">
        <div>
          <label className="block font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-3">Brand Name</label>
          <input 
            type="text" 
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full p-5 bg-mascot-gray border border-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:border-mascot-black transition-all font-semibold text-lg"
            placeholder="RocketBurger"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
           <div>
              <label className="block font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-3">Industry</label>
              <input 
                type="text" 
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full p-5 bg-mascot-gray border border-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:border-mascot-black transition-all font-semibold text-lg"
                placeholder="Food"
              />
           </div>
           <div>
              <label className="block font-bold text-[10px] uppercase tracking-widest text-gray-400 mb-3">Vibe</label>
              <select 
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="w-full p-5 bg-mascot-gray border border-gray-100 rounded-2xl focus:outline-none focus:bg-white focus:border-mascot-black transition-all font-semibold text-lg appearance-none cursor-pointer"
              >
                <option>Energetic</option>
                <option>Friendly</option>
                <option>Aggressive</option>
                <option>Luxury</option>
                <option>Tech</option>
              </select>
           </div>
        </div>

        <Button type="submit" fullWidth disabled={loading} className="mt-4">
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={18} /> Brainstorming...
            </span>
          ) : (
            "Generate Brief"
          )}
        </Button>
      </form>

      {error && (
          <div className="mt-6 p-5 bg-red-50 text-red-500 rounded-2xl font-bold text-xs uppercase tracking-widest">
              {error}
          </div>
      )}

      {result && (
        <div className="mt-10 bg-mascot-gray p-8 rounded-3xl animate-enter-up border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold uppercase text-[10px] tracking-[0.2em] text-gray-400">Result</h4>
            <button className="text-gray-400 hover:text-mascot-black transition-colors" onClick={() => navigator.clipboard.writeText(result)}>
              <Copy size={16} />
            </button>
          </div>
          <p className="font-semibold text-gray-700 leading-relaxed italic">"{result}"</p>
        </div>
      )}
    </div>
  );
};