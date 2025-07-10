import React from 'react';
import { Sparkles } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface CardData {
  id: number;
  number: string;
  headline: string;
  description: string;
  features: string[];
  backgroundColor: string;
  textColor: string;
}

interface AnimatedCardProps {
  card: CardData;
  index: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ card, index }) => {
  const { ref, isVisible, animationPhase } = useScrollReveal({
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
    delay: index * 150
  });

  const getAnimationClasses = (element: 'card' | 'headline' | 'star' | 'description' | 'features' | 'cta') => {
    const baseClasses = 'transform transition-all duration-700 ease-spring will-change-transform';
    
    switch (element) {
      case 'card':
        return `${baseClasses} ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-full opacity-0'
        }`;
      
      case 'headline':
        return `${baseClasses} duration-600 ${
          animationPhase === 'headline' || animationPhase === 'content'
            ? 'translate-y-0 opacity-100 rotateY-0'
            : 'translate-y-[90px] opacity-0 rotateY-90'
        }`;
      
      case 'star':
        return `${baseClasses} delay-[50ms] ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100 rotate-0'
            : 'translate-y-5 opacity-0 rotate-45'
        }`;
      
      case 'description':
        return `${baseClasses} delay-150 ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-5 opacity-0'
        }`;
      
      case 'features':
        return `${baseClasses} delay-300 ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-5 opacity-0'
        }`;
      
      case 'cta':
        return `${baseClasses} delay-500 ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-5 opacity-0'
        }`;
      
      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={ref}
      className={`sticky top-0 h-screen flex items-center justify-center relative overflow-hidden`}
      style={{ 
        backgroundColor: card.backgroundColor,
        zIndex: 50 - index
      }}
    >
      <div className={getAnimationClasses('card')}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Giant Number */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <span 
                  className="text-8xl lg:text-9xl font-black leading-none block"
                  style={{ color: card.textColor }}
                >
                  {card.number}
                </span>
              </div>
            </div>

            {/* Center - Star Icon */}
            <div className="lg:col-span-2 flex justify-center">
              <div className={getAnimationClasses('star')}>
                <Sparkles 
                  className="w-16 h-16 lg:w-20 lg:h-20 flex-shrink-0" 
                  style={{ color: card.textColor }}
                />
              </div>
            </div>

            {/* Right Side - Headline */}
            <div className="lg:col-span-7">
              <div className={getAnimationClasses('headline')}>
                <h2 
                  className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-8"
                  style={{ color: card.textColor }}
                >
                  {card.headline}
                </h2>
              </div>
              
              {/* Description */}
              <div className={getAnimationClasses('description')}>
                <p 
                  className="text-lg lg:text-xl font-medium leading-relaxed mb-6"
                  style={{ color: card.textColor }}
                >
                  {card.description}
                </p>
              </div>

              {/* Features List */}
              <div className={getAnimationClasses('features')}>
                <ul className="space-y-3 mb-8">
                  {card.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className="flex items-center text-base lg:text-lg font-medium transform transition-all duration-700"
                      style={{
                        color: card.textColor,
                        transitionDelay: `${400 + (featureIndex * 100)}ms`,
                        transitionTimingFunction: 'cubic-bezier(0.25,0.46,0.45,0.94)',
                        transform: animationPhase === 'content' ? 'translateY(0)' : 'translateY(20px)',
                        opacity: animationPhase === 'content' ? 1 : 0
                      }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full mr-4 flex-shrink-0"
                        style={{ backgroundColor: card.textColor }}
                      ></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn More Link */}
              <div className={getAnimationClasses('cta')}>
                <button 
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center text-lg lg:text-xl font-bold hover:underline transition-all duration-300 hover:translate-x-2 cursor-pointer"
                  style={{ color: card.textColor }}
                >
                  → LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;