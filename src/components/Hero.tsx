import type { CSSProperties } from 'react';
import { ArrowRight } from 'lucide-react';

const enterDelay = (ms: number) => ({ '--enter-delay': `${ms}ms` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-36 lg:pb-32 lg:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-6">
          <p className="eyebrow hero-enter">A coordination platform for surplus food</p>
          <h1
            className="display hero-enter mt-6 text-5xl leading-[1.04] text-forest-700 sm:text-6xl lg:text-[4.5rem]"
            style={enterDelay(120)}
          >
            Good food deserves a <span className="italic text-terracotta-700">destination</span>, not a dustbin.
          </h1>
          <p className="hero-enter mt-8 max-w-xl text-lg leading-relaxed text-ink-700 sm:text-xl" style={enterDelay(240)}>
            FoodBridge links bakeries, farms and households with surplus food to the NGOs and community
            kitchens that can serve it, and plans the pickup in between.
          </p>

          <div className="hero-enter mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={enterDelay(360)}>
            <a href="#get-involved" className="btn-primary">
              Donate surplus food
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#get-involved" className="btn-secondary">
              Volunteer
            </a>
            <a href="#get-involved" className="btn-secondary">
              Partner as an NGO
            </a>
          </div>

          <a
            href="#journey"
            className="hero-enter mt-10 inline-flex items-center gap-3 text-sm font-medium text-forest-700 transition-colors hover:text-terracotta-700"
            style={enterDelay(480)}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-harvest-200 text-forest-900">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
            Follow one meal from donor to table
          </a>
        </div>

        <div className="relative lg:col-span-6">
          <figure className="hero-enter relative ml-auto w-full max-w-xl lg:max-w-none" style={enterDelay(200)}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-ivory-300 sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="https://images.pexels.com/photos/11678443/pexels-photo-11678443.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Farm workers loading freshly harvested broccoli into crates on a truck in a rural field."
                className="h-full w-full object-cover"
                width={940}
                height={650}
                fetchPriority="high"
              />
            </div>
            <figcaption className="float-soft absolute -bottom-6 -left-4 max-w-[15rem] rounded-2xl bg-harvest-400 p-5 text-forest-900 shadow-xl shadow-forest-900/15 sm:-left-10">
              <span className="font-serif text-xl leading-tight">
                Harvest surplus is often ready before anyone has a plan for it.
              </span>
            </figcaption>
          </figure>
          <p className="mt-16 text-xs text-ink-500 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:max-w-xs lg:text-right">
            Stock photograph, used for illustration only.
          </p>
        </div>
      </div>
    </section>
  );
}
