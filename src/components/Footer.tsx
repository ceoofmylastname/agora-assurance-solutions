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
    <footer id="contact" className="bg-gradient-to-r from-[#15AFF7] to-blue-600 text-white py-12 w-full">
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
            <div className="flex space-x-3">
              <a 
                href="https://www.linkedin.com/company/agora-assurance-solutions/posts/?feedView=all" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white transition-all hover:bg-white hover:text-[#15AFF7] backdrop-blur-sm"
              >
                <Linkedin size={16} />
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
  );
};

export default Footer;
