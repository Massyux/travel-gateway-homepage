import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/Hero";
import Gateway from "@/components/Gateway";
import TrustBar from "@/components/TrustBar";
import PromoCarousel from "@/components/PromoCarousel";
import OffersGrid from "@/components/OffersGrid";
import DestinationsGrid from "@/components/DestinationsGrid";
import B2BBanner from "@/components/B2BBanner";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import AboutFilialesSection from "@/components/AboutFilialesSection";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Gateway />
      <TrustBar />
      <PromoCarousel />
      <OffersGrid />
      <DestinationsGrid />
      <B2BBanner />
      <Testimonials />
      <Newsletter />
      <AboutFilialesSection />
    </>
  );
}
