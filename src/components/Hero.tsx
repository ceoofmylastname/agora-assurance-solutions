
import HeroBanner from "./hero/HeroBanner";
import HeroCards from "./hero/HeroCards";

const Hero = () => {
  return (
    <section className="relative w-full -mt-16" aria-label="Hero section with insurance services">
      <HeroBanner />
      <HeroCards />
    </section>
  );
};

export default Hero;
