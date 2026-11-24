import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TripleCards from "@/components/TripleCards";
import FeatureBanner from "@/components/FeatureBanner";
import ServicesGrid from "@/components/ServicesGrid";
import CtaBanner from "@/components/CtaBanner";
import FaqSection from "@/components/FaqSection";
import CallUsBanner from "@/components/CallUsBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <TripleCards />
      <FeatureBanner />
      <ServicesGrid />
      <CtaBanner />
      <FaqSection />
      <CallUsBanner />
      <Footer />
    </main>
  );
}