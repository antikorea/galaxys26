import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import PricingSection from "./components/PricingSection/PricingSection";
import PrivacySection from "./components/PrivacySection/PrivacySection";
import CameraSection from "./components/CameraSection/CameraSection";
import PerformanceSection from "./components/PerformanceSection/PerformanceSection";
import BenefitsSection from "./components/BenefitsSection/BenefitsSection";
import LeadFormSection from "./components/LeadFormSection/LeadFormSection";
import Footer from "./components/Footer/Footer";
import ScrollReveal from "./components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />

      <main>
        {/* Section 1: Full-screen Hero with Video Placeholder */}
        <HeroSection />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Section 2: Pricing Comparison */}
        <PricingSection />

        <div className="section-divider" />

        {/* Section 3: Privacy Display */}
        <PrivacySection />

        <div className="section-divider" />

        {/* Section 4: Camera / Nightography */}
        <CameraSection />

        <div className="section-divider" />

        {/* Section 5: Performance / AI */}
        <PerformanceSection />

        <div className="section-divider" />

        {/* Section 6: Benefits / Promo Bundle */}
        <BenefitsSection />

        <div className="section-divider" />

        {/* Section 7: Lead Form (DB Cart) */}
        <LeadFormSection />
      </main>

      {/* Section 8: Footer */}
      <Footer />
    </>
  );
}
