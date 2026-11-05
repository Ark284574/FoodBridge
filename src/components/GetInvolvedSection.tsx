import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { DEMO_FLOWS, type DemoFlow } from '@/data/content';

interface GetInvolvedSectionProps {
  onOpenFlow: (flowId: DemoFlow['id']) => void;
}

export default function GetInvolvedSection({ onOpenFlow }: GetInvolvedSectionProps) {

  return (
    <section id="get-involved" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Get involved</p>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl lg:text-6xl">
                Three ways to help the route work.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={120}>
              <p className="text-base leading-relaxed text-ink-700">
                Each button opens a practice form. Nothing is submitted from this page yet, so no donation, volunteer
                sign-up or partnership is recorded.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 border-t border-forest-700/20">
          {DEMO_FLOWS.map((flow, index) => {
            const Icon = flow.icon;
            return (
              <li key={flow.id} className="border-b border-forest-700/20">
                <Reveal delay={index * 100}>
                  <div className="grid gap-6 py-10 md:grid-cols-12 md:items-center md:gap-8 sm:py-12">
                    <div className="flex items-center gap-5 md:col-span-1">
                      <span className="font-serif text-3xl text-terracotta-700" aria-hidden="true">
                        {flow.number}
                      </span>
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-3xl text-forest-700 sm:text-4xl">{flow.title}</h3>
                      <p className="mt-3 max-w-md text-base leading-relaxed text-ink-700">{flow.summary}</p>
                    </div>
                    <div className="flex items-center gap-4 md:col-span-3">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-harvest-200 text-forest-900">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="md:col-span-3 md:justify-self-end">
                      <button
                        type="button"
                        onClick={() => onOpenFlow(flow.id)}
                        className="btn-secondary w-full md:w-auto"
                      >
                        {flow.cta}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
