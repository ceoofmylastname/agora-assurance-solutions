/**
 * Unified contact navigation utility
 * Ensures all contact buttons redirect to the "GET IN TOUCH" section on the home page
 */
export const navigateToContact = () => {
  // If we're not on the home page, navigate there first
  if (window.location.pathname !== '/') {
    window.location.href = '/#contact';
    return;
  }
  
  // Enhanced scroll with retry for same-page navigation
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      return true;
    }
    return false;
  };

  // Try immediate scroll, then retry if needed
  if (!scrollToContact()) {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (scrollToContact() || attempts >= 30) {
        clearInterval(interval);
      }
    }, 100);
  }
};