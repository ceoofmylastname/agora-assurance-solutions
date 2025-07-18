
import PageLayout from '@/components/PageLayout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ModernApplicationModal } from '@/components/ModernApplicationModal';
import FloatingLeadsButton from '@/components/FloatingLeadsButton';
import businessMeetingImage from '@/assets/business-meeting-advisors.webp';

const Careers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Debug logging
  console.log("Careers component render, isModalOpen:", isModalOpen);
  
  return (
    <div className="min-h-screen bg-white">
      <PageLayout showContact={false}>
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-6 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Section */}
                <div className="space-y-8">
                  <motion.h1 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    className="text-5xl font-bold text-gray-900"
                  >
                    Agora Advisor Solutions
                  </motion.h1>
                  
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5, delay: 0.2 }} 
                    className="space-y-6 text-lg text-gray-700 leading-relaxed"
                  >
                    <p>
                      The financial industry is at the center of a retirement wave that will shape America for decades to come. 
                      There are tremendous opportunities to help people plan and prepare for their financial futures.
                    </p>
                    
                    <p>
                      Agora's mission is to empower independent financial advisors to thrive in this new environment. 
                      We provide the training, tools, and support that enable advisors to build successful practices 
                      while delivering exceptional value to their clients.
                    </p>
                    
                    <p>
                      We're committed to building a diverse, inclusive workplace where talented professionals from 
                      all backgrounds can contribute to our mission of transforming financial services for the better.
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="bg-[#15AFF7] hover:bg-[#0D94D1] text-white px-8 py-3 text-lg font-semibold rounded transition-colors cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                      APPLY NOW
                    </button>
                  </motion.div>
                </div>
                
                {/* Image Section */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative"
                >
                  <img 
                    src="/lovable-uploads/5c7ac1b7-a207-4223-b39e-d5e0e16bef31.png"
                    alt="Financial advisor meeting with clients"
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
      
      <FloatingLeadsButton />
      
      <ModernApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Careers;
