
import { ArrowRight, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      // EmailJS configuration
      const EMAILJS_SERVICE_ID = "service_i3h66xg";
      const EMAILJS_TEMPLATE_ID = "template_fgq53nh";
      const EMAILJS_PUBLIC_KEY = "wQmcZvoOqTAhGnRZ3";
      
      const templateParams = {
        from_name: "Website Subscriber",
        from_email: email,
        message: `New subscription request from the Agora Assurance website footer.`,
        to_name: 'Agora Assurance Team',
        reply_to: email
      };
      
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default"
      });
      
      setEmail("");
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
    <footer id="contact" className="bg-black text-white pt-12 sm:pt-16 pb-6 sm:pb-8 w-full">
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 pb-8 sm:pb-10 border-b border-gray-700">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-[#15AFF7] mb-2">Agora Assurance Solutions</h3>
              <p className="text-sm text-gray-400">Discover Truth & Transparency</p>
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              Supporting your family's assurance and well-being by streamlining the buying process with advanced systems and AI—so you can make informed protection decisions in one convenient place.
            </p>
            <div className="space-y-2 mb-4 sm:mb-6">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <a href="mailto:info@agoraassurancesolutions.com" className="hover:text-[#15AFF7] transition-colors text-sm sm:text-base break-all">
                  info@agoraassurancesolutions.com
                </a>
              </div>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/company/agora-assurance-solutions/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-300 transition-colors hover:bg-[#15AFF7] hover:text-white"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="sm:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Our Services</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li><Link to="/term-life" className="text-gray-300 hover:text-[#15AFF7] transition-colors text-sm sm:text-base">Term Life Insurance</Link></li>
              <li><Link to="/mortgage-protection" className="text-gray-300 hover:text-[#15AFF7] transition-colors text-sm sm:text-base">Mortgage Protection</Link></li>
              <li><Link to="/final-expense" className="text-gray-300 hover:text-[#15AFF7] transition-colors text-sm sm:text-base">Final Expense</Link></li>
              <li><Link to="/annuities" className="text-gray-300 hover:text-[#15AFF7] transition-colors text-sm sm:text-base">Annuity Solutions</Link></li>
              <li><Link to="/tax-solutions" className="text-gray-300 hover:text-[#15AFF7] transition-colors text-sm sm:text-base">Tax Solutions</Link></li>
            </ul>
          </div>
          
          <div className="sm:col-span-1">
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Get Updates</h3>
            <form className="space-y-3 sm:space-y-4" onSubmit={handleSubscribe}>
              <div>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-3 sm:px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15AFF7] text-white placeholder-gray-400 text-sm sm:text-base"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-3 sm:px-4 py-2 bg-[#15AFF7] text-white rounded-md hover:bg-[#0D94D1] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : (
                  <>
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} Agora Assurance Solutions. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-center">
            <Link to="/privacy-policy" className="text-xs sm:text-sm text-gray-400 hover:text-[#15AFF7] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-xs sm:text-sm text-gray-400 hover:text-[#15AFF7] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
