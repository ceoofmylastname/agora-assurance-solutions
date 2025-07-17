
import HeroBanner from "./hero/HeroBanner";
import HeroCards from "./hero/HeroCards";

const Hero = () => {
  return (
    <div className="relative w-full -mt-16">
      <HeroBanner />
      <HeroCards />
    </div>
  );
};

export default Hero;
