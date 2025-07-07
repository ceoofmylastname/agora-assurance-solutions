
import PageLayout from '@/components/PageLayout';
import SEO from '@/components/SEO';
import { Shield, ArrowRight, CheckCircle } from 'lucide-react';

const TermLife = () => {
  return (
    <PageLayout>
      <SEO 
        title="Term Life Insurance - Agora Assurance Solutions" 
        description="Flexible, affordable term life insurance coverage. Compare multiple policies side-by-side to protect your loved ones with transparent pricing and expert guidance."
        keywords={['term life insurance', 'life insurance quotes', 'affordable life insurance', 'family protection']}
      />
      
      <div className="pt-20 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-[#15AFF7]" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Term Life Insurance
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Flexible, affordable coverage for a set term—compare multiple policies side-by-side to protect your loved ones.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
                <CheckCircle className="w-8 h-8 text-[#15AFF7] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Flexible Terms</h3>
                <p className="text-gray-600">Choose coverage periods that match your needs - 10, 20, or 30 years.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
                <CheckCircle className="w-8 h-8 text-[#15AFF7] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Affordable Rates</h3>
                <p className="text-gray-600">Get the most competitive rates from top-rated insurance carriers.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-blue-200 shadow-sm">
                <CheckCircle className="w-8 h-8 text-[#15AFF7] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Easy Comparison</h3>
                <p className="text-gray-600">Compare multiple policies side-by-side to find the best fit for your family.</p>
              </div>
            </div>
            
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="mt-12 px-8 py-4 bg-[#15AFF7] text-white rounded-lg hover:bg-[#0D94D1] transition-all duration-300 group font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Get Your Quote Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 inline" />
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TermLife;
