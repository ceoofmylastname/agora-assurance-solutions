
import { ExternalLink, Zap } from "lucide-react";
import { motion } from "framer-motion";

const FloatingLeadsButton = () => {
  const handleClick = () => {
    window.open('https://leads.agoraassurancesolutions.com/', '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50"
    >
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.05, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative bg-gradient-to-br from-[#15AFF7] via-[#0D94D1] to-[#0B7BA7] text-white px-6 py-4 rounded-2xl shadow-2xl hover:shadow-[#15AFF7]/30 transition-all duration-300 overflow-hidden"
      >
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        
        {/* Icon and text container */}
        <div className="relative flex items-center space-x-2">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <Zap className="h-5 w-5 text-yellow-300" />
          </motion.div>
          
          <span className="font-bold text-lg tracking-wide">LEADS</span>
          
          <motion.div
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ExternalLink className="h-4 w-4 opacity-70" />
          </motion.div>
        </div>
        
        {/* Pulse effect */}
        <div className="absolute inset-0 rounded-2xl bg-[#15AFF7]/20 animate-ping" />
        
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#15AFF7] to-[#0D94D1] rounded-2xl opacity-30 blur group-hover:opacity-60 transition-opacity duration-300" />
      </motion.button>
      
      {/* Floating particles effect */}
      <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-300 rounded-full animate-bounce" />
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#15AFF7] rounded-full animate-pulse" />
    </motion.div>
  );
};

export default FloatingLeadsButton;
