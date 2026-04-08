import Navbar from '@/components/shared/Navbar'
import HeroSection from '@/components/home/HeroSection'
import BestsellerSection from '@/components/home/BestsellerSection'
import SecuritySection from '@/components/home/SecuritySection'
import ConvertSection from '@/components/home/ConvertSection'
import RewardsSection from '@/components/home/RewardsSection'
import FAQSection from '@/components/home/FAQSection'
import HomeFooter from '@/components/home/HomeFooter'
import StickyCTA from '@/components/shared/StickyCTA'

export default function HomePage() {
  return (
    <>
      <Navbar buyHref="/collection" />
      <main style={{ paddingBottom: 87 }}>
        <HeroSection />
        <BestsellerSection />
        <SecuritySection />
        <ConvertSection />
        <RewardsSection />
        <FAQSection />
      </main>
      <HomeFooter />
      <StickyCTA />
    </>
  )
}
