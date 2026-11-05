import { ArrowUp } from 'lucide-react';
import Logo from '@/components/Logo';
import { DEMO_FLOWS, NAV_LINKS } from '@/data/content';

export default function SiteFooter() {
  return (
    <footer className="bg-ink-900 text-ivory-100">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="font-serif mt-6 max-w-sm text-2xl leading-snug text-ivory-100">
            Good food deserves a destination, not a dustbin.
          </p>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4 md:col-start-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-harvest-300">Explore</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-ivory-200 transition-colors hover:text-harvest-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-harvest-300">Get involved</p>
            <ul className="mt-5 space-y-3">
              {DEMO_FLOWS.map((flow) => (
                <li key={flow.id}>
                  <a href="#get-involved" className="text-sm text-ivory-200 transition-colors hover:text-harvest-300">
                    {flow.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="md:col-span-12 md:col-start-1 md:row-start-3 md:max-w-2xl">
          <p className="text-sm leading-relaxed text-ink-300">
            FoodBridge is a concept website. Stories and figures are illustrative, and feature descriptions describe the
            intended platform rather than live operations. No partner organisations are named here. Contact details
            will be published when the platform launches.
          </p>
        </div>
      </div>

      <div className="border-t border-ivory-100/10">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-start justify-between gap-4 px-5 py-6 text-sm text-ink-300 sm:flex-row sm:items-center sm:px-8">
          <p>&copy; 2026 FoodBridge. All rights reserved.</p>
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 font-medium text-ivory-100 transition-colors hover:bg-ivory-100/10 hover:text-harvest-300"
          >
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
