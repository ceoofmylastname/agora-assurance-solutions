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
  
  // If we're already on the home page, smooth scroll to contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};