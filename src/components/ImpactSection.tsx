import { useId, useState } from 'react';
import Reveal from '@/components/Reveal';

const KG_PER_MEAL = 0.5;
const KG_PER_PICKUP = 60;

export default function ImpactSection() {
  const [weeklyKg, setWeeklyKg] = useState(120);
  const sliderId = useId();

  const meals = Math.round(weeklyKg / KG_PER_MEAL);
  const pickups = Math.max(1, Math.ceil(weeklyKg / KG_PER_PICKUP));
  const fillPercent = ((weeklyKg - 20) / (500 - 20)) * 100;

  return (
    <section id="impact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Impact</p>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
                See how a single donor could add up, in simple arithmetic.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={120}>
              <div className="rounded-2xl border border-harvest-500/50 bg-harvest-50 p-5 text-sm leading-relaxed text-harvest-900">
                <p className="font-bold">Illustrative figures only.</p>
                <p className="mt-1">
                  These are not measured results from FoodBridge. They show how the arithmetic works, using the two
                  assumptions below.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-12 rounded-[2.5rem] bg-ivory-50 p-6 shadow-sm shadow-forest-900/5 ring-1 ring-ivory-300 sm:p-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <label htmlFor={sliderId} className="block font-serif text-2xl text-forest-700 sm:text-3xl">
              Weekly surplus a donor could share
            </label>
            <p className="mt-3 flex items-baseline gap-2 text-forest-700">
              <span className="font-serif text-6xl leading-none sm:text-7xl" aria-live="polite">
                {weeklyKg}
              </span>
              <span className="text-lg font-medium">kg</span>
            </p>
            <input
              id={sliderId}
              type="range"
              min={20}
              max={500}
              step={10}
              value={weeklyKg}
              onChange={(event) => setWeeklyKg(Number(event.target.value))}
              style={{ background: `linear-gradient(to right, #B9552F ${fillPercent}%, #DCD0B5 ${fillPercent}%)` }}
              className="impact-slider mt-8 h-2 w-full cursor-pointer appearance-none rounded-full"
            />
            <div className="mt-3 flex justify-between text-xs text-ink-500">
              <span>20 kg</span>
              <span>500 kg</span>
            </div>

            <dl className="mt-10 space-y-3 border-t border-ink-300/50 pt-6 text-sm text-ink-700">
              <div className="flex justify-between gap-4">
                <dt>Assumed weight of one meal</dt>
                <dd className="font-semibold text-ink-900">{KG_PER_MEAL} kg</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Assumed load for one pickup</dt>
                <dd className="font-semibold text-ink-900">{KG_PER_PICKUP} kg</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={150} className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:content-center">
            <div className="rounded-3xl bg-forest-700 p-8 text-ivory-100 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-harvest-300">Possible meals</p>
              <p className="mt-4 font-serif text-6xl leading-none sm:text-7xl" aria-live="polite">
                {meals.toLocaleString('en-GB')}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory-200">Per week, if all the food reaches a table.</p>
            </div>
            <div className="rounded-3xl bg-terracotta-50 p-8 text-terracotta-900 sm:p-10">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-terracotta-700">Pickups needed</p>
              <p className="mt-4 font-serif text-6xl leading-none sm:text-7xl" aria-live="polite">
                {pickups}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-terracotta-900">
                Volunteer or partner runs to move the load on time.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
