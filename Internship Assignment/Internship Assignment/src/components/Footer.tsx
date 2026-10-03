'use client';

import React from 'react';
import { ArrowUp, Flame, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 px-4 md:px-8 border-t border-white/10 bg-[#07080c] z-20">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#fa7328] via-[#def54f] to-[#45db7d] p-[1px]">
            <div className="w-full h-full bg-[#090a0f] rounded-[7px] flex items-center justify-center">
              <Flame className="w-4 h-4 text-[#def54f]" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-widest text-white font-mono">
              ITZFIZZ MOTORSPORT
            </span>
            <p className="text-[11px] text-slate-500">Scroll-Driven Hero Section Animation Assignment</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>NEXT.JS</span>
          <span>•</span>
          <span>REACT</span>
          <span>•</span>
          <span>GSAP SCROLLTRIGGER</span>
          <span>•</span>
          <span>TAILWIND CSS</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#def54f]/40 hover:text-[#def54f] text-xs font-mono text-slate-300 transition-all"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
