'use client';

import React from 'react';
import { Gauge, Cpu, Zap, Activity, Flame, Shield, Compass, CheckCircle } from 'lucide-react';

export const SpecsSection: React.FC = () => {
  return (
    <section id="specs" className="relative py-24 px-4 md:px-8 max-w-7xl mx-auto z-20 border-t border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#def54f]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#def54f] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>AERODYNAMIC TELEMETRY & SPECS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
            McLaren 720S <span className="text-slate-400 font-light">&</span> Motion Architecture
          </h2>
        </div>
        <p className="text-slate-400 max-w-md text-sm leading-relaxed">
          Engineered for raw kinetic power. Paired with GSAP ScrollTrigger hardware-accelerated transforms to achieve flawless 120 FPS visual fidelity.
        </p>
      </div>

      {/* Grid of Supercar Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Spec 1 */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-[#def54f]/50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-2xl bg-[#def54f]/10 border border-[#def54f]/30 flex items-center justify-center text-[#def54f] mb-6 group-hover:scale-110 transition-transform">
            <Flame className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black font-mono text-white mb-2">
            710 <span className="text-lg font-bold text-slate-400">BHP</span>
          </div>
          <h3 className="text-base font-bold text-white mb-2">4.0L M840T Twin-Turbo V8</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mid-mounted powerhouse producing 770 Nm of torque, driving the rear wheels with lightning dual-clutch responsiveness.
          </p>
        </div>

        {/* Spec 2 */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-[#6ac9ff]/50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-2xl bg-[#6ac9ff]/10 border border-[#6ac9ff]/30 flex items-center justify-center text-[#6ac9ff] mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black font-mono text-white mb-2">
            2.8 <span className="text-lg font-bold text-slate-400">SEC</span>
          </div>
          <h3 className="text-base font-bold text-white mb-2">0 - 100 KM/H Sprint</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Sub-3-second acceleration with launch control and proactive chassis control II for optimal cornering grip.
          </p>
        </div>

        {/* Spec 3 */}
        <div className="glass-card p-8 rounded-3xl border border-white/10 hover:border-[#fa7328]/50 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-2xl bg-[#fa7328]/10 border border-[#fa7328]/30 flex items-center justify-center text-[#fa7328] mb-6 group-hover:scale-110 transition-transform">
            <Gauge className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black font-mono text-white mb-2">
            341 <span className="text-lg font-bold text-slate-400">KM/H</span>
          </div>
          <h3 className="text-base font-bold text-white mb-2">Maximum Terminal Velocity</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Active aerodynamic rear wing functioning as an airbrake during high-speed deceleration.
          </p>
        </div>
      </div>

      {/* Engineering & Code Quality Badges */}
      <div className="glass-card p-8 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#45db7d]" />
          Frontend Animation Compliance & Performance Standards
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-[#def54f] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-white block">Transform Compositing</span>
              Zero layout reflows; relies exclusively on transform translations and opacity.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-[#6ac9ff] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-white block">GSAP ScrollTrigger Scrub</span>
              Fluid 1.1s inertia interpolation eliminating jitter and mouse wheel stutter.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-[#fa7328] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-white block">Dynamic Letter Coordinates</span>
              Real-time bounding math coordinates for dynamic text unveiling as the car passes.
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-4 h-4 text-[#45db7d] mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-white block">Next.js & React 18</span>
              Clean unmount cleanup via gsap.context revert with full SSR hydration safety.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
