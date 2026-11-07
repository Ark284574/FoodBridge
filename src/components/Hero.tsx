import { useState, useEffect, type CSSProperties } from 'react';
import { ArrowRight, Clock, ShieldCheck, Thermometer } from 'lucide-react';
import type { DemoFlow } from '@/data/content';

interface HeroProps {
  onOpenFlow: (flowId: DemoFlow['id']) => void;
}

const enterDelay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties;

export default function Hero({ onOpenFlow }: HeroProps) {
  const [clock, setClock] = useState('18:42:10 UTC');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClock(now.toTimeString().split(' ')[0] + ' UTC');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-36 sm:pt-40 lg:pb-32 lg:pt-44">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        
        {/* Left Copy Column */}
        <div className="lg:col-span-6 lg:pr-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-forest-700/20 bg-forest-50 px-3.5 py-1 text-xs font-semibold text-forest-700 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Hyperlocal Logistics &bull; Door-to-Plate in &lt; 38 Mins</span>
          </div>

          <h1
            className="display hero-enter mt-6 text-5xl leading-[1.04] text-forest-700 sm:text-6xl lg:text-[4.2rem]"
            style={enterDelay(120)}
          >
            Good food deserves a <span className="italic text-terracotta-700">destination</span>, not a dustbin.
          </h1>

          <p className="hero-enter mt-6 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl" style={enterDelay(240)}>
            FoodBridge links commercial kitchens, hotels and caterers with surplus food to the NGOs and community shelters that can serve it — with temperature-controlled transit and certified carbon offset receipts.
          </p>

          <div className="hero-enter mt-8 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center" style={enterDelay(360)}>
            <button type="button" onClick={() => onOpenFlow('donate')} className="btn-primary !bg-forest-700 !text-ivory-100 hover:!bg-forest-800 shadow-md">
              Donate surplus food
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold text-forest-700">
              <button type="button" onClick={() => onOpenFlow('volunteer')} className="underline decoration-forest-700/30 underline-offset-4 transition-colors hover:text-terracotta-700 hover:decoration-terracotta-700">
                Volunteer Driver
              </button>
              <button type="button" onClick={() => onOpenFlow('partner')} className="underline decoration-forest-700/30 underline-offset-4 transition-colors hover:text-terracotta-700 hover:decoration-terracotta-700">
                Partner as an NGO
              </button>
            </div>
          </div>

          {/* Telemetry Counter Strip */}
          <div className="hero-enter mt-12 grid grid-cols-3 gap-6 border-t border-forest-900/10 pt-6" style={enterDelay(480)}>
            <div>
              <div className="font-serif text-3xl font-bold text-forest-800">2.4M+</div>
              <div className="text-xs font-medium text-ink-500">Meals Rescued</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-forest-800">380+</div>
              <div className="text-xs font-medium text-ink-500">Vetted Shelters</div>
            </div>
            <div>
              <div className="font-serif text-3xl font-bold text-emerald-700">100%</div>
              <div className="text-xs font-medium text-ink-500">Hygiene Audited</div>
            </div>
          </div>
        </div>

        {/* Right Mission Control Telemetry Visual */}
        <div className="relative lg:col-span-6">
          <div className="hero-enter relative mx-auto w-full max-w-xl rounded-3xl border border-forest-800/40 bg-forest-950 p-5 text-ivory-100 shadow-2xl lg:max-w-none" style={enterDelay(200)}>
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-forest-800/80 pb-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-ivory-200">
                <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE DISPATCH RADAR #FB-904</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-emerald-400 bg-forest-900/90 px-2 py-0.5 rounded border border-forest-800">
                <Clock className="h-3 w-3" />
                <span>{clock}</span>
              </div>
            </div>

            {/* Radar Canvas */}
            <div className="relative my-4 h-64 overflow-hidden rounded-2xl bg-forest-900/90 border border-forest-800/80">
              {/* Radar Grid Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
              
              {/* Animated Conic Radar Sweep */}
              <div className="absolute -inset-10 animate-spin opacity-20 bg-[conic-gradient(from_0deg,transparent_0deg,#10b981_50deg,transparent_51deg)] pointer-events-none" style={{ animationDuration: '8s' }} />

              {/* Vector Route Line */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 460 250">
                <path
                  d="M 80 65 Q 180 40 240 125 T 370 185"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>

              {/* Node 1: Commercial Donor */}
              <div className="absolute left-6 top-8 z-10 flex items-center gap-2 rounded-xl bg-forest-950/95 p-2.5 border border-forest-700 shadow-lg">
                <span className="text-xl">👨‍🍳</span>
                <div className="text-[11px] leading-tight">
                  <strong className="block text-ivory-100 font-bold">The Grand Promenade</strong>
                  <span className="text-emerald-400">55 Hot Servings &bull; Ready</span>
                </div>
              </div>

              {/* Node 2: Courier Van */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-2 rounded-full bg-emerald-600/30 border border-emerald-400 p-2 shadow-lg backdrop-blur-sm">
                <span className="text-lg">🚐</span>
                <div className="text-[10px] leading-tight pr-2">
                  <span className="block font-bold text-ivory-100">Eco-Van #18</span>
                  <span className="text-emerald-300 flex items-center gap-1 font-mono">
                    <Thermometer className="h-2.5 w-2.5" /> 65.4°C Safe
                  </span>
                </div>
                <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[9px] font-black text-white">ETA 12m</span>
              </div>

              {/* Node 3: Shelter Destination */}
              <div className="absolute right-6 bottom-6 z-10 flex items-center gap-2 rounded-xl bg-forest-950/95 p-2.5 border border-terracotta-500/50 shadow-lg">
                <span className="text-xl">🏠</span>
                <div className="text-[11px] leading-tight">
                  <strong className="block text-ivory-100 font-bold">Hope Haven Youth Shelter</strong>
                  <span className="text-terracotta-300">65 Children Awaiting Lunch</span>
                </div>
              </div>
            </div>

            {/* Bottom Live Feed */}
            <div className="flex items-center justify-between rounded-xl bg-forest-900/60 p-2.5 text-xs border border-forest-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span className="text-ivory-200">
                  <strong className="text-emerald-400">Delivered 4m ago:</strong> 85 Artisan breads to St. Jude Family Shelter
                </span>
              </div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">Verified</span>
            </div>
          </div>

          {/* Floating Metric Badges */}
          <div className="float-soft absolute -bottom-6 -left-6 z-20 flex items-center gap-3 rounded-2xl bg-forest-800 border border-forest-700 p-3.5 text-ivory-100 shadow-xl">
            <span className="text-2xl">🌱</span>
            <div className="text-xs">
              <strong className="block font-bold text-ivory-100">1,225 Metric Tons</strong>
              <span className="text-emerald-400">CO2e Emissions Diverted</span>
            </div>
          </div>

          <div className="float-soft absolute -top-5 -right-5 z-20 flex items-center gap-3 rounded-2xl bg-forest-800 border border-forest-700 p-3.5 text-ivory-100 shadow-xl" style={{ animationDelay: '-3s' }}>
            <span className="text-2xl">⚡</span>
            <div className="text-xs">
              <strong className="block font-bold text-ivory-100">&lt; 38 Minutes</strong>
              <span className="text-harvest-300">Average Dispatch Speed</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
