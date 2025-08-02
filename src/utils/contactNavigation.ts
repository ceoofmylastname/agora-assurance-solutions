/**
 * Unified contact navigation utility
 * Handles both modal trigger and scroll navigation
 */

// Global state for contact modal
let contactModalTrigger: (() => void) | null = null;

export const setContactModalTrigger = (trigger: (() => void) | null) => {
  contactModalTrigger = trigger;
};

export const navigateToContact = () => {
  // If modal trigger is available, use it
  if (contactModalTrigger) {
    contactModalTrigger();
    return;
  }
  
  // Fallback: navigate to contact section on homepage
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