import { useCallback, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SiteHeader from '@/components/SiteHeader';
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import SolutionSection from '@/components/SolutionSection';
import HowItWorks from '@/components/HowItWorks';
import FeaturesSection from '@/components/FeaturesSection';
import JourneyOfAMeal from '@/components/JourneyOfAMeal';
import CoverageSection from '@/components/CoverageSection';
import ImpactSection from '@/components/ImpactSection';
import StoriesSection from '@/components/StoriesSection';
import GetInvolvedSection from '@/components/GetInvolvedSection';
import SiteFooter from '@/components/SiteFooter';
import DemoDialog from '@/components/DemoDialog';
import FloatingRescueToast from '@/components/FloatingRescueToast';

import AdminPage from '@/pages/AdminPage';
import JudgePage from '@/pages/JudgePage';

import { DEMO_FLOWS, type DemoFlow } from '@/data/content';

function HomePage() {
  const [activeFlow, setActiveFlow] = useState<DemoFlow | null>(null);

  const closeDemo = useCallback(() => {
    setActiveFlow(null);
  }, []);

  const openDemo = useCallback((flowId: DemoFlow['id']) => {
    const flow = DEMO_FLOWS.find((item) => item.id === flowId);

    if (!flow) {
      console.error('No matching demo flow found:', flowId);
      return;
    }

    setActiveFlow(flow);
  }, []);

  return (
    <div className="min-h-screen bg-ivory-100 relative">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest-700 focus:px-5 focus:py-3 focus:text-ivory-100"
      >
        Skip to content
      </a>

      {/* Modern top radar status header */}
      <SiteHeader />

      <main id="main">
        {/* Dynamic Mission Control Radar Canvas & Stats Hero */}
        <Hero onOpenFlow={openDemo} />

        {/* Interactive Before vs After Scenario Problem Section */}
        <ProblemSection />

        <SolutionSection />
        <HowItWorks />
        <FeaturesSection />
        <JourneyOfAMeal />

        {/* Hyperlocal ZIP / City Coverage Checker */}
        <CoverageSection />

        {/* Interactive ESG Impact Modeler with Certificate Modal */}
        <ImpactSection />

        {/* Audio Note & Category Filtered Community Voices */}
        <StoriesSection />

        <GetInvolvedSection onOpenFlow={openDemo} />
      </main>

      <SiteFooter />

      {/* Live Hyperlocal Rescue Notification Toasts */}
      <FloatingRescueToast />

      {/* Upgraded 2-Step Supabase Submission Dialog */}
      {activeFlow && (
        <DemoDialog
          key={activeFlow.id}
          flow={activeFlow}
          onClose={closeDemo}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public FoodBridge homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Private administrator dashboard */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Public read-only judge dashboard */}
        <Route path="/judge" element={<JudgePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;