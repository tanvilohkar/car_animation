'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';
import { TrendingUp, ArrowDown, Sparkles, CheckCircle2, ShieldAlert, Award } from 'lucide-react';
import { engineAudio } from '@/utils/engineAudio';

interface CarHeroProps {
  headlightsOn: boolean;
  isAutoDriving: boolean;
  setIsAutoDriving: (v: boolean) => void;
  onTelemetryUpdate: (progress: number, speedKmH: number) => void;
}

const STATS_DATA = [
  {
    id: 'box1',
    value: 58,
    unit: '%',
    title: 'Pick-Up Point Adoption',
    desc: 'Surge in autonomous locker and designated pickup hub routing',
    color: '#def54f',
    textColor: 'text-black',
    bgBadge: 'bg-black/10',
    border: 'border-[#def54f]/50',
    shadow: 'shadow-[0_10px_30px_rgba(222,245,79,0.35)]',
    position: 'top-[6%] md:top-[8%] left-[28%] md:left-[35%]',
  },
  {
    id: 'box2',
    value: 23,
    unit: '%',
    title: 'Inbound Call Drop',
    desc: 'Drastic reduction in manual customer support resolution calls',
    color: '#6ac9ff',
    textColor: 'text-black',
    bgBadge: 'bg-black/10',
    border: 'border-[#6ac9ff]/50',
    shadow: 'shadow-[0_10px_30px_rgba(106,201,255,0.35)]',
    position: 'bottom-[6%] md:bottom-[8%] left-[45%] md:left-[52%]',
  },
  {
    id: 'box3',
    value: 27,
    unit: '%',
    title: 'Fleet Dispatch Velocity',
    desc: 'Accelerated transit throughput with zero idle bottleneck',
    color: '#ffffff',
    textColor: 'text-white',
    bgBadge: 'bg-white/10',
    border: 'border-white/30',
    shadow: 'shadow-[0_10px_30px_rgba(255,255,255,0.2)]',
    position: 'top-[6%] md:top-[8%] right-[18%] md:right-[24%]',
  },
  {
    id: 'box4',
    value: 40,
    unit: '%',
    title: 'Operational Efficiency',
    desc: 'Overall milestone completion and route sustainability gain',
    color: '#fa7328',
    textColor: 'text-white',
    bgBadge: 'bg-black/20',
    border: 'border-[#fa7328]/50',
    shadow: 'shadow-[0_10px_30px_rgba(250,115,40,0.35)]',
    position: 'bottom-[6%] md:bottom-[8%] right-[4%] md:right-[8%]',
  },
];

const HERO_INTRO_LETTERS = [
  'I', 'T', 'Z', 'F', 'I', 'Z', 'Z',
];

const ROAD_LETTERS = [
  'W', 'E', 'L', 'C', 'O', 'M', 'E',
  ' ',
  'I', 'T', 'Z', 'F', 'I', 'Z', 'Z',
];

export const CarHero: React.FC<CarHeroProps> = ({
  headlightsOn,
  isAutoDriving,
  setIsAutoDriving,
  onTelemetryUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const finishLineRef = useRef<HTMLDivElement>(null);

  // Initial load animated counters
  const [initialCount, setInitialCount] = useState({
    pickup: 0,
    calls: 0,
    velocity: 0,
    efficiency: 0,
  });

  const celebrationTriggered = useRef(false);

  // Initial load animation for hero headline and initial stats
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Initial Load Staggered Headline Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-intro-badge',
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.2 }
      );

      tl.fromTo(
        '.hero-intro-title span',
        { opacity: 0, y: 40, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.04,
        },
        '-=0.5'
      );

      tl.fromTo(
        '.hero-intro-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      );

      tl.fromTo(
        '.hero-stat-pill',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
        },
        '-=0.4'
      );

      tl.fromTo(
        '.scroll-prompt',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      );

      // Number count-up on load
      const counterObj = { pickup: 0, calls: 0, velocity: 0, efficiency: 0 };
      gsap.to(counterObj, {
        pickup: 58,
        calls: 23,
        velocity: 27,
        efficiency: 40,
        duration: 2.2,
        ease: 'power2.out',
        delay: 0.5,
        onUpdate: () => {
          setInitialCount({
            pickup: Math.round(counterObj.pickup),
            calls: Math.round(counterObj.calls),
            velocity: Math.round(counterObj.velocity),
            efficiency: Math.round(counterObj.efficiency),
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Scroll-based GSAP ScrollTrigger animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const car = carRef.current;
    const trail = trailRef.current;
    const road = roadRef.current;
    const textContainer = textContainerRef.current;
    if (!car || !trail || !road || !textContainer) return;

    const letters = textContainer.querySelectorAll<HTMLSpanElement>('.track-letter');

    // Calculate letter positions relative to the road
    const updateLetterPositions = () => {
      const roadRect = road.getBoundingClientRect();
      const posMap: { element: HTMLSpanElement; x: number }[] = [];
      letters.forEach((el) => {
        const rect = el.getBoundingClientRect();
        posMap.push({
          element: el,
          x: rect.left - roadRect.left + rect.width / 2,
        });
      });
      return posMap;
    };

    let letterPositions = updateLetterPositions();
    const handleRefresh = () => {
      letterPositions = updateLetterPositions();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleRefresh);
    window.addEventListener('load', handleRefresh);
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(handleRefresh);
    }
    const t1 = setTimeout(handleRefresh, 150);
    const t2 = setTimeout(handleRefresh, 600);

    const trackTrigger = trackRef.current || containerRef.current;

    const ctx = gsap.context(() => {
      // Ensure car preserves vertical centering with GSAP transforms
      gsap.set(car, { yPercent: -50 });

      const updateCarScene = (p: number) => {
        const roadWidth = road.offsetWidth || window.innerWidth;
        const carWidth = car.offsetWidth || 180;
        const totalTravel = Math.max(0, roadWidth - carWidth);
        const currentX = p * totalTravel;
        const carCenterX = currentX + carWidth * 0.75;

        // Update trail width
        if (trail) {
          trail.style.width = `${currentX + carWidth * 0.25}px`;
        }

        // Reveal letters as car passes over them
        letterPositions.forEach((item) => {
          if (carCenterX >= item.x) {
            item.element.style.opacity = '1';
            item.element.style.color = '#ffffff';
            item.element.style.textShadow = '0 0 25px rgba(222, 245, 79, 0.8), 0 0 10px rgba(69, 219, 125, 0.6)';
            item.element.style.transform = 'scale(1.05) translateY(-2px)';
          } else {
            item.element.style.opacity = '0.15';
            item.element.style.color = '#64748b';
            item.element.style.textShadow = 'none';
            item.element.style.transform = 'scale(1) translateY(0px)';
          }
        });

        // Telemetry update
        const speed = Math.round(p * 341);
        onTelemetryUpdate(p, speed);

        // Engine sound stays active and revs continuously with car travel
        engineAudio.resume();
        engineAudio.updateRPM(p);

        // Finish line confetti trigger
        if (p >= 0.96 && !celebrationTriggered.current) {
          celebrationTriggered.current = true;
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#def54f', '#6ac9ff', '#fa7328', '#45db7d', '#ffffff'],
          });
        } else if (p < 0.9) {
          celebrationTriggered.current = false;
        }
      };

      // Master Pinned Kinetic Timeline (GSAP Native Pinning - 100% Reliable on Netlify & All Devices)
      const trackTl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current || containerRef.current,
          pin: true,
          start: 'top top',
          end: '+=2500',
          scrub: 1.1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateCarScene(self.progress);
          },
          onLeave: () => {
            engineAudio.idle();
          },
          onLeaveBack: () => {
            engineAudio.idle();
          },
          onEnter: () => {
            engineAudio.resume();
          },
          onEnterBack: () => {
            engineAudio.resume();
          },
        },
      });

      // 1. Car smooth glide across the runway
      trackTl.to(car, {
        x: () => Math.max(0, (road.offsetWidth || window.innerWidth) - (car.offsetWidth || 180)),
        ease: 'none',
        duration: 1,
      }, 0);

      // 2. Box 1 (58% Pickup) appears at 15% of track
      trackTl.fromTo(
        '#box1',
        { opacity: 0, scale: 0.75, y: -30, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' },
        0.15
      );

      // 3. Box 2 (23% Call Deflection) appears at 35% of track
      trackTl.fromTo(
        '#box2',
        { opacity: 0, scale: 0.75, y: 30, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' },
        0.35
      );

      // 4. Box 3 (27% Fleet Velocity) and Box 4 (40% Orange Efficiency) appear TOGETHER at 55% of track
      trackTl.fromTo(
        '#box3',
        { opacity: 0, scale: 0.75, y: -30, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' },
        0.55
      );
      trackTl.fromTo(
        '#box4',
        { opacity: 0, scale: 0.75, y: 30, filter: 'blur(8px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.12, ease: 'power2.out' },
        0.55
      );
    }, containerRef);

    // Unlock Web Audio on first user interaction
    const unlockAudio = () => {
      engineAudio.resume();
    };
    const events = ['click', 'pointerdown', 'mousedown', 'touchstart', 'touchend', 'keydown', 'wheel', 'scroll'];
    events.forEach((evt) => {
      window.addEventListener(evt, unlockAudio, { passive: true });
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleRefresh);
      window.removeEventListener('load', handleRefresh);
      events.forEach((evt) => {
        window.removeEventListener(evt, unlockAudio);
      });
      ctx.revert();
    };
  }, [onTelemetryUpdate]);

  // Auto-Cruise control
  useEffect(() => {
    let animId: number;
    if (isAutoDriving && containerRef.current) {
      const container = containerRef.current;
      const targetScroll = container.offsetTop + container.offsetHeight - window.innerHeight;
      const startScroll = window.scrollY;
      const duration = 6500; // 6.5s smooth cruise
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(1, elapsed / duration);
        // smooth easeInOutCubic
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo(0, startScroll + (targetScroll - startScroll) * ease);

        if (t < 1 && isAutoDriving) {
          animId = requestAnimationFrame(step);
        } else {
          setIsAutoDriving(false);
          engineAudio.updateRPM(1.0);
        }
      };

      animId = requestAnimationFrame(step);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isAutoDriving, setIsAutoDriving]);

  const scrollToTrack = useCallback(() => {
    engineAudio.resume();
    if (trackRef.current) {
      const offset = trackRef.current.offsetTop;
      window.scrollTo({ top: offset + 10, behavior: 'smooth' });
    } else if (containerRef.current) {
      const offset = containerRef.current.offsetTop;
      window.scrollTo({ top: offset + window.innerHeight * 0.4, behavior: 'smooth' });
    }
  }, []);

  return (
    <div id="hero" className="relative w-full bg-[#090a0f]" ref={containerRef}>
      {/* 
        ========================================================================
        1. FIRST SCREEN: ABOVE THE FOLD HERO INTRO (Requirement 1 & 2)
        ========================================================================
      */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-12 sm:pt-16 md:pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto z-20">
        {/* Subtle decorative glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#def54f]/10 via-[#45db7d]/10 to-[#6ac9ff]/10 blur-[130px] rounded-full pointer-events-none" />

        {/* Top Badges & Headline */}
        <div className="mt-4 md:mt-8 flex flex-col items-center text-center">
          {/* Tagline Badge */}
          <div className="hero-intro-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider text-slate-300 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#def54f] animate-pulse" />
            <span>KINETIC SCROLL ANIMATION ENGINE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#def54f]" />
            <span className="text-[#def54f]">MCLAREN 720S</span>
          </div>

          {/* Main Headline: ITZFIZZ (Letter-Spaced) */}
          <h1 className="hero-intro-title flex flex-wrap justify-center text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.25em] sm:tracking-[0.35em] text-white uppercase select-none drop-shadow-2xl">
            {HERO_INTRO_LETTERS.map((char, idx) => (
              <span
                key={idx}
                className="inline-block transition-transform hover:scale-110 hover:text-[#def54f] cursor-default"
              >
                {char === ' ' ? '\u00A0\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="hero-intro-subtitle mt-6 text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
            Experience next-generation scroll-driven physics. Seamlessly glide the McLaren 720S along the kinetic track to unveil real-time operational impact benchmarks.
          </p>
        </div>

        {/* Initial Load Statistics Cards (Requirement 1 & 2) */}
        <div id="stats" className="my-8 md:my-12">
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-mono tracking-widest text-slate-400">
              Impact Metrics & Live Telemetry
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="hero-stat-pill glass-card p-6 rounded-2xl border border-[#def54f]/30 relative overflow-hidden group hover:border-[#def54f] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#def54f]/10 rounded-full blur-2xl group-hover:bg-[#def54f]/20 transition-all pointer-events-none" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-slate-400">PICKUP HUBS</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#def54f]/20 text-[#def54f] border border-[#def54f]/40">
                  +SURGE
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-black font-mono text-[#def54f] tracking-tight">
                {initialCount.pickup}%
              </div>
              <p className="mt-2 text-xs text-slate-300 font-medium">
                Increase in automated pick-up point usage across smart corridors.
              </p>
            </div>

            {/* Metric 2 */}
            <div className="hero-stat-pill glass-card p-6 rounded-2xl border border-[#6ac9ff]/30 relative overflow-hidden group hover:border-[#6ac9ff] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#6ac9ff]/10 rounded-full blur-2xl group-hover:bg-[#6ac9ff]/20 transition-all pointer-events-none" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-slate-400">CALL DEFLECTION</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#6ac9ff]/20 text-[#6ac9ff] border border-[#6ac9ff]/40">
                  -REDUCTION
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-black font-mono text-[#6ac9ff] tracking-tight">
                {initialCount.calls}%
              </div>
              <p className="mt-2 text-xs text-slate-300 font-medium">
                Decrease in inbound customer inquiries via autonomous status telemetry.
              </p>
            </div>

            {/* Metric 3 */}
            <div className="hero-stat-pill glass-card p-6 rounded-2xl border border-white/20 relative overflow-hidden group hover:border-white transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/15 transition-all pointer-events-none" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-slate-400">ROUTE VELOCITY</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/15 text-white border border-white/30">
                  +THROUGHPUT
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-black font-mono text-white tracking-tight">
                {initialCount.velocity}%
              </div>
              <p className="mt-2 text-xs text-slate-300 font-medium">
                Faster localized delivery dispatches with zero terminal congestion.
              </p>
            </div>

            {/* Metric 4 */}
            <div className="hero-stat-pill glass-card p-6 rounded-2xl border border-[#fa7328]/30 relative overflow-hidden group hover:border-[#fa7328] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#fa7328]/10 rounded-full blur-2xl group-hover:bg-[#fa7328]/20 transition-all pointer-events-none" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-slate-400">EFFICIENCY GAIN</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fa7328]/20 text-[#fa7328] border border-[#fa7328]/40">
                  +OPTIMIZED
                </span>
              </div>
              <div className="text-4xl md:text-5xl font-black font-mono text-[#fa7328] tracking-tight">
                {initialCount.efficiency}%
              </div>
              <p className="mt-2 text-xs text-slate-300 font-medium">
                Overall operational performance and SLA delivery enhancement.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Callout Button / Indicator */}
        <div className="scroll-prompt flex flex-col items-center justify-center gap-2">
          <button
            onClick={scrollToTrack}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-[#def54f] transition-colors py-2 px-4 rounded-full bg-white/5 border border-white/10 hover:border-[#def54f]/50"
          >
            <span>Scroll Down to Accelerate</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#def54f]" />
          </button>
        </div>
      </section>

      {/* 
        ========================================================================
        2. PINNED KINETIC TRACK & SCROLL-DRIVEN ANIMATION (Core Feature 3 & 4)
        ========================================================================
      */}
      <div className="relative w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-[#0a0b10]" ref={trackRef}>
          
          <div className="absolute top-16 md:top-20 left-0 right-0 z-20 px-6 max-w-7xl mx-auto flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#45db7d] animate-ping" />
              <span className="font-mono text-xs text-slate-300 uppercase tracking-widest font-semibold">
                Live Kinetic Runway
              </span>
            </div>
            <div className="text-right font-mono text-xs text-slate-400">
              <span className="text-[#def54f]">McLaren 720S</span> • Twin-Turbo 4.0L V8
            </div>
          </div>

          {/* Floating Impact Metric Cards */}
          {STATS_DATA.map((box) => (
            <div
              key={box.id}
              id={box.id}
              className={`absolute z-30 ${box.position} p-5 md:p-6 rounded-2xl backdrop-blur-xl border ${box.border} ${box.shadow} max-w-[280px] sm:max-w-[320px] transition-all duration-300 opacity-0 pointer-events-auto`}
              style={{
                backgroundColor:
                  box.id === 'box1'
                    ? '#def54f'
                    : box.id === 'box2'
                    ? '#6ac9ff'
                    : box.id === 'box3'
                    ? '#1e2029'
                    : '#fa7328',
              }}
            >
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl md:text-5xl font-black font-mono tracking-tight ${box.textColor}`}>
                  {box.value}%
                </span>
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${box.textColor} opacity-80`}>
                  {box.title}
                </span>
              </div>
              <p className={`mt-2 text-xs md:text-sm font-medium leading-relaxed ${box.textColor} opacity-90`}>
                {box.desc}
              </p>
            </div>
          ))}

          {/* Runway */}
          <div
            id="road"
            ref={roadRef}
            className="road-surface relative w-full h-[220px] sm:h-[250px] md:h-[280px] border-y border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.9)] flex items-center"
          >
            <div className="road-centerline" />
            <div id="trail" ref={trailRef} className="tire-trail" style={{ width: '0px' }} />

            <div
              ref={finishLineRef}
              className="absolute right-0 top-0 bottom-0 w-12 z-10 flex flex-col justify-between opacity-80"
              style={{
                backgroundImage: `
                  repeating-conic-gradient(#fff 0% 25%, #000 0% 50%) 
                  50% / 20px 20px
                `,
                borderLeft: '3px solid #def54f',
              }}
            >
              <div className="absolute -left-14 top-2 text-[10px] font-mono font-bold text-[#def54f] uppercase tracking-wider rotate-90 origin-right">
                FINISH
              </div>
            </div>

            <div
              ref={textContainerRef}
              className="absolute inset-0 flex items-center justify-start pl-8 md:pl-16 z-20 pointer-events-none select-none overflow-hidden"
            >
              <div className="flex items-center gap-1 sm:gap-2.5 md:gap-4 font-black text-4xl sm:text-6xl md:text-8xl tracking-widest">
                {ROAD_LETTERS.map((char, index) => (
                  <span
                    key={index}
                    className="track-letter transition-all duration-150 inline-block font-sans uppercase font-black"
                    style={{
                      opacity: 0.15,
                      color: '#64748b',
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            </div>

            {/* McLaren 720S */}
            <div
              ref={carRef}
              id="car"
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 cursor-grab will-change-transform"
              style={{
                width: '180px',
                height: '110px',
              }}
            >
              <img
                src="/car.png"
                alt="McLaren 720S Top View"
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] select-none pointer-events-none"
                draggable={false}
              />
              {headlightsOn && <div className="headlight-cone" />}
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-20 px-6 max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-slate-400 pointer-events-none">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#def54f]" /> 01 Acceleration
              </span>
              <span className="flex items-center gap-1.5 hidden sm:inline-flex">
                <span className="w-2 h-2 rounded-full bg-[#6ac9ff]" /> 02 Mid-Track Scrub
              </span>
              <span className="flex items-center gap-1.5 hidden sm:inline-flex">
                <span className="w-2 h-2 rounded-full bg-[#fa7328]" /> 03 Top Velocity
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span>Scroll Drag: Fluid Physics (1.1s Inertia)</span>
            </div>
          </div>
      </div>
    </div>
  );
};
