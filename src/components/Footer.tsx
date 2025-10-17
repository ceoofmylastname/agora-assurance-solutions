import { ArrowRight, Linkedin, Facebook, Instagram, Mail, Phone, CheckCircle, Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://services.leadconnectorhq.com/hooks/TLhrYb7SRrWrly615tCI/webhook-trigger/dd0e5f9c-4a07-4cbf-811e-6d9bbdbbfd6e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          source: 'footer_subscription',
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        setShowSuccessPopup(true);
        setEmail("");
        
        // Auto-hide popup after 4 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
        }, 4000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      console.error("Error sending subscription:", error);
      
      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-scale-in">
            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#15AFF7] rounded-full animate-bounce"></div>
            <div className="absolute -top-1 -right-3 w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute -bottom-2 left-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            
            {/* Main content */}
            <div className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#15AFF7] to-blue-600 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-pulse" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                You're Officially Connected! 🎉
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Welcome to the Agora family! Get ready for exclusive insights, market updates, and personalized insurance solutions delivered straight to your inbox.
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-sm text-[#15AFF7] font-medium">
                <Mail className="w-4 h-4" />
                <span>Check your email for a welcome message</span>
              </div>
            </div>
            
            {/* Close button */}
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <span className="text-gray-500 text-lg">×</span>
            </button>
            
            {/* Decorative gradient border */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#15AFF7] via-purple-500 to-pink-500 p-[2px] -z-10">
              <div className="w-full h-full bg-white rounded-2xl"></div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-gradient-to-r from-[#15AFF7] to-blue-600 text-white py-12 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/20">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-1">Agora Assurance Solutions</h3>
                <p className="text-sm text-white/80">Discover Truth & Transparency</p>
              </div>
              <p className="text-white/90 text-sm mb-4 leading-relaxed">
                Supporting your family's assurance and well-being by streamlining the buying process with advanced systems and AI.
              </p>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-2">Service Areas</h4>
                <p className="text-white/80 text-sm">
                  Providing comprehensive insurance solutions nationwide across all 50 states. Licensed agents available to serve families and businesses throughout the United States.
                </p>
              </div>
              <div className="flex items-center text-white/90 text-sm mb-4">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:info@agoraassurancesolutions.com" className="hover:text-white transition-colors">
                  info@agoraassurancesolutions.com
                </a>
              </div>
              <div className="flex items-start text-white/90 text-sm mb-4">
                <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <address className="not-italic hover:text-white transition-colors">
                  1401 21st Street<br />
                  Sacramento, CA 95811
                </address>
              </div>
              <div className="flex space-x-3">
                <a 
                  href="https://www.linkedin.com/company/agora-assurance-solutions/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-white hover:text-[#15AFF7] backdrop-blur-sm"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61557048294797" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-white hover:text-[#15AFF7] backdrop-blur-sm"
                >
                  <Facebook size={16} />
                </a>
                <a 
                  href="https://www.instagram.com/agoraassurancesolutions/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-white hover:text-[#15AFF7] backdrop-blur-sm"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3 text-white">Our Services</h3>
              <ul className="space-y-2">
                <li><Link to="/services/term-life" className="text-sm text-white/80 hover:text-white transition-colors">Term Life Insurance</Link></li>
                <li><Link to="/services/whole-life" className="text-sm text-white/80 hover:text-white transition-colors">Whole Life Insurance</Link></li>
                <li><Link to="/services/universal-life" className="text-sm text-white/80 hover:text-white transition-colors">Universal Life Insurance</Link></li>
                <li><Link to="/services/mortgage-protection" className="text-sm text-white/80 hover:text-white transition-colors">Mortgage Protection</Link></li>
                <li><Link to="/services/final-expense" className="text-sm text-white/80 hover:text-white transition-colors">Final Expense</Link></li>
                <li><Link to="/services/annuities" className="text-sm text-white/80 hover:text-white transition-colors">Annuity Solutions</Link></li>
                <li><Link to="/services/life-settlements" className="text-sm text-white/80 hover:text-white transition-colors">Life Settlements</Link></li>
                <li><Link to="/services/tax-asset-protection" className="text-sm text-white/80 hover:text-white transition-colors">Tax & Asset Protection</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3 text-white">Stay Connected</h3>
              <form className="space-y-3" onSubmit={handleSubscribe}>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/60 text-sm backdrop-blur-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full px-3 py-2 bg-white/10 text-white rounded-md hover:bg-white/20 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm backdrop-blur-sm border border-white/20"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Connecting..." : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/80 text-sm mb-3 md:mb-0">
              © {new Date().getFullYear()} Agora Assurance Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-sm text-white/80 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-white/80 hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
