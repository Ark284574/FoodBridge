import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { STORIES, type Story } from '@/data/content';
import { MessageSquareQuote, Volume2, Sparkles, CheckCircle, Heart, Star } from 'lucide-react';

interface ExtendedStory extends Story {
  tag: string;
  category: 'all' | 'donor' | 'volunteer' | 'kitchen';
  impactBadge: string;
  avatar: string;
}

const EXTENDED_STORIES: ExtendedStory[] = [
  {
    ...STORIES[0],
    category: 'donor',
    tag: 'Commercial Food Donor',
    impactBadge: 'Rescuing 65 kg/wk &bull; Zero Waste Certified',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    ...STORIES[1],
    category: 'volunteer',
    tag: 'Thermal Courier Volunteer',
    impactBadge: '14 Active Dispatches &bull; Top 5% Driver',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80',
  },
  {
    ...STORIES[2],
    category: 'kitchen',
    tag: 'Community Kitchen Host',
    impactBadge: '220 Warm Meals/Wk &bull; Dignity First',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80',
  },
];

export default function StoriesSection() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'donor' | 'volunteer' | 'kitchen'>('all');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const filteredStories = selectedCategory === 'all'
    ? EXTENDED_STORIES
    : EXTENDED_STORIES.filter((s) => s.category === selectedCategory);

  const toggleVoiceNote = (title: string) => {
    if (playingVoiceId === title) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(title);
      // Auto-stop after 8 seconds of simulated audio playback
      setTimeout(() => {
        setPlayingVoiceId((curr) => (curr === title ? null : curr));
      }, 8000);
    }
  };

  return (
    <section id="stories" className="bg-ivory-200/70 py-24 sm:py-32 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-forest-600/20 bg-forest-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-forest-800">
                <Heart className="h-3.5 w-3.5 text-terracotta-600 fill-terracotta-600" />
                <span>Voices of the Network</span>
              </div>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
                Real reflections from the people at the table.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={120}>
              <div className="rounded-2xl border border-terracotta-500/40 bg-terracotta-50 p-5 text-sm leading-relaxed text-terracotta-900 shadow-sm">
                <p className="font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-terracotta-600" />
                  <span>Verified Human Impact Experiences</span>
                </p>
                <p className="mt-1 text-xs text-terracotta-900/90">
                  Case stories illustrative of daily FoodBridge workflows across donors, certified courier drivers, and neighborhood dining spaces.
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Category Filter Pills */}
        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-forest-700 text-ivory-100 shadow'
                  : 'bg-white text-ink-700 border border-ink-200 hover:bg-ivory-100'
              }`}
            >
              All Roles ({EXTENDED_STORIES.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('donor')}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                selectedCategory === 'donor'
                  ? 'bg-forest-700 text-ivory-100 shadow'
                  : 'bg-white text-ink-700 border border-ink-200 hover:bg-ivory-100'
              }`}
            >
              Food Donors & Bakeries
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('volunteer')}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                selectedCategory === 'volunteer'
                  ? 'bg-forest-700 text-ivory-100 shadow'
                  : 'bg-white text-ink-700 border border-ink-200 hover:bg-ivory-100'
              }`}
            >
              Thermal Couriers & Volunteers
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('kitchen')}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition-all ${
                selectedCategory === 'kitchen'
                  ? 'bg-forest-700 text-ivory-100 shadow'
                  : 'bg-white text-ink-700 border border-ink-200 hover:bg-ivory-100'
              }`}
            >
              Community Dining Kitchens
            </button>
          </div>
        </Reveal>

        {/* Stories List */}
        <div className="mt-16 space-y-24">
          {filteredStories.map((story, index) => {
            const reversed = index % 2 === 1;
            const isPlaying = playingVoiceId === story.title;

            return (
              <article
                key={story.title}
                className="grid items-center gap-10 rounded-[2.5rem] bg-white p-6 sm:p-10 shadow-lg shadow-forest-900/5 ring-1 ring-ink-200 lg:grid-cols-12 lg:gap-14"
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                  <Reveal>
                    <div className="relative overflow-hidden rounded-[2rem] group">
                      <img
                        src={story.imageUrl}
                        alt={story.imageAlt}
                        loading="lazy"
                        width={940}
                        height={650}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-80" />
                      
                      {/* Floating bottom tag on photo */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                        <span className="rounded-full bg-forest-900/80 backdrop-blur-md px-3 py-1 font-mono">
                          {story.setting}
                        </span>
                        <div className="flex items-center gap-1 text-harvest-300">
                          <Star className="h-3.5 w-3.5 fill-harvest-300" />
                          <span className="font-bold">5.0</span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                </div>

                {/* Narrative Details Column */}
                <div className={`lg:col-span-6 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                  <Reveal delay={120}>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-terracotta-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-terracotta-800">
                        {story.tag}
                      </span>
                      <span
                        dangerouslySetInnerHTML={{ __html: story.impactBadge }}
                        className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                      />
                    </div>

                    <h3 className="display mt-4 text-3xl text-forest-700 sm:text-4xl">{story.title}</h3>

                    {/* Audio note preview simulator pill */}
                    <div className="mt-5">
                      <button
                        type="button"
                        onClick={() => toggleVoiceNote(story.title)}
                        className={`inline-flex items-center gap-3 rounded-2xl border px-4 py-2.5 text-xs font-medium transition-all ${
                          isPlaying
                            ? 'border-forest-600 bg-forest-50 text-forest-800 ring-2 ring-forest-500/20'
                            : 'border-ink-200 bg-ivory-100 text-ink-700 hover:bg-ivory-200'
                        }`}
                      >
                        <Volume2 className={`h-4 w-4 ${isPlaying ? 'text-forest-700 animate-pulse' : 'text-ink-500'}`} />
                        <span>{isPlaying ? 'Playing Audio Reflection (0:08)...' : 'Listen to 15s voice dispatch note'}</span>
                        {isPlaying && (
                          <div className="flex items-center gap-1 h-3">
                            <span className="w-1 bg-forest-600 h-2 animate-bounce" />
                            <span className="w-1 bg-forest-600 h-3 animate-bounce [animation-delay:150ms]" />
                            <span className="w-1 bg-forest-600 h-1.5 animate-bounce [animation-delay:300ms]" />
                          </div>
                        )}
                      </button>
                    </div>

                    <blockquote className="mt-6 border-l-3 border-harvest-500 pl-4 font-serif text-xl italic leading-snug text-ink-900 sm:text-2xl">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>

                    <p className="mt-5 text-base leading-relaxed text-ink-700">{story.body}</p>

                    <div className="mt-6 flex items-center gap-3 border-t border-ink-200 pt-4 text-xs text-ink-600">
                      <CheckCircle className="h-4 w-4 text-forest-600" />
                      <span>Verified Dispatch Ledger &bull; FoodBridge Certified Partner</span>
                    </div>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}