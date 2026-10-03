'use client';

import React, { useState } from 'react';
import { Gauge, Activity, Compass, Zap, Volume2, VolumeX } from 'lucide-react';
import { engineAudio } from '@/utils/engineAudio';

interface ScrollHUDProps {
  progress: number; // 0 to 1
  speedKmH: number; // 0 to 341
}

export const ScrollHUD: React.FC<ScrollHUDProps> = ({ progress, speedKmH }) => {
  const [isMuted, setIsMuted] = useState(false);
  const percent = Math.round(progress * 100);
  
  // Calculate gear based on speed
  let gear = 'N';
  if (speedKmH === 0) gear = 'P';
  else if (speedKmH < 40) gear = '1';
  else if (speedKmH < 90) gear = '2';
  else if (speedKmH < 150) gear = '3';
  else if (speedKmH < 210) gear = '4';
  else if (speedKmH < 270) gear = '5';
  else if (speedKmH < 320) gear = '6';
  else gear = '7';

  // RPM from 900 to 8200
  const rpm = Math.round(900 + (progress * 7300));

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-3">
      {/* Telemetry pill */}
      <div className="glass-card rounded-2xl px-5 py-3 border border-white/10 flex items-center gap-6 shadow-2xl backdrop-blur-2xl">
        {/* Speedometer */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-400">
            <Gauge className="w-3.5 h-3.5 text-[#def54f]" />
            <span>Velocity</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-2xl font-black font-mono text-white tracking-tight">
              {Math.round(speedKmH)}
            </span>
            <span className="text-xs font-semibold text-slate-400">KM/H</span>
          </div>
        </div>

        <div className="w-[1px] h-8 bg-white/10" />

        {/* Gear Box */}
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Gear</span>
          <div className="mt-0.5 w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-black text-sm text-[#def54f]">
            {gear}
          </div>
        </div>

        <div className="w-[1px] h-8 bg-white/10" />

        {/* RPM & Throttle */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-wider text-slate-400 gap-3">
            <span className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#6ac9ff]" /> RPM
            </span>
            <span className="font-mono text-[#6ac9ff]">{rpm}</span>
          </div>
          {/* RPM Mini bar */}
          <div className="w-24 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#45db7d] via-[#def54f] to-[#fa7328] transition-all duration-75"
              style={{ width: `${Math.min(100, Math.max(5, progress * 100))}%` }}
            />
          </div>
        </div>

        <div className="w-[1px] h-8 bg-white/10" />

        {/* Scroll Progress */}
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-slate-400">
            <Zap className="w-3 h-3 text-[#fa7328]" />
            <span>Scroll</span>
          </div>
          <div className="text-sm font-black font-mono text-slate-200 mt-0.5">
            {percent}%
          </div>
        </div>

        <div className="w-[1px] h-8 bg-white/10" />

        {/* Sound Control Button in HUD */}
        <button
          onClick={() => {
            const muted = engineAudio.toggleMute();
            setIsMuted(muted);
          }}
          title="Toggle V8 Sound"
          className="flex flex-col items-center gap-1 px-2 py-1 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-slate-400 hover:text-[#def54f] cursor-pointer"
        >
          <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider">
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-[#def54f]" />
            )}
            <span>V8 Sound</span>
          </div>
          <span
            className={`text-[10px] font-mono font-bold ${
              isMuted ? 'text-red-400' : 'text-[#def54f]'
            }`}
          >
            {isMuted ? 'MUTED' : 'ACTIVE'}
          </span>
        </button>
      </div>
    </div>
  );
};
