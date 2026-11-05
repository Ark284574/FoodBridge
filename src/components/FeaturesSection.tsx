import { ArrowUpRight, Check, Users, Handshake, Package, Truck, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { FEATURES } from '@/data/content';

const FEATURE_ICONS: LucideIcon[] = [Package, Handshake, Truck, Users];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-ivory-200/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">What FoodBridge does</p>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
                Four connected features, built around the people doing the work.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={120}>
              <p className="text-base leading-relaxed text-ink-700">
                These describe the intended platform. FoodBridge is a concept, so nothing here is a claim about live
                operations.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-x-16 md:grid-cols-2">
          {FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[index];
            return (
              <article key={feature.title} className="border-t border-forest-700/20 py-12">
                <Reveal delay={index * 80}>
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="font-serif text-3xl text-forest-700 sm:text-4xl">{feature.title}</h3>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest-700 text-ivory-100">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink-700 sm:text-lg">{feature.summary}</p>
                  <ul className="mt-6 space-y-3">
                    {feature.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-ink-800 sm:text-base">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-success-700" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>

        <div className="mt-4 flex justify-end">
          <a
            href="#journey"
            className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 transition-colors hover:text-terracotta-700"
          >
            See these features in one journey
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
