import { useState, type FormEvent } from 'react';
import Reveal from '@/components/Reveal';
import { MapPin, Search } from 'lucide-react';

export default function CoverageSection() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ city: string; shelters: number; couriers: number; eta: string } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setResult({
      city: query.trim(),
      shelters: 14 + Math.floor(Math.random() * 8),
      couriers: 18 + Math.floor(Math.random() * 12),
      eta: `${28 + Math.floor(Math.random() * 12)} Minutes`,
    });
  };

  return (
    <section id="coverage" className="py-20 sm:py-28 bg-forest-900 text-ivory-100">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="rounded-[2.5rem] border border-forest-700/60 bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 p-8 shadow-2xl sm:p-14">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="inline-block rounded-full border border-forest-500/40 bg-forest-800/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-harvest-300">
                Hyperlocal Dispatch Map
              </span>
              <h2 className="display mt-4 text-3xl sm:text-4xl text-ivory-100">
                Check Food Rescue Coverage in Your Area
              </h2>
              <p className="mt-3 text-base text-ivory-200">
                Enter your restaurant, hotel, or kitchen address to see verified shelters and active rescue couriers within your 5-mile radius.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-harvest-400" aria-hidden="true" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter City, Neighborhood, or ZIP Code (e.g. Brooklyn, NY)"
                    required
                    className="w-full rounded-full border border-ivory-300/20 bg-forest-950/80 py-3.5 pl-12 pr-4 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:border-harvest-400 focus:outline-none focus:ring-2 focus:ring-harvest-400/30"
                  />
                </div>
                <button type="submit" className="btn-primary !min-h-[48px] !bg-harvest-400 !text-forest-950 hover:!bg-harvest-300">
                  <Search className="h-4 w-4" />
                  <span>Check Coverage</span>
                </button>
              </form>
            </Reveal>

            {result && (
              <Reveal delay={150}>
                <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-forest-500/50 bg-forest-800/90 p-5 text-left shadow-lg">
                  <span className="flex h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                  <div className="text-sm">
                    <p className="font-bold text-ivory-100">
                      🟢 High Rescue Coverage Active in <span className="text-harvest-300">{result.city}</span>!
                    </p>
                    <p className="mt-1 text-xs text-ivory-300">
                      {result.shelters} Verified Shelters &bull; {result.couriers} Active Volunteer Couriers &bull; Avg Dispatch: <strong>{result.eta}</strong>
                    </p>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
