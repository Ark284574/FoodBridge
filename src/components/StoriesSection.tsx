import Reveal from '@/components/Reveal';
import { STORIES } from '@/data/content';

export default function StoriesSection() {
  return (
    <section id="stories" className="bg-ivory-200/70 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow">Stories from the table</p>
              <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
                Imagined stories of how a route might feel.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={120}>
              <p className="rounded-2xl border border-terracotta-500/40 bg-terracotta-50 p-5 text-sm leading-relaxed text-terracotta-900">
                <span className="font-bold">These are fictional stories.</span> The people, places and quotes are
                invented to show how FoodBridge could be used. They are not testimonials from real people.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-20 space-y-24 sm:space-y-32">
          {STORIES.map((story, index) => {
            const reversed = index % 2 === 1;
            return (
              <article key={story.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <div className={`lg:col-span-6 ${reversed ? 'lg:col-start-7' : 'lg:col-start-1'}`}>
                  <Reveal>
                    <figure className="overflow-hidden rounded-[2rem]">
                      <img
                        src={story.imageUrl}
                        alt={story.imageAlt}
                        loading="lazy"
                        width={940}
                        height={650}
                        className="aspect-[4/3] w-full object-cover transition-transform duration-1000 ease-settle hover:scale-[1.03]"
                      />
                    </figure>
                  </Reveal>
                </div>
                <div className={`lg:col-span-5 ${reversed ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'}`}>
                  <Reveal delay={120}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-700">{story.kicker}</p>
                    <h3 className="display mt-4 text-3xl text-forest-700 sm:text-4xl">{story.title}</h3>
                    <blockquote className="mt-6 font-serif text-2xl italic leading-snug text-ink-900">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>
                    <p className="mt-6 text-base leading-relaxed text-ink-700">{story.body}</p>
                    <p className="mt-6 text-sm font-medium text-ink-500">{story.setting}</p>
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
