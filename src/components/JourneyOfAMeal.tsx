import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { JOURNEY_STATIONS, JOURNEY_STEPS, type JourneyStation } from '@/data/content';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const STATION_ORDER: JourneyStation[] = ['donor', 'coordination', 'destination'];

const STATION_PHOTOS: Record<JourneyStation, { src: string; alt: string }> = {
  donor: {
    src: 'https://images.pexels.com/photos/15009979/pexels-photo-15009979.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Fresh bread displayed on wooden shelves in a warm-lit bakery.',
  },
  coordination: {
    src: 'https://images.pexels.com/photos/7156172/pexels-photo-7156172.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A volunteer records food donations on a clipboard in a community center.',
  },
  destination: {
    src: 'https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'A diverse group of adults sharing a meal together at a table.',
  },
};

const AUTOPLAY_MS = 3200;
const LAST_INDEX = JOURNEY_STEPS.length - 1;

export default function JourneyOfAMeal() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const step = JOURNEY_STEPS[index];
  const stationIndex = STATION_ORDER.indexOf(step.station);
  const progress = (index / LAST_INDEX) * 100;
  const isAtEnd = index === LAST_INDEX;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setIndex((current) => Math.min(current + 1, LAST_INDEX)), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (isAtEnd) setPlaying(false);
  }, [isAtEnd]);

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (isAtEnd) setIndex(0);
    setPlaying(true);
  };

  const goTo = (next: number) => {
    setPlaying(false);
    setIndex(Math.max(0, Math.min(LAST_INDEX, next)));
  };

  return (
    <section id="journey" className="relative overflow-hidden bg-forest-800 py-24 text-ivory-100 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow !text-harvest-300">Signature journey</p>
              <h2 className="display mt-5 text-balance text-4xl sm:text-5xl lg:text-6xl">
                The journey of a meal
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={120}>
              <p className="text-base leading-relaxed text-ivory-200">
                Follow one loaf from a closing bakery to a community table. This is an illustrative example. The
                places and people are invented.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <div className="relative">
            <div
              className="absolute inset-x-7 top-7 h-px bg-ivory-100/20"
              role="progressbar"
              aria-label="Meal journey progress"
              aria-valuemin={0}
              aria-valuemax={LAST_INDEX}
              aria-valuenow={index}
            >
              <div
                className="absolute inset-y-0 left-0 bg-harvest-400 transition-[width] duration-700 ease-settle"
                style={{ width: `${progress}%` }}
              />
              <span
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-harvest-300 shadow-[0_0_0_6px_rgba(217,184,108,0.25)] transition-[left] duration-700 ease-settle"
                style={{ left: `${progress}%` }}
              />
            </div>

            <ol className="relative flex justify-between">
              {STATION_ORDER.map((key, position) => {
                const station = JOURNEY_STATIONS[key];
                const Icon = station.icon;
                const reached = position <= stationIndex;
                const current = position === stationIndex;
                const alignment =
                  position === 0 ? 'items-start text-left' : position === 2 ? 'items-end text-right' : 'items-center text-center';
                return (
                  <li key={key} className={`flex max-w-[30%] flex-col ${alignment}`} aria-current={current ? 'step' : undefined}>
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                        reached
                          ? 'border-harvest-400 bg-harvest-400 text-forest-900'
                          : 'border-ivory-100/30 bg-forest-800 text-ivory-200'
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className="mt-4 text-sm font-bold sm:text-base">{station.label}</span>
                    <span className="mt-1 hidden text-sm text-ivory-200 sm:block">{station.sublabel}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-forest-900 lg:col-span-7">
            {STATION_ORDER.map((key) => {
              const active = key === step.station;
              return (
                <img
                  key={key}
                  src={STATION_PHOTOS[key].src}
                  alt={active ? STATION_PHOTOS[key].alt : ''}
                  aria-hidden={!active}
                  loading="lazy"
                  width={940}
                  height={650}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-settle ${
                    active ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              );
            })}
            <p className="absolute bottom-4 left-4 rounded-full bg-ivory-100 px-4 py-2 text-sm font-medium text-forest-800">
              Now at: {JOURNEY_STATIONS[step.station].label}
            </p>
          </div>

          <div className="flex flex-col lg:col-span-5">
            <p className="text-sm font-medium text-harvest-300" aria-live="polite">
              Step {index + 1} of {JOURNEY_STEPS.length}
            </p>
            <div key={index} aria-live="polite" aria-atomic="true" className="hero-enter mt-4 min-h-[9.5rem] sm:min-h-[8.5rem]">
              <h3 className="display text-3xl leading-tight sm:text-4xl">{step.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-ivory-200 sm:text-lg">{step.body}</p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label="Previous step"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory-100/30 transition-colors hover:bg-ivory-100 hover:text-forest-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ivory-100"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              {!reducedMotion && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-harvest-400 px-6 text-sm font-semibold text-forest-900 transition-colors hover:bg-harvest-300"
                >
                  {playing ? (
                    <>
                      <Pause className="h-4 w-4" aria-hidden="true" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" aria-hidden="true" />
                      {isAtEnd ? 'Replay journey' : 'Play journey'}
                    </>
                  )}
                </button>
              )}
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={isAtEnd}
                aria-label="Next step"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory-100/30 transition-colors hover:bg-ivory-100 hover:text-forest-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ivory-100"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8">
              <p className="text-sm text-ivory-200">Jump to a step</p>
              <ol className="mt-3 flex flex-wrap gap-2">
                {JOURNEY_STEPS.map((item, position) => {
                  const selected = position === index;
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        onClick={() => goTo(position)}
                        aria-label={`Step ${position + 1}: ${item.title}`}
                        aria-current={selected ? 'step' : undefined}
                        className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition-colors ${
                          selected
                            ? 'border-harvest-400 bg-harvest-400 text-forest-900'
                            : position < index
                              ? 'border-harvest-400/60 text-harvest-200 hover:bg-forest-700'
                              : 'border-ivory-100/30 text-ivory-100 hover:bg-forest-700'
                        }`}
                      >
                        {position + 1}
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
