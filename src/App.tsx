import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorks from '@/components/HowItWorks';
import FeaturesSection from '@/components/FeaturesSection';
import JourneyOfAMeal from '@/components/JourneyOfAMeal';
import ImpactSection from '@/components/ImpactSection';
import StoriesSection from '@/components/StoriesSection';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import SiteFooter from '@/components/SiteFooter';

function App() {
  return (
    <div className="min-h-screen bg-ivory-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-700 focus:px-5 focus:py-3 focus:text-ivory-100"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <FeaturesSection />
        <JourneyOfAMeal />
        <ImpactSection />
        <StoriesSection />
        <GetInvolvedSection />
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
