import Head from "next/head";
import GradientWrapper from "../components/GradientWrapper";
import CTA from "../components/ui/CTA";
import Features from "../components/ui/Features";
import FooterCTA from "../components/ui/FooterCTA";
import Hero from "../components/ui/Hero";
import LogoGrid from "../components/ui/LogoGrid";
import Testimonials from "../components/ui/Testimonials";
import ToolKit from "../components/ui/ToolKit";
import AnimatedContent from "../components/ui/AnimatedContent";
import SwiperComponent from "../components/ui/Swipper";
import Benefits from "components/ui/Benefits"

export default function Home() {
  return (
    <>
      <Head>
        <meta name='robots' content='index' />
      </Head>
      <Hero />
      <LogoGrid />
      <GradientWrapper>
      <AnimatedContent/>
        <Features />
        <CTA />
      </GradientWrapper>
      <ToolKit />
      <SwiperComponent/>
      <Benefits/>
      <GradientWrapper>
        <Testimonials />
      </GradientWrapper>
      <FooterCTA />
    </>
  );
}
