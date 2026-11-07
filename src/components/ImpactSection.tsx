import { useId, useState } from 'react';
import Reveal from '@/components/Reveal';
import EsgCertificateDialog from '@/components/EsgCertificateDialog';
import { Award, Droplets, Leaf, TrendingUp, Sparkles } from 'lucide-react';

const KG_PER_MEAL = 0.5;
const KG_PER_PICKUP = 60;

const DONOR_PRESETS = [
  { label: 'Artisan Bakery', kg: 45, desc: 'Breads & morning pastries' },
  { label: 'Urban Bistro', kg: 140, desc: 'Prepped proteins & sides' },
  { label: 'Convention Hotel', kg: 380, desc: 'Banquet & buffet catering' },
  { label: 'University Dining', kg: 650, desc: 'Campus food hall surplus' },
];

export default function ImpactSection() {
  const [weeklyKg, setWeeklyKg] = useState(140);
  const [isCertOpen, setIsCertOpen] = useState(false);
  const sliderId = useId();

  const meals = Math.round(weeklyKg / KG_PER_MEAL);
  const pickups = Math.max(1, Math.ceil(weeklyKg / KG_PER_PICKUP));
  const co2AvoidedKg = Math.round(weeklyKg * 2.5);
  const waterConservedLiters = Math.round(weeklyKg * 480);
  const estTaxDeduction = Math.round(weeklyKg * 6.2);
  const treesEquiv = (co2AvoidedKg / 21.7).toFixed(1);

  const fillPercent = Math.min(100, Math.max(0, ((weeklyKg - 20) / (800 - 20)) * 100));

  return (
    <section id="impact" className="relative py-24 sm:py-32 bg-ivory-100 overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-forest-400/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-forest-600/20 bg-forest-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest-800">
                <Sparkles className="h-3.5 w-3.5 text-harvest-600" />
                <span>Dynamic Impact Modeler</span>
              </div>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
                See how a single kitchen transforms into a community lifeline.
              </h2>
              <p className="mt-4 text-base text-ink-700 leading-relaxed max-w-xl">
                Slide below to estimate meals recovered, carbon diverted from municipal landfills, agricultural water conserved, and qualifying tax deductions.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={120}>
              <div className="rounded-2xl border border-harvest-500/50 bg-harvest-50 p-5 text-sm leading-relaxed text-harvest-900 shadow-sm">
                <p className="font-bold flex items-center gap-2">
                  <span>Verified Conversion Metrics</span>
                  <span className="rounded-full bg-harvest-200 px-2 py-0.5 text-[11px] font-mono">EPA / USDA Model</span>
                </p>
                <p className="mt-1.5 text-xs text-harvest-900/90">
                  Assumes standard 0.5 kg portion sizes, 2.5 kg CO₂e landfill emissions avoided per kg of organic food rescued, and standard non-profit fair-market tax write-offs.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Preset quick buttons */}
        <Reveal delay={80}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-500">Quick presets:</span>
            {DONOR_PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setWeeklyKg(preset.kg)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  weeklyKg === preset.kg
                    ? 'bg-forest-700 text-ivory-100 shadow-md ring-2 ring-forest-700/30'
                    : 'bg-ivory-200 text-ink-800 hover:bg-ivory-300'
                }`}
              >
                {preset.label} <span className="text-harvest-600 font-mono">({preset.kg} kg/wk)</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Main interactive panel */}
        <div className="mt-8 grid gap-10 rounded-[2.5rem] bg-white p-6 shadow-xl shadow-forest-900/5 ring-1 ring-ink-200 sm:p-12 lg:grid-cols-12 lg:gap-14">
          {/* Left slider column */}
          <Reveal className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <label htmlFor={sliderId} className="block font-serif text-2xl text-forest-700 sm:text-3xl">
                Weekly surplus kitchen output
              </label>
              
              <div className="mt-4 flex items-baseline gap-3 text-forest-800">
                <span className="font-serif text-6xl leading-none sm:text-7xl font-bold tracking-tight" aria-live="polite">
                  {weeklyKg}
                </span>
                <span className="text-xl font-semibold text-ink-600">kg / week</span>
              </div>

              <input
                id={sliderId}
                type="range"
                min={20}
                max={800}
                step={10}
                value={weeklyKg}
                onChange={(event) => setWeeklyKg(Number(event.target.value))}
                style={{ background: `linear-gradient(to right, #B9552F ${fillPercent}%, #DCD0B5 ${fillPercent}%)` }}
                className="impact-slider mt-8 h-2.5 w-full cursor-pointer appearance-none rounded-full"
              />
              <div className="mt-3 flex justify-between text-xs font-mono text-ink-500">
                <span>Small Cafe (20 kg)</span>
                <span>Mid-Size (400 kg)</span>
                <span>Institution (800 kg)</span>
              </div>

              <dl className="mt-8 space-y-3.5 border-t border-ink-200/80 pt-6 text-sm text-ink-700">
                <div className="flex justify-between items-center">
                  <dt className="text-ink-600">Standard portion baseline</dt>
                  <dd className="font-mono font-semibold text-ink-900">{KG_PER_MEAL} kg (hot meal)</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-ink-600">Optimized insulated runs</dt>
                  <dd className="font-mono font-semibold text-ink-900">{pickups} route(s) / week</dd>
                </div>
                <div className="flex justify-between items-center">
                  <dt className="text-ink-600">Good Samaritan Safe Harbor</dt>
                  <dd className="font-semibold text-forest-700">100% Bill Emerson Protected</dd>
                </div>
              </dl>
            </div>

            <div className="mt-8 pt-4">
              <button
                type="button"
                onClick={() => setIsCertOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2.5 rounded-2xl bg-forest-800 px-6 py-3.5 text-sm font-semibold text-ivory-100 shadow-md hover:bg-forest-900 transition-all hover:scale-[1.01]"
              >
                <Award className="h-4 w-4 text-harvest-300" />
                <span>Preview Official ESG Commendation Certificate</span>
              </button>
            </div>
          </Reveal>

          {/* Right metric grid */}
          <Reveal delay={150} className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {/* Primary meals card */}
            <div className="rounded-3xl bg-forest-800 p-7 text-ivory-100 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-harvest-300">Rescued Meals</p>
                  <span className="rounded-full bg-forest-900/80 px-2 py-0.5 text-[11px] font-mono text-harvest-300">Annual: {(meals * 52).toLocaleString()}</span>
                </div>
                <p className="mt-4 font-serif text-5xl font-bold leading-none sm:text-6xl text-white" aria-live="polite">
                  {meals.toLocaleString('en-US')}
                </p>
                <p className="mt-2 text-xs font-medium text-harvest-200">portions delivered fresh every single week</p>
              </div>
              <p className="mt-6 text-xs text-ivory-200/80 border-t border-forest-700/80 pt-3">
                Distributed across neighborhood shelters and youth after-school kitchens within 45 minutes of pickup.
              </p>
            </div>

            {/* CO2 Emissions Saved */}
            <div className="rounded-3xl bg-forest-900 p-7 text-ivory-100 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Leaf className="h-3.5 w-3.5" />
                    <span>CO₂e Landfill Avoidance</span>
                  </p>
                </div>
                <p className="mt-4 font-serif text-5xl font-bold leading-none sm:text-6xl text-emerald-400" aria-live="polite">
                  {co2AvoidedKg.toLocaleString('en-US')} <span className="text-2xl font-sans font-normal text-emerald-200">kg</span>
                </p>
                <p className="mt-2 text-xs font-medium text-emerald-200/90">equivalent to {treesEquiv} mature trees absorbing carbon for a full year</p>
              </div>
              <p className="mt-6 text-xs text-ivory-300/80 border-t border-forest-800 pt-3">
                Prevents anaerobic methane breakdown in local landfills.
              </p>
            </div>

            {/* Water conserved */}
            <div className="rounded-3xl bg-sky-950 p-7 text-ivory-100 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                    <Droplets className="h-3.5 w-3.5" />
                    <span>Embedded Water Saved</span>
                  </p>
                </div>
                <p className="mt-4 font-serif text-5xl font-bold leading-none sm:text-6xl text-sky-300" aria-live="polite">
                  {waterConservedLiters.toLocaleString('en-US')} <span className="text-2xl font-sans font-normal text-sky-200">L</span>
                </p>
                <p className="mt-2 text-xs font-medium text-sky-200/90">agricultural and supply-chain hydration preserved</p>
              </div>
              <p className="mt-6 text-xs text-ivory-300/80 border-t border-sky-900 pt-3">
                Calculated across production water footprint of dairy, grain, and fresh produce.
              </p>
            </div>

            {/* Tax Write-off Estimate */}
            <div className="rounded-3xl bg-terracotta-50 p-7 text-terracotta-950 border border-terracotta-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-wider text-terracotta-700 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Tax Write-Off Estimate</span>
                  </p>
                  <span className="rounded-full bg-terracotta-200/80 px-2 py-0.5 text-[11px] font-mono text-terracotta-800">IRC § 170</span>
                </div>
                <p className="mt-4 font-serif text-5xl font-bold leading-none sm:text-6xl text-terracotta-800" aria-live="polite">
                  ${estTaxDeduction.toLocaleString('en-US')} <span className="text-xl font-sans font-normal text-terracotta-700">/ wk</span>
                </p>
                <p className="mt-2 text-xs font-medium text-terracotta-800">
                  ~${(estTaxDeduction * 52).toLocaleString('en-US')} estimated corporate tax reduction per year
                </p>
              </div>
              <p className="mt-6 text-xs text-terracotta-900/80 border-t border-terracotta-200 pt-3">
                Automated monthly IRC-compliant itemized receipt generation for corporate accounting.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ESG Certificate Dialog Modal */}
      <EsgCertificateDialog
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        weeklyKg={weeklyKg}
        meals={meals}
      />
    </section>
  );
}