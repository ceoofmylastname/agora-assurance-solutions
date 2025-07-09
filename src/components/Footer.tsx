
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
    <footer id="contact" className="bg-[#15AFF7] text-white pt-16 pb-8 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-700">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-[#15AFF7] mb-2">Agora Assurance Solutions</h3>
              <p className="text-sm text-gray-400">Discover Truth & Transparency</p>
            </div>
            <p className="text-gray-300 mb-6">
              Supporting your family's assurance and well-being by streamlining the buying process with advanced systems and AI—so you can make informed protection decisions in one convenient place.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:info@agoraassurancesolutions.com" className="hover:text-[#15AFF7] transition-colors">
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
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Our Services</h3>
            <ul className="space-y-3">
              <li><Link to="/term-life" className="text-gray-300 hover:text-[#15AFF7] transition-colors">Term Life Insurance</Link></li>
              <li><Link to="/mortgage-protection" className="text-gray-300 hover:text-[#15AFF7] transition-colors">Mortgage Protection</Link></li>
              <li><Link to="/final-expense" className="text-gray-300 hover:text-[#15AFF7] transition-colors">Final Expense</Link></li>
              <li><Link to="/annuities" className="text-gray-300 hover:text-[#15AFF7] transition-colors">Annuity Solutions</Link></li>
              <li><Link to="/tax-solutions" className="text-gray-300 hover:text-[#15AFF7] transition-colors">Tax Solutions</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Get Updates</h3>
            <form className="space-y-4" onSubmit={handleSubscribe}>
              <div>
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15AFF7] text-white placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-2 bg-[#15AFF7] text-white rounded-md hover:bg-[#0D94D1] transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed font-medium"
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
        
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Agora Assurance Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-[#15AFF7] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-[#15AFF7] transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
