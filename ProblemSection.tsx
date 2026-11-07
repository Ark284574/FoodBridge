import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { AlertTriangle, CheckCircle2, Clock, Trash2, HeartHandshake, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

const OBSERVATIONS = [
  {
    num: '01',
    title: 'Surplus arrives unpredictably at closing hours',
    body: 'A banquet wraps at 10 PM with 80 untouched entrées. A commercial bakery clears evening trays. The safe thermal window to redistribute is only 90 to 120 minutes before quality degrades.',
    stat: '90m',
    statLabel: 'Thermal window',
  },
  {
    num: '02',
    title: 'Fragmented communication is the true bottleneck',
    body: 'Charities are understaffed and unable to answer late-night cold calls. Kitchens do not have the manpower to drive deliveries across town after an exhausting 12-hour shift.',
    stat: '84%',
    statLabel: 'Dumped due to logistics',
  },
  {
    num: '03',
    title: 'Legal liability myths discourage generosity',
    body: 'Many managers assume donating prepared food opens them to lawsuits. In reality, the federal Bill Emerson Good Samaritan Act completely shields good-faith donors from civil and criminal liability.',
    stat: '100%',
    statLabel: 'Federal safe-harbor',
  },
];

export default function ProblemSection() {
  const [activeScenario, setActiveScenario] = useState<'without' | 'with'>('without');

  return (
    <section id="problem" className="relative bg-ivory-200/70 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Header and Lead */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-terracotta-300 bg-terracotta-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-terracotta-800">
                <AlertTriangle className="h-3.5 w-3.5 text-terracotta-600" />
                <span>The Distribution Disconnect</span>
              </div>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
                Food is wasted in the gaps between plenty and need.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-700">
                The world does not have a food production shortage. It has a routing, timing, and notification latency failure.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 rounded-3xl bg-forest-900 p-6 text-ivory-100 shadow-lg">
                <div className="grid grid-cols-2 gap-4 divide-x divide-forest-700/60">
                  <div className="pr-3">
                    <span className="block font-serif text-3xl font-bold text-terracotta-400">38%</span>
                    <span className="mt-1 block text-xs text-ivory-300">of all food produced in the United States goes uneaten</span>
                  </div>
                  <div className="pl-4">
                    <span className="block font-serif text-3xl font-bold text-harvest-300">44 Million</span>
                    <span className="mt-1 block text-xs text-ivory-300">Americans face food insecurity each day</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <blockquote className="display border-l-4 border-terracotta-500 pl-6 text-2xl leading-snug text-forest-700 sm:text-3xl">
                &ldquo;The food is pristine and ready to eat. The missing link was never compassion — it was the dispatch network.&rdquo;
              </blockquote>
            </Reveal>

            <ol className="mt-10 space-y-8">
              {OBSERVATIONS.map((item, index) => (
                <li key={item.title} className="border-t border-ink-300/60 pt-6">
                  <Reveal delay={index * 100} className="grid grid-cols-[3.5rem_1fr_auto] gap-4 items-start">
                    <span className="font-serif text-2xl font-bold text-terracotta-700" aria-hidden="true">
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-sans text-lg font-bold text-ink-900">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-ink-700">{item.body}</p>
                    </div>
                    <div className="hidden sm:block text-right pl-4">
                      <span className="block font-serif text-xl font-bold text-forest-700">{item.stat}</span>
                      <span className="block text-[11px] text-ink-500 uppercase tracking-wider">{item.statLabel}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Interactive Before & After Scenario Studio */}
        <Reveal delay={180}>
          <div className="mt-20 rounded-[2.5rem] bg-white p-6 shadow-xl shadow-forest-900/5 ring-1 ring-ink-200 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink-200 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-forest-700">Operational Breakdown Comparison</span>
                <h3 className="display mt-1 text-2xl text-forest-800">
                  What happens tonight at 10:30 PM?
                </h3>
              </div>

              {/* Scenario Switcher Tabs */}
              <div className="inline-flex rounded-full bg-ivory-200 p-1.5 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveScenario('without')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    activeScenario === 'without'
                      ? 'bg-rose-700 text-white shadow'
                      : 'text-ink-700 hover:text-ink-900'
                  }`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Without FoodBridge</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveScenario('with')}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    activeScenario === 'with'
                      ? 'bg-forest-700 text-white shadow'
                      : 'text-ink-700 hover:text-ink-900'
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-harvest-300" />
                  <span>With FoodBridge</span>
                </button>
              </div>
            </div>

            {/* Scenario Content */}
            {activeScenario === 'without' ? (
              <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                    <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
                      <Clock className="h-4 w-4" />
                      <span>22:15 &bull; Kitchen Closing</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-800 font-medium">
                      Event ends with 65 gourmet roasted chicken entrées and organic quinoa salads untouched.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                    <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
                      <ShieldAlert className="h-4 w-4" />
                      <span>22:40 &bull; The Outreach Friction</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-800">
                      Sous chef dials two local community centers. Neither answers after hours; voicemail box is full. Staff has no personal transport available.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-rose-200 bg-rose-50/60 p-5">
                    <div className="flex items-center gap-2 text-rose-800 text-xs font-bold uppercase tracking-wider">
                      <Trash2 className="h-4 w-4" />
                      <span>23:10 &bull; Avoidable Landfill Disposal</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-800">
                      With health department holding limits looming, staff is forced to bag and discard 35 kg of pristine nutrition into the dumpster.
                    </p>
                  </div>
                </div>

                {/* Stat Outcome Card - Bad */}
                <div className="lg:col-span-5 rounded-3xl bg-rose-950 p-7 text-ivory-100 flex flex-col justify-between">
                  <div>
                    <span className="rounded-full bg-rose-900 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-300">
                      Net Lost Potential
                    </span>
                    <h4 className="mt-4 font-serif text-3xl font-bold text-white">65 Meals Destroyed</h4>
                    <ul className="mt-4 space-y-2.5 text-xs text-rose-200">
                      <li className="flex items-center gap-2">
                        <span className="text-rose-400 font-bold">&#10005;</span>
                        <span>$140+ commercial waste disposal & dumpster fees</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-rose-400 font-bold">&#10005;</span>
                        <span>87.5 kg CO₂e greenhouse gas emitted in landfill</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-rose-400 font-bold">&#10005;</span>
                        <span>Zero tax benefit under IRC § 170(e)(3)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-rose-900 pt-4 text-xs text-rose-300/80">
                    Neighborhood shelter 1.2 miles away had 40 unserved dinner guests.
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-8 grid gap-8 lg:grid-cols-12 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      <Clock className="h-4 w-4" />
                      <span>22:15 &bull; 28-Second Dispatch Entry</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-800 font-medium">
                      Chef opens FoodBridge, selects &ldquo;65 hot chicken portions&rdquo;, and submits with zero phone calls required.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>22:21 &bull; Automated Match & Courier Route</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-800">
                      FoodBridge algorithm pairs surplus with St. Jude Community Mission (0.9 miles away). Certified courier with cambro thermal containers accepts dispatch.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                    <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                      <HeartHandshake className="h-4 w-4" />
                      <span>22:52 &bull; Hot Nourishment Served</span>
                    </div>
                    <p className="mt-2 text-sm text-ink-800">
                      Meals arrive steaming hot (&gt;63°C). Digital chain-of-custody transfer signed. Kitchen automatically receives IRS Form 8283 audit receipt.
                    </p>
                  </div>
                </div>

                {/* Stat Outcome Card - Good */}
                <div className="lg:col-span-5 rounded-3xl bg-forest-900 p-7 text-ivory-100 flex flex-col justify-between">
                  <div>
                    <span className="rounded-full bg-forest-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Verified Mission Result
                    </span>
                    <h4 className="mt-4 font-serif text-3xl font-bold text-white">65 People Fed Tonight</h4>
                    <ul className="mt-4 space-y-2.5 text-xs text-ivory-200">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>$390 estimated corporate tax deduction credited</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>87.5 kg CO₂e landfill emissions prevented</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>100% legal protection via Bill Emerson Act</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 border-t border-forest-800 pt-4 text-xs text-harvest-300 font-medium flex items-center justify-between">
                    <span>Average rescue elapsed: 37 minutes</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}