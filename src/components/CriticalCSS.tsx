// Critical CSS component to be inlined for performance
export const criticalStyles = `
  .banner-container {
    background-color: #15AFF7;
    position: relative;
    overflow: hidden;
    width: 100%;
    contain: layout paint;
  }
  
  .banner-overlay {
    background-color: transparent;
    width: 100%;
    will-change: auto;
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  
  @keyframes fade-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Font loading optimization */
  @font-face {
    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQQoyeyHLkT11dPUxLBzT0DL1E7kSyYGfFwv6E3QjsJgnw.woff2') format('woff2');
  }
`;

export const CriticalCSS = () => {
  return (
    <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
  );
};