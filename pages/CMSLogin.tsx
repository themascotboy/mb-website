import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useCMS } from '../contexts/CMSContext';
import { Navigate } from 'react-router-dom';
import { Button } from '../components/Button';

export const CMSLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { user } = useCMS();

  if (user) {
    return (
      <div className="pt-32 pb-24 px-4 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-4xl shadow-elevated text-center max-w-md w-full">
          <h2 className="text-3xl font-display font-black uppercase mb-4">CMS Admin</h2>
          <p className="text-gray-500 font-medium mb-8">Logged in as {user.email}</p>
          <div className="flex flex-col gap-4">
            <p className="text-sm bg-mascot-yellow/20 text-mascot-black font-bold p-4 rounded-xl">
              You can now browse the site and click the edit icons that appear when hovering over text blocks to live-edit the content.
            </p>
            <Button 
                variant="secondary" 
                onClick={() => signOut(auth)}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-display font-black uppercase tracking-tighter mb-4 text-mascot-black">
            CMS <span className="text-mascot-yellow">Login</span>
          </h1>
          <p className="text-gray-500 font-medium">Access the live editor</p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-4xl p-8 shadow-elevated border border-gray-100 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-bold">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-mascot-gray border-none focus:ring-2 focus:ring-mascot-yellow px-4 py-4 rounded-xl font-medium outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-mascot-gray border-none focus:ring-2 focus:ring-mascot-yellow px-4 py-4 rounded-xl font-medium outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-mascot-black text-white hover:bg-mascot-yellow hover:text-mascot-black font-bold uppercase tracking-widest py-5 rounded-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Login to CMS
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-gray-500 bg-mascot-gray p-6 rounded-2xl">
          <span className="font-bold text-mascot-black block mb-2">Note to Admin:</span>
          To use this, make sure to enable <strong>Email/Password Authentication</strong> in the Firebase Console and create your admin account there.
        </div>
      </div>
    </div>
  );
};
