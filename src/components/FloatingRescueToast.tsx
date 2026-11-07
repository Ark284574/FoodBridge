import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface ToastFeed {
  title: string;
  body: string;
  time: string;
}

const FEEDS: ToastFeed[] = [
  {
    title: 'Live Rescue in Progress',
    body: '45 Hot meals rescued from The Grand Promenade → Delivered to St. Jude Youth Shelter (2.4 km)',
    time: 'Just now',
  },
  {
    title: 'Rescue Completed',
    body: '80 Artisan baguettes & pastries from Le Petit Croissant → Delivered to Hope Haven Kitchen',
    time: '2 mins ago',
  },
  {
    title: 'Cold-Chain En Route',
    body: '140 Banquet servings from Sapphire Banquets → Dispatched to Senior Harmony Shelter (4°C Insulated)',
    time: '5 mins ago',
  },
  {
    title: 'Milestone Reached',
    body: 'Olive Bistro just crossed 1,500 total meals rescued this month!',
    time: '9 mins ago',
  },
];

export default function FloatingRescueToast() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;

    const initialTimer = setTimeout(() => {
      setVisible(true);
    }, 3500);

    const cycleTimer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % FEEDS.length);
        setVisible(true);
      }, 500);
    }, 9500);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(cycleTimer);
    };
  }, [dismissed]);

  if (dismissed) return null;

  const current = FEEDS[index];

  return (
    <aside
      aria-live="polite"
      className={`fixed bottom-5 left-5 z-40 max-w-sm rounded-2xl border border-forest-600/60 bg-forest-900/95 p-4 text-ivory-100 shadow-2xl backdrop-blur-md transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest-800 text-lg">
          🍲
        </span>
        <div className="flex-grow pr-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-harvest-300">{current.title}</span>
            <span className="text-[10px] text-ivory-300/60">&bull; {current.time}</span>
          </div>
          <p className="mt-1 leading-snug text-ivory-200">{current.body}</p>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss rescue alert"
          className="text-ivory-300/60 hover:text-ivory-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
