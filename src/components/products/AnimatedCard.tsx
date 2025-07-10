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
        return `${baseClasses} transition-duration-600 ${
          animationPhase === 'headline' || animationPhase === 'content'
            ? 'translate-y-0 opacity-100 rotateY-0'
            : 'translate-y-[90px] opacity-0 rotateY-90'
        }`;
      
      case 'star':
        return `${baseClasses} delay-[50ms] ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100 rotate-0'
            : 'translate-y-8 opacity-0 rotate-45'
        }`;
      
      case 'description':
        return `${baseClasses} delay-[150ms] ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-12 opacity-0'
        }`;
      
      case 'features':
        return `${baseClasses} delay-[300ms] ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-8 opacity-0'
        }`;
      
      case 'cta':
        return `${baseClasses} delay-[500ms] ${
          animationPhase === 'content'
            ? 'translate-y-0 opacity-100'
            : 'translate-y-6 opacity-0'
        }`;
      
      default:
        return baseClasses;
    }
  };

  return (
    <div
      ref={ref}
      className={`sticky top-0 min-h-screen flex items-center justify-center ${card.backgroundColor} relative overflow-hidden`}
      style={{ zIndex: 50 - index }}
    >
      <div className={getAnimationClasses('card')}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Side - Number */}
            <div className="lg:col-span-2 flex justify-center lg:justify-end">
              <div className="text-center lg:text-right">
                <div className={`w-16 h-1 ${card.textColor.replace('text-', 'bg-')} mb-4 mx-auto lg:ml-auto lg:mr-0`}></div>
                <span className={`text-8xl lg:text-9xl font-black ${card.textColor} leading-none block`}>
                  {card.number}
                </span>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:col-span-10 space-y-8">
              
              {/* Headline with Icon */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className={getAnimationClasses('headline')}>
                  <h2 className={`text-4xl lg:text-6xl xl:text-7xl font-black ${card.textColor} leading-tight tracking-tight`}>
                    {card.headline}
                  </h2>
                </div>
                
                {/* Star Icon */}
                <div className={getAnimationClasses('star')}>
                  <Sparkles className={`w-12 h-12 lg:w-16 lg:h-16 ${card.textColor} flex-shrink-0`} />
                </div>
              </div>

              {/* Description */}
              <div className={getAnimationClasses('description')}>
                <p className={`text-lg lg:text-xl ${card.textColor} font-medium leading-relaxed max-w-4xl`}>
                  {card.description}
                </p>
              </div>

              {/* Features List */}
              <div className={getAnimationClasses('features')}>
                <ul className="space-y-3 max-w-3xl">
                  {card.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex} 
                      className={`flex items-center text-base lg:text-lg ${card.textColor} font-medium transform transition-all duration-700 ease-spring`}
                      style={{
                        transitionDelay: `${400 + (featureIndex * 100)}ms`,
                        transform: animationPhase === 'content' ? 'translateY(0)' : 'translateY(20px)',
                        opacity: animationPhase === 'content' ? 1 : 0
                      }}
                    >
                      <div className={`w-2 h-2 rounded-full ${card.textColor.replace('text-', 'bg-')} mr-4 flex-shrink-0`}></div>
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
                  className={`inline-flex items-center text-lg lg:text-xl ${card.textColor} font-bold hover:underline transition-all duration-300 hover:translate-x-2 cursor-pointer`}
                >
                  → LEARN MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent"></div>
      </div>
    </div>
  );
};

export default AnimatedCard;