import React, { useState } from 'react';
import { Send, Mail, User, MessageSquare, Briefcase, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../services/firebase';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Mascot Design',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        projectType: formData.projectType,
        message: formData.message,
        createdAt: serverTimestamp()
      });
      setIsSubmitted(true);
      setFormData({ name: '', email: '', projectType: 'Mascot Design', message: '' });
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'messages');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-display font-black text-5xl md:text-7xl mb-6 uppercase tracking-tight">
            Let's <span className="text-mascot-yellow">Talk</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Ready to bring your brand to life with a custom character or identity? Fill out the form below and we'll start brewing ideas.
          </p>
        </div>

        <div className="bg-white rounded-4xl p-8 md:p-12 shadow-elevated border border-gray-100">
          {isSubmitted ? (
            <div className="text-center py-16 animate-enter-up">
              <div className="w-20 h-20 bg-mascot-yellow text-mascot-black rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={40} />
              </div>
              <h2 className="font-display font-black text-3xl mb-4 uppercase">Message Sent!</h2>
              <p className="text-gray-600 font-medium">
                Thanks for reaching out! I'll get back to you within 24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-mascot-gray border-none focus:ring-2 focus:ring-mascot-yellow pl-12 pr-4 py-4 rounded-xl font-medium placeholder-gray-400 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                    Your Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-mascot-gray border-none focus:ring-2 focus:ring-mascot-yellow pl-12 pr-4 py-4 rounded-xl font-medium placeholder-gray-400 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label htmlFor="projectType" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                  Project Type
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-mascot-gray border-none focus:ring-2 focus:ring-mascot-yellow pl-12 pr-4 py-4 rounded-xl font-medium text-mascot-black outline-none transition-all appearance-none"
                  >
                    <option value="Mascot Design">Mascot Design</option>
                    <option value="Logo Design">Logo Design</option>
                    <option value="Branding/Identity">Branding & Identity</option>
                    <option value="Game UI/Assets">Game UI / Assets</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-widest text-gray-500">
                  Project Details
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-6 text-gray-400" size={20} />
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-mascot-gray border-none focus:ring-2 focus:ring-mascot-yellow pl-12 pr-4 py-4 rounded-xl font-medium placeholder-gray-400 outline-none transition-all resize-none"
                    placeholder="Tell me about your project context, timeline, and goals..."
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-mascot-black text-white hover:bg-mascot-yellow hover:text-mascot-black font-bold uppercase tracking-widest py-5 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
