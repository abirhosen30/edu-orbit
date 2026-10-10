import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import JourneySection from "@/components/JourneySection";
import ScholarshipsSection from "@/components/ScholarshipsSection";
import UniversitiesSection from "@/components/UniversitiesSection";
import StudentResourcesSection from "@/components/StudentResourcesSection";
import ComparisonSection from "@/components/ComparisonSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

// Server Component — assembles all page sections
export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <JourneySection />
      <ScholarshipsSection />
      <UniversitiesSection />
      <StudentResourcesSection />
      <ComparisonSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
