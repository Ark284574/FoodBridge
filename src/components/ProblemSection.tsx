import Reveal from '@/components/Reveal';

const OBSERVATIONS = [
  {
    title: 'Surplus arrives all at once.',
    body: 'A bakery closes with a full shelf, a farm has a truck leaving at dawn, a kitchen has a tray of prepared food. The window to move it safely is often only a few hours.',
  },
  {
    title: 'Coordination is the bottleneck.',
    body: 'Donors rarely know which charity can take a load right now. Charities rarely hear about it until the food has already gone to waste.',
  },
  {
    title: 'Good intentions have no route.',
    body: 'Many people want to help but do not know where to start, and most local groups have no simple, shared way to ask for what they need.',
  },
];

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-ivory-200/70 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <h2 className="display mt-5 text-balance text-4xl text-forest-700 sm:text-5xl">
              Food is wasted in the gaps between plenty and need.
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <figure className="mt-12">
              <div className="overflow-hidden rounded-[2rem]">
                <img
                  src="https://images.pexels.com/photos/18103937/pexels-photo-18103937.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Stacked cartons and bins in an outdoor storage yard."
                  loading="lazy"
                  width={940}
                  height={650}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs text-ink-500">Stock photograph, used for illustration only.</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <blockquote className="display border-l-4 border-terracotta-500 pl-6 text-2xl leading-snug text-forest-700 sm:text-3xl">
              The food is usually fine. The missing piece is the route.
            </blockquote>
          </Reveal>

          <ol className="mt-14 space-y-12">
            {OBSERVATIONS.map((item, index) => (
              <li key={item.title} className="border-t border-ink-300/50 pt-8">
                <Reveal delay={index * 120} className="grid grid-cols-[3rem_1fr] gap-4">
                  <span className="font-serif text-2xl text-terracotta-700" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-ink-900">{item.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-ink-700">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
