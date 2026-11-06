import { useCallback, useState } from 'react';
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
import DemoDialog from '@/components/DemoDialog';
import { DEMO_FLOWS, type DemoFlow } from '@/data/content';

function App() {
  const [activeFlow, setActiveFlow] = useState<DemoFlow | null>(null);
  const closeDemo = useCallback(() => setActiveFlow(null), []);
  const openDemo = useCallback((flowId: DemoFlow['id']) => {
  const flow = DEMO_FLOWS.find((item) => item.id === flowId);
  if (flow) {
  setActiveFlow(flow);
  } else {
  console.error('No matching demo flow found:', flowId);
    }
  if (flow) setActiveFlow(flow);
}, []);

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
        <Hero onOpenFlow={openDemo} />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <FeaturesSection />
        <JourneyOfAMeal />
        <ImpactSection />
        <StoriesSection />
        <GetInvolvedSection onOpenFlow={openDemo} />
      </main>
      <SiteFooter />
      {activeFlow && <DemoDialog key={activeFlow.id} flow={activeFlow} onClose={closeDemo} />}
    </div>
  );
}

export default App;
