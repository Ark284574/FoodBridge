import { CircleDot, Route, Truck, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';

const PRINCIPLES: { icon: LucideIcon; text: string }[] = [
  { icon: CircleDot, text: 'Donors post what they have and the window they can offer it.' },
  { icon: Route, text: 'Coordinators match each offer with a destination that is ready to receive it.' },
  { icon: Truck, text: 'Pickups are planned so food moves within its safe window, not after it.' },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="relative overflow-hidden bg-forest-700 py-24 text-ivory-100 sm:py-32">
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full border border-harvest-400/20"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-[20rem] w-[20rem] rounded-full border border-harvest-400/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="eyebrow !text-harvest-300">Our solution</p>
            <h2 className="display mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl">
              FoodBridge is the route between a surplus and a <span className="italic text-harvest-300">table</span>.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
          <Reveal delay={150}>
            <p className="text-lg leading-relaxed text-ivory-200">
              We do not replace food banks, kitchens or charities. We give them a shared, honest picture of what is
              available, who can collect it, and where it is needed next.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-7xl px-5 sm:px-8">
        <ul className="grid gap-px overflow-hidden rounded-3xl bg-harvest-400/25 md:grid-cols-3">
          {PRINCIPLES.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={item.text} className="bg-forest-700">
                <Reveal delay={index * 120} className="flex h-full flex-col gap-6 p-8 sm:p-10">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-harvest-400 text-forest-900">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="text-lg leading-relaxed text-ivory-100">{item.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
