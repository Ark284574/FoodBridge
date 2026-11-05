import { Leaf } from 'lucide-react';

interface LogoProps {
  tone?: 'light' | 'dark';
}

export default function Logo({ tone = 'dark' }: LogoProps) {
  const isLight = tone === 'light';
  return (
    <a href="#top" className="group inline-flex items-center gap-2.5" aria-label="FoodBridge home">
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:-rotate-12 ${
          isLight ? 'bg-harvest-400 text-forest-900' : 'bg-forest-700 text-ivory-100'
        }`}
      >
        <Leaf className="h-5 w-5" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span
        className={`font-serif text-2xl leading-none tracking-tight ${
          isLight ? 'text-ivory-100' : 'text-forest-700'
        }`}
      >
        FoodBridge
      </span>
    </a>
  );
}
