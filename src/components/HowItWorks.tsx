
import Reveal from '@/components/Reveal';
import { HOW_IT_WORKS_STEPS } from '@/data/content';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
                Four steps, one shared timeline.
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-700">
                Every offer follows the same path, so donors, coordinators and receiving teams always know what happens
                next.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="relative lg:col-span-7 lg:col-start-6">
          <span
            className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-gradient-to-b from-terracotta-500 via-harvest-400 to-forest-600/40"
            aria-hidden="true"
          />
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <li key={step.title} className="relative pb-14 pl-20 last:pb-0 sm:pl-24">
              <Reveal delay={index * 100}>
                <span className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-terracotta-500 bg-ivory-100 font-serif text-lg text-terracotta-700 sm:h-12 sm:w-12">
                  {index + 1}
                </span>
                <h3 className="font-sans text-2xl font-bold text-ink-900 sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-lg text-base leading-relaxed text-ink-700 sm:text-lg">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
