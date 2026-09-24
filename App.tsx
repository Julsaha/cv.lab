import { useCallback, useMemo, useState } from "react";
import { MobileCTA, RecentOrderToast } from "./components/Floating";
import { OrderContext, type PlanId } from "./components/OrderContext";
import { OrderModal } from "./components/OrderModal";
import { Benefits } from "./sections/Benefits";
import { CTA } from "./sections/CTA";
import { FAQ } from "./sections/FAQ";
import { Features } from "./sections/Features";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Navbar } from "./sections/Navbar";
import { Pricing } from "./sections/Pricing";
import { Process } from "./sections/Process";
import { Showcase } from "./sections/Showcase";
import { SocialProof } from "./sections/SocialProof";
import { Testimonials } from "./sections/Testimonials";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [plan, setPlan] = useState<PlanId>("ats");

  const open = useCallback((p?: PlanId) => {
    setPlan(p ?? "ats");
    setModalOpen(true);
  }, []);
  const ctx = useMemo(() => ({ open }), [open]);

  return (
    <OrderContext.Provider value={ctx}>
      <div className="relative min-h-screen overflow-x-clip">
        <Navbar />
        <main id="main">
          <Hero />
          <SocialProof />
          <Features />
          <Showcase />
          <Process />
          <Benefits />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
        <MobileCTA />
        <RecentOrderToast />
        <OrderModal isOpen={modalOpen} plan={plan} onClose={() => setModalOpen(false)} />
      </div>
    </OrderContext.Provider>
  );
}
